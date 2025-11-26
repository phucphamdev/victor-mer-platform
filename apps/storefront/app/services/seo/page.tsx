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

export default function SEOPage() {
  const heroData = {
    title: 'Dịch Vụ SEO Website Chuyên Nghiệp',
    subtitle: 'Đưa Website Lên Top Google',
    description: 'Tối ưu SEO toàn diện, tăng traffic tự nhiên, nâng cao thứ hạng từ khóa. Cam kết hiệu quả rõ ràng.',
    image: '/images/services/seo-hero.jpg',
    ctaText: 'Phân Tích SEO Miễn Phí',
    ctaLink: '/contact'
  };

  const features = [
    {
      icon: '📊',
      title: 'Phân Tích Chuyên Sâu',
      description: 'Audit website toàn diện, phân tích đối thủ và từ khóa tiềm năng'
    },
    {
      icon: '🎯',
      title: 'SEO Onpage',
      description: 'Tối ưu nội dung, cấu trúc, tốc độ tải và trải nghiệm người dùng'
    },
    {
      icon: '🔗',
      title: 'SEO Offpage',
      description: 'Xây dựng backlink chất lượng, tăng độ uy tín domain'
    },
    {
      icon: '📝',
      title: 'Content Marketing',
      description: 'Sản xuất nội dung chất lượng, thu hút và giữ chân khách hàng'
    },
    {
      icon: '📈',
      title: 'Báo Cáo Chi Tiết',
      description: 'Theo dõi thứ hạng, traffic và chuyển đổi hàng tháng'
    },
    {
      icon: '🏆',
      title: 'Cam Kết Hiệu Quả',
      description: 'Đảm bảo từ khóa lên top hoặc hoàn tiền 100%'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Audit & Phân Tích',
      description: 'Đánh giá hiện trạng website, phân tích đối thủ và lập kế hoạch'
    },
    {
      step: 2,
      title: 'Tối Ưu Onpage',
      description: 'Cải thiện cấu trúc, nội dung, tốc độ và trải nghiệm người dùng'
    },
    {
      step: 3,
      title: 'Xây Dựng Backlink',
      description: 'Tạo backlink chất lượng từ các nguồn uy tín'
    },
    {
      step: 4,
      title: 'Theo Dõi & Tối Ưu',
      description: 'Giám sát thứ hạng, điều chỉnh chiến lược liên tục'
    }
  ];

  const pricing = [
    {
      name: 'Gói Khởi Động',
      price: '8.000.000đ/tháng',
      features: [
        '10 từ khóa mục tiêu',
        'SEO Onpage cơ bản',
        '5 bài viết/tháng',
        'Báo cáo hàng tháng',
        'Hợp đồng 3 tháng'
      ],
      highlighted: false
    },
    {
      name: 'Gói Phát Triển',
      price: '15.000.000đ/tháng',
      features: [
        '20 từ khóa mục tiêu',
        'SEO Onpage + Offpage',
        '10 bài viết/tháng',
        'Xây dựng backlink',
        'Báo cáo 2 tuần/lần',
        'Hợp đồng 6 tháng'
      ],
      highlighted: true
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      features: [
        'Không giới hạn từ khóa',
        'SEO toàn diện',
        'Content không giới hạn',
        'Chiến lược riêng biệt',
        'Dedicated SEO team',
        'Hợp đồng 12 tháng'
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
            title="Bắt Đầu Chiến Dịch SEO Ngay Hôm Nay"
            description="Nhận phân tích SEO miễn phí và tư vấn chiến lược phù hợp với doanh nghiệp"
            ctaText="Phân Tích Miễn Phí"
            ctaLink="/contact"
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
