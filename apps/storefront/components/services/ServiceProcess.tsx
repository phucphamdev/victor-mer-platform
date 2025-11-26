'use client';

import styles from './ServiceProcess.module.css';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Quy Trình Làm Việc</h2>
        <div className={styles.processSteps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.processStep}>
              <div className={styles.stepNumber}>{step.step}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {index < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
