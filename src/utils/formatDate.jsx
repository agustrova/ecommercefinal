export default function (fecha) {
    if(!fecha) return "Sin fecha"
	const date = new Date(fecha);
	const dateFormat = new Intl.DateTimeFormat("as-AR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return dateFormat.format(date);
}

// <td> {formatDate(product.fecha)} </td>;
