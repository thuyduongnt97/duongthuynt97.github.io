// =====================================================
//  GHI NHẬN & GIẢI THƯỞNG (3 THẺ BENTO ĐIỂM NHẤN)
// =====================================================

/** @typedef {import('../types/portfolio.js').RecognitionItem} RecognitionItem */

export const recognition = {
  // 3 Thẻ điểm nhấn chính bám sát reference-redesign
  /** @type {RecognitionItem[]} */
  items: [
    {
      id: 'ai-workflow',
      icon: 'sparkle',
      emoji: '⚡',
      badge: 'Modern Workflow • Từ 08/2025',
      title: 'Ứng dụng AI Agent vào phát triển sản phẩm',
      description: 'Chủ động kết hợp AI Agent khi triển khai module bản đồ số, viết Core Box Feature, tích hợp Camera nhận diện và dựng Landing Page.',
      color: 'emerald',
      accentColor: 'emerald',
      period: '08/2025 – Nay',
    },
    {
      id: 'professional',
      icon: 'award',
      emoji: '🏆',
      badge: 'Ghi nhận tại VCCorp',
      title: '3 Năm Nhân viên Xuất sắc (2022, 2023, 2025)',
      description: 'Ghi nhận năng lực kỹ thuật, tinh thần trách nhiệm và đóng góp hiệu quả vào các sản phẩm trọng điểm của công ty.',
      color: 'amber',
      accentColor: 'amber',
      years: [2022, 2023, 2025],
    },
    {
      id: 'research',
      icon: 'cap',
      emoji: '🔬',
      badge: 'Viện ĐH Mở Hà Nội • 05/2019',
      title: 'Giải Ba Nghiên cứu Khoa học',
      description: 'Đề tài: "Tìm hiểu phần mềm R và ứng dụng thuật toán phân cụm K-Means" — nền tảng tư duy phân tích và phân cụm dữ liệu.',
      color: 'cyan',
      accentColor: 'cyan',
      period: '05/2019',
      institution: 'Viện Đại học Mở Hà Nội',
    },
  ],

  // Thuộc tính tương thích ngược cho profile.js và RecognitionSection hiện tại
  get professional() {
    const item = this.items.find(i => i.id === 'professional') || this.items[1]
    return { ...item, label: item.badge, values: ['Năng lực kỹ thuật', 'Tinh thần trách nhiệm', 'Đóng góp sản phẩm'] }
  },
  get research() {
    const item = this.items.find(i => i.id === 'research') || this.items[2]
    return {
      ...item,
      label: item.badge,
      topic: 'Tìm hiểu phần mềm R và ứng dụng thuật toán phân cụm K-Means',
      tech: ['R', 'K-Means', 'Phân tích dữ liệu'],
    }
  },
  get aiWorkflow() {
    const item = this.items.find(i => i.id === 'ai-workflow') || this.items[0]
    return { ...item, label: item.badge }
  },
}
