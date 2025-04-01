import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { callApi } from "../utils/callApi";
import { GB_CURRENCY } from "../utils/constants";
import { ProductDetails } from "./";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    callApi(`data/products.json`).then((productResults) => {
      setProduct(productResults[id]);
    });
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product?.title) return <h1>Loading product ...</h1>;

  return (
    product && (
      <div className="h-screen bg-amazonclone-background">
        <div className="min-width-[1000px] max-width-[1500px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2">
            {/* left */}
            <div className="col-span-3 p-8 rounded bg-white m-auto">
              <img src={`${product.image}`} />
            </div>
            {/* middle */}
            <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400">
              <div className="mb-3">
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-xl xl:text-lg mt-3">
                {product.description}
              </div>
            </div>
            {/* right */}
            <div className="col-span-2 p-4 rounded bg-white">
              <div className="text-xl xl:text-2xl text-red-500 text-right font-semibold">
                {GB_CURRENCY.format(product.price)}
              </div>
              <div className="text-base xl:text-lg text-gray-700 text-right font-semibold">
                <span className="line-through">RRP: {GB_CURRENCY.format(product.oldPrice)}</span>
              </div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                FREE Returns
              </div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
                FREE Delivery
              </div>
              <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">In Stock</div>
              <div className="text-base xl:text-lg mt-1">
                Quantity:
                <select className="p-2 bg-white rounded-md focus:border-indigo-600">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <button className="bg-yellow-400 w-full p-3 text-xs xl:text-sm rounded hover:bg-yellow-500 mt-3">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
