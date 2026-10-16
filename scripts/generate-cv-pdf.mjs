import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const htmlPath = join(root, 'public', 'cv-thuyduong.html')
const pdfPath = join(root, 'public', 'cv-thuyduong.pdf')
const pause = ms => new Promise(done => setTimeout(done, ms))
const candidates = [
  process.env.CV_BROWSER,
  process.env.ProgramFiles && join(process.env.ProgramFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  process.env['ProgramFiles(x86)'] && join(process.env['ProgramFiles(x86)'], 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  process.env.ProgramFiles && join(process.env.ProgramFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
]
const executable = candidates.find(candidate => candidate && existsSync(candidate))
if (!executable) throw new Error('Install Chrome/Edge or set CV_BROWSER to its executable path, then run npm run cv:pdf.')
if (!existsSync(htmlPath)) throw new Error(`Missing CV source: ${htmlPath}`)

const tempRoot = resolve(tmpdir())
const profilePath = mkdtempSync(join(tempRoot, 'portfolio-cv-'))
const browser = spawn(executable, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--disable-background-networking', '--disable-component-update',
  '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0',
  `--user-data-dir=${profilePath}`, 'about:blank',
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] })
let browserLog = ''
let startupError
browser.stderr.on('data', chunk => { browserLog = (browserLog + chunk).slice(-3000) })
browser.on('error', error => { startupError = error })
const exited = new Promise(done => browser.on('exit', done))
let socket
let nextId = 0
const pending = new Map()

function send(method, params = {}) {
  return new Promise((done, reject) => {
    const id = ++nextId
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Browser timeout: ${method}`)) }, 15000)
    pending.set(id, { done, reject, timeout })
    socket.send(JSON.stringify({ id, method, params }))
  })
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}

try {
  const portPath = join(profilePath, 'DevToolsActivePort')
  for (let attempt = 0; !existsSync(portPath); attempt++) {
    if (startupError) throw startupError
    if (browser.exitCode !== null || attempt > 150) throw new Error(`Could not start browser. ${browserLog}`)
    await pause(100)
  }
  const port = Number(readFileSync(portPath, 'utf8').split(/\r?\n/)[0])
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' }).then(response => response.json())
  socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((done, reject) => { socket.onopen = done; socket.onerror = reject })
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    const callback = pending.get(message.id)
    if (!callback) return
    clearTimeout(callback.timeout)
    pending.delete(message.id)
    if (message.error) callback.reject(new Error(JSON.stringify(message.error)))
    else callback.done(message.result)
  }
  await send('Page.enable')
  await send('Page.navigate', { url: pathToFileURL(htmlPath).href })
  for (let attempt = 0; attempt < 50; attempt++) {
    await pause(100)
    if (await evaluate("document.readyState === 'complete' && document.querySelectorAll('.cv-page').length === 2")) break
  }
  await evaluate('document.fonts.ready.then(() => true)')
  // 182 mm is the A4 content width after the two 14 mm page margins.
  await send('Emulation.setDeviceMetricsOverride', { width: 688, height: 1032, deviceScaleFactor: 1, mobile: false })
  await send('Emulation.setEmulatedMedia', { media: 'print' })
  const layout = await evaluate(`Array.from(document.querySelectorAll('.cv-page'), (page, index) => ({
    page: index + 1, height: page.clientHeight, contentHeight: page.scrollHeight,
    contentBottom: page.querySelector('.page-content').getBoundingClientRect().bottom,
    footerTop: page.querySelector('.page-footer').getBoundingClientRect().top,
    lastContentBottom: page.querySelector('.page-content').lastElementChild.getBoundingClientRect().bottom,
  }))`)
  if (layout.length !== 2 || layout.some(page => page.contentHeight > page.height + 2 || page.contentBottom > page.footerTop)) {
    throw new Error(`CV content does not fit two A4 pages: ${JSON.stringify(layout)}`)
  }
  const printed = await send('Page.printToPDF', {
    printBackground: true, displayHeaderFooter: false, preferCSSPageSize: true,
    generateTaggedPDF: true,
  })
  const pdf = Buffer.from(printed.data, 'base64')
  if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('Browser did not return a valid PDF.')
  const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length
  if (pageCount !== 2) throw new Error(`Expected two PDF pages; received ${pageCount}. Adjust the HTML print layout.`)
  writeFileSync(pdfPath, pdf)
  const legacyPdfPath = join(root, 'public', 'NguyenThiThuyDuong_SoftwareEngineer.pdf')
  writeFileSync(legacyPdfPath, pdf)
  console.log(`Created public/cv-thuyduong.pdf: ${pageCount} A4 pages, ${Math.round(pdf.length / 1024)} KB (also synced NguyenThiThuyDuong_SoftwareEngineer.pdf).`)
} finally {
  if (socket?.readyState === WebSocket.OPEN) await send('Browser.close').catch(() => {})
  socket?.close()
  if (browser.exitCode === null) {
    await Promise.race([exited, pause(2000)])
    if (browser.exitCode === null) browser.kill()
    await Promise.race([exited, pause(2000)])
  }
  // Only remove the unique browser profile created by this script inside the OS temp directory.
  const target = resolve(profilePath)
  if (target.startsWith(tempRoot + sep) && basename(target).startsWith('portfolio-cv-')) {
    rmSync(target, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
  }
}
