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

export default function WebMaintenancePage() {
  const heroData = {
    title: 'Dịch Vụ Bảo Trì Website',
    subtitle: 'Tại Hồ Chí Minh',
    description: 'Bảo trì website chuyên nghiệp, đảm bảo hoạt động ổn định 24/7. Cập nhật, sao lưu và bảo mật định kỳ.',
    image: '/images/services/web-maintenance-hero.jpg',
    ctaText: 'Đăng Ký Bảo Trì',
    ctaLink: '/contact'
  };

  const features = [
    {
      icon: '🔧',
      title: 'Bảo Trì Định Kỳ',
      description: 'Kiểm tra, cập nhật và tối ưu website thường xuyên'
    },
    {
      icon: '🔒',
      title: 'Bảo Mật Cao',
      description: 'Cập nhật bản vá bảo mật, quét malware định kỳ'
    },
    {
      icon: '💾',
      title: 'Sao Lưu Tự Động',
      description: 'Backup dữ liệu hàng ngày, đảm bảo an toàn'
    },
    {
      icon: '⚡',
      title: 'Tối Ưu Hiệu Suất',
      description: 'Giám sát và cải thiện tốc độ tải trang'
    },
    {
      icon: '🛠️',
      title: 'Sửa Lỗi Nhanh',
      description: 'Xử lý sự cố trong vòng 2-4 giờ'
    },
    {
      icon: '📊',
      title: 'Báo Cáo Chi Tiết',
      description: 'Báo cáo tình trạng website hàng tháng'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Đánh Giá Website',
      description: 'Kiểm tra toàn diện tình trạng hiện tại của website'
    },
    {
      step: 2,
      title: 'Lập Kế Hoạch',
      description: 'Xây dựng lộ trình bảo trì phù hợp'
    },
    {
      step: 3,
      title: 'Triển Khai Bảo Trì',
      description: 'Thực hiện các công việc bảo trì định kỳ'
    },
    {
      step: 4,
      title: 'Giám Sát & Báo Cáo',
      description: 'Theo dõi liên tục và báo cáo định kỳ'
    }
  ];

  const pricing = [
    {
      name: 'Gói Cơ Bản',
      price: '2.000.000đ/tháng',
      features: [
        'Cập nhật nội dung (5 lần/tháng)',
        'Backup tuần 1 lần',
        'Giám sát uptime',
        'Hỗ trợ trong giờ hành chính',
        'Báo cáo hàng tháng'
      ],
      highlighted: false
    },
    {
      name: 'Gói Chuyên Nghiệp',
      price: '4.000.000đ/tháng',
      features: [
        'Cập nhật không giới hạn',
        'Backup hàng ngày',
        'Bảo mật nâng cao',
        'Tối ưu hiệu suất',
        'Hỗ trợ 24/7',
        'Báo cáo 2 tuần/lần'
      ],
      highlighted: true
    },
    {
      name: 'Gói Doanh Nghiệp',
      price: 'Liên hệ',
      features: [
        'Bảo trì toàn diện',
        'Backup real-time',
        'Dedicated support',
        'SLA 99.9% uptime',
        'Tối ưu liên tục',
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
            title="Bảo Vệ Website Của Bạn Ngay Hôm Nay"
            description="Đăng ký dịch vụ bảo trì để website luôn hoạt động ổn định"
            ctaText="Đăng Ký Ngay"
            ctaLink="/contact"
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
