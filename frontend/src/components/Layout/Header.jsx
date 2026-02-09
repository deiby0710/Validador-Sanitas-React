import { NavLink, useLocation } from 'react-router-dom'
import { logout } from '../../utils/logout'

export const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const { pathname } = useLocation()

    const handleLogout = () => logout()

    const isPatientActive =
        pathname.startsWith('/validador') || pathname.startsWith('/usuario')
    const isAuthActive =
        pathname.startsWith('/autorizacion') || pathname.startsWith('/consultAuth')

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm px-3 px-lg-4">
            <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 mb-0">
                💊 <span className="d-none d-sm-inline">Validador Sanitas</span>
                <span className="d-inline d-sm-none">Validador</span>
            </NavLink>

            {/* BOTÓN HAMBURGUESA */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
                        >
                            Inicio
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/validador"
                            className={() => `nav-link ${isPatientActive ? 'active fw-semibold' : ''}`}
                        >
                            Consultar Paciente
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            to="/consultAuth"
                            className={() => `nav-link ${isAuthActive ? 'active fw-semibold' : ''}`}
                        >
                            Consultar Autorización
                        </NavLink>
                    </li>
                </ul>

                <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 mt-2 mt-lg-0">
                    <span className="text-muted small">{user?.username}</span>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger btn-sm w-100 w-lg-auto"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    )
}