
export default function AppBar() {
    return (
        <>
            <div className="appBar w-full py-3 sm:py-5">
                <div className="container flex items-center justify-between">
                    <div>
                        <a href="/">
                            <img src="assets/img/logo.svg" className="w-80" alt="logo image" />
                        </a>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="flex items-center">

                            <li className="group pl-6">

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Home</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"
                                ></span>
                            </li>
                            <li className="group pl-6">

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >About</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"
                                ></span>
                            </li>

                            <li className="group pl-6">

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Services</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"
                                ></span>
                            </li>

                            <li className="group pl-6">

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Portfolio</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"
                                ></span>
                            </li>

                            <li className="group pl-6">

                                <span
                                    className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white"
                                >Contact</span>

                                <span
                                    className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"
                                ></span>
                            </li >

                        </ul >
                    </div >
                    <div className="block lg:hidden">
                        <button>
                            <i className="bx bx-menu text-4xl text-white"></i>
                        </button>
                    </div >
                </div >
            </div >
        </>
    )
}
