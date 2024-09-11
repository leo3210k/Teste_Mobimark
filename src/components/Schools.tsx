import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import SchoolsTable, { TableData } from "./Table/SchoolsTable";
import FormDialog, { City } from "./FormDialog";
import { BASE_URL, CONFIG } from "./utils/Api";
import axios from "axios";

function Schools() {
  const [rows, setRows] = React.useState<TableData[]>([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [cities, setCities] = React.useState<City[]>([]);

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
  }, []);

  const filteredData = rows.filter(item => {
    return (
      (item.nome.toLowerCase().includes(searchText.toLowerCase()) || item.cidade.toLowerCase().includes(searchText.toLowerCase())) &&
      (filterCity ? item.cidade === filterCity : true)
    );
  });

  return (
    <div className="flex justify-center items-center bg-aqua-haze">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-medium mb-6">Escolas</h2>
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <TextField
              id="outlined-basic"
              label="Pesquise pelo nome"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-[25rem] !bg-white"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src="/assets/icons/search.svg" alt="search" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="city-label">Cidade</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                value={filterCity}
                onChange={e => setFilterCity(e.target.value)}
                label="Cidade"
                className="w-[13rem] !bg-white"
              >
                <MenuItem value='' key="empty">Todos</MenuItem>
                {cities.map(city => {
                  return (
                    <MenuItem value={city.descricao} key={city.id}>{city.descricao}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          <FormDialog setUpdateTable={setUpdateTable} />
        </div>
        <SchoolsTable rows={rows} setRows={setRows} filteredData={filteredData} updateTable={updateTable} />
      </div>
    </div>
  );
}

export default Schools;
