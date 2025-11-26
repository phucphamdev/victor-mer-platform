'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './technical.module.css';

const technologies = {
  frontend: [
    { name: 'React', icon: '⚛️', description: 'Library UI mạnh mẽ' },
    { name: 'Next.js', icon: '▲', description: 'Framework React production-ready' },
    { name: 'Vue.js', icon: '💚', description: 'Progressive JavaScript Framework' },
    { name: 'TypeScript', icon: '📘', description: 'JavaScript với type safety' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
    { name: 'React Native', icon: '📱', description: 'Mobile app development' }
  ],
  backend: [
    { name: 'Laravel', icon: '🔴', description: 'PHP Framework hiện đại' },
    { name: 'Node.js', icon: '🟢', description: 'JavaScript runtime' },
    { name: 'Django', icon: '🐍', description: 'Python web framework' },
    { name: 'Spring Boot', icon: '🍃', description: 'Java framework' },
    { name: 'Express.js', icon: '⚡', description: 'Fast Node.js framework' },
    { name: 'NestJS', icon: '🦁', description: 'Progressive Node.js framework' }
  ],
  database: [
    { name: 'MySQL', icon: '🐬', description: 'Relational database' },
    { name: 'PostgreSQL', icon: '🐘', description: 'Advanced SQL database' },
    { name: 'MongoDB', icon: '🍃', description: 'NoSQL document database' },
    { name: 'Redis', icon: '🔴', description: 'In-memory data store' },
    { name: 'Firebase', icon: '🔥', description: 'Backend-as-a-Service' },
    { name: 'Elasticsearch', icon: '🔍', description: 'Search engine' }
  ],
  devops: [
    { name: 'Docker', icon: '🐳', description: 'Containerization platform' },
    { name: 'Kubernetes', icon: '☸️', description: 'Container orchestration' },
    { name: 'AWS', icon: '☁️', description: 'Cloud computing platform' },
    { name: 'GitHub Actions', icon: '⚙️', description: 'CI/CD automation' },
    { name: 'Nginx', icon: '🟩', description: 'Web server' },
    { name: 'Jenkins', icon: '🔧', description: 'Automation server' }
  ]
};

export default function TechnicalPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Công Nghệ & Công Cụ</h1>
          <p>Stack công nghệ hiện đại mà chúng tôi sử dụng</p>
        </section>

        <section className={styles.tech}>
          <div className={styles.container}>
            <div className={styles.techSection}>
              <h2>Frontend Development</h2>
              <div className={styles.techGrid}>
                {technologies.frontend.map((tech, index) => (
                  <div key={index} className={styles.techCard}>
                    <div className={styles.techIcon}>{tech.icon}</div>
                    <h3>{tech.name}</h3>
                    <p>{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.techSection}>
              <h2>Backend Development</h2>
              <div className={styles.techGrid}>
                {technologies.backend.map((tech, index) => (
                  <div key={index} className={styles.techCard}>
                    <div className={styles.techIcon}>{tech.icon}</div>
                    <h3>{tech.name}</h3>
                    <p>{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.techSection}>
              <h2>Database & Storage</h2>
              <div className={styles.techGrid}>
                {technologies.database.map((tech, index) => (
                  <div key={index} className={styles.techCard}>
                    <div className={styles.techIcon}>{tech.icon}</div>
                    <h3>{tech.name}</h3>
                    <p>{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.techSection}>
              <h2>DevOps & Infrastructure</h2>
              <div className={styles.techGrid}>
                {technologies.devops.map((tech, index) => (
                  <div key={index} className={styles.techCard}>
                    <div className={styles.techIcon}>{tech.icon}</div>
                    <h3>{tech.name}</h3>
                    <p>{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.approach}>
          <div className={styles.container}>
            <h2>Phương Pháp Phát Triển</h2>
            <div className={styles.approachGrid}>
              <div className={styles.approachCard}>
                <div className={styles.approachIcon}>🎯</div>
                <h3>Agile/Scrum</h3>
                <p>Phát triển linh hoạt, tương tác liên tục với khách hàng</p>
              </div>
              <div className={styles.approachCard}>
                <div className={styles.approachIcon}>🔄</div>
                <h3>CI/CD</h3>
                <p>Tự động hóa testing và deployment</p>
              </div>
              <div className={styles.approachCard}>
                <div className={styles.approachIcon}>📝</div>
                <h3>Code Review</h3>
                <p>Đảm bảo chất lượng code cao</p>
              </div>
              <div className={styles.approachCard}>
                <div className={styles.approachIcon}>🧪</div>
                <h3>Testing</h3>
                <p>Unit test, integration test, E2E test</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Cần Tư Vấn Công Nghệ?</h2>
            <p>Liên hệ với chúng tôi để được tư vấn stack công nghệ phù hợp</p>
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
