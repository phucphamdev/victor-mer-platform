'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './careers.module.css';

const positions = [
  {
    title: 'Senior Frontend Developer',
    type: 'Full-time',
    location: 'Ho Chi Minh City',
    salary: '25-35 triệu VNĐ',
    description: 'Tìm kiếm Frontend Developer giàu kinh nghiệm với React/Next.js',
    requirements: ['3+ years React/Next.js', 'TypeScript', 'Responsive Design', 'Git'],
    link: '/contact'
  },
  {
    title: 'Backend Developer (Laravel)',
    type: 'Full-time',
    location: 'Ho Chi Minh City',
    salary: '20-30 triệu VNĐ',
    description: 'Backend Developer với kinh nghiệm Laravel và API development',
    requirements: ['2+ years Laravel', 'RESTful API', 'MySQL/PostgreSQL', 'Docker'],
    link: '/contact'
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Ho Chi Minh City',
    salary: '15-25 triệu VNĐ',
    description: 'UI/UX Designer sáng tạo với portfolio ấn tượng',
    requirements: ['Figma/Adobe XD', 'User Research', 'Prototyping', 'Portfolio'],
    link: '/contact'
  },
  {
    title: 'Digital Marketing Specialist',
    type: 'Full-time',
    location: 'Ho Chi Minh City',
    salary: '12-20 triệu VNĐ',
    description: 'Chuyên viên Digital Marketing với kinh nghiệm SEO và Ads',
    requirements: ['SEO/SEM', 'Google Ads', 'Facebook Ads', 'Analytics'],
    link: '/contact'
  },
  {
    title: 'Content Writer',
    type: 'Part-time',
    location: 'Remote',
    salary: '8-15 triệu VNĐ',
    description: 'Content Writer viết bài về công nghệ và marketing',
    requirements: ['Tiếng Việt tốt', 'SEO Writing', 'Research Skills', 'Portfolio'],
    link: '/contact'
  },
  {
    title: 'Project Manager',
    type: 'Full-time',
    location: 'Ho Chi Minh City',
    salary: '25-35 triệu VNĐ',
    description: 'Project Manager quản lý dự án công nghệ',
    requirements: ['3+ years PM', 'Agile/Scrum', 'Communication', 'Leadership'],
    link: '/contact'
  }
];

const benefits = [
  { icon: '💰', title: 'Lương Cạnh Tranh', description: 'Mức lương hấp dẫn theo năng lực' },
  { icon: '🏥', title: 'Bảo Hiểm', description: 'Bảo hiểm sức khỏe toàn diện' },
  { icon: '📚', title: 'Đào Tạo', description: 'Cơ hội học hỏi và phát triển' },
  { icon: '🏖️', title: 'Du Lịch', description: 'Team building và du lịch hàng năm' },
  { icon: '⏰', title: 'Linh Hoạt', description: 'Giờ làm việc linh hoạt' },
  { icon: '🎉', title: 'Văn Hóa', description: 'Môi trường làm việc thân thiện' }
];

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Cơ Hội Nghề Nghiệp</h1>
          <p>Gia nhập đội ngũ Victor MER - Nơi tài năng được tỏa sáng</p>
        </section>

        <section className={styles.benefits}>
          <div className={styles.container}>
            <h2>Tại Sao Chọn Victor MER?</h2>
            <div className={styles.benefitGrid}>
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.icon}>{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.positions}>
          <div className={styles.container}>
            <h2>Vị Trí Đang Tuyển</h2>
            <div className={styles.positionList}>
              {positions.map((position, index) => (
                <div key={index} className={styles.positionCard}>
                  <div className={styles.positionHeader}>
                    <div>
                      <h3>{position.title}</h3>
                      <div className={styles.meta}>
                        <span className={styles.type}>{position.type}</span>
                        <span className={styles.location}>📍 {position.location}</span>
                        <span className={styles.salary}>💰 {position.salary}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.description}>{position.description}</p>
                  <div className={styles.requirements}>
                    <strong>Yêu cầu:</strong>
                    <ul>
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <a href={position.link} className={styles.applyButton}>
                    Ứng Tuyển Ngay
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Không Tìm Thấy Vị Trí Phù Hợp?</h2>
            <p>Gửi CV của bạn cho chúng tôi, chúng tôi sẽ liên hệ khi có cơ hội phù hợp</p>
            <a href="/contact" className={styles.ctaButton}>
              Gửi CV
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
