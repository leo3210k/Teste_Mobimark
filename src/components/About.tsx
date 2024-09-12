import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="relative h-screen grid grid-rows-[80px,1fr] overflow-hidden">
      <Header />
      <div className="flex items-center bg-aqua-haze pl-20">
        <ol className="list-decimal text-2xl font-semibold text-[#6691ff]">
          <li>Link para meu portfólio: &nbsp;
            <Link target="_blank" to="https://portfolio-leonardocoelho.vercel.app/" className="border-b-2 border-[#6691ff]">
              PORTFÓLIO
            </Link>
          </li>
          <li>
            Utilizado para desenvolver o projeto:
            <div className="flex gap-4">
              <img src="/assets/icons/typescript.svg" className="w-10" alt="typescript" />
              <img src="/assets/icons/react.svg" className="w-10" alt="react" />
              <img src="/assets/icons/material_ui.svg" className="w-10" alt="material_ui" />
              <img src="/assets/icons/tailwind.svg" className="w-10" alt="tailwind" />
            </div>
          </li>
          <li>
            Dificuldades encontradas:
            <ul className="text-[#6691ff]">
              <li>Material UI: difícil customização</li>
              <li>Swagger: dificuldade em saber explicitamente a URL</li>
            </ul>
          </li>
          <li>
            Sugestões:
            <ul>
              <li>Adicionar endpoint get cidade por id</li>
            </ul>
          </li>
        </ol>
        <img src="/assets/images/illustration.svg" className="absolute hidden lg:block h-[70%] -right-20 -bottom-28" alt="illustration" />
      </div>
    </div>
  );
}

export default About;
