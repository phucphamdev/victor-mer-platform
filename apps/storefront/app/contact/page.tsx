'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <p>Chúng tôi sẵn sàng lắng nghe và hỗ trợ bạn</p>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.contactInfo}>
                <h2>Thông Tin Liên Hệ</h2>
                <p className={styles.intro}>
                  Hãy liên hệ với chúng tôi để được tư vấn miễn phí về dự án của bạn.
                </p>

                <div className={styles.infoItem}>
                  <div className={styles.icon}>📍</div>
                  <div>
                    <h3>Địa Chỉ</h3>
                    <p>1180 Street, Ward 8, Go Vap District<br/>Ho Chi Minh City, 700000</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.icon}>📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>phuc.pham.dev@gmail.com</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.icon}>📱</div>
                  <div>
                    <h3>Điện Thoại</h3>
                    <p>+84 938 788 091</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.icon}>⏰</div>
                  <div>
                    <h3>Giờ Làm Việc</h3>
                    <p>Thứ 2 - Thứ 6: 8:00 - 18:00<br/>Thứ 7: 8:00 - 12:00</p>
                  </div>
                </div>

                <div className={styles.social}>
                  <h3>Theo Dõi Chúng Tôi</h3>
                  <div className={styles.socialLinks}>
                    <a href="#" className={styles.socialLink}>Facebook</a>
                    <a href="#" className={styles.socialLink}>LinkedIn</a>
                    <a href="#" className={styles.socialLink}>Twitter</a>
                    <a href="#" className={styles.socialLink}>Instagram</a>
                  </div>
                </div>
              </div>

              <div className={styles.formWrapper}>
                <h2>Gửi Tin Nhắn</h2>
                {submitted && (
                  <div className={styles.successMessage}>
                    ✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm.
                  </div>
                )}
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Họ và Tên *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Số Điện Thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="0123456789"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="service">Dịch Vụ Quan Tâm</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="website-design">Thiết Kế Website</option>
                      <option value="seo">SEO Website</option>
                      <option value="google-ads">Google Ads</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="web-maintenance">Bảo Trì Website</option>
                      <option value="ui-ux">UI/UX & Branding</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Nội Dung *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Mô tả chi tiết về dự án hoặc câu hỏi của bạn..."
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Gửi Tin Nhắn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
