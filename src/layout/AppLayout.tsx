import { NavLink, Outlet, useLocation } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  dropdown?: { to: string; label: string }[];
}

const navItems: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/assets", label: "Assets" },
  { to: "/insights", label: "Insights" },
  {
    to: "/career",
    label: "Career",
    dropdown: [
      { to: "/career/graduate", label: "대학원" },
      { to: "/career/job-prep", label: "취업 준비" },
    ],
  },
  { to: "/life", label: "Life" },
];

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="nav-link__chevron"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

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
          {navItems.map((item) =>
            item.dropdown ? (
              <div key={item.to} className="nav-item nav-item--dropdown">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                >
                  <span className="nav-link__inner">
                    {item.label}
                    <ChevronDown />
                  </span>
                </NavLink>
                <div className="nav-dropdown">
                  {item.dropdown.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        isActive
                          ? "nav-dropdown__link nav-dropdown__link--active"
                          : "nav-dropdown__link"
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                <span className="nav-link__inner">{item.label}</span>
              </NavLink>
            ),
          )}
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
