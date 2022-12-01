import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "../components/Button";
import ProductDetails from "../components/ProductDetails";
import { ProductsList } from "../components/ProductsList";
import useProductStore from "../store/useProductStore";

const Home: NextPage = () => {
  const [selectedProductId, createNewProduct] = useProductStore((state) => {
    return [state.selectedProductId, state.createNewProduct];
  });
  return (
    <>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 grid grid-cols-2">
        <div className="col-span-2 mt-4">
          <Button variant="new" onClick={() => createNewProduct()}>
            Add
          </Button>
        </div>
        <ProductsList />
        <div className="relative">
          {selectedProductId && <ProductDetails />}
        </div>
      </div>
    </>
  );
};

export default Home;
