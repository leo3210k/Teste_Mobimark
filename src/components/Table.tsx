import React from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function Table() {
  return (
    <div className="flex justify-center items-center bg-aqua-haze">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Escolas</h2>
        <div className="flex gap-6">
          <TextField id="outlined-basic" label="Pesquise pelo nome" size="small" variant="outlined" className="w-[30rem]" />
        </div>
      </div>
    </div>
  );
}

export default Table;
