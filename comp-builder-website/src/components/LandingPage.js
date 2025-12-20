import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.title}>Build Your Dream PC</h1>
                    <p style={styles.subtitle}>
                        The ultimate tool to plan, visualize, and check compatibility for your custom computer build.
                    </p>
                    <Link to="/builder" style={styles.ctaButton}>
                        Start Building Now
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section style={styles.features}>
                <div style={styles.featureCard}>
                    <div style={styles.icon}>🖥️</div>
                    <h3>Visual Builder</h3>
                    <p>Drag and drop components to visualize your build connections and layout.</p>
                </div>
                <div style={styles.featureCard}>
                    <div style={styles.icon}>✅</div>
                    <h3>Compatibility Check</h3>
                    <p>Automatic verification ensures all your selected parts work perfectly together.</p>
                </div>
                <div style={styles.featureCard}>
                    <div style={styles.icon}>💰</div>
                    <h3>Price Validation</h3>
                    <p>Track your budget with real-time pricing and tax calculations.</p>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    hero: {
        width: '100%',
        padding: '6rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 210, 255, 0.05) 100%)',
        display: 'flex',
        justifyContent: 'center',
    },
    heroContent: {
        maxWidth: '800px',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        background: 'linear-gradient(90deg, #fff, #aaa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: 'var(--color-text-muted)',
        marginBottom: '3rem',
        lineHeight: '1.6',
    },
    ctaButton: {
        display: 'inline-block',
        backgroundColor: 'var(--color-primary)',
        color: '#000',
        padding: '1rem 2.5rem',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: '700',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 20px rgba(0, 210, 255, 0.3)',
    },
    features: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '4rem 2rem',
        width: '100%',
        maxWidth: '1200px',
    },
    featureCard: {
        backgroundColor: 'var(--color-bg-card)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
        transition: 'transform 0.2s',
    },
    icon: {
        fontSize: '3rem',
        marginBottom: '1rem',
    }
};

export default LandingPage;
