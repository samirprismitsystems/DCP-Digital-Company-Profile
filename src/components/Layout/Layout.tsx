import ApiService from "@/services/ApiServices";
import { useRouter } from "next/router";
import React, { useEffect, PropsWithChildren, useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import AuthService from "@/services/AuthServices";
import { USER_TYPE } from "@/services/Enums";

interface ILayoutProps extends PropsWithChildren<any> {}

const  Layout = ({ children }: ILayoutProps ) => {

    const [isUser, setIsUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { pathname } = router;
    const token = AuthService.getToken();

    useEffect(() => {
        const token = AuthService.getToken();
        if(!token){
            router.push("/login");
            setIsLoading(false);
        }else{
            checkUserData();
        }
    }, [token])

    const checkUserData = async () => {
        const token = AuthService.getToken();
        let userData = new FormData();
        userData.append("token",token ? token : '');

        const res = await ApiService.checkUser(userData);
        
        if(res.error === false){
            setIsUser(true);
            setIsLoading(false);
            if (pathname === "/login") {
                if (AuthService.getUserType() === USER_TYPE.ADMIN) {
                    router.push("/admindashboard");
                } else {
                    router.push("/dashboard");
                }
            }
        }else{
            setIsLoading(false);
            router.push('/login');
        }
    }

    if (isUser === true && !isLoading) {
        return children;
    }

    if(!isLoading){
        return <LoginPage />;
    }

}

export default Layout;
