'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '../projects.module.css';

const projects = [
  {
    id: 1,
    title: 'Website Thương Mại Điện Tử',
    category: 'E-commerce',
    image: '🛒',
    description: 'Nền tảng bán hàng trực tuyến với hơn 10,000 sản phẩm',
    tech: ['Next.js', 'Laravel', 'MySQL'],
    link: '#'
  },
  {
    id: 2,
    title: 'Ứng Dụng Đặt Phòng Khách Sạn',
    category: 'Booking',
    image: '🏨',
    description: 'Hệ thống đặt phòng thông minh với AI recommendation',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    id: 3,
    title: 'Portal Giáo Dục Trực Tuyến',
    category: 'Education',
    image: '📚',
    description: 'Nền tảng học tập với hơn 50,000 học viên',
    tech: ['Vue.js', 'Django', 'PostgreSQL'],
    link: '#'
  },
  {
    id: 4,
    title: 'App Giao Đồ Ăn',
    category: 'Food Delivery',
    image: '🍔',
    description: 'Ứng dụng giao đồ ăn nhanh với tracking real-time',
    tech: ['React Native', 'Firebase', 'Google Maps'],
    link: '#'
  },
  {
    id: 5,
    title: 'CRM Quản Lý Khách Hàng',
    category: 'Business',
    image: '💼',
    description: 'Hệ thống CRM toàn diện cho doanh nghiệp',
    tech: ['Angular', 'Spring Boot', 'Oracle'],
    link: '#'
  },
  {
    id: 6,
    title: 'Marketplace Freelancer',
    category: 'Marketplace',
    image: '👨‍💻',
    description: 'Nền tảng kết nối freelancer và khách hàng',
    tech: ['Next.js', 'GraphQL', 'Redis'],
    link: '#'
  }
];

const categories = ['Tất cả', 'E-commerce', 'Booking', 'Education', 'Food Delivery', 'Business', 'Marketplace'];

export default function FeaturedProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProjects = selectedCategory === 'Tất cả' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Dự Án Nổi Bật</h1>
          <p>Khám phá các dự án thành công mà chúng tôi đã thực hiện</p>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.filters}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterButton} ${selectedCategory === cat ? styles.active : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.projectGrid}>
              {displayedProjects.map(project => (
                <div key={project.id} className={styles.projectCard}>
                  <div className={styles.projectImage}>{project.image}</div>
                  <div className={styles.projectContent}>
                    <span className={styles.category}>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className={styles.techStack}>
                      {project.tech.map(tech => (
                        <span key={tech} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                    <a href={project.link} className={styles.viewButton}>
                      Xem Chi Tiết →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  ← Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Sau →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
