'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './process.module.css';

const processSteps = [
  {
    step: 1,
    title: 'Tư Vấn & Lên Kế Hoạch',
    description: 'Gặp gỡ, trao đổi ý tưởng và xác định mục tiêu dự án',
    details: [
      'Phân tích nhu cầu khách hàng',
      'Nghiên cứu thị trường và đối thủ',
      'Đề xuất giải pháp phù hợp',
      'Lập kế hoạch chi tiết và timeline'
    ],
    duration: '1-2 tuần',
    icon: '💡'
  },
  {
    step: 2,
    title: 'Thiết Kế & Prototype',
    description: 'Tạo wireframe, mockup và prototype tương tác',
    details: [
      'Thiết kế UX/UI',
      'Tạo wireframe và mockup',
      'Xây dựng prototype',
      'Review và điều chỉnh'
    ],
    duration: '2-3 tuần',
    icon: '🎨'
  },
  {
    step: 3,
    title: 'Phát Triển',
    description: 'Lập trình và xây dựng hệ thống theo thiết kế',
    details: [
      'Setup môi trường phát triển',
      'Lập trình Frontend & Backend',
      'Tích hợp API và dịch vụ',
      'Code review liên tục'
    ],
    duration: '4-8 tuần',
    icon: '⚙️'
  },
  {
    step: 4,
    title: 'Kiểm Thử',
    description: 'Test toàn diện trên nhiều thiết bị và trình duyệt',
    details: [
      'Unit testing',
      'Integration testing',
      'User acceptance testing',
      'Performance testing'
    ],
    duration: '1-2 tuần',
    icon: '🔍'
  },
  {
    step: 5,
    title: 'Triển Khai',
    description: 'Deploy lên server và cấu hình production',
    details: [
      'Setup server và domain',
      'Deploy application',
      'Cấu hình SSL và bảo mật',
      'Monitoring và logging'
    ],
    duration: '3-5 ngày',
    icon: '🚀'
  },
  {
    step: 6,
    title: 'Bảo Trì & Hỗ Trợ',
    description: 'Hỗ trợ và bảo trì sau khi ra mắt',
    details: [
      'Giám sát hệ thống 24/7',
      'Sửa lỗi và cập nhật',
      'Đào tạo sử dụng',
      'Tối ưu hiệu suất'
    ],
    duration: 'Liên tục',
    icon: '🛠️'
  }
];

export default function WorkingProcessPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Quy Trình Làm Việc</h1>
          <p>Quy trình chuyên nghiệp, minh bạch từng bước</p>
        </section>

        <section className={styles.process}>
          <div className={styles.container}>
            <div className={styles.timeline}>
              {processSteps.map((step, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>{step.icon}</div>
                  <div className={styles.timelineContent}>
                    <div className={styles.stepNumber}>Bước {step.step}</div>
                    <h3>{step.title}</h3>
                    <p className={styles.description}>{step.description}</p>
                    <ul className={styles.detailList}>
                      {step.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                    <div className={styles.duration}>
                      <span>⏱️ Thời gian: {step.duration}</span>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className={styles.connector}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Sẵn Sàng Bắt Đầu Dự Án?</h2>
            <p>Liên hệ với chúng tôi để được tư vấn chi tiết về quy trình</p>
            <a href="/contact" className={styles.ctaButton}>
              Liên Hệ Ngay
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
