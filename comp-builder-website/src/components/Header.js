import Login from './Auth/Login';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}>
                    <div style={styles.logo}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                            <rect x="9" y="9" width="6" height="6"></rect>
                            <line x1="9" y1="1" x2="9" y2="4"></line>
                            <line x1="15" y1="1" x2="15" y2="4"></line>
                            <line x1="9" y1="20" x2="9" y2="23"></line>
                            <line x1="15" y1="20" x2="15" y2="23"></line>
                            <line x1="20" y1="9" x2="23" y2="9"></line>
                            <line x1="20" y1="14" x2="23" y2="14"></line>
                            <line x1="1" y1="9" x2="4" y2="9"></line>
                            <line x1="1" y1="14" x2="4" y2="14"></line>
                        </svg>
                        <span style={styles.brand}>PC Builder</span>
                    </div>
                </Link>
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                    <Link to="/builder" style={styles.navLink}>Builder</Link>
                    <Login />
                </nav>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border)',
        padding: '1rem 0',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--color-primary)',
    },
    brand: {
        fontWeight: '700',
        fontSize: '1.25rem',
        color: 'var(--color-text-main)',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    navLink: {
        textDecoration: 'none',
        color: 'var(--color-text-muted)',
        fontWeight: '500',
        transition: 'color 0.2s',
        fontSize: '0.95rem',
    }
};

export default Header;
