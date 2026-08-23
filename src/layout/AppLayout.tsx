import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/assets", label: "Assets" },
  { to: "/insights", label: "Insights" },
  { to: "/career", label: "Career" },
  { to: "/life", label: "Life" },
];

export default function AppLayout() {
  const location = useLocation();
  // Assets만 화이트(라이트) 배경 예외 — 표/차트 가독성 우선
  const isLight = location.pathname.startsWith("/assets");

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">
          MINSU
        </NavLink>
        <nav className="main-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={isLight ? "app-content app-content--light" : "app-content"}>
        <div className="app-content-inner">
          <Outlet />
        </div>
      </main>
      <footer className="app-footer">© {new Date().getFullYear()} Minsu Lee</footer>
    </div>
  );
}
