import Login from './Auth/Login';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.container}>
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
                <nav>
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
    }
};

export default Header;
