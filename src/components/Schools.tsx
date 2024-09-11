import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import SchoolsTable from "./Table/SchoolsTable";
import FormDialog, { City } from "./FormDialog";
import { BASE_URL, CONFIG } from "./utils/Api";
import axios from "axios";

function Schools() {
  const [updateTable, setUpdateTable] = useState(false);
  const [cities, setCities] = React.useState<City[]>([]);
  const [city, setCity] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cidades`, CONFIG);
        setCities(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

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
              <InputLabel id="city-label">Cidade</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                size="small"
                value={city}
                onChange={handleChangeCity}
                label="Cidade"
                className="w-[10rem] !bg-white"
              >
                {cities.map(city => {
                  return (
                    <MenuItem value={city.id} key={city.id}>{city.descricao}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          <FormDialog setUpdateTable={setUpdateTable} />
        </div>
        <SchoolsTable updateTable={updateTable} />
      </div>
    </div>
  );
}

export default Schools;
