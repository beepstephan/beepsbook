import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "../components";
import { useTitle } from "../hooks/useTitle";
import { useCart } from "../context";
import { getProduct } from "../services";
import { toast } from "react-toastify";

export const ProductDetail = () => {
  const { cartList, addToCart, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const [details, setDetails] = useState({});
  const { id } = useParams();

  useTitle(details.name);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getProduct(id);
        setDetails(data);
      }
      catch (error) {
        toast.error(error.message);
      }
    }
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === details.id);

    if(productInCart){
        setInCart(true);
    } else {
        setInCart(false);
    }
  }, [cartList, details.id])

  return (
    <main>
        <section>
          <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{details.name}</h1>
          <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{details.overview}</p>
          <div className="flex flex-wrap justify-around">
            <div className="max-w-xl my-3">
              <img className="rounded" src={details.poster} alt={details.name} />
            </div>
            <div className="max-w-xl my-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                <span className="mr-1">$</span>
                <span className="">{details.price}</span>
              </p>
              <p className="my-3"> 
                <span>
                  <Rating rating={details.rating}/>
                </span>
              </p>
              <p className="my-4 select-none">
                { details.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span> }
                { details.in_stock && <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span> }
                { !details.in_stock && <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> }
                <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{details.size} MB</span>
              </p>
              <p className="my-3">
                { !inCart && <button onClick={() => addToCart(details)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${details.in_stock ? "" : "cursor-not-allowed"}`} disabled={ details.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button> } 
                { inCart && <button onClick={() => removeFromCart(details)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 ${details.in_stock ? "" : "cursor-not-allowed"}`}  disabled={ details.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> }  
              </p>
              <p className="text-lg text-gray-900 dark:text-slate-200">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore? Praesentium tempora cumque facere consectetur quia, molestiae quam, accusamus eius corrupti laudantium aliquid! Tempore laudantium unde labore voluptates repellat, dignissimos aperiam ad ipsum laborum recusandae voluptatem non dolore. Reiciendis cum quo illum. Dolorem, molestiae corporis.
              </p>
            </div>
          </div>
        </section>
      </main> 
  )
}
