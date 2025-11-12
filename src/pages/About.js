import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <header className="about-hero">
                <h1>ADITI TEXTILE ✨</h1>
                <p className="hero-subtitle">Where Fashion Meets You</p>
            </header>

            <div className="story-wrapper">
                <div className="story-block">
                    <h2>Our Journey</h2>
                    <p>
                        At Aditi Textile, we bridge tradition with modernity by offering exquisite Sambalpuri 
                        handloom creations. Our collection celebrates the artistry of Odisha's master weavers, 
                        bringing timeless elegance to your wardrobe - whether for women, men, or children.
                    </p>
                </div>

                <div className="story-block">
                    <h2>What We Stand For</h2>
                    <p>
                        Every thread we sell supports the livelihood of traditional artisans. We're committed 
                        to ethical sourcing, fair compensation, and keeping age-old weaving techniques alive 
                        for future generations.
                    </p>
                </div>

                <div className="highlights-container">
                    <h2>What Makes Us Special</h2>
                    <div className="highlights-list">
                        <div className="highlight-box">
                            <span className="highlight-emoji">🎨</span>
                            <h3>Handcrafted Excellence</h3>
                            <p>Every garment is woven with care by skilled artisans</p>
                        </div>
                        <div className="highlight-box">
                            <span className="highlight-emoji">🌿</span>
                            <h3>Sustainable Fashion</h3>
                            <p>Eco-friendly materials and traditional methods</p>
                        </div>
                        <div className="highlight-box">
                            <span className="highlight-emoji">💎</span>
                            <h3>Premium Quality</h3>
                            <p>Rigorous quality checks on every piece</p>
                        </div>
                        <div className="highlight-box">
                            <span className="highlight-emoji">🎁</span>
                            <h3>Diverse Collection</h3>
                            <p>Something beautiful for every age and occasion</p>
                        </div>
                    </div>
                </div>

                <div className="story-block">
                    <h2>The Sambalpuri Art</h2>
                    <p>
                        Sambalpuri textiles showcase intricate Bandha (tie-dye) techniques passed down through 
                        centuries. Each pattern draws inspiration from nature, mythology, and temple architecture, 
                        making every piece a wearable work of art that carries the soul of Western Odisha.
                    </p>
                </div>

                <div className="story-block owner-info">
                    <h2>Meet the Owner</h2>
                    <p className="owner-name">Rakhi Mani Bhagat</p>
                    <p className="owner-description">
                        With a passion for preserving traditional Sambalpuri heritage and making it accessible 
                        to fashion-forward customers, Rakhi brings together the best of both worlds at Aditi Textile.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
