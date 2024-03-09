import UserForm from "../../components/UserForm/UserForm";

export default function Register() {
	return (
		<>
			<div className="title-container">
				<h1 className="title-form"> Registro</h1>
			</div>
			<div className="hr-container">
				<hr className="hr-form" />
			</div>
			<main className="register-main">
				<section className="form-container">
					<div className="form">
						<UserForm />
					</div>
				</section>
			</main>
		</>
	);
}
