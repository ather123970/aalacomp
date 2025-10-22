import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import WhatsAppButton from './WhatsAppButton';
export default function FloatingButtons({ whatsappHref = 'https://wa.me/923125066195' } = {}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  const el = (
    <div>
      <div style={{ position: 'fixed', right: 16, bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end', zIndex: 12000 }}>
        {/* WhatsApp button */}
        <WhatsAppButton href={whatsappHref} />
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(el, document.body);
}
