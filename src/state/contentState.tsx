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
    updateContent: (id: string, updates: Partial<ContentType>) => void;
    getUpdates: (id: string) => { canShared: boolean, link: string }
}



const useContentStore = create<contentStore>()((set, get) => ({
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
    },
    updateContent: (id, updates) =>
        set((state) => ({
            contents: state.contents.map((content) =>
                content._id === id ? { ...content, ...updates } : content
            ),
        })),
    //@ts-ignore
    getUpdates: (id) => {
        const state = get();
        //@ts-ignore
        const content: ContentType = state.contents.find((c) => c._id === id);

        if (content) {
            return {
                canShared: content.canShared,
                link: content.shareLink,
            };
        }

    },

}))
export { useContentModalStore, useContentStore }