import React from 'react'

export default function AppBar() {
  return (
    <>
      <div className="navbar-area bg-white">
        <div className="container relative">
          <div className="row items-center">
            <div className="w-full">
              <nav className="flex items-center justify-between py-4 navbar navbar-expand-lg">
                <a className="navbar-brand mr-5" href="index.html">
                  <img src="assets/images/logo.svg" alt="Logo"/>
                </a>
                {/* <button className="block navbar-toggler focus:outline-none platinumLg:hidden" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation"> */}
                <button type='button' className="block focus:outline-none platinumLg:hidden">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div className="left-0 z-20  px-5 py-3 duration-300 hidden justify-end platinumLg:block bg-white w-auto top-full mt-full static platinumLg:bg-transparent shadow-none" id="navbarOne">
                  <ul id="nav" className="mr-auto justify-end navbar-nav flex">
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll active" href="#home">Home</a>
                    </li>
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll" href="#about">About</a>
                    </li>
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll " href="#services">Services</a>
                    </li>
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll " href="#work">Projects</a>
                    </li>
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll " href="#pricing">Pricing</a>
                    </li>
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll " href="#blog">Blog</a>
                    </li>
                    <li className="nav-item ml-5 platinumLg:ml-11">
                      <a className="page-scroll " href="#contact">Contact</a>
                    </li>
                  </ul>
                </div> 
              </nav> 
            </div>
          </div> 
        </div> 
      </div>
    </>
  )
}
