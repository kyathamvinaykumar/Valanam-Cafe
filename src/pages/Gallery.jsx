import React from 'react';
import SpaceSection from '../components/SpaceSection';
import KitchenSection from '../components/KitchenSection';

export default function Gallery({ onImageClick }) {
  return (
    <div className="pt-[100px] md:pt-[120px]">
      <SpaceSection onImageClick={onImageClick} />
      <KitchenSection onImageClick={onImageClick} />
    </div>
  );
}
