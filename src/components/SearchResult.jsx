import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi } from "../utils/callApi";
import { Link } from "react-router-dom";
import {ProductDetails} from './'
import { GB_CURRENCY } from "../utils/constants";

const SearchResult = () => {
  const [searchparams] = useSearchParams();
  const [products, setProducts] = useState(null);

  const getSearchResults = () => {
    const searchTerm = searchparams.get("searchTerm");
    const category = searchparams.get("category");
    callApi(`data/search.json`).then((searchResults) => {
      const categoryResults = searchResults[category];

      if (searchTerm) {
        const results = categoryResults.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(results);
      } else {
        setProducts(categoryResults);
      }
    });
  };

  useEffect(() => {
    getSearchResults();
  }, [searchparams]);

  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">
      {products &&
        products.map((product, key) => {
          return (
            <Link key={key} to={`/product/${product.id}`}>
              <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-1 bg-gray-200">
                <div className="col-span-2">
                  <img className="m-auto" src={product.image_small} />
                </div>
                <div className="col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100">
                    <div className="font-medium text-black p-2">
                        <ProductDetails product={product} ratings={true}/>
                        <div className="text-xl xl:text-2xl pt-1">{GB_CURRENCY.format(product.price)}</div>
                    </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchResult;
