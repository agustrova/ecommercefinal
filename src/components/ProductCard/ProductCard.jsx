import formatDate from "@/utils/formatDate";
import { NavLink } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductCards({ product }) {
	// console.log(product.image);

	return (
		<>
			<article className="card" key={product._id}>
				<div className="imgBx">
					<img
						src={`${URL}/images/products/${product.image}`}
						alt=""
						className="box-img"
						loading="lazy"
					/>
				</div>
				<div className="card-container">
					<div className="card-info">
						<h2 className="card-info-title">{product.producto} </h2>
						<p className="card-info-text">{product.descripcion}</p>
					</div>
					<div className="card-values">
						<div className="card-date"> {formatDate(product.fecha)} </div>
						<div className="card-price">{product.precio} </div>
					</div>

					<footer className="card-footer">
						<NavLink							
							className="see-btn"
							to={`/product-detail/${product._id}`}
						>
							Ver más
						</NavLink>
						<button className="card-btn" >
							Comprar
						</button>
					</footer>
				</div>
			</article>
		</>
	);
}



// import React from 'react'

// export const ProductCard = ({user}) => {
//     return (
//         <div className="card">
//         <h2>{user.name}</h2>
//         <p>{user.age}</p>
//         <p>{user.email}</p>
//     </div>
//     )
// }
