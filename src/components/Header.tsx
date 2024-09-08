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
        <img src="/assets/icons/book.svg" className="w-6 h-6" alt="book" />
        <img src="/assets/icons/gear.svg" className="w-6 h-6" alt="gear" />
        <div className="relative">
          <img src="/assets/icons/bell.svg" className="w-6 h-6" alt="bell" />
        </div>
      </div>
    </div>
  );
}

export default Header;
