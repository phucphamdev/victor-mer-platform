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

export default function DigitalMarketingPage() {
  const heroData = {
    title: 'Dịch Vụ Digital Marketing Tổng Thể',
    subtitle: 'Giải Pháp Marketing Toàn Diện',
    description: 'Chiến lược marketing đa kênh, tối ưu ROI. Từ SEO, Ads đến Social Media và Content Marketing.',
    image: '/images/services/digital-marketing-hero.jpg',
    ctaText: 'Nhận Tư Vấn Chiến Lược',
    ctaLink: '/contact'
  };

  const features = [
    {
      icon: '🎯',
      title: 'Chiến Lược Đa Kênh',
      description: 'Tích hợp SEO, SEM, Social Media, Email Marketing'
    },
    {
      icon: '📊',
      title: 'Data-Driven',
      description: 'Ra quyết định dựa trên dữ liệu và phân tích chuyên sâu'
    },
    {
      icon: '🎨',
      title: 'Content Marketing',
      description: 'Sản xuất nội dung chất lượng, thu hút và giữ chân khách hàng'
    },
    {
      icon: '📱',
      title: 'Social Media',
      description: 'Quản lý và phát triển cộng đồng trên các nền tảng xã hội'
    },
    {
      icon: '📧',
      title: 'Email Marketing',
      description: 'Chiến dịch email tự động hóa, cá nhân hóa cao'
    },
    {
      icon: '🔄',
      title: 'Marketing Automation',
      description: 'Tự động hóa quy trình marketing, tiết kiệm thời gian'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Phân Tích & Lập Kế Hoạch',
      description: 'Nghiên cứu thị trường, đối thủ và xây dựng chiến lược'
    },
    {
      step: 2,
      title: 'Triển Khai Đa Kênh',
      description: 'Thực hiện chiến dịch trên các kênh marketing'
    },
    {
      step: 3,
      title: 'Tối Ưu & Theo Dõi',
      description: 'Giám sát hiệu suất và tối ưu liên tục'
    },
    {
      step: 4,
      title: 'Báo Cáo & Phát Triển',
      description: 'Đánh giá kết quả và mở rộng quy mô'
    }
  ];

  const pricing = [
    {
      name: 'Gói Startup',
      price: '15.000.000đ/tháng',
      features: [
        'SEO cơ bản',
        'Social Media (2 nền tảng)',
        'Content Marketing',
        '5 bài viết/tháng',
        'Báo cáo hàng tháng'
      ],
      highlighted: false
    },
    {
      name: 'Gói Tăng Trưởng',
      price: '30.000.000đ/tháng',
      features: [
        'SEO + Google Ads',
        'Social Media (4 nền tảng)',
        'Content + Email Marketing',
        '10 bài viết/tháng',
        'Marketing Automation',
        'Báo cáo 2 tuần/lần'
      ],
      highlighted: true
    },
    {
      name: 'Gói Enterprise',
      price: 'Liên hệ',
      features: [
        'Full-service Marketing',
        'Chiến lược tùy chỉnh',
        'Không giới hạn kênh',
        'Dedicated team',
        'Advanced Analytics',
        'Báo cáo tuần'
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
            title="Bắt Đầu Hành Trình Digital Marketing"
            description="Liên hệ để nhận tư vấn chiến lược marketing phù hợp với doanh nghiệp"
            ctaText="Tư Vấn Miễn Phí"
            ctaLink="/contact"
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
