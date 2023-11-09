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
<<<<<<< HEAD
        setIsLoading(false);
            setIsUser(true);
        if(pathname === '/' || pathname === '/[slug]' || pathname === '/forgetpassword' || pathname === '/registration' || pathname === '/resetpassword/[resetpassword]'){
=======
        if(pathname === '/' || pathname === '/[slug]'){
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
            setIsLoading(false);
            setIsUser(true);
        }
        else{
            const token = AuthService.getToken();
            if(!token){
                router.push("/login");
                setIsLoading(false);
            }else{
                checkUserData();
            }
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
<<<<<<< HEAD
    
    if(!isUser && !isLoading){
=======

    if(!isLoading){
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
        return <LoginPage />;
    }

}

export default Layout;

