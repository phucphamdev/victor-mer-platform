'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './resources.module.css';

const resources = [
  {
    icon: '📖',
    title: 'E-books & Guides',
    description: 'Tài liệu hướng dẫn chi tiết về Digital Marketing',
    items: ['SEO Guide 2024', 'Google Ads Handbook', 'Social Media Strategy'],
    link: '#'
  },
  {
    icon: '🎥',
    title: 'Video Tutorials',
    description: 'Video hướng dẫn từng bước cho người mới bắt đầu',
    items: ['Website Design Basics', 'SEO Fundamentals', 'Content Marketing'],
    link: '#'
  },
  {
    icon: '📊',
    title: 'Templates & Tools',
    description: 'Mẫu và công cụ hỗ trợ công việc hàng ngày',
    items: ['Content Calendar', 'SEO Checklist', 'Analytics Dashboard'],
    link: '#'
  },
  {
    icon: '💡',
    title: 'Case Studies',
    description: 'Nghiên cứu điển hình từ các dự án thực tế',
    items: ['E-commerce Success', 'SEO Campaign Results', 'Brand Transformation'],
    link: '#'
  },
  {
    icon: '📝',
    title: 'Whitepapers',
    description: 'Báo cáo chuyên sâu về xu hướng và công nghệ',
    items: ['Digital Trends 2024', 'AI in Marketing', 'Future of E-commerce'],
    link: '#'
  },
  {
    icon: '🎓',
    title: 'Webinars',
    description: 'Hội thảo trực tuyến với chuyên gia hàng đầu',
    items: ['SEO Masterclass', 'Ads Optimization', 'Growth Hacking'],
    link: '#'
  }
];

export default function ResourcesPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Tài Nguyên & Học Liệu</h1>
          <p>Kho tài nguyên miễn phí giúp bạn thành công trong Digital Marketing</p>
        </section>

        <section className={styles.resources}>
          <div className={styles.container}>
            <div className={styles.resourceGrid}>
              {resources.map((resource, index) => (
                <div key={index} className={styles.resourceCard}>
                  <div className={styles.icon}>{resource.icon}</div>
                  <h3>{resource.title}</h3>
                  <p className={styles.description}>{resource.description}</p>
                  <ul className={styles.itemList}>
                    {resource.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <a href={resource.link} className={styles.accessButton}>
                    Truy Cập →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.newsletter}>
          <div className={styles.container}>
            <h2>Đăng Ký Nhận Tài Nguyên Mới</h2>
            <p>Nhận thông báo về tài nguyên và bài viết mới nhất</p>
            <form className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className={styles.emailInput}
              />
              <button type="submit" className={styles.subscribeButton}>
                Đăng Ký
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
