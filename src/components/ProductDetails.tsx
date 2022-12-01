import { useEffect, useState } from "react";
import useProductStore from "../store/useProductStore";
import type { Product } from "../types";
import { trpc } from "../utils/trpc";
import { Button } from "./Button";

const ProductDetails = () => {
  const utils = trpc.useContext();
  const [product, setProduct] = useState<Product>();
  const id = useProductStore((state) => state.selectedProductId);
  const { data, isLoading } = trpc.products.list.useQuery();
  const { mutateAsync: upsertProduct } = trpc.products.upsert.useMutation({
    onSuccess(data) {
      utils.products.list.invalidate();
      setProduct(data);
    },
  });
  useEffect(() => {
    if (data) {
      const prod = data.find((p) => p.id === id);
      if (prod) setProduct(prod);
    }
  }, [data, id]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    prop: keyof Product
  ) => {
    setProduct((val: any) => {
      return { ...val, [prop]: e.target.value };
    });
  };

  if (!data || isLoading || !product) return <div>loading...</div>;

  return (
    <div className="t-0 fixed  mt-4 h-[85%] overflow-auto border-2 border-slate-800 bg-white p-4 shadow-lg">
      {id === "" ? (
        <div>Add new Product</div>
      ) : (
        <img
          className="my-2 mr-2 block max-h-[180px] max-w-[320px] shadow-xl outline outline-gray-300"
          src={product.image}
          alt={product.name}
          width={320}
        />
      )}

      <form className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={product.name}
            onChange={(e) => handleOnChange(e, "name")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            className="min-h-[8rem]"
            id="description"
            value={product.description}
            onChange={(e) => handleOnChange(e, "description")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <div className="flex items-center gap-2">
            <input
              className="inline-block w-[8rem]"
              id="price"
              type="number"
              value={parseInt(`${product.price}`)}
              onChange={(e) => handleOnChange(e, "price")}
            />
            $
            <div className="my-4 ml-auto">
              <Button
                type="submit"
                variant="edit"
                onClick={() => {
                  const { id, image, price, ...rest } = product;
                  // bad workaround
                  const _price = parseInt(`${price}`);
                  if (id === "" && image === "") {
                    upsertProduct({
                      ...rest,
                      price: _price,
                    });
                  } else {
                    upsertProduct({ ...product, price: _price });
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
