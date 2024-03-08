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
		<div className="login-container">
			<form className="login-form" onSubmit={handleSubmit}>
				<h1>Ingresar</h1>

				<label>Correo electrónico</label>
				<input
					name="email"
					type="text"
					placeholder="Correo electrónico"
					required
				/>

				<label>Contraseña</label>
				<input name="password" type="password" placeholder="Contraseña" />

				<button type="submit" className="button">
					Ingresar
				</button>
			</form>
		</div>
	);
}
