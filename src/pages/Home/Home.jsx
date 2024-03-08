import { ProductCardsContainer } from "../../components/ProductCardsContainer/ProductCardsContainer";
import Banner from "../../layout/banner/Banner";



export default function Home() {
  return (
    <>
      <Banner/>
      <div className="main-container"><ProductCardsContainer/>
        <ProductCardsContainer/>
      </div>
    </>
  )
}
