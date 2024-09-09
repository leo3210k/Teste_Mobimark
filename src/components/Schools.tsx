import React from "react";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import SchoolsTable from "./SchoolsTable";
import FormDialog from "./FormDialog";

function Schools() {
  return (
    <div className="flex justify-center items-center bg-aqua-haze">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-medium mb-6">Escolas</h2>
        <div className="flex justify-between">
          <div className="flex gap-6">
            <TextField
              id="outlined-basic"
              label="Pesquise pelo nome"
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src="/assets/icons/search.svg" alt="search" />
                    </InputAdornment>
                  ),
                },
              }}
              className="w-[20rem] !bg-white"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                value="age"
                label="Age"
                className="w-[10rem] !bg-white"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormDialog />
        </div>
        <SchoolsTable />
      </div>
    </div>
  );
}

export default Schools;
