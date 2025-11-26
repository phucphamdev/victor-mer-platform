'use client';

import Link from 'next/link';
import styles from './ServiceCTA.module.css';

interface ServiceCTAProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function ServiceCTA({
  title,
  description,
  ctaText,
  ctaLink
}: ServiceCTAProps) {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={ctaLink} className={styles.ctaButton}>
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
