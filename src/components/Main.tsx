import React from "react";

import Header from "./Header";
import Schools from "./Schools";

function Main() {
  return (
    <div className="h-screen grid grid-rows-[80px,1fr]">
      <Header />
      <Schools />
    </div>
  );
}

export default Main;
