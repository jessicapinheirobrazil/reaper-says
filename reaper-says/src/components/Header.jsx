import React, { useState } from "react";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG-US");

  // Função para alternar o estado do dropdown
  const toggleDropdown = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Função para mudar o idioma
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Aqui você pode adicionar a lógica para mudar o idioma do seu app
    console.log(`Idioma selecionado: ${language}`);
    setIsDropdownOpen(false); // Fecha o dropdown após selecionar
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#credits">Credits</a>
          </li>
          <li className="language-dropdown">
            <a href="#language" onClick={toggleDropdown}>
              Change Language
            </a>
            {isDropdownOpen && (
              <ul className="dropdown-menu active">
                <li onClick={() => handleLanguageChange("ENG-US")}>ENG-US</li>
                <li onClick={() => handleLanguageChange("PT-BR")}>PT-BR</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
