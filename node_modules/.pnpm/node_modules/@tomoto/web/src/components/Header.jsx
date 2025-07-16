import { useState, useRef, useLayoutEffect } from "react";
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
  const selectedIdx = navItems.findIndex(item => item.to === location.pathname);

  // Refs para cada link
  const linkRefs = useRef([]);
  const [selectorStyle, setSelectorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    if (selectedIdx !== -1 && linkRefs.current[selectedIdx]) {
      const el = linkRefs.current[selectedIdx];
      setSelectorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [selectedIdx, showInput, searchActive]);

  // Función para ejecutar búsqueda y cerrar
  const executeSearch = () => {
    if (searchValue.trim()) {
      console.log('Buscando:', searchValue);
      // Aquí puedes agregar la lógica de búsqueda real
      // Por ejemplo: router.push(`/search?q=${encodeURIComponent(searchValue)}`);
    }
    
    // Cierra el input después de buscar
    setSearchValue("");
    setShowInput(false);
    setTimeout(() => setSearchActive(false), 400);
  };

  // Animación e input
  const handleSearchClick = () => {
    if (searchActive) {
      // Si ya está activo, ejecuta la búsqueda
      executeSearch();
    } else {
      // Si no está activo, activa el modo búsqueda
      setSearchActive(true);
      setTimeout(() => setShowInput(true), 400);
    }
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setTimeout(() => setSearchActive(false), 400);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <header className="fixed bottom-0 left-0 right-0 flex justify-center mb-4 z-50 px-4">
      <div className="relative flex items-center w-full max-w-md h-14 bg-white/30 backdrop-blur-md shadow-medium rounded-3xl overflow-visible">
        {/* Selector animado */}
        {!searchActive && selectedIdx !== -1 && (
          <div
            className="absolute top-0 h-14 transition-all duration-300 pointer-events-none flex items-center"
            style={{
              left: selectorStyle.left,
              width: selectorStyle.width,
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
        <nav className={`flex flex-1 items-center justify-between gap-x-4 relative z-30 transition-all duration-500 ${searchActive ? "opacity-0 pointer-events-none" : "opacity-100"} font-sans`}>
          <div className="flex flex-1 items-center gap-x-4">
            {navItems.map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                ref={el => linkRefs.current[idx] = el}
                className="flex flex-col items-center justify-center flex-1"
              >
                <span className={`text-md font-medium ${idx === selectedIdx ? 'text-black' : 'text-gray-500'} group-hover:text-primary-600 transition-colors`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSearchClick}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow hover:scale-105 transition-all z-40 ml-2"
            style={{ margin: '4px' }}
          >
            <HiOutlineSearch className="w-6 h-6 text-white" />
          </button>
        </nav>

        {/* Input de búsqueda animado */}
        {showInput && (
          <input
            autoFocus
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Buscar productos..."
            className="absolute right-0 top-0 h-full w-full px-6 pr-16 rounded-3xl bg-gray-100 text-black z-30 outline-none transition-all duration-500"
            style={{ borderRadius: "1.5rem" }}
            onBlur={handleInputBlur}
          />
        )}

        {/* Botón de búsqueda sobre el input */}
        {searchActive && (
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow hover:scale-105 transition-all z-40"
          >
            <HiOutlineSearch className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;