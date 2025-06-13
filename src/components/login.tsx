
import { LoginIcon2 } from "../assets/loginIcon"
import { Button } from "./button"
import { CloseIcon } from "../assets/closeIcon";
import axios from "axios";
import { useLoginStore, useLogSignStore } from "../state/authState";
import { useForm } from "react-hook-form";
import { OrbitProgress } from "react-loading-indicators";
import { toast } from "react-toastify";


interface LoginModalType {
    isOpen: boolean
    setOpen: () => void
}

type Credentials = {
    "username": string,
    "password": string
    "confirmPassword"?: string
}


export const LoginModal = (props: LoginModalType) => {


    const isLogSign = useLogSignStore((state) => state.isLogSign);
    const toggleLogSign = useLogSignStore((state) => state.toggleLogSign);


    const toggleLogin = useLoginStore((state) => state.toggleLogin);
    const addUsername = useLoginStore((state) => state.addUsername);



    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<Credentials>();
    const password = watch("password");




    const signUp = async (data: Credentials) => {

        try {
            const response = await axios.post('http://localhost:3000/api/v1/signUp', {
                "username": data.username,
                "password": data.password,
                "confirmPassword": data.confirmPassword,
            });


            if (response.status == 200) {
                toast.success(response.data.message);
            }
            toggleLogSign();
            reset({
                username: "",
                password: "",
                confirmPassword: ""
            });
        } catch (e: any) {
            if (e.response.status == 400) {
                toast.error(e.response.data.message);
            } else if (e.response.status == 500) {
                toast.error(e.response.data.message);
            }
        }








    }

    const signIn = async (data: Credentials) => {


        try {

            const response = await axios.post('http://localhost:3000/api/v1/signIn', {
                "username": data.username,
                "password": data.password,
            })

            if (response.status == 200) {
                toast.success(response.data.message);
            }
            props.setOpen();

            toggleLogin();
            reset({
                username: "",
                password: ""
            });

            addUsername(response.data.username);
            localStorage.setItem("username", response.data.username);

            localStorage.setItem("token", response.data.token);
        } catch (e: any) {
            if (e.response.status == 400) {
                toast.error(e.response.data.message);
            } else if (e.response.status == 500) {
                toast.error(e.response.data.message);
            }
        }


    }



    return <div>

        {props.isOpen && <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center ">

            <div className="bg-white  w-100 flex flex-col p-8 gap-2 rounded-md">
                <div className="cursor-pointer flex justify-end pb-4" onClick={() => {
                    props.setOpen();
                    reset({
                        username: "",
                        password: "",
                        confirmPassword: ""
                    });
                }}>
                    <CloseIcon size={"size-6"} />
                </div>
                <form className="flex flex-col gap-5 justify-center items-center">
                    <input type="text" {...register("username", { required: "Username is required", minLength: { value: 3, message: "Minimum 3 characters" }, maxLength: { value: 10, message: "Maximum 10 characters" } })} className="border border-slate-300 rounded-md px-4 py-2 " placeholder="Username" />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                    <input type="password"  {...register("password", { required: "Password is required", minLength: { value: 3, message: "Minimum 8 characters" }, maxLength: { value: 10, message: "Maximum 20 characters" } })} className="border border-slate-300   rounded-md px-4 py-2 " placeholder="Password" />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                    {isLogSign && <input type="password" {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === password || "Passwords do not match"
                    })} className="border border-slate-300 rounded-md px-4 py-2 " placeholder="Confirm Password" />}
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                    <div className="flex justify-center p-4"  >
                        {isSubmitting ? <OrbitProgress size="medium" color={"#3d37a6"} />
                            : <Button text={isLogSign ? "SignUp" : "Login"} onClick={isLogSign ? handleSubmit((data) => signUp(data)) : handleSubmit((data) => signIn(data))} style="Primary" startIcon={<LoginIcon2 />} />}
                    </div>

                </form>

                <div className="flex justify-center">
                    {isLogSign ? <p>Have Account? <span className="text-blue-400 hover:cursor-pointer" onClick={toggleLogSign}>Login Here</span> </p>
                        : <p> Don't Have Account?  <span className="text-blue-400 hover:cursor-pointer" onClick={toggleLogSign}>SignUp Here</span> </p>}

                </div>


            </div>



        </div>}
    </div >
}