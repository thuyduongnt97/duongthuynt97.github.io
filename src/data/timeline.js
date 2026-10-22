/**
 * =====================================================
 *  LỘ TRÌNH SỰ NGHIỆP & HỌC VẤN (2015 – HIỆN TẠI)
 *  Nhóm theo tổ chức; các giai đoạn dự án nằm trong mốc VCCorp.
 *  bulletPoints chứa HTML tĩnh (<strong>) — render bằng v-html.
 * =====================================================
 */

/** @typedef {import('../types/portfolio.js').TimelineMilestone} TimelineMilestone */
/** @typedef {import('../types/portfolio.js').TimelineGroup} TimelineGroup */

export const timelineSection = {
  eyebrow: '03 / Lộ trình sự nghiệp',
  title: 'Quá trình làm việc & Học vấn (2015 – Hiện tại)',
}

/** @type {TimelineMilestone[]} */
export const careerMilestones = [
  {
    id: 'vccorp-senior-frontend',
    period: '08/2025 – Hiện tại',
    // pill = nhãn nền đặc (mốc hiện tại); text = chữ màu đơn giản
    periodStyle: 'pill',
    color: 'amber',
    role: 'Core Box Feature, WebGIS & Landing Page',
    company: 'Công ty Cổ phần VCCorp',
    location: 'Hà Nội',
    isCurrent: true,
    award: 'Nhân viên Xuất sắc 2025',
    badges: [{ label: '🏆 Nhân viên Xuất sắc 2025', color: 'emerald' }],
    bulletPoints: [
      'Chủ trì tối ưu dữ liệu không gian <strong>Module Bản đồ số 02 Cổng thông tin</strong> (Cảnh báo thiên tai - lũ lụt; An toàn thực phẩm): dùng <strong>QGIS</strong> giản lược hình học &amp; làm sạch GeoJSON; áp dụng <strong>Marker Clustering</strong> render mượt hàng nghìn điểm tọa độ ở <strong>60 FPS</strong> trên di động.',
      'Thiết kế kiến trúc <strong>Core Box Feature bằng Svelte/Vue.js</strong>, triển khai Sticky &amp; Inline Box trên Kenh14, Soha với cơ chế nhúng độc lập, cô lập CSS/JS và kiểm soát CLS; phát triển, bảo trì Landing Page/Microsite (tiêu biểu: <strong>OMO, Athena...</strong>) với GSAP ScrollTrigger.',
      'Kết nối Camera &amp; API nhận diện khuôn mặt cho sự kiện vinh danh; kết hợp bộ 3 công cụ AI (<strong class="text-cyan-400 font-bold">Codex, Antigravity, Gemini</strong>) từ 08/2025 vào quy trình phát triển: hỗ trợ phân tích &amp; refactor code Fullstack (<strong class="text-cyan-400 font-bold">Laravel/Vue.js</strong>), tối ưu truy vấn MySQL/Redis, chuẩn hóa GeoJSON và dựng nhanh component Core Widget.',
    ],
    summary:
      'Triển khai WebGIS cho 02 Cổng thông tin Nhà nước; thiết kế Core Box Feature (Svelte/Vue.js, Sticky & Inline) trên Kenh14, Soha; phát triển Landing Page (OMO, Athena) và ứng dụng bộ 3 AI (Codex, Antigravity, Gemini) vào quy trình làm việc.',
    icon: 'sparkle',
  },
  {
    id: 'vccorp-frontend-abtesting',
    period: 'Năm 2024',
    periodStyle: 'text',
    color: 'emerald',
    role: 'Quản lý Template, Box Widget & A/B Testing',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    badges: [],
    bulletPoints: [
      'Xây dựng hệ thống quản lý Template bằng <strong class="text-cyan-400 font-bold">Laravel/Vue.js</strong> và kiến trúc <strong class="text-white font-bold">Box Widget độc lập</strong> để nhúng lên hệ thống báo điện tử.',
      'Phát triển giao diện cấu hình kịch bản thử nghiệm cho các box Recommendation; tích hợp <strong>REST API từ BigData</strong> để hiển thị báo cáo đối chiếu <strong>A/B Testing</strong> và theo dõi hiệu quả.',
    ],
    summary:
      'Xây dựng hệ thống quản lý Template (Laravel/Vue.js), Box Widget nhúng độc lập và giao diện cấu hình thử nghiệm; tích hợp REST API từ BigData để đối chiếu A/B Testing cho các box Recommendation.',
    icon: 'layers',
  },
  {
    id: 'vccorp-adtech-interactive',
    period: '2021 – 2023',
    periodStyle: 'text',
    color: 'purple',
    role: 'Dynamic QR / Shortlink, AdsDemo & Interactive Media',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    award: 'Nhân viên Xuất sắc 2022 & 2023',
    badges: [{ label: '🏆 Nhân viên Xuất sắc 2022 & 2023', color: 'amber' }],
    bulletPoints: [
      'Phát triển Fullstack <strong class="text-white font-bold">Dynamic QR &amp; Shortlink (short.bizfly.vn)</strong> từ CSDL MySQL, <strong class="text-cyan-400 font-bold">Laravel</strong> và <strong class="text-amber-400 font-bold">Redis Cache</strong> đến dashboard <strong class="text-cyan-400 font-bold">Vue.js</strong>; tối ưu chuyển hướng <strong class="text-amber-400 font-bold">~10.000 clicks/link/ngày</strong>, <strong class="text-amber-400 font-bold">hơn 2 triệu clicks</strong> tổng cộng. Tích hợp REST API từ hệ thống Log để hiển thị analytics theo location, device, referer; cho phép đổi URL đích mà không cần in lại ấn phẩm.',
      'Phát triển <strong>AdsDemo</strong> xem trước, chia sẻ quảng cáo trong ngữ cảnh web PC/Mobile qua Shortlink/QR; bảo trì, tối ưu truy vấn và vá lỗi bảo mật cho <strong>AdServing, TagManager, Adsponsor</strong>.',
      'Xây dựng 02 trang tương tác bản đồ cho <strong>Báo Giao Thông</strong> (Tuyến cao tốc &amp; Hầm đường bộ) bằng <strong>MapSVG.js, TweenMax, Draggable</strong>; phát triển các bài <strong>Emagazine chuyên đề (BĐS, Công nghệ) trên báo CafeF</strong>.',
    ],
    summary:
      'Làm chủ Dynamic QR/Shortlink từ kiến trúc đến vận hành: ~10.000 clicks/link/ngày, hơn 2 triệu clicks tổng cộng; Redis tối ưu redirect, REST API analytics và đổi URL không cần in lại ấn phẩm. Phát triển AdsDemo, bản đồ tương tác Báo Giao Thông, Emagazine CafeF; bảo trì AdServing, TagManager và Adsponsor.',
    icon: 'briefcase',
  },
  {
    id: 'vccorp-ad-operations',
    period: '2019 – 2020',
    periodStyle: 'text',
    color: 'slate',
    role: 'Vận hành Công cụ Quản lý & Khai thác Vị trí Quảng cáo',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    // Mốc phụ: tiêu đề nhỏ hơn (text-lg) như bản mẫu
    compact: true,
    badges: [],
    bulletPoints: [
      'Vận hành tool quản lý, phân vùng khai thác vị trí quảng cáo và duyệt hiển thị banner.',
    ],
    summary:
      'Vận hành công cụ quản lý, phân vùng khai thác vị trí quảng cáo và duyệt hiển thị banner trên hệ thống website.',
    icon: 'play',
  },
  {
    id: 'hou-software-engineer',
    period: '2015 – 2019',
    periodStyle: 'text',
    color: 'cyan',
    role: 'Kỹ sư Phần mềm & Lập trình viên PHP',
    company: 'Viện Đại học Mở Hà Nội',
    location: 'Hà Nội',
    isCurrent: false,
    award: 'Giải Ba NCKH (05/2019)',
    badges: [{ label: '🔬 Giải Ba NCKH (05/2019)', color: 'cyan' }],
    bulletPoints: [
      'Tốt nghiệp Kỹ sư Phần mềm; tham gia <strong>Câu lạc bộ Mã nguồn mở</strong> và <strong>Tổ phát triển &amp; chuyển giao công nghệ</strong>, xây dựng hệ thống Quản lý Tuyển sinh &amp; Đào tạo bằng <strong>PHP CodeIgniter, Laravel</strong>.',
    ],
    summary:
      'Tốt nghiệp Kỹ sư Phần mềm; đạt Giải Ba NCKH (05/2019) với đề tài phần mềm R và thuật toán phân cụm K-Means; tham gia CLB Mã nguồn mở và Tổ chuyển giao công nghệ, xây dựng phần mềm Quản lý Tuyển sinh & Đào tạo bằng PHP (CodeIgniter, Laravel).',
    icon: 'cap',
  },
]

/** @type {TimelineGroup[]} */
export const careerTimeline = [
  {
    id: 'vccorp',
    period: '2019 – Hiện tại',
    periodStyle: 'pill',
    color: 'amber',
    role: 'Fullstack Software Engineer',
    company: 'Công ty Cổ phần VCCorp',
    location: 'Hà Nội',
    isCurrent: true,
    tenure: '7 năm gắn bó và phát triển sản phẩm',
    badges: [],
    bulletPoints: [],
    summary: 'Phát triển sản phẩm end-to-end với Vue.js/Svelte, PHP/Laravel, MySQL và Redis Cache; mở rộng từ nền tảng AdTech đến Web App, Core Widget và WebGIS.',
    icon: 'briefcase',
    milestones: careerMilestones.filter((item) => item.id.startsWith('vccorp-')),
  },
  {
    ...careerMilestones.find((item) => item.id === 'hou-software-engineer'),
    milestones: [],
  },
]
