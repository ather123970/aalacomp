import React from 'react';

export default function WhatsAppButton({ href = 'https://wa.me/923125066195', ariaLabel = 'WhatsApp' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} style={{ width: 52, height: 52, borderRadius: 9999, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', textDecoration: 'none', color: '#fff' }}>
           <img src="https://img.freepik.com/premium-vector/whatsapp-vector-logo-icon-logotype-vector-social-media_901408-406.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
    </a>
  );
}
