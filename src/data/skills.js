// =====================================================
//  KỸ NĂNG & ĐẦU VIỆC (DUAL-VIEW: 4 BENTO PILLARS & DETAILED TABLE)
//  Nội dung và số năm theo #skill-matrix trong reference-redesign.html.
//  Giữ các nhãn Tiền xử lý / Realtime ở subMetrics như bản mẫu,
//  không tự quy đổi chúng thành số năm kinh nghiệm chưa được xác nhận.
//  Các trường `deliverables` chứa HTML tĩnh (<strong>, <em>, <code>) do mình
//  soạn sẵn — component render bằng v-html, KHÔNG nhận dữ liệu người dùng.
// =====================================================

/** @typedef {import('../types/portfolio.js').SkillPillar} SkillPillar */
/** @typedef {import('../types/portfolio.js').SkillDetailedItem} SkillDetailedItem */

/** Tiêu đề section + nhãn 2 tab chuyển chế độ xem */
export const skillsSection = {
  eyebrow: '01 / Ma trận Kỹ năng & Đầu việc',
  title: 'Số năm kinh nghiệm từng Kỹ năng & Các mục làm được',
  subtitleHtml:
    'Bấm vào từng khối để lọc dự án bên dưới, hoặc chuyển sang <strong>Bảng chi tiết từng công nghệ</strong>.',
  deliverablesLabel: 'Các mục làm được:',
  views: [
    { id: 'bento', label: '1. Xem theo 4 Nhóm Năng Lực (Bento)' },
    { id: 'table', label: '2. Bảng chi tiết Từng Kỹ Năng & Số Năm' },
  ],
  tableHeaders: ['Kỹ năng & Công nghệ', 'Số năm KN', 'Trục thời gian', 'Hạng mục thực tế làm được (Deliverables)'],
}

/**
 * 4 Khối Bento năng lực chính (Pillars) — đúng thứ tự bản mẫu.
 * @type {SkillPillar[]}
 */
