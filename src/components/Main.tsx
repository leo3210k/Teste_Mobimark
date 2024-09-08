import React from "react";

import Header from "./Header";
import Table from "./Table";

function Main() {
  return (
    <div className="h-screen grid grid-rows-[80px,1fr]">
      <Header />
      <Table />
    </div>
  );
}

export default Main;
