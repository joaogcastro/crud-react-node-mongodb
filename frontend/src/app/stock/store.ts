// store.ts
import create from 'zustand';

interface StoreState {
    selectedProductId: string | null;
    setSelectedProductId: (id: string | null) => void;
    lowStockProducts: string[];
    setLowStockProducts: (ids: string[]) => void;
}

export const useStore = create<StoreState>((set) => ({
    selectedProductId: null,
    setSelectedProductId: (id) => set({ selectedProductId: id }),
    lowStockProducts: [],
    setLowStockProducts: (ids) => set({ lowStockProducts: ids }),
}));
