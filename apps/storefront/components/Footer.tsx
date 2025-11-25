import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Bagisto SaaS Platform - Demo Frontend & Backend</p>
      <div className={styles.links}>
        <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">
          Backend API
        </a>
        <a href="http://localhost:8000/admin" target="_blank" rel="noopener noreferrer">
          Admin Panel
        </a>
      </div>
    </footer>
  );
}
