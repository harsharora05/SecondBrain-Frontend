import { create } from "zustand";
import type { ContentType } from "../Types/contentType";


interface contentModalStore {
    isOpen: boolean,
    setOpen: () => void
}


const useContentModalStore = create<contentModalStore>()((set) => ({
    isOpen: false,
    setOpen: () => set((state) => ({ isOpen: !state.isOpen }))
}))






interface contentStore {
    contents: ContentType[],
    addContent: (content: ContentType) => void
    removeContent: (id: string) => void
    LoadContent: (data: ContentType[]) => void
    clearContent: () => void
}



const useContentStore = create<contentStore>()((set) => ({
    contents: [],
    addContent: (content: ContentType) => { set((state) => ({ contents: [...state.contents, content] })) },
    removeContent: (id: string) =>
        set((state) => ({
            contents: state.contents.filter((cntent) => cntent._id !== id)
        })),
    LoadContent: async (data: ContentType[]) => {
        set({ contents: data })
    },
    clearContent: () => {
        set({ contents: [] })
    }
}))
export { useContentModalStore, useContentStore }