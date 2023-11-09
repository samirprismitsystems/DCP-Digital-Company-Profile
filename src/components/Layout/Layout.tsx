import ApiService from "@/services/ApiServices";
import { useRouter } from "next/router";
import React, { useEffect, PropsWithChildren, useState } from "react";
import LoginPage from "@/components/Common/LoginPage/LoginPage";
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
        setIsLoading(false);
            setIsUser(true);
        if(pathname === '/' || pathname === '/[slug]'){
            setIsLoading(false);
            setIsUser(true);
        }
        else{
            const token = AuthService.getToken();
            if(!token){
                if (pathname === "/login" || pathname === '/forgetpassword' || pathname === '/registration' || pathname === '/resetpassword/[resetpassword]') {
                    router.push(pathname);
                }else{
                    router.push('/login');
                }
                setIsLoading(false);
                setIsUser(false);
            }else{
                console.log("check in progress");
                checkUserData();
            }
        }
    }, [token])

    const checkUserData = async () => {
        const token = AuthService.getToken();
        let userData = new FormData();
        userData.append("token",token ? token : '');

        const res = await ApiService.checkUser(userData);
        if(!res.error){
            if (pathname === "/login" || pathname === '/forgetpassword' || pathname === '/registration' || pathname === '/resetpassword/[resetpassword]') {
                if (AuthService.getUserType() === USER_TYPE.ADMIN) {
                    router.push("/admindashboard");
                } else {
                    router.push("/dashboard");
                }
            }
            setTimeout(() => {
                setIsUser(true);
                setIsLoading(false);
            }, 600);
        }else{
            setIsLoading(false);
            router.push(pathname);
        }
    }

    if (isUser === true && !isLoading) {
        return children;
    }
    
    if(!isUser && !isLoading){
        if (pathname === "/login" || pathname === '/forgetpassword' || pathname === '/registration' || pathname === '/resetpassword/[resetpassword]') {
            return children;
        }
        else{
            return <LoginPage />;
        }
    }

}

export default Layout;

