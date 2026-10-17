/**
 * =====================================================
 *  LỘ TRÌNH SỰ NGHIỆP & HỌC VẤN (2015 – HIỆN TẠI)
 *  5 mốc bám 1:1 #timeline trong reference-redesign.html.
 *  `bulletPoints` chứa HTML tĩnh (<strong>) — render bằng v-html.
 * =====================================================
 */

import { profile } from './profile.js'

/** @typedef {import('../types/portfolio.js').TimelineMilestone} TimelineMilestone */

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
    role: profile.title,
    company: 'Công ty Cổ phần VCCorp',
    location: 'Hà Nội',
    isCurrent: true,
    award: 'Nhân viên Xuất sắc 2025',
    note: '[01/2025 – 08/2025: Nghỉ sinh em bé]',
    badges: [
      { label: '🏆 Nhân viên Xuất sắc 2025', color: 'emerald' },
      { label: '[01/2025 – 08/2025: Nghỉ sinh em bé]', color: 'slate' },
    ],
    bulletPoints: [
      'Triển khai <strong>Module Bản đồ số cho 02 Cổng thông tin</strong> (Cảnh báo thiên tai - lũ lụt; An toàn thực phẩm): dùng <strong>QGIS</strong> tiền xử lý, giản lược hình học &amp; làm sạch GeoJSON; áp dụng <strong>Marker Clustering</strong> hiển thị mượt hàng nghìn điểm tọa độ trên di động.',
      'Nhận bàn giao phần công việc của đội Landing Page/Microsite, maintain các dự án cũ, làm các dự án mới (tiêu biểu: <strong>OMO, Athena...</strong>) với GSAP ScrollTrigger; cắt các <strong>box core (Sticky &amp; Inline)</strong> chạy dự án feature trên Kenh14, Soha.',
      'Kết nối Camera &amp; API nhận diện khuôn mặt cho sự kiện vinh danh; ứng dụng <strong>AI Agent</strong> vào quy trình làm việc.',
    ],
    summary:
      'Triển khai Module Bản đồ số cho 02 Cổng thông tin Nhà nước; tiếp nhận & phát triển Landing Page (OMO, Athena); cắt Core Box Feature (Sticky & Inline) trên Kenh14, Soha và ứng dụng AI Agent vào quy trình làm việc.',
    icon: 'sparkle',
  },
  {
    id: 'vccorp-frontend-abtesting',
    period: 'Năm 2024',
    periodStyle: 'text',
    color: 'emerald',
    role: 'Frontend Developer (Template, Widget & A/B Testing)',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    badges: [],
    bulletPoints: [
      'Làm Frontend (<strong>Laravel, Vue.js</strong>) cho tool quản lý Template và dựng các <strong>Box Widget</strong> mang đi cắm lên hệ thống site.',
      'Xây dựng giao diện quản lý các thử nghiệm (Experiments) và theo dõi số liệu <strong>A/B Testing</strong> của các box Recommendation từ dữ liệu BigData.',
    ],
    summary:
      'Làm Frontend cho tool quản lý Template, dựng các Box Widget mang đi cắm lên hệ thống site; xây dựng giao diện thử nghiệm và theo dõi số liệu A/B Testing của các box Recommendation từ dữ liệu BigData.',
    icon: 'layers',
  },
  {
    id: 'vccorp-adtech-interactive',
    period: '2021 – 2023',
    periodStyle: 'text',
    color: 'purple',
    role: 'Web Developer (AdTech Tools & Interactive Media)',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    award: 'Nhân viên Xuất sắc 2022 & 2023',
    badges: [{ label: '🏆 Nhân viên Xuất sắc 2022 & 2023', color: 'amber' }],
    bulletPoints: [
      'Xây dựng công cụ quản trị <strong>Dynamic QR &amp; Shortlink (short.bizfly.vn)</strong>, thiết kế MySQL, đồng bộ dữ liệu link lên Redis phục vụ luồng chuyển hướng (~10.000 clicks/link/ngày) và tích hợp API Log hiển thị thống kê (location, device, referer); triển khai <strong>Tool AdsDemo (adsdemo.admicro.vn)</strong>.',
      'Maintain và vá lỗi bảo mật (Security Bug Fixes) cho các dự án <strong>AdServing</strong> và <strong>TagManager</strong>.',
      'Xây dựng 02 trang tương tác bản đồ cho <strong>Báo Giao Thông</strong> (Tuyến cao tốc &amp; Hầm đi bộ) bằng <strong>MapSVG.js, TweenMax, Draggable</strong>; tham gia cắt một số bài <strong>Emagazine chuyên đề (BĐS, Công nghệ) trên báo CafeF</strong>.',
    ],
    summary:
      'Xây dựng công cụ quản trị Dynamic QR & Shortlink (short.bizfly.vn), thiết kế MySQL, đồng bộ dữ liệu link lên Redis phục vụ luồng chuyển hướng (~10.000 clicks/link/ngày) và tích hợp API Log hiển thị thống kê (location, device, referer); triển khai Tool AdsDemo; maintain & vá lỗi bảo mật AdServing, TagManager; làm bản đồ tương tác Báo Giao Thông và Emagazine CafeF.',
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
