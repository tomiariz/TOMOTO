import { useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineNewspaper, HiOutlineCollection, HiOutlineStar, HiOutlineSearch, HiOutlineShoppingCart } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const navItems = [
  { to: '/', label: 'Home', icon: HiOutlineNewspaper },
  { to: '/tienda', label: 'STORE', icon: HiOutlineCollection },
  { to: '/carrito', label: '', icon: HiOutlineShoppingCart }, // <-- Cart link agregado aquí
  { to: '/about', label: 'ABOUT', icon: HiOutlineStar },
  { to: '/contacto', label: 'FOLLOW', icon: HiOutlineStar },
];

function Header() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [searchActive, setSearchActive] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectedIdx = navItems.findIndex(item => item.to === location.pathname);

  // Refs para cada link y el contenedor scrollable
  const linkRefs = useRef([]);
  const scrollRef = useRef(null);
  const [selectorStyle, setSelectorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    if (selectedIdx !== -1 && linkRefs.current[selectedIdx] && scrollRef.current) {
      const el = linkRefs.current[selectedIdx];
      const scrollLeft = scrollRef.current.scrollLeft;
      setSelectorStyle({
        left: el.offsetLeft - scrollLeft,
        width: el.offsetWidth,
      });
    }
  }, [selectedIdx, showInput, searchActive]);

  // Función para actualizar el selector al hacer scroll
  const handleScroll = () => {
    if (selectedIdx !== -1 && linkRefs.current[selectedIdx] && scrollRef.current) {
      const el = linkRefs.current[selectedIdx];
      const scrollLeft = scrollRef.current.scrollLeft;
      setSelectorStyle({
        left: el.offsetLeft - scrollLeft,
        width: el.offsetWidth,
      });
    }
  };

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

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  return (
    <header className="fixed bottom-0 left-0 right-0 flex justify-center mb-4 z-50 px-4">
      <div className="relative flex items-center w-full max-w-md h-14 bg-white/30 backdrop-blur-md shadow-medium rounded-3xl overflow-hidden">
        {/* Selector animado */}
        {!searchActive && selectedIdx !== -1 && (
          <div
            className="absolute top-0 h-14 pointer-events-none flex items-center transition-[left,width] duration-300"
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
        <nav className={`relative w-full flex items-center z-30 transition-all duration-500 ${searchActive ? "opacity-0 pointer-events-none" : "opacity-100"} font-sans`}>
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-x-auto whitespace-nowrap no-scrollbar flex items-center gap-x-2 w-full pr-[56px]"
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.to}
                to={item.to}
                ref={el => linkRefs.current[idx] = el}
                className="inline-flex shrink-0 flex-col items-center justify-center min-w-[80px] sm:min-w-[100px]"
              >
                {idx === 0 ? (
                  <img
                    src="/LOGO.png"
                    alt="Inicio"
                    className="w-8 h-8 object-contain"
                    style={{ marginBottom: 2 }}
                  />
                ) : item.label ? (
                  <span
                    className={`text-md font-medium text-black transition-colors ${idx === selectedIdx ? 'font-bold' : ''}`}
                  >
                    {item.label}
                  </span>
                ) : (
                  <item.icon className={`w-6 h-6 mx-auto ${idx === selectedIdx ? 'text-primary-600' : 'text-black'}`} />
                )}
              </Link>
            ))}
            {/* Botón de toggle de idioma al final de la fila */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center min-w-[60px] h-10 px-3 py-1 rounded-2xl bg-primary-600 text-white text-xs font-bold ml-2"
              style={{ marginBottom: 2 }}
            >
              {i18n.language === "en" ? "ES" : "EN"}
            </button>
          </div>
          {/* Botón de búsqueda fijo, fuera del scroll */}
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow hover:scale-105 transition-all z-40"
          >
            <HiOutlineSearch className="w-5 h-5 text-white" />
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