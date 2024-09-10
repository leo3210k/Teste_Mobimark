import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MultipleSelectChip from './utils/MultiSelectChip';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Data } from './SchoolsTable';
import axios from 'axios';
import { BASE_URL, CONFIG } from './utils/Api';

interface City {
  id: number;
  estado_id: number;
  descricao: string;
  estado: {
    id: number;
    descricao: string;
    sigla: string;
  }
}

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [school, setSchool] = React.useState<Data>();
  const [cities, setCities] = React.useState<City[]>([]);
  const [city, setCity] = React.useState('');

  React.useEffect(() => {
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

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const handleChangeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} className="!text-base !font-mulish !bg-[#6691ff] !normal-case !px-[2.2rem] !py-[0.6rem]">
        Nova Escola
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit
        }}
      >
        <DialogTitle>Adicionar escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aqui você adiciona novas escolas a serem colocadas
            no sistema.
          </DialogContentText>
          <div className="flex gap-6">
            <TextField
              autoFocus
              required
              margin="dense"
              id="nome"
              name="nome"
              label="Nome da escola"
              type="nome"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="diretor"
              name="diretor"
              label="Nome do diretor"
              type="diretor"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex gap-6">
            <FormControl required className="w-full" margin="dense">
              <InputLabel id="city-autowidth-label">Cidade</InputLabel>
              <Select
                labelId="city-autowidth-label"
                id="cidade_id"
                name="cidade_id"
                type="cidade_id"
                value={city}
                onChange={handleChangeCity}
                autoWidth
                label="Cidade"
              >
                {cities.map(city => {
                  return (
                    <MenuItem value={city.id} key={city.id}>{city.descricao}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl required className="w-full" margin="dense">
              <InputLabel id="location-autowidth-label">Localização</InputLabel>
              <Select
                labelId="location-autowidth-label"
                id="localizacao"
                name="localizacao"
                type="localizacao"
                value={location}
                onChange={handleChangeLocation}
                autoWidth
                label="Localização"
              >
                <MenuItem value="Urbana">Urbana</MenuItem>
                <MenuItem value="Rural">Rural</MenuItem>
              </Select>
            </FormControl>
          </div>
          <MultipleSelectChip />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
