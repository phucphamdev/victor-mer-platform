'use client';

import Link from 'next/link';
import styles from './ServicePricing.module.css';

interface PricingPackage {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

interface ServicePricingProps {
  packages: PricingPackage[];
}

export default function ServicePricing({ packages }: ServicePricingProps) {
  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Bảng Giá Dịch Vụ</h2>
        <div className={styles.pricingGrid}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`${styles.pricingCard} ${
                pkg.highlighted ? styles.highlighted : ''
              }`}
            >
              {pkg.highlighted && (
                <div className={styles.badge}>Phổ Biến Nhất</div>
              )}
              <h3 className={styles.packageName}>{pkg.name}</h3>
              <div className={styles.price}>{pkg.price}</div>
              <ul className={styles.featureList}>
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Link href="/contact" className={styles.selectButton}>
                Chọn Gói
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
