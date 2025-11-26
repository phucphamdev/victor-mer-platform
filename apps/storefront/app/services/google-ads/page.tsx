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

export default function GoogleAdsPage() {
  const heroData = {
    title: 'Dịch Vụ Quảng Cáo Google Ads',
    subtitle: 'Tối Ưu Chi Phí - Tăng Doanh Thu',
    description: 'Chiến dịch Google Ads hiệu quả, ROI cao. Chuyên gia với hơn 5 năm kinh nghiệm.',
    image: '/images/services/google-ads-hero.jpg',
    ctaText: 'Tư Vấn Chiến Lược',
    ctaLink: '/contact'
  };

  const features = [
    {
      icon: '🎯',
      title: 'Targeting Chính Xác',
      description: 'Nhắm đúng đối tượng khách hàng tiềm năng của bạn'
    },
    {
      icon: '💰',
      title: 'Tối Ưu Chi Phí',
      description: 'Giảm CPC, tăng CTR và conversion rate'
    },
    {
      icon: '📊',
      title: 'Phân Tích Dữ Liệu',
      description: 'Theo dõi và phân tích hiệu quả chiến dịch real-time'
    },
    {
      icon: '🔄',
      title: 'A/B Testing',
      description: 'Liên tục test và tối ưu quảng cáo để đạt hiệu quả tốt nhất'
    },
    {
      icon: '📱',
      title: 'Đa Nền Tảng',
      description: 'Quảng cáo trên Search, Display, YouTube, Shopping'
    },
    {
      icon: '🏆',
      title: 'Chuyên Gia Certified',
      description: 'Đội ngũ có chứng chỉ Google Ads chính thức'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Nghiên Cứu & Lập Kế Hoạch',
      description: 'Phân tích thị trường, đối thủ và xác định mục tiêu'
    },
    {
      step: 2,
      title: 'Thiết Lập Chiến Dịch',
      description: 'Tạo cấu trúc chiến dịch, nhóm quảng cáo và từ khóa'
    },
    {
      step: 3,
      title: 'Tối Ưu & Theo Dõi',
      description: 'Giám sát hiệu suất, điều chỉnh bid và ngân sách'
    },
    {
      step: 4,
      title: 'Báo Cáo & Cải Thiện',
      description: 'Phân tích kết quả và đề xuất cải tiến'
    }
  ];

  const pricing = [
    {
      name: 'Gói Khởi Đầu',
      price: '5.000.000đ/tháng',
      features: [
        'Ngân sách ads: 10-20 triệu',
        'Search Ads',
        '1 chiến dịch',
        'Báo cáo hàng tháng',
        'Hỗ trợ trong giờ hành chính'
      ],
      highlighted: false
    },
    {
      name: 'Gói Tăng Trưởng',
      price: '10.000.000đ/tháng',
      features: [
        'Ngân sách ads: 20-50 triệu',
        'Search + Display Ads',
        '3-5 chiến dịch',
        'A/B Testing',
        'Báo cáo 2 tuần/lần',
        'Hỗ trợ ưu tiên'
      ],
      highlighted: true
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      features: [
        'Ngân sách ads: 50 triệu+',
        'Full platform (Search, Display, YouTube, Shopping)',
        'Không giới hạn chiến dịch',
        'Remarketing nâng cao',
        'Dedicated account manager',
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
            title="Sẵn Sàng Tăng Doanh Thu?"
            description="Liên hệ ngay để nhận tư vấn chiến lược Google Ads phù hợp"
            ctaText="Tư Vấn Miễn Phí"
            ctaLink="/contact"
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
