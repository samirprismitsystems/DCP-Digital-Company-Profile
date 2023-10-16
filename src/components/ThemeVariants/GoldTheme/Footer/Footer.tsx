import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <section className='bg-gray-200 text-center xs:px-[7rem] md:px-4 text-black py-14 px-4'>
      <span className='text-[1.8rem]'>All Rights Reserved. &copy; 2015 </span>
      <span className='inline-block py-4'><Link className='text-[1.8rem] xs:py-4 md:py-0 border-b border-b-blue-600 border-dotted text-blue-600' href="https://www.prismitsystems.com/" target='_blank'>Prism IT Systems</Link></span>
    </section>
  )
}
