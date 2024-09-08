import React from 'react';

import CustomLink from './utils/CustomLink';

function Header() {
  return (
    <div className="flex items-center bg-white shadow-sm px-6">
      <div className="flex-1"></div>
      <nav className="flex-1 flex justify-center gap-x-12 text-gray-900">
        <CustomLink href="/" title="Início"/>
        <CustomLink href="/" title="Escolas"/>
        <CustomLink href="/" title="Sobre"/>
      </nav>
      <div className="flex-1 flex justify-end items-center gap-6">
      </div>
    </div>
  );
}

export default Header;
