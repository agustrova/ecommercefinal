import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TOKEN = localStorage.getItem("token");
const URL = import.meta.env.VITE_SERVER_URL;

const UserForm = ({ getUsers, formValue, userId, setUserId }) => {
	const { register, handleSubmit, setValue } = useForm();
	const navigate = useNavigate();

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

			if (userId) {
				if (!TOKEN) return;
				const response = await axios.put(`${URL}/users/${userId}`, formData, {
					headers: { authorization: TOKEN },
				});
				Swal.fire({
					icon: "success",
					title: "Usuario editado correctamente ",
					text: `El usuario ${response.data.user?.name} fue editado correctamente`,
				});
				getUsers();
				setUserId(null);
				return;
			}

			const response = await axios.post(`${URL}/users`, formData);
			Swal.fire({
				icon: "success",
				title: "Usuario creado ",
				text: `El usuario ${response.data.user?.name} fue creado correctamente`,
			});
			if (getUsers) {
				getUsers();
			}
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo usuario",
				text: "Algunos datos ingresados no son correctos",
			});
			if (error.response.status === 401) {
				// logout();
				localStorage.removeItem("currentUser");
				localStorage.removeItem("token");
				navigate("/");
			}
		}
	}

	if (formValue) {
		setValue("name", formValue.name);
		setValue("email", formValue.email);
		setValue("password", formValue.password);
		setValue("location", formValue.location || "");
		setValue("age", formValue.age);
		setValue("image", formValue.image || "");
	}

	return (
		<>
			<main className="main-container">
				<div className="admin-container">
					<section className="form-container">
						<form
							id="user-form"
							onSubmit={handleSubmit(submitedData)}
							encType="multipart/form-data"
						>
							<div className="input-group">
								<label htmlFor="">Nombre completo</label>
								<input
									type="text"
									placeholder="Nombre y apellido"
									className="admin-input"
									{...register("name")}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="">Correo electrónico</label>
								<input
									type="email"
									placeholder="Correo electrónico"
									className="admin-input"
									{...register("email")}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="">Contraseña</label>
								<input
									type="text"
									placeholder="Contraseña"
									className="admin-input"
									disabled={userId}
									{...register("password")}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="">Edad</label>
								<input
									type="number"
									placeholder="Edad"
									className="admin-input"
									{...register("age")}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="location">Localidad</label>
								<select {...register("location")} required>
									<option value=""></option>
									<option value="Buenos Aires">Buenos Aires</option>
									<option value="CABA">
										Ciudad Autónoma de Buenos Aires (CABA)
									</option>
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
									<option value="Santiago del Estero">
										Santiago del Estero
									</option>
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
							<button
								type="submit"
								className={userId ? "btn-success" : "btn-form"}
							>
								{userId ? "Editar usuario" : "Agregar Usuario"}
							</button>
						</form>
					</section>
				</div>
			</main>
		</>
	);
};
export default UserForm;
