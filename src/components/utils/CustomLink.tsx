import React from 'react';
import { Link, useLocation } from "react-router-dom";

interface linkProps {
  href: string;
  title: string;
  className?: string;
}

export default function CustomLink({ href, title, className="" }: linkProps) {
  const router = useLocation();

  return(
    <Link to={href} className={`${className} relative group`}>
      <li className='inline text-gray-900'>
        {title}
        <span className={`
        h-[1px] inline-block
        absolute left-0 -bottom-0.5 bg-gray-900
        group-hover:w-full transition-[width] ease duration-300
        underline-offset-4
        ${router.pathname === href ? "w-full" : "w-0"}
        `}
        >&nbsp;</span>
      </li>
    </Link>
  )
}