'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { status } = useBackendStatus();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [servicesClicked, setServicesClicked] = useState(false);
  const [projectsClicked, setProjectsClicked] = useState(false);
  
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesClicked(false);
        setServicesOpen(false);
      }
      if (projectsRef.current && !projectsRef.current.contains(event.target as Node)) {
        setProjectsClicked(false);
        setProjectsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleServicesClick = () => {
    setServicesClicked(!servicesClicked);
    setServicesOpen(!servicesOpen);
    // Đóng menu kia nếu đang mở
    if (projectsClicked) {
      setProjectsClicked(false);
      setProjectsOpen(false);
    }
  };

  const handleProjectsClick = () => {
    setProjectsClicked(!projectsClicked);
    setProjectsOpen(!projectsOpen);
    // Đóng menu kia nếu đang mở
    if (servicesClicked) {
      setServicesClicked(false);
      setServicesOpen(false);
    }
  };

  const handleServicesMouseEnter = () => {
    if (!servicesClicked) {
      setServicesOpen(true);
    }
  };

  const handleServicesMouseLeave = () => {
    if (!servicesClicked) {
      setServicesOpen(false);
    }
  };

  const handleProjectsMouseEnter = () => {
    if (!projectsClicked) {
      setProjectsOpen(true);
    }
  };

  const handleProjectsMouseLeave = () => {
    if (!projectsClicked) {
      setProjectsOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>Victor MER</span>
        </Link>

        <button 
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink}>
            Trang chủ
          </Link>

          <div 
            ref={servicesRef}
            className={styles.dropdown}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button 
              className={styles.navLink}
              onClick={handleServicesClick}
            >
              Dịch vụ <span className={styles.arrow}>▼</span>
            </button>
            {servicesOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/services/website-design" className={styles.dropdownItem}>
                  🎨 Thiết Kế Website
                </Link>
                <Link href="/services/seo" className={styles.dropdownItem}>
                  �  SEO Website
                </Link>
                <Link href="/services/google-ads" className={styles.dropdownItem}>
                  � Google  Ads
                </Link>
                <Link href="/services/digital-marketing" className={styles.dropdownItem}>
                  � Diogital Marketing
                </Link>
                <Link href="/services/web-maintenance" className={styles.dropdownItem}>
                  🔧 Bảo Trì Website
                </Link>
                <Link href="/services/ui-ux-branding" className={styles.dropdownItem}>
                  🎯 UI/UX & Branding
                </Link>
              </div>
            )}
          </div>

          <div 
            ref={projectsRef}
            className={styles.dropdown}
            onMouseEnter={handleProjectsMouseEnter}
            onMouseLeave={handleProjectsMouseLeave}
          >
            <button 
              className={styles.navLink}
              onClick={handleProjectsClick}
            >
              Dự án <span className={styles.arrow}>▼</span>
            </button>
            {projectsOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/projects/featured" className={styles.dropdownItem}>
                  ⭐ Dự Án Nổi Bật
                </Link>
                <Link href="/projects/working-process" className={styles.dropdownItem}>
                  � Quyh Trình Làm Việc
                </Link>
                <Link href="/projects/reviews" className={styles.dropdownItem}>
                  💬 Đánh Giá Khách Hàng
                </Link>
                <Link href="/projects/technical" className={styles.dropdownItem}>
                  ⚙️ Công Nghệ
                </Link>
              </div>
            )}
          </div>

          <Link href="/solutions" className={styles.navLink}>
            Giải pháp
          </Link>

          <Link href="/resources" className={styles.navLink}>
            Tài nguyên
          </Link>

          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>

          <Link href="/price-calculator" className={styles.navLink}>
            Tính giá
          </Link>

          <Link href="/careers" className={styles.navLink}>
            Tuyển dụng
          </Link>

          <Link href="/contact" className={styles.navLink + ' ' + styles.contactButton}>
            Liên hệ
          </Link>

          <Link href="/cart" className={styles.cartLink}>
            🛒
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>

          <div className={styles.statusIndicator}>
            <span className={`${styles.dot} ${styles[status]}`}></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
