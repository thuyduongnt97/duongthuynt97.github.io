// =====================================================
//  THÔNG TIN CÁ NHÂN — NGUYỄN THỊ THÙY DƯƠNG
// =====================================================
import { recognition } from './recognition.js'

export const profile = {
  name: 'Nguyễn Thị Thùy Dương',
  shortName: 'Thùy Dương',
  initial: 'D',
  title: 'Fullstack Software Engineer',
  get heroTitle() {
    return this.title
  },
  get availability() {
    return `Open for ${this.title} Opportunities`
  },
  get roleSummary() {
    return this.title
  },
  city: 'Hà Nội',
  country: 'Việt Nam',
  countryCode: 'VN',
  get location() {
    return `${this.city}, ${this.country}`
  },
  since: '2018',
  experienceYears: 7,
  websiteUrl: 'https://thuyduongnt97.github.io/',

  // Thông tin liên hệ công khai
  email: 'duongthuynt97@gmail.com',
  linkedin: '',
  github: 'https://github.com/thuyduongnt97',

  // CV PDF trong thư mục /public
  cvUrl: `${import.meta.env?.BASE_URL ?? '/'}cv-thuyduong.pdf`,
  cvFileName: 'NguyenThiThuyDuong_SoftwareEngineer.pdf',
  cvHtmlUrl: `${import.meta.env?.BASE_URL ?? '/'}cv-thuyduong.html`,

  // Tiêu đề chính dạng text và HTML gradient
  heroHeadline: 'Phát triển toàn diện từ Hệ thống Web App, Nền tảng AdTech đến Core Widget & WebGIS.',
  heroHeadlineHtml: 'Phát triển toàn diện từ<br />\n<span class="gradient-amber text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 font-extrabold">Hệ thống Web App, Nền tảng AdTech</span><br />\nđến <span class="gradient-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-extrabold">Core Widget &amp; WebGIS.</span>',

  // Đoạn giới thiệu chuẩn hóa bám sát reference-redesign
  get lead() {
    return '<strong class="text-amber-400 font-bold">' + this.experienceYears + ' năm</strong> phát triển sản phẩm end-to-end tại <strong class="text-white font-bold">VCCorp</strong>: từ thiết kế CSDL MySQL, tối ưu <strong class="text-amber-400 font-bold">Redis Cache</strong> chịu tải cao (<strong class="text-amber-400 font-bold">&gt;2 triệu clicks</strong>), xây dựng CMS <strong class="text-cyan-400 font-bold">Laravel/Vue.js</strong> đến kiến trúc Core Widget (Svelte) và bản đồ số WebGIS.'
  },

  // Badge trạng thái đầu Hero
  get heroBadge() {
    return this.title + ' • ' + this.city
  },

  get heroRecognition() {
    const years = recognition.professional.years
    return '🏆 ' + years.length + 'x Nhân viên Xuất sắc VCCorp (' + years.join(', ') + ')'
  },

  ecosystemsLabel: 'Nền tảng & Hệ sinh thái đã triển khai sản phẩm:',

  // 2 nút CTA trong Hero (đúng nhãn bản mẫu)
  heroCtas: [
    { id: 'cta-deliverables', label: 'Khám phá dự án ↗', href: '#deliverables', variant: 'primary' },
    { id: 'cta-skills', label: 'Kỹ năng & kinh nghiệm ↓', href: '#skill-matrix', variant: 'secondary' },
  ],

  // Thông số dưới khung Canvas WebGIS (HeroPlayground)
  playground: {
    fileName: 'webgis-clustering-demo.vue',
    badge: 'Interactive 60FPS',
    tags: [
      { label: 'QGIS Geometry Simplification', color: 'cyan' },
      { label: 'Marker Clustering', color: 'amber' },
    ],
    hint: 'Di chuột để kiểm tra gom cụm điểm tọa độ',
    fps: '● 60 FPS',
    specs: [
      { label: '• Backend & High-Load:', value: 'PHP Laravel • MySQL • Redis', color: 'amber' },
      { label: '• Web App & Core Widget:', value: 'Vue 2/3 • Svelte • Zero CLS', color: 'emerald' },
      { label: '• Bản đồ số & Dữ liệu:', value: 'QGIS • Leaflet • MapSVG.js', color: 'cyan' },
      { label: '• AI Workflow:', value: 'Codex • Antigravity • Gemini', color: 'purple' },
    ],
  },

  // Nền tảng & Hệ sinh thái đã triển khai sản phẩm thực tế
  ecosystems: [
    {
      id: 'gov-map',
      label: '02 Cổng TT Nhà Nước & Báo Giao Thông',
      icon: '🗺️',
      color: 'cyan',
    },
    {
      id: 'core-box',
      label: 'Kenh14 & Soha (Core Box)',
      icon: '🧩',
      color: 'emerald',
    },
    {
      id: 'bizfly-admicro',
      label: 'Bizfly Shortlink & Admicro Tools',
      icon: '⚡',
      color: 'purple',
    },
    {
      id: 'campaign-emag',
      label: 'Campaign Landing Pages & CafeF Emagazine',
      icon: '✨',
      color: 'amber',
    },
  ],

  // 4 Chỉ số thực tế nổi bật (loại bỏ mọi số liệu ảo/phóng đại)
  get stats() {
    return [
      {
        to: this.experienceYears,
        suffix: ' Năm',
        value: `${this.experienceYears} Năm`,
        label: 'Kinh nghiệm từ 2018',
        color: 'amber',
      },
      {
        to: recognition.professional.years.length,
        suffix: ' Năm',
        value: `${recognition.professional.years.length} Năm`,
        label: 'Nhân viên Xuất sắc',
        color: 'emerald',
      },
      {
        to: 2,
        suffix: 'M+',
        value: '2M+',
        label: 'Tổng lượt click Shortlink',
        color: 'cyan',
      },
      {
        to: 6,
        suffix: ' Mảng',
        value: '6 Mảng',
        label: 'Sản phẩm trọng điểm phụ trách',
        color: 'purple',
      },
    ]
  },

  codeStack: {
    frontend: ['Vue.js (2 & 3)', 'Svelte', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    webgis: ['QGIS', 'Leaflet', 'GeoJSON', 'MapSVG.js'],
    backend: ['Laravel', 'PHP', 'MySQL', 'Redis Cache'],
  },

  highlights: [
    { icon: 'layers', text: 'PHP / Laravel' },
    { icon: 'database', text: 'MySQL & Redis Cache' },
    { icon: 'code', text: 'Vue.js / Svelte' },
    { icon: 'map', text: 'Core Widget & WebGIS' },
  ],
}

// Metadata SEO
export const seo = {
  get title() {
    return `${profile.name} — ${profile.title} | Portfolio`
  },
  get description() {
    return `${profile.name} — ${profile.title}, ${profile.experienceYears} năm phát triển end-to-end tại VCCorp. Vue.js / Svelte, PHP / Laravel, MySQL & Redis Cache; Shortlink hơn 2 triệu clicks, dashboard analytics, Core Widget và WebGIS hiệu năng cao.`
  },
  get socialTitle() {
    return `${profile.name} — ${profile.title}`
  },
  get socialDescription() {
    return `Portfolio của ${profile.name} — ${profile.title} (Vue.js/Svelte + PHP/Laravel). Làm chủ sản phẩm từ kiến trúc đến vận hành: Dynamic QR/Shortlink, dashboard analytics, Core Widget và WebGIS hiệu năng cao.`
  },
  locale: 'vi_VN',
  knowsAbout: [
    'Vue.js',
    'Svelte',
    'JavaScript ES6+',
    'TypeScript',
    'GSAP ScrollTrigger',
    'Leaflet.js',
    'QGIS Geometry Simplification',
    'GeoJSON',
    'Laravel',
    'PHP',
    'MySQL',
    'Redis',
    'Core Box Widget',
    'A/B Testing Platform',
    'Dynamic QR & Shortlink',
    'AI Workflow (Codex, Antigravity, Gemini)',
  ],
}

// Menu điều hướng tinh gọn 1 dòng
export const navLinks = [
  { id: 'skills', label: 'Kỹ năng', href: '#skill-matrix' },
  { id: 'deliverables', label: 'Dự án', href: '#deliverables' },
  { id: 'recognition', label: 'Ghi nhận', href: '#recognition' },
  { id: 'timeline', label: 'Lộ trình', href: '#timeline' },
]

export const marquee = [
  'Vue.js',
  'Laravel',
  'Svelte',
  'TypeScript',
  'WebGIS',
  'Leaflet',
  'GeoJSON',
  'QGIS',
  'GSAP ScrollTrigger',
  'Core Box Widget',
  'A/B Testing',
  'Dynamic QR',
  'MySQL',
  'Redis Cache',
  'AI Workflow (Codex • Antigravity • Gemini)',
]

export const about = {
  paragraphs: [
    `Mình là <strong>${profile.name}</strong> (${profile.title}) với <strong>${profile.experienceYears} năm kinh nghiệm thực chiến</strong>, phát triển toàn diện sản phẩm web bằng <strong>Vue.js / Svelte, PHP / Laravel, MySQL và Redis Cache</strong> tại <strong>VCCorp</strong>.`,
    'Bắt đầu từ môi trường <strong>nghiên cứu khoa học và chuyển giao công nghệ tại Viện Đại học Mở Hà Nội</strong> (Giải Ba NCKH 05/2019 về phân tích & phân cụm dữ liệu), mình xây dựng nền tảng tư duy toán học và kỹ thuật vững chắc qua các hệ thống tuyển sinh và quản lý đào tạo.',
    'Với <strong>Dynamic QR/Shortlink</strong>, mình phụ trách từ thiết kế MySQL, backend Laravel và Redis cache đến dashboard Vue.js và vận hành: <strong>hơn 2 triệu clicks, đỉnh ~240.000 clicks/ngày</strong>. Các sản phẩm khác gồm <strong>Tool Template &amp; A/B Testing, Core Widget tái sử dụng, WebGIS cho 02 Cổng thông tin Nhà nước</strong>, Landing Page chiến dịch và Emagazine trên CafeF.',
  ],
  pills: [
    { icon: 'pin', text: profile.location },
    { icon: 'briefcase', text: `${profile.since} – Hiện tại (7 Năm KN)` },
    { icon: 'award', text: "3 Năm NV Xuất sắc ('22, '23, '25)" },
  ],
  facts: [
    {
      icon: 'layers',
      title: 'End-to-End Product Ownership',
      text: 'Phân tích bài toán, thiết kế MySQL, phát triển Laravel/Vue.js và vận hành Dynamic QR/Shortlink; cho phép đổi URL đích mà không cần in lại ấn phẩm.',
    },
    {
      icon: 'zap',
      title: 'High-Performance & Data Visualization',
      text: 'Tối ưu redirect bằng Redis; trực quan hóa dữ liệu qua dashboard analytics. Giảm dung lượng GeoJSON bằng QGIS, kết hợp Leaflet, Marker Clustering và Canvas renderer cho WebGIS 60 FPS trên di động.',
    },
    {
      icon: 'sparkle',
      title: 'Quy trình AI Workflow: Codex • Antigravity • Gemini',
      text: 'Chủ động kết hợp bộ 3 công cụ AI (Codex, Antigravity, Gemini) trong quy trình lập trình hàng ngày từ 08/2025: tăng tốc độ viết code, kiểm tra logic, tối ưu truy vấn MySQL/Redis, tự động hóa chuẩn hóa GeoJSON và xử lý dữ liệu phức tạp.',
    },
  ],
}

export const education = {
  institution: 'Viện Đại học Mở Hà Nội',
  degree: 'Kỹ sư Phần mềm / Công nghệ Thông tin',
  period: '2015 – 2019',
  text: 'Tốt nghiệp Kỹ sư Phần mềm; đạt Giải Ba Nghiên cứu Khoa học cấp Khoa (05/2019) với đề tài ứng dụng thuật toán phân cụm K-Means.',
}

export const community = {
  title: 'Câu lạc bộ Mã nguồn mở',
  role: 'Thành viên · Open Source Club',
  period: '2017 – 2019',
  text: 'Tham gia Câu lạc bộ Mã nguồn mở tại Viện Đại học Mở Hà Nội.',
}

export const philosophy = {
  title: 'Triết lý làm nghề',
  values: ['Làm chủ bài toán', 'Hiệu năng thực tế', 'Kiến trúc bền vững'],
  text: 'Đồng hành cùng sản phẩm từ dòng code đầu tiên đến khi vận hành thực tế. Đặt độ tin cậy và trải nghiệm mượt mà của người dùng làm trung tâm.',
}
