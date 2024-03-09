const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductCards({ product }) {
	return (
		<>
			<article className="card" key={product._id}>
				<div className="card-container">
					<header className="card-header">
						<img
							src={`${URL}/images/products/${product.image}`}
							alt=""
							className="box-img"
							loading="lazy"
						/>
					</header>
					<div className="card-body">
						<p className="card-name">{product.producto}</p>
						<p className="card-description">{product.description}</p>
						<div className="card-values">
							<div className="card-newprice">${product.price} </div>
						</div>

						<footer className="card-footer">
							<button className="card-btn vermas-btn">Ver más</button>
							<button className="card-btn">Comprar</button>
						</footer>
					</div>
				</div>
			</article>
		</>
	);
}