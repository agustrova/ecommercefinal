import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { UserTable } from "../../components/UserTable/UserTable";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;
const TOKEN = localStorage.getItem("token");

export default function AdminUser() {
	const [dbUsers, setDbUsers] = useState([]);
	const [categories, setCategories] = useState([]);
	const [userId, setUserId] = useState();
	const navigate = useNavigate();

	//	Obtener usuarios
	async function getUsers() {
		try {
			const response = await axios.get(`${URL}/users`);
			const users = response.data.users;
			console.log("bucle");
			setDbUsers(users);
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "No se pudieron obtener los Usuarios",
				icon: "error",
			});
		}
	}

	async function deleteUser(id) {
		Swal.fire({
			title: `Confirma borrar este usuario?`,
			text: `Realmente desea borrar el usuario ${id}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Borrar",
			cancelButtonText: `Cancelar`,
			confirmButtonColor: "#d33",
			reverseButtons: true,
		}).then(async function (resultado) {
			if (resultado.isConfirmed) {
				try {
					if (!TOKEN) return;
					// Borrar el usuario en la base de datos
					console.log(`Usuario a borrar ${id}`);

					// Borrar el usuario de la base de datos
					await axios.delete(`${URL}/users/${id}`, {
						headers: { authorization: TOKEN },
					});

					Swal.fire({
						title: `Usuario Borrado`,
						text: `El user ${id} fue borrado correctamente`,
						icon: "success",
						timer: 1500,
					});
					// Actualizar el estado de mi dbUsers para que se vuelva a pintar sin el user borrado
					getUsers();
				} catch (error) {
					console.log(error);
					Swal.fire("Error al borrar", "No se pudo borrar el usuario", "error");
					if (error.response.status === 401) return logout();
				}
			}
		});

		// const users =
		// Debo actualizar el estado de mis usuarios quitando el user que se BORRO
	}

	function logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		navigate("/");
	}

	useEffect(
		() => {
			getUsers();
			getCategories();
		}, //	Función que se ejecuta cuando se monta el componente
		[],
	);

	async function getCategories() {
		try {
			const response = await axios.get(`${URL}/categories`);
			const categoriesDB = response.data.categories;

			setCategories(categoriesDB);
		} catch (error) {
			console.log("No se pudieron obtener las categorias");
		}
	}

	const { register, handleSubmit, setValue } = useForm();

	async function submitedData(data) {
		try {
			console.log(data);

			const formData = new FormData();

			formData.append("name", data.name);
			formData.append("email", data.email);
			formData.append("password", data.password);
			formData.append("age", data.age);
			formData.append("location", data.location);
			formData.append("image", data.image[0]);

			if (userId) {
				if (!TOKEN) return;
				const response = await axios.put(`${URL}/users/${userId}`, formData, {
					headers: {
						authorization: TOKEN,
					},
				});
				Swal.fire({
					title: "Usuario editado",
					text: `El usuario ${response.data.user.name} fue editado correctamente`,
					icon: "success",
				});
				getUsers();
				setUserId(null);
				return;
			}

			const response = await axios.post(`${URL}/users`, formData);
			console.log(response.data);
			Swal.fire({
				title: "Usuario creado",
				text: `El usuario ${response.data.user?.name} fue creado correctamente`,
				icon: "success",
			});
			getUsers();
			setFormValue();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "No se creó el usuario",
				text: "Alguno de los datos ingresados no es crrecto",
			});
			if (error.response.status === 401) return logout();
		}
	}

	function setFormValue(user) {
		setUserId(user?._id || null);

		setValue("name", user?.name || "");
		setValue("email", user?.email || "");
		setValue("age", user?.age || "");
		setValue("image", user?.image || "");
	}

	async function handleSearch(e) {
		try {
			const search = e.target.value;

			if (!search) getUsers();

			if (search.length <= 2) {
				return;
			}

			const response = await axios.get(`${URL}/users/search/${search}`);

			const users = response.data.users;

			setDbUsers(users);
		} catch (error) {}
	}

	return (




<main className="main-container">
			<div className="admin-container">
				<section className="form-container">
					<h2 className="admin-form-title">
						Registro de usuarios
						{userId && (
							<button className="btn btn-delete" onClick={() => setFormValue()}>
								<i className="fa-solid fa-xmark"></i>
							</button>
						)}
					</h2>
					<form
						className="user-form"
						onSubmit={handleSubmit(submitedData)}
						encType="multipart/form-data"
					>
						<div className="input-group">
							<label htmlFor="">Nombre completo</label>
							<input
								type="text"
								className="admin-input"
								{...register("name")}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="">Email</label>
							<input
								type="email"
								className="admin-input"
								{...register("email")}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="">Pasword</label>
							<input
								type="text"
								className="admin-input"
								disabled={userId}
								{...register("password")}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="">Edad</label>
							<input
								type="number"
								className="admin-input"
								{...register("age")}
							/>
						</div>
						<div className="input-group">
						<label htmlFor="location">Localidad</label>
						<select {...register("location")} id="location" required>
							<option value=""></option>
							<option value="Buenos Aires">Buenos Aires</option>
          					<option value="CABA">Ciudad Autónoma de Buenos Aires (CABA)</option>
          					<option value="Catamarca">Catamarca</option>
          					<option value="Chaco">Chaco</option>
          					<option value="Chubut">Chubut</option>
          					<option value="Córdoba">Córdoba</option>
          					<option value="Corrientes">Corrientes</option>
          					<option value="Entre Ríos">Entre Ríos</option>
          					<option value="Formosa">Formosa</option>
          					<option value="Jujuy">Jujuy</option>
          					<option value="La Pampa">La Pampa</option>
          					<option value="La Rioja">La Rioja</option>
          					<option value="Mendoza">Mendoza</option>
          					<option value="Misiones">Misiones</option>
          					<option value="Neuquén">Neuquén</option>
          					<option value="Río Negro">Río Negro</option>
          					<option value="Salta">Salta</option>
          					<option value="San Juan">San Juan</option>
          					<option value="San Luis">San Luis</option>
          					<option value="Santa Cruz">Santa Cruz</option>
          					<option value="Santa Fe">Santa Fe</option>
          					<option value="Santiago del Estero">Santiago del Estero</option>
          					<option value="Tierra del Fuego">Tierra del Fuego</option>
         					<option value="Tucumán">Tucumán</option>
						</select>
					</div>
						<div className="input-group">
							<label htmlFor="">Imagen</label>
							<input
								type="file"
								accept="image/*"
								className="admin-input"
								{...register("image")}
							/>
						</div>

						<button type="submit" className={userId ? "btn-form btn-success" : "btn-form"}>
							{userId ? "Editar usuario" : "Añadir usuario"}
						</button>
					</form>
					</section>
			
			<div className="contenedor-table-container">
				<div className="flex-between">
					<div className="input-group">
						<label htmlFor="search">Buscar usuario</label>
						<input type="text" id="search" onKeyUp={handleSearch} />
					</div>
				</div>
				<UserTable
					users={dbUsers}
					deleteUser={deleteUser}
					setFormValue={setFormValue}
				/>
			</div>
			</div>
		</main>
	);
}
