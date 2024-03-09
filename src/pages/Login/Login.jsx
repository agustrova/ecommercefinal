import { useUser } from "@/context/UserContext";

export default function Login() {
	const { login } = useUser();

	function handleSubmit(event) {
		event.preventDefault();
		const el = event.target.elements;

		const data = {
			email: el.email.value,
			password: el.password.value,
		};

		login(data);
	}

	return (
		<>
			<div className="title-container">
				<h1 className="title-form">Iniciar sesión</h1>
			</div>
			<div className="hr-container">
				<hr className="hr-form" />
			</div>
			<main className="contenedor-form">
				<section className="form-container">
					<form className="user-form" onSubmit={handleSubmit}>
						<div className="input-group">
							<label>Correo electrónico</label>
							<input
								name="email"
								type="text"
								placeholder="Correo electrónico"
								required
							/>
						</div>
						<div className="input-group">
							<label>Contraseña</label>
							<input name="password" type="password" placeholder="Contraseña" />
						</div>
						<button type="submit" className="btn-form">
							Ingresar
						</button>
					</form>
				</section>
			</main>
		</>
	);
}
