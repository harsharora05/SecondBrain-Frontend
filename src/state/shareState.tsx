import { create } from "zustand";

interface shareModal {
    isModal: boolean,
    toggleShareModal: () => void
}


export const useShareModal = create<shareModal>()((set) => ({
    isModal: false,
    toggleShareModal: () => set((state) => ({ isModal: !state.isModal }))
}))



interface shareContentModal {
    contentId: string
    setId: (id: string) => void

}

export const useShareContentModal = create<shareContentModal>()((set) => ({
    contentId: "",
    setId: (id: string) => { set(() => ({ contentId: id })) },
}))



