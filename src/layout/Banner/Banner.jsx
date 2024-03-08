import banner from "../../assets/images/banner/banner1.webp";

const Banner = () => {
	return (
		<div className="main-banner">
			<img
				className="banner-img"
				src={banner}
				alt="Banner principal del home"
			/>
			<div className="banner-info">
				<p className="p-banner">2x1 en productos selecciondaos</p>
			</div>
		</div>
	);
};

export default Banner;
