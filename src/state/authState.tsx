import { create } from "zustand";

// inner state change b/w login and signUp modal
interface logSignStore {
    isLogSign: boolean
    toggleLogSign: () => void
}


const useLogSignStore = create<logSignStore>((set) => ({
    isLogSign: false,
    toggleLogSign: () => set((state) => ({ isLogSign: !state.isLogSign })),
}));



// login modal state
interface loginModalStore {
    isLoginModal: boolean
    toggleLoginModal: () => void
}

const useloginModalStore = create<loginModalStore>((set) => ({
    isLoginModal: false,
    toggleLoginModal: () => set((state) => ({ isLoginModal: !state.isLoginModal })),
}));



// isLogin tells about user is logged in or not 

interface loginStore {
    isLogin: boolean
    username: string
    toggleLogin: () => void
    addUsername: (n: string) => void
    removeUsername: () => void
}

const useLoginStore = create<loginStore>()((set) => ({
    isLogin: localStorage.getItem("token") ? true : false,
    username: localStorage.getItem("username") as string,
    toggleLogin: () => set((state) => ({ isLogin: !state.isLogin })),
    addUsername: (name: string) => set(() => ({ username: name })),
    removeUsername: () => { set(() => ({ username: "" })) }
}))



export { useLogSignStore, useloginModalStore, useLoginStore };