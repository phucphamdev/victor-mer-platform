'use client';

import styles from './ServiceFeatures.module.css';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  features: Feature[];
}

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Tính Năng Nổi Bật</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
