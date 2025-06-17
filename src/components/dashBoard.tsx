import { SideBar } from "./sideBar";
import { LoginModal } from "./login";
import { AddContentModal } from "./addContentModal";
import { useloginModalStore, useLoginStore } from "../state/authState";
import { Route, Routes, Outlet } from "react-router-dom";
import clsx from "clsx";
import { useContentModalStore, useContentStore } from "../state/contentState";
import { Button } from "./button";
import { MainContent } from "./mainContent";
import { ButtonIcon } from "../assets/buttonIcon";
import { LoginIcon } from "../assets/loginIcon";
import { ContentPage } from "./ContentDisplayPage";
import { SharePopup } from "./shareModal";
import { toast, ToastContainer } from "react-toastify";
import { YoutubeContent } from "./youtubeContent";
import { TweetContent } from "./tweetContent";
import { DocumentContent } from "./documentContent";
import { SharedContentPage } from "./shareContentDisplay";




const DashBoardLayout = () => {


    const isLogin = useLoginStore((state) => state.isLogin);

    const username = useLoginStore((state) => state.username);

    const toggleLogin = useLoginStore((state) => state.toggleLogin);

    const removeUsername = useLoginStore((state) => state.removeUsername);





    const contents = useContentStore((state) => state.contents);


    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        toggleLogin();
        removeUsername();
        toast.success("Logged Out");

    }


    const isLoginModal = useloginModalStore((state) => state.isLoginModal)
    const toggleLoginModal = useloginModalStore((state) => state.toggleLoginModal)

    const isContentModal = useContentModalStore((state) => state.isOpen)
    const setContentModal = useContentModalStore((state) => state.setOpen)





    return <div>




        <SideBar />

        <div className={clsx("px-8 py-4 ml-72 flex flex-col bg-gray-100", contents.length > 6 ? "h-full" : "h-screen")}>
            <div className="flex justify-between items-center gap-2">
                <div>
                    <h1 className="text-2xl font-bold font-serif">
                        All Notes
                    </h1>
                </div>
                {isLogin && <div className="flex items-center gap-3 ">
                    <Button style={"Primary"} text="Add Content" onClick={() => setContentModal()} startIcon={<ButtonIcon />} />
                    <div className="flex flex-col items-center justify-center group">
                        <Button style={"Secondary"} text={username} />
                        <p className="absolute  top-14 bg-gray-200/75 py-2 px-3 rounded-b opacity-0 hover:cursor-pointer group-hover:opacity-100 transition delay-150 duration-300 ease-in-out" onClick={logout}>Logout</p>
                    </div>
                </div>}
                {!isLogin && <Button style={"Secondary"} text="Login" onClick={toggleLoginModal} startIcon={<LoginIcon />} />}
            </div>


            <Outlet />




        </div>







        <LoginModal isOpen={isLoginModal} setOpen={toggleLoginModal} />

        <SharePopup />

        <AddContentModal isOpen={isContentModal} setOpen={() => setContentModal()} />

        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
    </div >


}



const DashBoard = () => {

    return <Routes>
        <Route path="/" element={<DashBoardLayout />}>
            <Route index element={<MainContent />} />
            <Route path="/tweets" element={<TweetContent />} />
            <Route path="/youtube" element={<YoutubeContent />} />
            <Route path="/documents" element={<DocumentContent />} />
        </Route>
        <Route path="/content/:id" element={<ContentPage />} />
        <Route path="/content-share/:shareId" element={<SharedContentPage />} />
    </Routes>

}

export { DashBoard };