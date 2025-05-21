'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import '../styles/landing.css';
import Blob from '../components/Blob';

export default function LandingPage() {
  useEffect(() => {
    const container = document.getElementById('stars');
    const numStars = 120;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
      star.style.width = `${Math.random() * 1.5 + 1.5}px`;
      star.style.height = star.style.width;
      container.appendChild(star);
    }
  }, []);

  return (
    <main className="starry-bg" id="stars">
      <div className="logo-wrapper fade-in">
        <Image
          src="/logo.png"
          alt="SilverReal Logo"
          width={650}
          height={650}
          priority
        />
      </div>

<Blob
  position="top-left"
  content={
    <>
      <h3>SILVEREAL</h3>
      <p>
        SILVEREAL brings you celestial-inspired jewelry that radiates charm and confidence.
        Our modern and aesthetic pieces are made to dazzle—whether you’re dressing up
        for a night out or adding a spark to your everyday style.
      </p>
    </>
  }
/>
<Blob
  position="bottom-right"
  content="Silver Collection: Calm and cosmic."
/>
    </main>
  );
}