import React, { useEffect, useState } from "react";
import {
  Alert,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import SchoolsTable, { TableData } from "./Table/SchoolsTable";
import FormDialog, { City } from "./FormDialog";
import { BASE_URL, CONFIG } from "./utils/Api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

function Schools() {
  const [rows, setRows] = useState<TableData[]>([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if(location.state?.successfulLogin) {
      setOpenAlert(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [])

  const handleClose = () => {
    setOpenAlert(false);
  };

  const filteredData = rows.filter(item => {
    return (
      (item.nome.toLowerCase().includes(searchText.toLowerCase()) || item.cidade.toLowerCase().includes(searchText.toLowerCase())) &&
      (filterCity ? item.cidade === filterCity : true)
    );
  });

  return (
    <div className="h-screen grid grid-rows-[80px,1fr]">
      <Header />
      <div className="flex justify-center items-center bg-aqua-haze">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold mb-6">Escolas</h2>
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
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Login bem-sucedido!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Schools;
