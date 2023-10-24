import styles from "./styles/appBar.module.scss";

export default function AppBar() {
    return (
        <>
            <div className={`navbar-area bg-white sticky top-platinum0 left-platinum0 w-full z-20 ${styles.appBarEffect}`}>
                <div className="container relative">
                    <div className="row items-center">
                        <div className="w-full">
                            <nav className="flex items-center justify-between py-platinum4 navbar navbar-expand-lg">
                                <a className="navbar-brand mr-platinum5" href="/">
                                    <img src="assets/themes/platinum/logo.svg" alt="Logo" />
                                </a>
                                <button className="text-[2rem] block platinumLg:hidden text-red-500" type="button">
                                    done
                                </button>

                                <div className="absolute left-0 z-20 hidden w-full px-platinum5 py-platinum3 duration-300 bg-white platinumLg:w-auto navbar-collapse platinumLg:block top-full mt-full platinumLg:static platinumLg:bg-transparent shadow platinumLg:shadow-none" id="navbarOne">
                                    <ul id="nav" className="items-center content-start mr-auto platinumLg:justify-end navbar-nav platinumLg:flex">
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1 active" href="#home">Home</a>
                                        </li>
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#about">About</a>
                                        </li>
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#services">Services</a>
                                        </li>
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#work">Projects</a>
                                        </li>
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#pricing">Pricing</a>
                                        </li>
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#blog">Blog</a>
                                        </li>
                                        <li className="nav-item py-2 ml-platinum5 platinumLg:ml-platinum12">
                                            <a className="page-scroll py-platinum1" href="#contact">Contact</a>
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
