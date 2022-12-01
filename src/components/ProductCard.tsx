import useProductStore from "../store/useProductStore";
import type { Product } from "../types";
import { trpc } from "../utils/trpc";
import { Button } from "./Button";

interface Props {
  product: Product;
}
export const ProductCard = ({ product }: Props) => {
  const utils = trpc.useContext();

  const [selectProduct] = useProductStore((state) => [
    state.selectProduct,
    state.selectedProductId,
  ]);
  const removeProduct = trpc.products.remove.useMutation({
    onSuccess: () => {
      utils.products.list.invalidate();
      selectProduct("");
    },
  }).mutateAsync;

  return (
    <div
      className="flex max-w-lg cursor-pointer gap-1 break-words border-2 border-slate-800 bg-white p-4 shadow-xl"
      onClick={() => selectProduct(product.id)}
    >
      <img
        className="my-2 mr-2 block max-h-[180px] max-w-[180px] shadow-lg outline outline-gray-100"
        src={product.image}
        alt={product.name}
        width={180}
        height={180}
      />

      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-ellipsis">{product.description}</p>
      </div>

      <div className="flex items-end justify-end">
        <Button
          variant="delete"
          onClick={() => removeProduct({ id: product.id })}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
