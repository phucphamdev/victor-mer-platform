'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './blog.module.css';

const blogPosts = [
  {
    id: 1,
    title: '10 Xu Hướng Thiết Kế Website 2024',
    excerpt: 'Khám phá những xu hướng thiết kế website mới nhất và cách áp dụng vào dự án của bạn.',
    category: 'Design',
    date: '15/11/2024',
    author: 'Victor MER Team',
    image: '🎨',
    readTime: '5 phút đọc'
  },
  {
    id: 2,
    title: 'SEO Cơ Bản: Hướng Dẫn Cho Người Mới',
    excerpt: 'Tìm hiểu các kỹ thuật SEO cơ bản để đưa website lên top Google.',
    category: 'SEO',
    date: '12/11/2024',
    author: 'Victor MER Team',
    image: '🔍',
    readTime: '8 phút đọc'
  },
  {
    id: 3,
    title: 'Tối Ưu Tốc Độ Website: Best Practices',
    excerpt: 'Các phương pháp tối ưu hiệu suất website để cải thiện trải nghiệm người dùng.',
    category: 'Performance',
    date: '10/11/2024',
    author: 'Victor MER Team',
    image: '⚡',
    readTime: '6 phút đọc'
  },
  {
    id: 4,
    title: 'Google Ads: Chiến Lược Hiệu Quả',
    excerpt: 'Cách tạo và tối ưu chiến dịch Google Ads để tăng ROI.',
    category: 'Marketing',
    date: '08/11/2024',
    author: 'Victor MER Team',
    image: '📊',
    readTime: '7 phút đọc'
  },
  {
    id: 5,
    title: 'UI/UX Design: Nguyên Tắc Vàng',
    excerpt: 'Những nguyên tắc thiết kế UI/UX mà mọi designer cần biết.',
    category: 'Design',
    date: '05/11/2024',
    author: 'Victor MER Team',
    image: '🎯',
    readTime: '10 phút đọc'
  },
  {
    id: 6,
    title: 'Content Marketing: Tạo Nội Dung Hấp Dẫn',
    excerpt: 'Bí quyết tạo nội dung thu hút và chuyển đổi khách hàng.',
    category: 'Marketing',
    date: '03/11/2024',
    author: 'Victor MER Team',
    image: '📝',
    readTime: '9 phút đọc'
  }
];

const categories = ['Tất cả', 'Design', 'SEO', 'Performance', 'Marketing'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPosts = selectedCategory === 'Tất cả' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Blog & Tài Nguyên</h1>
          <p>Chia sẻ kiến thức và kinh nghiệm về Digital Marketing</p>
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

            <div className={styles.blogGrid}>
              {displayedPosts.map(post => (
                <article key={post.id} className={styles.blogCard}>
                  <div className={styles.blogImage}>{post.image}</div>
                  <div className={styles.blogContent}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.readTime}>{post.readTime}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className={styles.footer}>
                      <span className={styles.author}>{post.author}</span>
                      <span className={styles.date}>{post.date}</span>
                    </div>
                    <a href={`/blog/${post.id}`} className={styles.readMore}>
                      Đọc Thêm →
                    </a>
                  </div>
                </article>
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
