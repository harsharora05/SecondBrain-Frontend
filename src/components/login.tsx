import { useRef } from "react"
import { LoginIcon2 } from "../assets/loginIcon"
import { Button } from "./button"
import { CloseIcon } from "../assets/closeIcon";
import axios from "axios";
import { useLoginStore, useLogSignStore } from "../state/authState";


interface LoginModalType {
    isOpen: boolean
    setOpen: () => void
}




export const LoginModal = (props: LoginModalType) => {
    const isLogSign = useLogSignStore((state) => state.isLogSign);
    const toggleLogSign = useLogSignStore((state) => state.toggleLogSign);


    const toggleLogin = useLoginStore((state) => state.toggleLogin);
    const addUsername = useLoginStore((state) => state.addUsername);



    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPassordRef = useRef<HTMLInputElement>(null);

    const signUp = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPassordRef.current?.value;

        const response = await axios.post('http://localhost:3000/api/v1/signUp', {
            username,
            password,
            confirmPassword,
        })

        if (usernameRef.current) usernameRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
        if (confirmPassordRef.current) confirmPassordRef.current.value = "";

        toggleLogSign();


    }

    const signIn = async () => {
        const username = usernameRef.current?.value as string;
        const password = passwordRef.current?.value as string;

        const response = await axios.post('http://localhost:3000/api/v1/signIn', {
            username,
            password,
        })
        console.log(response.data);

        if (usernameRef.current) usernameRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";

        props.setOpen();

        toggleLogin();

        addUsername(response.data.username);
        localStorage.setItem("username", response.data.username);

        localStorage.setItem("token", response.data.token);

    }

    return <div>

        {props.isOpen && <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center ">

            <div className="bg-white  w-100 flex flex-col p-8 gap-2 rounded-md">
                <div className="cursor-pointer flex justify-end pb-4" onClick={() => { props.setOpen() }}>
                    <CloseIcon size={"size-6"} />
                </div>
                <input type="text" ref={usernameRef} className="border border-slate-300 rounded-md px-4 py-2 " placeholder="Username" />
                <input type="password" ref={passwordRef} className="border border-slate-300 rounded-md px-4 py-2 " placeholder="Password" />
                {isLogSign && <input type="password" ref={confirmPassordRef} className="border border-slate-300 rounded-md px-4 py-2 " placeholder="Confirm Password" />}

                <div className="flex justify-center p-4">
                    <Button text={isLogSign ? "SignUp" : "Login"} onClick={isLogSign ? signUp : signIn} style="Primary" startIcon={<LoginIcon2 />} />
                </div>

                <div className="flex justify-center">
                    {isLogSign ? <p>Have Account? <span className="text-blue-400 hover:cursor-pointer" onClick={toggleLogSign}>Login Here</span> </p>
                        : <p> Don't Have Account?  <span className="text-blue-400 hover:cursor-pointer" onClick={toggleLogSign}>SignUp Here</span> </p>}

                </div>


            </div>



        </div>}
    </div >
}