/**
 * Ảnh thực tế theo ID dự án. Đường dẫn tính từ public/, không thêm dấu / đầu.
 * Thêm ảnh vào public/images/screen rồi bổ sung { src, label, alt } tại đây.
 */
export const projectScreenshots = {
  // Thêm ảnh chụp tool Template tại đây khi có file trong public/images/screen.
  experiments: [],
  qr: [
    {
      src: 'images/screen/shorlink.png',
      label: 'Shortlink · Dashboard Analytics',
      alt: 'Dashboard Bizfly Shortlink: biểu đồ lượt click, Top referrers, Top location và bảng quản trị liên kết, QR, redirect.',
    },
  ],
  ads: [
    {
      src: 'images/screen/adsdemo.png',
      label: 'AdsDemo · Preview quảng cáo',
      alt: 'AdsDemo với thanh nhập URL, nút lưu và các vị trí tạo banner trong bố cục website Kenh14.',
    },
  ],
  maps: [
    {
      src: 'images/screen/caotoc.png',
      label: 'Bản đồ 22 dự án cao tốc',
      alt: 'Bản đồ cao tốc Bắc – Nam với danh sách 22 dự án và thông tin chi tiết đoạn Hàm Nghi – Vũng Áng.',
    },
    {
      src: 'images/screen/12tuyenham.png',
      label: 'Bản đồ 12 tuyến hầm',
      alt: 'Bản đồ tương tác 12 tuyến hầm với các điểm chọn, điều hướng và thông tin chiều dài, quy mô, giá trị xây lắp.',
    },
  ],
  'landing-pages': [
    {
      src: 'images/screen/omo.png',
      label: 'OMO · Gieo triệu mầm xanh',
      alt: 'Ảnh chụp giao diện landing page chiến dịch OMO Gieo triệu mầm xanh.',
    },
    {
      src: 'images/screen/athena.png',
      label: 'Athena CM · Landing Page',
      alt: 'Landing page Athena CM với giao diện minh họa thương hiệu và khung cảnh phố Tết.',
    },
  ],
}
