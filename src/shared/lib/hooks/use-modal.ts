import { create } from 'zustand';

export type ModalType = 'pro-modal';

interface UseModalStore {
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<UseModalStore>((set) => ({
  type: null,
  isOpen: false,
  onClose: () => set({ type: null, isOpen: false }),
  onOpen: (type) => set({ type, isOpen: true }),
}));
