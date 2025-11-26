'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './solutions.module.css';

const solutions = [
  {
    icon: '🏢',
    title: 'Giải Pháp Doanh Nghiệp',
    description: 'Hệ thống quản lý toàn diện cho doanh nghiệp vừa và lớn',
    features: ['ERP System', 'CRM', 'HRM', 'Inventory Management'],
    link: '/contact'
  },
  {
    icon: '🛒',
    title: 'Giải Pháp E-Commerce',
    description: 'Nền tảng thương mại điện tử đa kênh, tích hợp thanh toán',
    features: ['Multi-vendor', 'Payment Gateway', 'Shipping Integration', 'Analytics'],
    link: '/contact'
  },
  {
    icon: '📚',
    title: 'Giải Pháp Giáo Dục',
    description: 'Hệ thống quản lý học tập trực tuyến (LMS)',
    features: ['Online Classes', 'Assignment Management', 'Progress Tracking', 'Certificates'],
    link: '/contact'
  },
  {
    icon: '🏥',
    title: 'Giải Pháp Y Tế',
    description: 'Hệ thống quản lý bệnh viện và phòng khám',
    features: ['Patient Management', 'Appointment Booking', 'Medical Records', 'Billing'],
    link: '/contact'
  },
  {
    icon: '🏨',
    title: 'Giải Pháp Khách Sạn',
    description: 'Hệ thống quản lý khách sạn và đặt phòng',
    features: ['Booking System', 'Room Management', 'POS Integration', 'Guest Portal'],
    link: '/contact'
  },
  {
    icon: '🍔',
    title: 'Giải Pháp Nhà Hàng',
    description: 'Hệ thống quản lý nhà hàng và giao đồ ăn',
    features: ['POS System', 'Online Ordering', 'Delivery Management', 'Kitchen Display'],
    link: '/contact'
  }
];

export default function SolutionsPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Giải Pháp Công Nghệ</h1>
            <p>Giải pháp toàn diện cho mọi ngành nghề</p>
            <p className={styles.heroDescription}>
              Chúng tôi cung cấp các giải pháp công nghệ tùy chỉnh, phù hợp với nhu cầu 
              cụ thể của từng doanh nghiệp. Từ E-commerce đến ERP, chúng tôi có giải pháp cho bạn.
            </p>
          </div>
        </section>

        <section className={styles.solutions}>
          <div className={styles.container}>
            <div className={styles.solutionGrid}>
              {solutions.map((solution, index) => (
                <div key={index} className={styles.solutionCard}>
                  <div className={styles.icon}>{solution.icon}</div>
                  <h3>{solution.title}</h3>
                  <p className={styles.description}>{solution.description}</p>
                  <ul className={styles.featureList}>
                    {solution.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <a href={solution.link} className={styles.learnMore}>
                    Tìm Hiểu Thêm →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Cần Giải Pháp Tùy Chỉnh?</h2>
            <p>Liên hệ với chúng tôi để được tư vấn giải pháp phù hợp nhất</p>
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