export const pillars = [
  {
    id: 'webapp',
    filterCategory: 'webapp',
    categoryTitle: 'Frontend Frameworks & Modular Engine',
    title: 'Vue.js, Svelte Core Box & Quản trị A/B Testing',
    yearsBadge: '5.5+ Năm',
    period: '2020 – Nay',
    icon: 'code',
    accentColor: 'emerald',
    subMetrics: [
      { label: 'Vue 2/3 & Nuxt', value: '5.5+ năm' },
      { label: 'Widget / Core Box', value: '3+ năm' },
      { label: 'Svelte / TS / Vite', value: '2+ năm' },
    ],
    deliverables: [
      'Làm Frontend cho <strong>Tool quản lý Template &amp; dựng Box Widget</strong> mang đi cắm lên site; quản trị kịch bản thử nghiệm <strong>A/B Testing</strong> và báo cáo số liệu Recommendation từ <strong>BigData</strong>.',
      'Viết core và cắt các khối <strong>Core Box Feature / Banner PR</strong> hỗ trợ 2 chế độ: <strong>Box Sticky neo màn hình</strong> và <strong>Box Inline nhúng giữa bài</strong> (triển khai trên Kenh14, Soha...).',
      'Nhận bàn giao, tái cấu trúc (Refactor) và maintain hệ thống Microsite &amp; công cụ nghiệp vụ.',
    ],
    chips: ['Vue.js (Vue 2 / Vue 3)', 'Svelte', 'TypeScript', 'Pinia / Vuex', 'Embeddable Widget'],
  },
  {
    id: 'webgis',
    filterCategory: 'webgis',
    categoryTitle: 'WebGIS & Spatial Data Visualization',
    title: 'Bản đồ số Cổng thông tin, QGIS & Bản đồ SVG',
    yearsBadge: '4+ Năm',
    period: '2021 – Nay',
    icon: 'map',
    accentColor: 'cyan',
    subMetrics: [
      { label: 'MapSVG / Vector', value: 'Từ 2021' },
      { label: 'QGIS / GeoJSON', value: 'Tiền xử lý' },
      { label: 'Leaflet / Cluster', value: '60 FPS Mobile' },
    ],
    deliverables: [
      'Triển khai module bản đồ số cho <strong>02 Cổng thông tin Nhà nước (Cảnh báo thiên tai - lũ lụt &amp; An toàn thực phẩm)</strong>.',
      'Dùng <strong>QGIS</strong> tiền xử lý, giản lược hình học (<em>Geometry Simplification</em>) và làm sạch dữ liệu <strong>GeoJSON</strong> giảm mạnh dung lượng tải; áp dụng <strong>Marker Clustering</strong> hiển thị mượt hàng nghìn điểm tọa độ.',
      'Xây dựng 02 trang bản đồ tương tác cho <strong>Báo Giao Thông</strong> (Tuyến cao tốc &amp; Hầm đi bộ) bằng <strong>MapSVG.js, TweenMax, Draggable</strong>.',
    ],
    chips: ['QGIS', 'Leaflet.js', 'GeoJSON Simplification', 'Marker Clustering', 'MapSVG.js'],
  },
  {
    id: 'adtech',
    filterCategory: 'adtech',
    categoryTitle: 'Fullstack & AdTech Systems',
    title: 'PHP Laravel, Dynamic QR/Shortlink & Bảo trì AdTech',
    yearsBadge: '7+ Năm',
    period: '2018 – Nay',
    icon: 'server',
    accentColor: 'purple',
    subMetrics: [
      { label: 'PHP / CodeIgniter', value: 'Từ 2018' },
      { label: 'Laravel / MySQL', value: '6+ năm' },
      { label: 'AdTech & Redis', value: '5+ năm' },
    ],
    deliverables: [
      'Xây dựng hệ thống <strong>Dynamic QR &amp; Shortlink (short.bizfly.vn)</strong> với Laravel, Vue, MySQL, Redis: đổi URL đích không cần in lại mã QR, chịu tải <strong>~10.000 clicks/link/ngày</strong>.',
      'Triển khai công cụ <strong>Ads Demo Simulator (adsdemo.admicro.vn)</strong> tạo preview quảng cáo trong ngữ cảnh web PC/Mobile.',
      'Maintain, vá lỗi bảo mật (<strong>Security Bug Fixes</strong>) cho <strong>AdServing, TagManager, Adsponsor</strong>; phát triển hệ thống Quản lý Tuyển sinh &amp; Đào tạo (ĐH Mở HN).',
    ],
    chips: ['PHP Laravel', 'CodeIgniter', 'MySQL / Redis Cache', 'AdServing / TagManager', 'Security Patching'],
  },
  {
    id: 'motion',
    filterCategory: 'motion',
    categoryTitle: 'UI/UX Engineering & Interactive Motion',
    title: 'Landing Page Chiến dịch, GSAP Motion & Interactive UI',
    yearsBadge: '7+ Năm',
    period: '2019 – Nay',
    icon: 'zap',
    accentColor: 'amber',
    subMetrics: [
      { label: 'HTML5/CSS3/JS', value: '7+ năm' },
      { label: 'GSAP/ScrollTrigger', value: '4.5+ năm' },
      { label: 'Canvas / Face API', value: 'Realtime' },
    ],
    deliverables: [
      'Nhận bàn giao mảng Landing Page: maintain các dự án cũ, lên báo giá và triển khai các trang chiến dịch mới sử dụng <strong>GSAP ScrollTrigger</strong> (tiêu biểu: <em>OMO, Athena...</em>).',
      'Thực hiện định kỳ một số bài <strong>Emagazine chuyên đề (Bất động sản, Thiết bị công nghệ)</strong> đăng trên báo <strong>CafeF</strong> và site nội bộ (từ 2022 – nay).',
      'Kết nối luồng <strong>Camera với API nhận diện khuôn mặt</strong> hiển thị vinh danh sự kiện và làm <strong>Minigame Vòng quay may mắn</strong> trên Canvas.',
    ],
    chips: ['HTML5 / CSS3 / SCSS', 'Tailwind CSS', 'GSAP / ScrollTrigger', 'TweenMax / Draggable', 'Canvas / Face API'],
  },
]

