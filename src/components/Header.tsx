import React, { useEffect, useState } from 'react';

import CustomLink from './utils/CustomLink';
import LogOut from './LogOut';

interface UserData {
  nome: string;
}

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
          <div className="absolute -top-0.5 right-0 w-3 h-3 bg-royal-blue rounded-full"></div>
        </div>
        <img src="/assets/icons/profile.svg" className="w-10 h-10" alt="profile" />
        <span className="font-bold">{ username }</span>
        <img src="/assets/icons/down_arrow.svg" onClick={handleMenuClick} className="w-8 h-8 cursor-pointer" alt="down_arrow" />
        <LogOut anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </div>
    </div>
  );
}

export default Header;
