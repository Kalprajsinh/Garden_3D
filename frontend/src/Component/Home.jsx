import { useState } from 'react'
import '../App.css'
import Navbar from './navbar'
import ImageSlider from './slider'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full h-screen text-white bg-custom-green bg-opacity-80">
        {/* <video autoPlay muted loop className="absolute inset-0 -z-10 object-cover w-full h-screen">
          <source src="/bg.mp4" type="video/mp4" />
        </video> */}
        <div className="absolute inset-0 -z-10 object-cover w-full h-screen overflow-hidden">
          <img className='h-full w-full object-cover' src="https://upload.wikimedia.org/wikipedia/commons/4/46/Keukenhof-Szmurlo.jpg" alt="Background" />
        </div>
        <div className='absolute inset-0 -z-10 object-cover w-full h-screen overflow-hidden flex justify-center items-end'>
          <div className="w-4/5 h-2/3 md:w-5/12 md:h-5/6 rounded-full bg-lime-200 bg-opacity-40 blur"></div>
        </div>
        <Navbar />
        <div className="flex flex-col justify-center items-center h-2/3 px-4 text-center md:text-left">
          <div>
            <div className="font-bold text-3xl md:text-5xl mb-4 flex justify-center items-center">Herb Explorer 3D</div>
            <div className="text-sm md:text-base flex justify-center items-center">Explore Ayurveda like never before with Herb Explorer 3D, an interactive virtual garden featuring 3D plant models,</div>
            <div className="text-sm md:text-base flex justify-center items-center">detailed medicinal information, and personalized search and bookmarking options.</div>
          </div>
        </div>
        <div className="flex justify-center items-center h-1/3 px-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 ">
            <div className="pb-10 md:pb-20 ">
              <div className="font-bold text-xl md:text-2xl flex justify-center items-center">Enhanced Herbal Knowledge</div>
              <div className="text-sm md:text-base flex justify-center items-center">Interactive 3D insights on Ayurvedic plants.</div>
            </div>
            <div className="pb-10 md:pb-0">
              <div className="font-bold text-xl md:text-2xl flex justify-center items-center">Personalized Wellness Journey</div>
              <div className="text-sm md:text-base flex justify-center items-center">Find and bookmark plants for health.</div>
            </div>
            <div className="pb-10 md:pb-0">
              <div className="font-bold text-xl md:text-2xl flex justify-center items-center">Engaging Learning Experience</div>
              <div className="text-sm md:text-base flex justify-center items-center">Immersive herbal learning with 3D models.</div>
            </div>
          </div>
        </div>
      </div>
      <ImageSlider />
      <div className='w-full h-1/2 flex flex-col md:flex-row justify-center items-center'>
        <div className='w-full md:w-1/2 h-full bg-light-custom-green'>
        </div>
        <div className='w-full md:w-1/2 h-full bg-custom-green'>
        </div>
      </div>
    </>
  )
}

export default Home 
