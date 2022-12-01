import create from "zustand";

interface ProductState {
  selectedProductId?: string;
  selectProduct: (id: string) => void;
  createNewProduct: () => void;
}

const useProductStore = create<ProductState>((set) => ({
  selectedProductId: undefined,
  selectProduct: (id: string) =>
    set((state) => ({ selectedProductId: (state.selectedProductId = id) })),
  createNewProduct: () =>
    set((state) => ({ selectedProductId: (state.selectedProductId = "-1") })),
}));

export default useProductStore;
