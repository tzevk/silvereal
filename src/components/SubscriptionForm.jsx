'use client';
import { useState } from 'react';
import styles from '../styles/subscription.module.css';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for subscribing!'
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.subscriptionContainer}>
      <div className={styles.comingSoon}>COMING SOON</div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className={styles.input}
            disabled={isSubmitting}
            name="email"
            id="email"
            autoComplete="email"
            required
          />
          <button 
            type="submit" 
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? '...' : 'sign up'}
          </button>
        </div>
        
        {status.message && (
          <p className={`${styles.message} ${styles[status.type]}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
