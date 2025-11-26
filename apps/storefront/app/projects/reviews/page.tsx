'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    company: 'ABC Company',
    position: 'CEO',
    avatar: '👨‍💼',
    rating: 5,
    review: 'Đội ngũ Victor MER rất chuyên nghiệp và tận tâm. Website được thiết kế đẹp mắt và hoạt động mượt mà. Doanh số của chúng tôi tăng 150% sau 3 tháng.',
    project: 'Website E-commerce',
    date: '15/11/2024'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    company: 'XYZ Corporation',
    position: 'Marketing Manager',
    avatar: '👩‍💼',
    rating: 5,
    review: 'Dịch vụ SEO của Victor MER thật sự hiệu quả. Website của chúng tôi đã lên top 3 Google cho nhiều từ khóa quan trọng. Rất hài lòng!',
    project: 'SEO & Digital Marketing',
    date: '10/11/2024'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    company: 'Tech Startup',
    position: 'Founder',
    avatar: '👨‍💻',
    rating: 5,
    review: 'Ứng dụng mobile được phát triển rất tốt, UI/UX đẹp và trải nghiệm người dùng tuyệt vời. Đội ngũ support nhiệt tình và giải quyết vấn đề nhanh chóng.',
    project: 'Mobile App Development',
    date: '05/11/2024'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    company: 'Fashion Brand',
    position: 'Brand Manager',
    avatar: '👩‍🎨',
    rating: 5,
    review: 'Thiết kế UI/UX và branding rất chuyên nghiệp. Victor MER đã giúp chúng tôi xây dựng được bộ nhận diện thương hiệu mạnh mẽ và nhất quán.',
    project: 'UI/UX & Branding',
    date: '01/11/2024'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    company: 'Restaurant Chain',
    position: 'Operations Director',
    avatar: '👨‍🍳',
    rating: 5,
    review: 'Hệ thống quản lý nhà hàng và đặt món online hoạt động rất tốt. Giúp chúng tôi tối ưu hóa quy trình và tăng doanh thu đáng kể.',
    project: 'Restaurant Management System',
    date: '28/10/2024'
  },
  {
    id: 6,
    name: 'Vũ Thị F',
    company: 'Education Center',
    position: 'Director',
    avatar: '👩‍🏫',
    rating: 5,
    review: 'Nền tảng học trực tuyến được xây dựng rất hoàn thiện. Học viên và giáo viên đều rất hài lòng với trải nghiệm sử dụng.',
    project: 'E-Learning Platform',
    date: '20/10/2024'
  }
];

export default function ReviewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Đánh Giá Khách Hàng</h1>
          <p>Những phản hồi chân thực từ khách hàng của chúng tôi</p>
        </section>

        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Dự Án Hoàn Thành</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Khách Hàng Hài Lòng</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>4.9/5</div>
                <div className={styles.statLabel}>Đánh Giá Trung Bình</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>200+</div>
                <div className={styles.statLabel}>Khách Hàng Thân Thiết</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.reviews}>
          <div className={styles.container}>
            <div className={styles.reviewGrid}>
              {displayedReviews.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>{review.avatar}</div>
                    <div className={styles.reviewerInfo}>
                      <h3>{review.name}</h3>
                      <p className={styles.position}>{review.position}</p>
                      <p className={styles.company}>{review.company}</p>
                    </div>
                  </div>
                  <div className={styles.rating}>{renderStars(review.rating)}</div>
                  <p className={styles.reviewText}>{review.review}</p>
                  <div className={styles.reviewFooter}>
                    <span className={styles.project}>📁 {review.project}</span>
                    <span className={styles.date}>📅 {review.date}</span>
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

        <section className={styles.cta}>
          <div className={styles.container}>
            <h2>Bạn Muốn Là Khách Hàng Tiếp Theo?</h2>
            <p>Liên hệ với chúng tôi để bắt đầu dự án của bạn</p>
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
