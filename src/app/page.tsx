import Hero from "../components/landing/hero/Hero";
import ListProduct from "../components/landing/list-product/ListProduct";
import About from "../components/landing/about/About";
import { getProducts, ApiResponse, ProductPagination, Product } from "../services/product/product.service";

export default async function Home() {
  let products: Product[] = [];
  let productCount = 0;
  let minPrice: number | null = null;

  try {
    const response: ApiResponse<ProductPagination> = await getProducts();
    products = response.data.data;
    productCount = products.reduce((sum, p) => sum + p.room_available, 0);
    const prices = products.map(p => p.starting_price).filter(p => p !== null) as number[];
    minPrice = prices.length > 0 ? Math.min(...prices) : null;
  } catch (error) {
    console.error('Failed to fetch products on server:', error);
  }

  return (
    <div>
      <Hero productCount={productCount} minPrice={minPrice} />
      <ListProduct initialProducts={products} />
      <About />
    </div>
  );
}
