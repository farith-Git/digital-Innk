import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { addToCart } from "../redux/cartSlice";
import { getProductOffer } from "../utils/getProductOffer";

function productList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getDocs(collection(db, "products"));
      const list: any[] = [];
      response.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProducts(list);
    };

    fetchProducts();
  }, []);

  const buyProduct = (product: any) => {
    const offer = getProductOffer(product.name.trim());
    dispatch(addToCart({
      ...product,
      specialOffer: offer
    }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <div className="w-full px-10 mt-4">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}
              className="bg-white shadow-md border rounded-lg p-4 flex flex-col justify-between items-center text-center h-48"
            >

              <h3 className="text-lg font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-600">
                £ {product.price.toFixed(2)}
              </p>

              <p className="text-sm text-red-500 font-bold">
                {getProductOffer(product.name.trim())?.description}
              </p>

              <button
                onClick={() => buyProduct(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default productList;