'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import '../styles/landing.css';
import SubscriptionForm from '../components/SubscriptionForm';

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
        <div className="moon-corner" />
        
        {/* Angel Pendant */}
        <Image
          src="/one.png"
          alt="Celestial Pendant"
          width={800}
          height={800}
          className="angel-float"
        />

        <Image
          src="/logo.png"
          alt="SilverReal Logo"
          width={900}
          height={900}
          priority
        />
      </div>
      
    <div className="big-glow" aria-hidden />
    <div className="big-glow2" aria-hidden />

      {/* <Blob ... /> */}
      <SubscriptionForm />

    </main>
  );
}