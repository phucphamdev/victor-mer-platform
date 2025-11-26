'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './calculator.module.css';

export default function PriceCalculatorPage() {
  const [formData, setFormData] = useState({
    projectType: 'website',
    pages: '5-10',
    features: [] as string[],
    design: 'template',
    timeline: '1-2-months'
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const calculatePrice = () => {
    let basePrice = 0;

    // Base price by project type
    switch (formData.projectType) {
      case 'website':
        basePrice = 5000000;
        break;
      case 'ecommerce':
        basePrice = 15000000;
        break;
      case 'webapp':
        basePrice = 25000000;
        break;
      case 'mobile':
        basePrice = 30000000;
        break;
    }

    // Add price by pages
    switch (formData.pages) {
      case '5-10':
        basePrice += 0;
        break;
      case '10-20':
        basePrice += 5000000;
        break;
      case '20-50':
        basePrice += 10000000;
        break;
      case '50+':
        basePrice += 20000000;
        break;
    }

    // Add price by features
    basePrice += formData.features.length * 2000000;

    // Add price by design
    if (formData.design === 'custom') {
      basePrice += 5000000;
    } else if (formData.design === 'premium') {
      basePrice += 10000000;
    }

    // Discount by timeline
    if (formData.timeline === '3-6-months') {
      basePrice *= 0.9;
    }

    setEstimatedPrice(basePrice);
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Công Cụ Tính Giá Website</h1>
          <p>Ước tính chi phí dự án của bạn trong vài phút</p>
        </section>

        <section className={styles.calculator}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.formSection}>
                <h2>Thông Tin Dự Án</h2>

                <div className={styles.formGroup}>
                  <label>Loại Dự Án</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option value="website">Website Giới Thiệu</option>
                    <option value="ecommerce">Website Thương Mại Điện Tử</option>
                    <option value="webapp">Web Application</option>
                    <option value="mobile">Mobile App</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Số Lượng Trang</label>
                  <select
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  >
                    <option value="5-10">5-10 trang</option>
                    <option value="10-20">10-20 trang</option>
                    <option value="20-50">20-50 trang</option>
                    <option value="50+">Hơn 50 trang</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Tính Năng Bổ Sung</label>
                  <div className={styles.checkboxGroup}>
                    {['CMS', 'Blog', 'Đa ngôn ngữ', 'Thanh toán', 'Chat', 'API'].map(feature => (
                      <label key={feature} className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                        />
                        <span>{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Thiết Kế</label>
                  <select
                    value={formData.design}
                    onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                  >
                    <option value="template">Sử dụng Template</option>
                    <option value="custom">Thiết Kế Tùy Chỉnh</option>
                    <option value="premium">Thiết Kế Premium</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Thời Gian Hoàn Thành</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="urgent">Gấp (dưới 1 tháng)</option>
                    <option value="1-2-months">1-2 tháng</option>
                    <option value="3-6-months">3-6 tháng</option>
                  </select>
                </div>

                <button onClick={calculatePrice} className={styles.calculateButton}>
                  Tính Giá
                </button>
              </div>

              <div className={styles.resultSection}>
                <h2>Ước Tính Chi Phí</h2>
                {estimatedPrice > 0 ? (
                  <>
                    <div className={styles.priceDisplay}>
                      <div className={styles.priceLabel}>Giá Ước Tính</div>
                      <div className={styles.price}>{formatPrice(estimatedPrice)}</div>
                      <div className={styles.priceNote}>
                        * Đây là giá ước tính. Giá chính xác sẽ được báo sau khi tư vấn chi tiết.
                      </div>
                    </div>

                    <div className={styles.breakdown}>
                      <h3>Chi Tiết</h3>
                      <ul>
                        <li>
                          <span>Loại dự án:</span>
                          <span>{formData.projectType === 'website' ? 'Website' : 
                                 formData.projectType === 'ecommerce' ? 'E-commerce' :
                                 formData.projectType === 'webapp' ? 'Web App' : 'Mobile App'}</span>
                        </li>
                        <li>
                          <span>Số trang:</span>
                          <span>{formData.pages}</span>
                        </li>
                        <li>
                          <span>Tính năng:</span>
                          <span>{formData.features.length} tính năng</span>
                        </li>
                        <li>
                          <span>Thiết kế:</span>
                          <span>{formData.design === 'template' ? 'Template' :
                                 formData.design === 'custom' ? 'Tùy chỉnh' : 'Premium'}</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/contact" className={styles.contactButton}>
                      Liên Hệ Tư Vấn
                    </a>
                  </>
                ) : (
                  <div className={styles.placeholder}>
                    <div className={styles.placeholderIcon}>💰</div>
                    <p>Điền thông tin và nhấn "Tính Giá" để xem ước tính chi phí</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
