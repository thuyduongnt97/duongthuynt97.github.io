import { ref } from 'vue'

// State dùng chung toàn app (module-level) để mọi component đồng bộ.
const initialTheme = typeof document !== 'undefined'
  ? (document.documentElement.getAttribute('data-theme') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light'))
  : 'dark'

const theme = ref(initialTheme)

function apply(next) {
  theme.value = next
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'light' ? '#f8fafc' : '#06090F')
  }
}

if (typeof document !== 'undefined') {
  apply(theme.value)
}

export function useTheme() {
  const toggle = () => {
    const next = theme.value === 'light' ? 'dark' : 'light'
    apply(next)
    try { localStorage.setItem('theme', next) } catch { /* bỏ qua */ }
  }
  return { theme, toggle }
}
