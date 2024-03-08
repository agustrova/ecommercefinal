import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/verde-limon-01.png";
import { useUser } from "@/context/UserContext";

export default function Header() {
	const { user, logout } = useUser();

	const isAdmin = user?.role === "ADMIN_ROLE";

	return (
		<header className="header">
			<input className="input-check" type="checkbox" id="check-menu" />
			<label className="burger-menu" htmlFor="check-menu">
				<span className="burger-line"></span>
			</label>
			<a className="logo-link" href="/index.html">
				<img className="nav-logo" src={logo} alt="logo-img" />
			</a>
			<nav className="main-nav">
				<ul className="nav-list">
					<li className="nav-item">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? "nav-link active" : "nav-link"
							}
						>
							Inicio
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/Register">
							Registro
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/AboutUs">
							Nosotros
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/contact">
							Contacto
						</NavLink>
					</li>
				</ul>
        {user ? (
				<NavLink onClick={() => logout()}>Logout</NavLink>
			) : (
				<NavLink className="nav-link" to="/Login">
					Iniciar sesión
				</NavLink>
			)}

			{isAdmin && (
				<>
					<NavLink className="nav-link" to="/AdminProduct">
						Admin Product
					</NavLink>
					<NavLink className="nav-link" to="/AdminUser">
						Admin User
					</NavLink>
				</>
			)}
			</nav>
      <div className="user-info">
        {user && (
          <p>
            {user.id}
          </p>
        )}
      </div>
		</header>
	);
}
