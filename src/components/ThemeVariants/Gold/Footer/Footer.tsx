import Link from 'next/link'
import FollowUs from '../ContactUs/FollowUs/FollowUs'

export default function Footer() {
  return (
    <section id="contact" className='bg-gray-200 text-center text-black py-8'>
      <div className="container flex items-center justify-between flex-col platinumLg:flex-row">
        <div>
          <span className='text-[1.8rem]'>&copy; Copyright 2009 - 2023 All Rights Reserved </span>
          <span className='inline-block py-4'><Link className='text-[1.8rem] xs:py-4 md:py-0 border-b border-b-blue-600 border-dotted text-blue-600' href="https://www.prismitsystems.com/" target='_blank'>Prism IT Systems</Link></span>
        </div>
        <div className="iconPacks flex items-center justify-center">
          <FollowUs />
        </div>
      </div>
    </section>
  )
}
