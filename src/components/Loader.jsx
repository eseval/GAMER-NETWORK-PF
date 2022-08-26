import React from 'react';
import loaderGif from '../assets/loader/loader.gif';

export default function Loader({ width }) {
  return (
    <div>
      <img src={loaderGif} alt='loader' className={`w-${width} mx-auto`}/>
    </div>
  );
}