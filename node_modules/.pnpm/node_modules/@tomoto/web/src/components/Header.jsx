import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineNewspaper, HiOutlineCollection, HiOutlineStar, HiOutlineSearch } from "react-icons/hi";

const navItems = [
  { to: '/', label: 'Inicio', icon: HiOutlineNewspaper },
  { to: '/productos', label: 'Productos', icon: HiOutlineCollection },
  { to: '/deportes', label: 'Deportes', icon: HiOutlineStar },
];

function Header() {
  const location = useLocation();
  const [searchActive, setSearchActive] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectedIdx = navItems.findIndex(item => item.to === location.pathname) !== -1
    ? navItems.findIndex(item => item.to === location.pathname)
    : 1;

  // Maneja la animación y el input
  const handleSearchClick = () => {
    setSearchActive(true);
    setTimeout(() => setShowInput(true), 400); // espera a que la animación termine
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setTimeout(() => setSearchActive(false), 400); // espera a que el input desaparezca antes de ocultar el overlay
  };

  return (
    <header className="w-full flex justify-center mt-4 mb-8 fixed top-0 z-50">
      <div className="relative flex items-center w-full h-14 max-w-sm bg-white/30 backdrop-blur-md shadow-medium rounded-3xl">
        {/* Selector animado */}
        {!searchActive && (
          <div
            className="absolute left-0 h-14 w-1/3 transition-all duration-300 pointer-events-none flex justify-center items-center"
            style={{
              transform: `translateX(${selectedIdx * 100}%)`,
              zIndex: 0,
            }}
          >
            <div className="w-full h-12 rounded-2xl bg-white/90 backdrop-blur-xs shadow-strong m-1" />
          </div>
        )}

        {/* Overlay animado para búsqueda */}
        <div
          className={`absolute right-0 top-0 h-full bg-gray-100 transition-all duration-500 ease-in-out z-20 ${searchActive ? "w-full" : "w-0"}`}
          style={{ borderRadius: "1.5rem" }}
        />

        {/* Menú principal o input de búsqueda */}
        <nav className={`flex flex-1 relative z-30 transition-all duration-500 ${searchActive ? "opacity-0 pointer-events-none" : "opacity-100"} font-sans`}>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const selected = idx === selectedIdx;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="w-full flex flex-col items-center justify-center"
              >
                <span className={`text-md font-medium ${selected ? 'text-black' : 'text-gray-500'} group-hover:text-primary-600 transition-colors`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Input de búsqueda animado */}
        {showInput && (
          <input
            autoFocus
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Buscar productos..."
            className="absolute right-0 top-0 h-full w-full px-6 rounded-3xl bg-gray-100 text-black z-30 outline-none transition-all duration-500"
            style={{ borderRadius: "1.5rem" }}
            onBlur={handleInputBlur}
          />
        )}

        {/* Botón flotante */}
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-gradient-to-br from-primary-400 to-primary-600 w-12 h-12 rounded-full flex items-center justify-center shadow-glow hover:scale-105 transition-all z-40"
        >
          <HiOutlineSearch className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  );
}

export default Header;