import { useState } from 'react'
import '../App.css'
import Hero from '../Component/hero'

function Garden1() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-screen'>
    <Hero />
    </div>
  )
}

export default Garden1
