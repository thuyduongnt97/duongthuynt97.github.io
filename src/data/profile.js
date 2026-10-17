// =====================================================
//  THÔNG TIN CÁ NHÂN — NGUYỄN THỊ THÙY DƯƠNG
// =====================================================
import { recognition } from './recognition.js'

export const profile = {
  name: 'Nguyễn Thị Thùy Dương',
  shortName: 'Thùy Dương',
  initial: 'D',
  title: 'Software Engineer',
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
  heroHeadline: 'Làm chủ sản phẩm web từ Web App, Core Widget đến Bản đồ số WebGIS.',
  heroHeadlineHtml: 'Làm chủ sản phẩm web từ <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-400">Web App, Core Widget</span> đến <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Bản đồ số WebGIS</span>.',

  // Đoạn giới thiệu chuẩn hóa bám sát reference-redesign
  get lead() {
    return `<strong>${this.experienceYears} năm</strong> kinh nghiệm phát triển sản phẩm web từ kiến trúc đến vận hành thực tế tại <strong>VCCorp</strong>. Chuyên sâu <strong>Vue.js, Laravel, Svelte</strong> và <strong>GSAP / WebGIS</strong> — trực tiếp xây dựng công cụ quản trị <strong>Template &amp; A/B Testing</strong>, hệ thống <strong>Dynamic QR &amp; Shortlink</strong> chịu tải cao, <strong>Core Box Feature</strong>, <strong>Landing Page chiến dịch</strong> và tối ưu dữ liệu không gian cho <strong>02 Cổng thông tin Nhà nước</strong>.`
  },

  // Badge trạng thái đầu Hero
  get heroBadge() {
    return `${this.title} • ${this.location}`
  },

  ecosystemsLabel: 'Nền tảng & Hệ sinh thái đã triển khai sản phẩm:',

  // 2 nút CTA trong Hero (đúng nhãn bản mẫu)
  heroCtas: [
    { id: 'cta-skills', label: 'Xem Số năm từng Kỹ năng & Mục làm được ↓', href: '#skill-matrix', variant: 'primary' },
    { id: 'cta-deliverables', label: 'Xem Dự án & Link mẫu thực tế ↗', href: '#deliverables', variant: 'secondary' },
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
      { label: '▸ Web App & Core Widget:', value: 'Vue 2/3 • Svelte • Laravel', color: 'emerald' },
      { label: '▸ Bản đồ số & Dữ liệu:', value: 'QGIS • Leaflet • MapSVG.js', color: 'cyan' },
      { label: '▸ Interactive & Chuyển động:', value: 'GSAP • ScrollTrigger • Draggable', color: 'amber' },
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
        label: 'Kinh nghiệm thực chiến (Từ 2018)',
        color: 'amber',
      },
      {
        to: recognition.professional.years.length,
        suffix: ' Năm',
        value: `${recognition.professional.years.length} Năm`,
        label: "Nhân viên Xuất sắc ('22, '23, '25)",
        color: 'emerald',
      },
      {
        to: 10,
        suffix: 'K+',
        value: '~10K+',
        label: 'Clicks / link / ngày (Shortlink)',
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
    { icon: 'code', text: 'Vue.js · Svelte Core Widget' },
    { icon: 'map', text: 'WebGIS · Leaflet · QGIS' },
    { icon: 'layers', text: 'Laravel · Dynamic QR & Shortlink' },
    { icon: 'sparkle', text: 'GSAP · Campaign Landing Page' },
  ],
}

// Metadata SEO
export const seo = {
  get title() {
    return `${profile.name} — ${profile.title} | Portfolio`
  },
  get description() {
    return `${profile.name} — ${profile.title}, 7 năm kinh nghiệm phát triển sản phẩm web thực chiến tại VCCorp: Vue.js, Svelte Core Widget, WebGIS Leaflet, Fullstack Laravel và GSAP Motion. 3 năm Nhân viên Xuất sắc (2022, 2023, 2025).`
  },
  get socialTitle() {
    return `${profile.name} — ${profile.title}`
  },
  get socialDescription() {
    return `Portfolio của ${profile.name} — ${profile.title}. 7 năm kinh nghiệm thực chiến với Web App, Core Box Widget, WebGIS Leaflet và hệ sinh thái AdTech.`
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
    'AI Agent Workflow',
  ],
}

// Menu điều hướng tinh gọn 1 dòng
export const navLinks = [
  { id: 'recognition', label: 'Ghi nhận', href: '#recognition' },
  { id: 'skills', label: 'Kỹ năng', href: '#skill-matrix' },
  { id: 'deliverables', label: 'Dự án', href: '#deliverables' },
  { id: 'timeline', label: 'Kinh nghiệm', href: '#timeline' },
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
  'AI Agent Workflow',
]

export const about = {
  paragraphs: [
    `Mình là <strong>${profile.name}</strong> (${profile.title}) với <strong>${profile.experienceYears} năm kinh nghiệm thực chiến</strong>, phát triển và làm chủ sản phẩm web bằng <strong>Vue.js, Svelte, GSAP và Laravel</strong> tại <strong>VCCorp</strong>.`,
    'Bắt đầu từ môi trường <strong>nghiên cứu khoa học và chuyển giao công nghệ tại Viện Đại học Mở Hà Nội</strong> (Giải Ba NCKH 05/2019 về phân tích & phân cụm dữ liệu), mình xây dựng nền tảng tư duy toán học và kỹ thuật vững chắc qua các hệ thống tuyển sinh và quản lý đào tạo.',
    'Trong công việc, mình tham gia từ thiết kế kiến trúc, triển khai giao diện đến tích hợp API và vận hành backend. Các đầu việc chính gồm <strong>Tool quản trị Template &amp; A/B Testing, Core Box Feature, WebGIS cho 02 Cổng thông tin Nhà nước, Dynamic QR/Shortlink và Landing Page chiến dịch</strong>; đồng thời thực hiện định kỳ một số bài <strong>Emagazine chuyên đề trên CafeF</strong>.',
  ],
  pills: [
    { icon: 'pin', text: profile.location },
    { icon: 'briefcase', text: `${profile.since} – Hiện tại (7 Năm KN)` },
    { icon: 'award', text: "3 Năm NV Xuất sắc ('22, '23, '25)" },
  ],
  facts: [
    {
      icon: 'layers',
      title: 'Làm chủ bài toán từ kiến trúc đến vận hành',
      text: 'Trực tiếp phân tích yêu cầu, thiết kế kiến trúc component, tích hợp API dữ liệu lớn và tối ưu vận hành thực tế.',
    },
    {
      icon: 'zap',
      title: 'Hiệu năng cao & Trực quan dữ liệu mượt mà',
      text: 'Tiền xử lý và làm sạch GeoJSON bằng QGIS, kết hợp Marker Clustering và GSAP mang lại trải nghiệm 60 FPS mượt mà trên di động.',
    },
    {
      icon: 'sparkle',
      title: 'Quy trình hiện đại tích hợp AI Agent',
      text: 'Chủ động ứng dụng AI Agent vào quy trình phát triển sản phẩm từ 08/2025, gia tăng tốc độ triển khai và chất lượng mã nguồn.',
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
