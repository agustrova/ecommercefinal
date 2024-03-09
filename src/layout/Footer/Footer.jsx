export default function Footer() {
	return (
		<>
			<footer className="main-footer">
				<section className="contact">
					<h1>Verde Limón</h1>
					<ul>
						<li className="link-contact">
							<i className="fa-regular fa-map fa-zona"></i>
							<a href="/pages/shipping/shipping.html" rel="noopener noreferrer">
								Zona de envíos
							</a>
						</li>
						<li className="link-contact">
							<i className="fa-solid fa-arrow-rotate-left fa-zona"></i>
							<a
								href="/pages/devolucion/devolucion.html"
								rel="noopener noreferrer"
							>
								Políticas de devolución
							</a>
						</li>
					</ul>
				</section>
				<section className="contact">
					<h1>Contactanos</h1>
					<ul className="contact-contenedor">
						<li className="link-contact">
							<i className="fa-brands fa-whatsapp"></i>
							<a href="https://wa.me/+5491559083021" rel="noopener noreferrer">
								5491159083021
							</a>
						</li>
						<li className="link-contact">
							<i className="fa-regular fa-envelope"></i>
							<a
								href="mailto:agustinatrova@gmail.com"
								rel="noopener noreferrer"
							>
								verdelimon@gmail.com
							</a>
						</li>
						<li className="link-contact">
							<i className="fa-solid fa-location-dot"></i>
							<a
								href="https://www.google.com/maps?ll=-34.571456,-58.473217&z=17&t=m&hl=es-419&gl=AR&mapclient=embed&q=Plaza+2119+C1430DGM+Villa+Urquiza+Buenos+Aires"
								rel="noopener noreferrer"
							>
								Coghlan, CABA
							</a>
						</li>
					</ul>
				</section>
				<section className="contact">
					<h1>Sigamos conectados</h1>
					<ul>
						<li className="link-contact">
							<i className="fa-brands fa-instagram"></i>
							<a href="https://www.instagram.com/" rel="noopener noreferrer">
								Instagram
							</a>
						</li>
					</ul>
				</section>
			</footer>
		</>
	);
}
