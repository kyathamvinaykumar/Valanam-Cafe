import React, { useEffect } from 'react';
import VisitSection from '../components/VisitSection';

export default function Visit() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const footerElement = document.getElementById('footer');
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-[100px] md:pt-[120px]">
      <VisitSection />
    </div>
  );
}
