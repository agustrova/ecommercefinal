import { useForm } from "react-hook-form"; // LIBRERIA DE REACT
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultPicture from "../../assets/images/carrito.png";
import formatDate from "../../utils/formatDate";

const URL = import.meta.env.VITE_SERVER_URL;

export default function AdminProduct() {
	const { register, handleSubmit, setValue } = useForm();
	const [dbProducts, setDbProducts] = useState([]);
	const [productId, setProductId] = useState();
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();
	const TOKEN = localStorage.getItem("token");

	async function submitedData(data) {
		try {
			const formData = new FormData();
			for (const key of Object.keys(data)) {
				if (key === "image") {
					formData.append(key, data.image[0]);
					continue;
				}
				formData.append(key, data[key]);
			}

			if (productId) {
				if (!TOKEN) return;

				const response = await axios.put(
					`${URL}/products/${productId}`,
					formData,
					{ headers: { authorization: TOKEN } },
				);
				Swal.fire({
					icon: "success",
					title: "Producto editado correctamente ",
					text: `El producto ${response.data.product?.product} fue editado correctamente`,
				});
				getProducts();
				setProductId(null);
				return;
			}

			const response = await axios.post(`${URL}/products`, formData);
			Swal.fire({
				icon: "success",
				title: "Producto creado ",
				text: `El producto ${response.data.product.producto} fue creado correctamente`,
			});
			getProducts();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo producto",
				text: "Algunos datos ingresados no son correctos",
			});
			if (error.response.status === 401) {
				localStorage.removeItem("currentUser");
				localStorage.removeItem("token");
				navigate("/");
			}
		}
	}

	async function getProducts() {
		try {
			const response = await axios.get(`${URL}/products`);
			const products = response.data.products;

			setDbProducts(products);
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se pudieron obtener los productos",
			});
		}
	}

	async function deleteProduct(id) {
		Swal.fire({
			title: "Confirma borrar el producto",
			text: `Realmente desea borrar el producto ${id}`,
			icon: "warning",
			showDenyButton: true,
			confirmButtonText: "Borrar",
			confirmButtonColor: "#e06262",
			denyButtonText: `Cancelar`,
		}).then(async function (resultado) {
			if (resultado.isConfirmed) {
				try {
					if (!TOKEN) return;

					await axios.delete(`${URL}/products/${id}`, {
						headers: { authorization: TOKEN },
					});
					Swal.fire({
						icon: "success",
						title: "Producto borrado",
						text: `El producto ${id} fue borrado correctamente`,
						timer: 1500,
					});

					getProducts();
				} catch (error) {
					Swal.fire({
						icon: "error",
						title: "Error al borrar el producto",
						text: `No se pudo borrar el producto ${id}`,
					});
					if (error.response.status === 401) return logout();
				}
			}
		});
	}

	function logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		navigate("/");
	}

	useEffect(function () {
		getProducts();
		getCategories();
	});

	async function getCategories() {
		try {
			const response = await axios.get("http://localhost:3000/categories");
			const categoriesDB = response.data.categories;
			setCategories(categoriesDB);
		} catch (error) {
			console.log("No se pudieron obtener las categorias");
		}
	}

	function setFormValue(product) {
		setProductId(product._id);
		setValue("producto", product.producto);
		setValue("descripcion", product.description);
		setValue("precio", product.price);
		setValue("image", product.image || "");
		setValue("active", product.active);
		setValue("category", product.category || "");
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;
			if (!search) getProducts();

			if (search.length <= 2) return;
			const response = await axios.get(`${URL}/products/search/${search}`);
			const products = response.data.products;
			setDbProducts(products);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="title-container">
				<h1 className="title-form">Registro de producto</h1>
			</div>
			<div className="hr-container">
				<hr className="hr-form" />
			</div>
			<main className="main-container">
				<div className="admin-container">
					<section className="form-container">
						<form
							id="user-form"
							onSubmit={handleSubmit(submitedData)}
							encType="multipart/form-data"
						>
							<div className="input-group">
								<label htmlFor="producto">Producto</label>
								<input
									type="text"
									{...register("producto")}
									id="producto"
									minLength="5"
									maxLength="60"
									required
									autoFocus
								/>
							</div>
							<div className="input-group">
								<label htmlFor="description">Descripcion</label>
								<textarea
									{...register("description")}
									id="description"
									required
								></textarea>
							</div>
							<div className="input-group">
								<label htmlFor="price">Precio</label>
								<input
									type="number"
									{...register("price")}
									id="price"
									required
								/>
							</div>
							<div className="input-group">
								<label htmlFor="fecha">Fecha</label>
								<input
									type="date"
									{...register("fecha")}
									id="fecha"
									min=" 1930-01-01"
								/>
							</div>
							<div className="input-group">
								<label htmlFor="image">Imagen</label>
								<input
									type="file" //  Upload type=file
									accept="image/*" // mostrar archivos de tipo imagen
									{...register("image")}
									id="image"
								/>
							</div>
							<div className="active input-group">
								<label htmlFor="active">Activo</label>
								<input type="checkbox" {...register("active")} id="active" />
							</div>

							<div className="input-group" {...register("category")}>
								<label htmlFor="category">Categoria</label>
								<select name="category" id="category">
									{categories.map((category) => (
										<option key={category._id} value={category._id}>
											{category.name}
										</option>
									))}
								</select>
							</div>

							<button
								type="submit"
								className={
									productId ? "btn-form btn-success btn-editar" : "btn-form"
								}
							>
								{productId ? "Editar producto" : "Agregar producto"}
							</button>
						</form>
					</section>

					<section className="table-container">
						<div className="flex-between">
							<div className="input-group">
								<input
									type="text"
									className="input-search"
									id="search"
									placeholder="Buscar por nombre"
									onKeyUp={handleSearch}
								/>
							</div>
						</div>
						<table className="product-table" id="userTable">
							<thead>
								<tr className="table-head">
									<th>Imagen</th>
									<th>Producto</th>
									<th>Descripcion</th>
									<th>Precio</th>
									<th>Fecha</th>
									<th>Categoria</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody id="table-body">
								{dbProducts.map((product) => {
									return (
										<tr key={product._id}>
											<td>
												<img
													className="table-img"
													src={
														product.image
															? `${URL}/images/products/${product.image}`
															: defaultPicture
													}
												/>
											</td>
											<td> {product.producto}</td>
											<td> {product.description} </td>
											<td> {product.price}</td>
											<td> {formatDate(product.fecha)}</td>
											{
												<td>
													{" "}
													{product.category
														? product.category.name
														: "SIN CATEGORIA"}
												</td>
											}

											<td>
												<button
													className="action-btn btn-danger btn-delete btn"
													onClick={() => deleteProduct(product._id)}
													title="Borrar producto"
												>
													<i className="fa-solid fa-trash-can"></i>
												</button>

												<button
													className="action-btn btn-edit btn btn-edit"
													onClick={() => setFormValue(product)}
													title="Editar producto"
												>
													<i className="fa-solid fa-pen-to-square"></i>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						<div></div>
					</section>
				</div>
			</main>
		</>
	);
}
