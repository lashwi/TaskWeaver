import Image from 'next/image'
import React from "react";
import GridCanvas from '@/components/Canvas';

export default function Home() {
  return (
    <div style={{ background: 'white' }}>
      <h1 style={{ color: 'black' }}>Grid Canvas Example</h1>
      <GridCanvas />
    </div>
  );
}
