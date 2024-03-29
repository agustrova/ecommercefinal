export default function Contact() {
	return (
		<>
			<div className="title-container">
				<h1 className="title-form">Contacto</h1>
			</div>
			<div className="hr-container">
				<hr className="hr-form" />
			</div>

			<main className="contenedor-form">
				<section className="form-container">
					<form className="user-form">
						<div className="input-group">
							<label htmlFor="name">Nombre Completo</label>
							<input
								type="text"
								id="name"
								placeholder="Nombre y apellido"
								required
								maxLength="200"
								name="nombre"
							/>
						</div>
						<div className="input-group">
							<label htmlFor="email">Correo electrónico</label>
							<input
								type="email"
								id="email"
								placeholder="Correo electrónico"
								required
								maxLength="200"
								minLength="5"
								name="email"
							/>
						</div>
						<div className="input-group">
							<label htmlFor="message">Observaciones</label>
							<textarea
								id="message"
								placeholder="Mensaje"
								required
								name="mensaje"
								rows="8"
							></textarea>
						</div>
						<div className="btn-container">
							<button className="btn-form">Enviar</button>
						</div>
					</form>
				</section>
			</main>
			<div className="hr-container">
				<hr className="hr-form" />
			</div>
			<div className="ubi-container">
				<iframe
					className="ubication"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1642.6452321514887!2d-58.47420267231349!3d-34.57151623491769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb67adf409aab%3A0x8ba7126634ef88a2!2sPlaza%202119%2C%20C1430DGM%20Villa%20Urquiza%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1694458180311!5m2!1ses-419!2sar"
					width="300"
					height="200"
					style={{ border: "0" }}
					allowfullscreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</>
	);
}
