import React, { useEffect, useState } from 'react';

import CustomLink from './utils/CustomLink';
import LogOut from './LogOut';
import { Link } from 'react-router-dom';

interface UserData {
  nome: string;
}

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userKey');

    if(userData) {
      const parsedData = JSON.parse(userData) as UserData;
      setUsername(parsedData.nome);
    } else {
      setUsername('Anônimo');
    }
  }, [])

  return (
    <div className="flex items-center bg-white shadow-sm px-6">
      <Link to="/" className="flex-1">
        <img src="/assets/icons/logo.svg" className="h-10 cursor-pointer" alt="book" />
      </Link>
      <nav className="flex justify-center items-center gap-x-12 text-gray-900">
        <CustomLink href="/" title="Início"/>
        <CustomLink href="/sobre" title="Sobre"/>
      </nav>
      <div className="sm:flex-1 flex justify-end items-center gap-6">
        <img src="/assets/icons/book.svg" className="hidden lg:block w-6 h-6 cursor-pointer" alt="book" />
        <img src="/assets/icons/gear.svg" className="hidden lg:block w-6 h-6 cursor-pointer" alt="gear" />
        <div className="relative hidden lg:block cursor-pointer">
          <img src="/assets/icons/bell.svg" className="w-6 h-6" alt="bell" />
          <div className="absolute -top-0.5 right-0 w-3 h-3 bg-royal-blue rounded-full"></div>
        </div>
        <img src="/assets/icons/profile.svg" className="hidden md:block w-10 h-10 cursor-pointer" alt="profile" />
        <span className="hidden sm:block font-bold">{ username }</span>
        <img src="/assets/icons/down_arrow.svg" onClick={handleMenuClick} className="w-8 h-8 cursor-pointer ml-6 sm:ml-0" alt="down_arrow" />
        <LogOut anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </div>
    </div>
  );
}

export default Header;
