import React, { useEffect, useRef } from 'react';
import Hero from './hero';
import Slider_Model1 from './slider_model';
import Slider_Model2 from './slider_model2';
import Slider_Model3 from './slider_model3';
import Slider_Model4 from './slider_model4';

const ImageSlider = () => {
  return (
    <div className="w-full py-10">
      <h2 className="text-3xl font-bold m-2">Explore Our Gardens</h2>
      <div
      >
        <div className="flex space-x-4 h-96 overflow-x-scroll" >
          <Slider_Model1 />
          <Slider_Model2 />
          <Slider_Model3 />
          <Slider_Model4 />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
