import { create } from "zustand";

export type tag = {
    id: string
    tagContent: string
}

interface tagStore {
    tags: tag[],
    addTag: (tag: tag) => void
    removeTag: (id: string) => void
    clearTag: () => void
}



export const useTagStore = create<tagStore>((set) => ({
    tags: [],
    addTag: (tag: tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (id: string) => set((state) => ({ tags: state.tags.filter((tg) => tg.id !== id) })),
    clearTag: () => set(() => ({ tags: [] })),

}))