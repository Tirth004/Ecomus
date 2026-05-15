import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div style={{maxWidth:600, margin:'0 auto'}}>
          <i className="bi bi-envelope-heart" style={{fontSize:40, color:'var(--secondary)', display:'block', marginBottom:12}}></i>
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest fashion updates, exclusive deals and style tips delivered straight to your inbox.</p>
          {submitted ? (
            <div style={{background:'var(--primary)', color:'#fff', padding:'16px 24px', borderRadius:50, fontSize:14, fontWeight:600}}>
              🎉 Thank you for subscribing! Check your inbox for a welcome gift.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
          <p style={{fontSize:12, color:'var(--text-secondary)', marginTop:12}}>
            By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
