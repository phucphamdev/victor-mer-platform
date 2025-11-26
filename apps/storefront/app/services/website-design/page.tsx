'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServicePricing from '@/components/services/ServicePricing';
import ServiceCTA from '@/components/services/ServiceCTA';
import styles from '../services.module.css';

export default function WebsiteDesignPage() {
  const heroData = {
    title: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp',
    subtitle: 'Tại Hồ Chí Minh',
    description: 'Thiết kế website đẹp, chuẩn SEO, tối ưu chuyển đổi. Giải pháp toàn diện cho doanh nghiệp của bạn.',
    image: '/images/services/website-design-hero.jpg',
    ctaText: 'Nhận Tư Vấn Miễn Phí',
    ctaLink: '/contact'
  };

  const features = [
    {
      icon: '🎨',
      title: 'Thiết Kế Độc Đáo',
      description: 'Giao diện đẹp mắt, hiện đại, phù hợp với thương hiệu của bạn'
    },
    {
      icon: '📱',
      title: 'Responsive 100%',
      description: 'Tối ưu hoàn hảo trên mọi thiết bị: Desktop, Tablet, Mobile'
    },
    {
      icon: '⚡',
      title: 'Tốc Độ Tải Nhanh',
      description: 'Tối ưu hiệu suất, tốc độ tải trang dưới 3 giây'
    },
    {
      icon: '🔍',
      title: 'Chuẩn SEO',
      description: 'Tối ưu SEO onpage, giúp website dễ dàng lên top Google'
    },
    {
      icon: '🔒',
      title: 'Bảo Mật Cao',
      description: 'SSL miễn phí, bảo mật dữ liệu khách hàng tuyệt đối'
    },
    {
      icon: '🛠️',
      title: 'Dễ Quản Lý',
      description: 'Hệ thống quản trị đơn giản, dễ sử dụng cho người không chuyên'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Tư Vấn & Lên Ý Tưởng',
      description: 'Phân tích nhu cầu, đối thủ cạnh tranh và đề xuất giải pháp phù hợp'
    },
    {
      step: 2,
      title: 'Thiết Kế Giao Diện',
      description: 'Thiết kế mockup, wireframe theo yêu cầu và thương hiệu'
    },
    {
      step: 3,
      title: 'Lập Trình & Phát Triển',
      description: 'Code chuẩn, tối ưu hiệu suất và bảo mật'
    },
    {
      step: 4,
      title: 'Kiểm Thử & Bàn Giao',
      description: 'Test đa nền tảng, hướng dẫn sử dụng và bàn giao'
    }
  ];

  const pricing = [
    {
      name: 'Gói Cơ Bản',
      price: '5.000.000đ',
      features: [
        'Website 5-7 trang',
        'Responsive mobile',
        'Chuẩn SEO cơ bản',
        'Tích hợp Google Analytics',
        'Bảo hành 6 tháng'
      ],
      highlighted: false
    },
    {
      name: 'Gói Chuyên Nghiệp',
      price: '12.000.000đ',
      features: [
        'Website 10-15 trang',
        'Thiết kế độc quyền',
        'Chuẩn SEO nâng cao',
        'Tích hợp CRM',
        'Bảo hành 12 tháng',
        'Hỗ trợ 24/7'
      ],
      highlighted: true
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      features: [
        'Website không giới hạn trang',
        'Tính năng tùy chỉnh',
        'Tích hợp hệ thống',
        'Đào tạo nhân sự',
        'Bảo hành trọn đời',
        'Dedicated support'
      ],
      highlighted: false
    }
  ];

  return (
    <div className={styles.servicePage}>
      <Header />
      
      <main className={styles.main}>
        <Suspense fallback={<div className={styles.loading}>Đang tải...</div>}>
          <ServiceHero {...heroData} />
          <ServiceFeatures features={features} />
          <ServiceProcess steps={process} />
          <ServicePricing packages={pricing} />
          <ServiceCTA 
            title="Sẵn Sàng Bắt Đầu Dự Án?"
            description="Liên hệ ngay với chúng tôi để nhận tư vấn miễn phí và báo giá chi tiết"
            ctaText="Liên Hệ Ngay"
            ctaLink="/contact"
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
