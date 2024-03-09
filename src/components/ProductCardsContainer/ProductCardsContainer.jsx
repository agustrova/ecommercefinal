import axios from "axios";
import { useState, useEffect } from "react";
import ProductCards from "../ProductCard/ProductCard";

export const ProductCardsContainer = () => {
	const [products, setProducts] = useState([]);

	useEffect(function () {
		getProducts();
	}, []);

	async function getProducts() {
		try {
			const response = await axios.get("http://localhost:3000/products");
			setProducts(response.data.products);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<section className="card-container">
				{products.map((product) => {
					return <ProductCards product={product} key={product._id} />;
				})}
			</section>
		</>
	);
};
export default ProductCardsContainer;