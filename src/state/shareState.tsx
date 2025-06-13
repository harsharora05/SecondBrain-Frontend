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
    shareable: boolean
    setShareable: (isShare: boolean) => void
    setId: (id: string) => void

}

export const useShareContentModal = create<shareContentModal>()((set) => ({
    contentId: "",
    shareable: false,
    setId: (id: string) => { set(() => ({ contentId: id })) },
    setShareable: (isShare: boolean) => { set(() => ({ shareable: isShare })) },
}))

