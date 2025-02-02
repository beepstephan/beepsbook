import { useEffect, useState } from "react";
import { ProductCard } from "../../../components";
import { getFeaturedList } from "../../../services";
import { toast } from "react-toastify";

export const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getFeaturedList();
        setFeaturedProducts(data);
      } 
      catch (error) {
        toast.error(error.message);
      }
    }
    fetchProducts();
  }, [])
  return (
    <section className="my-20">
        <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>    
        <div className="flex flex-wrap justify-center lg:flex-row">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    </section>
  )
}
