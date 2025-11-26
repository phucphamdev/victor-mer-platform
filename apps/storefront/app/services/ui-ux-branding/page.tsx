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

export default function UIUXBrandingPage() {
  const heroData = {
    title: 'Dịch Vụ UI/UX Design & Branding',
    subtitle: 'Tạo Trải Nghiệm Người Dùng Tuyệt Vời',
    description: 'Thiết kế giao diện đẹp mắt, trải nghiệm người dùng tối ưu. Xây dựng thương hiệu mạnh mẽ và nhất quán.',
    image: '/images/services/ui-ux-hero.jpg',
    ctaText: 'Tư Vấn Thiết Kế',
    ctaLink: '/contact'
  };

  const features = [
    {
      icon: '🎨',
      title: 'UI Design',
      description: 'Giao diện đẹp mắt, hiện đại, phù hợp với thương hiệu'
    },
    {
      icon: '👥',
      title: 'UX Research',
      description: 'Nghiên cứu người dùng, tối ưu trải nghiệm'
    },
    {
      icon: '🎯',
      title: 'Brand Identity',
      description: 'Xây dựng bộ nhận diện thương hiệu độc đáo'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Thiết kế tối ưu trên mọi thiết bị'
    },
    {
      icon: '🔄',
      title: 'Prototype & Testing',
      description: 'Tạo prototype và test với người dùng thực'
    },
    {
      icon: '📐',
      title: 'Design System',
      description: 'Xây dựng hệ thống thiết kế nhất quán'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Research & Discovery',
      description: 'Nghiên cứu người dùng, thị trường và đối thủ'
    },
    {
      step: 2,
      title: 'Wireframe & Prototype',
      description: 'Tạo wireframe và prototype tương tác'
    },
    {
      step: 3,
      title: 'Visual Design',
      description: 'Thiết kế giao diện chi tiết và bộ nhận diện'
    },
    {
      step: 4,
      title: 'Testing & Handoff',
      description: 'Test với người dùng và bàn giao cho dev'
    }
  ];

  const pricing = [
    {
      name: 'Gói UI Design',
      price: '8.000.000đ',
      features: [
        'Thiết kế 5-10 màn hình',
        'Responsive design',
        'Style guide cơ bản',
        '2 lần chỉnh sửa',
        'File nguồn Figma'
      ],
      highlighted: false
    },
    {
      name: 'Gói UI/UX Complete',
      price: '18.000.000đ',
      features: [
        'UX Research',
        'Wireframe + Prototype',
        'UI Design (10-20 màn hình)',
        'User Testing',
        'Design System',
        'Không giới hạn chỉnh sửa'
      ],
      highlighted: true
    },
    {
      name: 'Gói Branding + UI/UX',
      price: 'Liên hệ',
      features: [
        'Brand Strategy',
        'Logo + Brand Identity',
        'Full UI/UX Design',
        'Marketing Materials',
        'Brand Guidelines',
        'Dedicated designer'
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
            title="Tạo Trải Nghiệm Tuyệt Vời Cho Khách Hàng"
            description="Liên hệ để nhận tư vấn thiết kế UI/UX và branding"
            ctaText="Tư Vấn Miễn Phí"
            ctaLink="/contact"
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
