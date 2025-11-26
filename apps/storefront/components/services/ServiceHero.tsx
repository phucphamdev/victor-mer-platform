'use client';

import Link from 'next/link';
import styles from './ServiceHero.module.css';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  ctaText: string;
  ctaLink: string;
}

export default function ServiceHero({
  title,
  subtitle,
  description,
  image,
  ctaText,
  ctaLink
}: ServiceHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.description}>{description}</p>
          <Link href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </Link>
        </div>
        {image && (
          <div className={styles.imageWrapper}>
            <div className={styles.imagePlaceholder}>
              {/* Placeholder for image */}
              <span className={styles.icon}>🚀</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
