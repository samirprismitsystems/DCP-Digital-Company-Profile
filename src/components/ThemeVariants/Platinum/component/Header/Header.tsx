import React from 'react'
import Hero from './Hero/Hero'
import Navbar from "./AppBar/AppBar"

export default function AppBar() {
  return (
    <section className="header_area">
      <Navbar />
      <Hero />
    </section>
  )
}
