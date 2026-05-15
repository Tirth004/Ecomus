import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  return (
    <div>
      <div className="breadcrumb-custom"><div className="container"><Link to="/">Home</Link><span className="separator">›</span><span className="current">Contact</span></div></div>

      <div className="contact-page container">
        <div style={{textAlign:'center',marginBottom:50}}>
          <h1 className="section-title">Get In Touch</h1>
          <p style={{color:'var(--text-secondary)'}}>We'd love to hear from you. Our team is always here to help.</p>
        </div>

        <div className="row g-4 mb-5">
          {[{icon:'bi-geo-alt',title:'Our Store',info:'123 Fashion Avenue\nNew York, NY 10001, USA'},
            {icon:'bi-telephone',title:'Phone',info:'+1 (234) 567-8901\nMon-Fri: 9am - 6pm'},
            {icon:'bi-envelope',title:'Email',info:'hello@ecomus.com\nsupport@ecomus.com'}
          ].map(c => (
            <div key={c.title} className="col-md-4">
              <div className="contact-info-card">
                <div className="icon"><i className={`bi ${c.icon}`}></i></div>
                <h5>{c.title}</h5>
                <p style={{whiteSpace:'pre-line'}}>{c.info}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="contact-form">
              <h3 style={{marginBottom:24,fontSize:20,fontWeight:700}}>Send a Message</h3>
              {submitted ? (
                <div style={{textAlign:'center',padding:'40px 0'}}>
                  <i className="bi bi-check-circle-fill" style={{fontSize:48,color:'#22c55e',display:'block',marginBottom:12}}></i>
                  <h4>Message Sent!</h4>
                  <p style={{color:'var(--text-secondary)'}}>We'll get back to you within 24 hours.</p>
                  <button className="btn-primary-custom mt-3" onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Your Name *</label>
                        <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Subject</label>
                        <input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="How can we help?" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Message *</label>
                        <textarea required rows={5} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Write your message here..." />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-primary-custom">
                        <i className="bi bi-send me-2"></i>Send Message
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div style={{height:'100%',minHeight:400,background:'var(--light-gray)',borderRadius:'var(--radius-lg)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12}}>
              <i className="bi bi-map" style={{fontSize:48,color:'var(--mid-gray)'}}></i>
              <p style={{color:'var(--text-secondary)',fontSize:14}}>Map View — 123 Fashion Avenue, NY</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{marginTop:60}}>
          <h2 className="section-title" style={{marginBottom:24}}>Frequently Asked Questions</h2>
          <div className="row g-4">
            {[
              {q:'What is your return policy?',a:'We offer a hassle-free 30-day return policy on all items. Items must be unworn and in original condition with tags attached.'},
              {q:'How long does shipping take?',a:'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee.'},
              {q:'Do you ship internationally?',a:'Yes! We ship to over 80 countries worldwide. International shipping times vary by destination.'},
              {q:'How can I track my order?',a:'Once your order ships, you\'ll receive a tracking number via email. Use it to track your package in real-time.'},
            ].map((faq, i) => (
              <div key={i} className="col-md-6">
                <div style={{background:'var(--light-gray)',borderRadius:'var(--radius-lg)',padding:20}}>
                  <h6 style={{fontWeight:700,marginBottom:8}}>{faq.q}</h6>
                  <p style={{fontSize:13,color:'var(--text-secondary)',margin:0,lineHeight:1.7}}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
