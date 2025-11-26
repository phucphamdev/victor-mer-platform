'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              Victor MER
            </h3>
            <p className={styles.description}>
              Giải pháp công nghệ toàn diện cho doanh nghiệp. 
              Chuyên về thiết kế website, SEO, Digital Marketing và phát triển ứng dụng.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>Facebook</a>
              <a href="#" className={styles.socialLink}>LinkedIn</a>
              <a href="#" className={styles.socialLink}>Twitter</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Dịch Vụ</h4>
            <ul className={styles.links}>
              <li><Link href="/services/website-design">Thiết Kế Website</Link></li>
              <li><Link href="/services/seo">SEO Website</Link></li>
              <li><Link href="/services/google-ads">Google Ads</Link></li>
              <li><Link href="/services/digital-marketing">Digital Marketing</Link></li>
              <li><Link href="/services/web-maintenance">Bảo Trì Website</Link></li>
              <li><Link href="/services/ui-ux-branding">UI/UX & Branding</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Dự Án</h4>
            <ul className={styles.links}>
              <li><Link href="/projects/featured">Dự Án Nổi Bật</Link></li>
              <li><Link href="/projects/working-process">Quy Trình Làm Việc</Link></li>
              <li><Link href="/projects/reviews">Đánh Giá Khách Hàng</Link></li>
              <li><Link href="/projects/technical">Công Nghệ</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Công Ty</h4>
            <ul className={styles.links}>
              <li><Link href="/solutions">Giải Pháp</Link></li>
              <li><Link href="/resources">Tài Nguyên</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/careers">Tuyển Dụng</Link></li>
              <li><Link href="/contact">Liên Hệ</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Liên Hệ</h4>
            <ul className={styles.contact}>
              <li>
                <span className={styles.icon}>📍</span>
                1180 Street, Ward 8, Go Vap<br/>
                Ho Chi Minh City, 700000
              </li>
              <li>
                <span className={styles.icon}>📧</span>
                phuc.pham.dev@gmail.com
              </li>
              <li>
                <span className={styles.icon}>📱</span>
                +84 938 788 091
              </li>
              <li>
                <span className={styles.icon}>⏰</span>
                T2-T6: 8:00 - 18:00<br/>
                T7: 8:00 - 12:00
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 Victor MER. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
