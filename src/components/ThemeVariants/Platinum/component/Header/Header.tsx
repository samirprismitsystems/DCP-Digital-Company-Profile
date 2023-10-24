import React from 'react'
import Hero from './Hero/Hero'
import Navbar from "./AppBar/AppBar"
import Services from '../Services/Services'

export default function AppBar() {
  return (
    <section className="header_area">
      <Navbar />
      <Hero />
      <Services/>
    </section>
  )
}