/**
 * Bảng chi tiết từng nhóm kỹ năng (#skill-view-table), đúng thứ tự & phần trăm bản mẫu.
 * @type {SkillDetailedItem[]}
 */
export const detailedTable = [
  {
    id: 'core-frontend',
    skill: 'HTML5, CSS3/SCSS, JS (ES6+), jQuery, Tailwind CSS',
    years: '7+ Năm',
    timeline: '2018 ────────● Nay',
    percent: 96,
    color: 'amber',
    deliverables:
      'Cắt giao diện chuẩn thiết kế (PC/Mobile), tối ưu Core Web Vitals, maintain &amp; tái cấu trúc hệ thống Microsite, triển khai Campaign Landing Page và một số bài Emagazine trên CafeF.',
  },
  {
    id: 'fullstack-php',
    skill: 'PHP (Laravel, CodeIgniter), MySQL, Redis, REST API',
    years: '7+ Năm',
    timeline: '2018 ────────● Nay',
    percent: 94,
    color: 'purple',
    deliverables:
      'Xây dựng hệ thống Dynamic QR &amp; Shortlink (<code>short.bizfly.vn</code>), công cụ Ads Demo Simulator, phần mềm Tuyển sinh &amp; Đào tạo (ĐH Mở HN).',
  },
  {
    id: 'vue-ecosystem',
    skill: 'Vue.js (Vue 2 / Vue 3), Nuxt.js, Pinia/Vuex, Vite',
    years: '5.5+ Năm',
    timeline: '2020 ──────● Nay',
    percent: 82,
    color: 'emerald',
    deliverables:
      'Làm Frontend cho tool quản lý Template, dựng Box Widget nhúng đa nền tảng, giao diện cấu hình thuật toán Recommendation &amp; báo cáo A/B Testing từ BigData.',
  },
  {
    id: 'adtech-ops',
    skill: 'AdTech Operations & Security (AdServing, TagManager)',
    years: '5+ Năm',
    timeline: '2019 ──────● Nay',
    percent: 78,
    color: 'purple',
    deliverables:
      'Vận hành tool khai thác vị trí quảng cáo (2019–2020); maintain định kỳ và vá lỗi bảo mật (Security Bug Fixes) cho AdServing, TagManager, Adsponsor.',
  },
  {
    id: 'motion-gsap',
    skill: 'GSAP, ScrollTrigger, TweenMax, Draggable',
    years: '4.5+ Năm',
    timeline: '2021 ─────● Nay',
    percent: 72,
    color: 'amber',
    deliverables:
      'Làm hiệu ứng tương tác cuộn trang cho các Landing Page chiến dịch (OMO, Athena...), bản đồ Báo Giao Thông và các bài Emagazine chuyên đề BĐS / Công nghệ trên CafeF.',
  },
  {
    id: 'webgis-spatial',
    skill: 'WebGIS: QGIS, Leaflet.js, GeoJSON, Clustering, MapSVG',
    years: '4+ Năm',
    timeline: '2021 ─────● Nay',
    percent: 68,
    color: 'cyan',
    deliverables:
      'Dùng QGIS giản lược hình học &amp; làm sạch GeoJSON; áp dụng Marker Clustering cho 02 Cổng thông tin Nhà nước (Thiên tai &amp; ATTP); làm bản đồ tương tác Báo Giao Thông.',
  },
  {
    id: 'svelte-ai',
    skill: 'Svelte, TypeScript, Core Box Engine & AI Agent Workflow',
    years: '2+ Năm',
    timeline: '2024 ───● Nay',
    percent: 42,
    color: 'emerald',
    deliverables:
      'Viết kiến trúc Core Box Feature (Sticky Box &amp; In-article Inline Box) chạy trên Kenh14, Soha; ứng dụng AI Agent tăng tốc độ sản xuất từ 08/2025.',
  },
]

// Alias mảng cho các nơi dùng tên cũ; hai chế độ dùng named exports ở trên.
// Không gắn pillars vào chính nó vì sẽ tạo dữ liệu vòng khi serialize.
export const skills = pillars
