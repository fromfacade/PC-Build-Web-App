import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p>© {new Date().getFullYear()} PC Builder. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 0',
        marginTop: 'auto',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
        fontSize: '0.875rem',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
    }
};

export default Footer;
