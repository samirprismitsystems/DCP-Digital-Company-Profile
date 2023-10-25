import Navbar from "./AppBar/AppBar"
import Hero from './Hero/Hero'

export default function AppBar() {
  return (
    <section className="header_area">
      <Navbar />
      <Hero />
    </section>
  )
}
