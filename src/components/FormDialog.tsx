import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MultipleSelectChip from './utils/MultiSelectChip';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { BASE_URL, CONFIG } from './utils/Api';

export interface City {
  id: number;
  estado_id: number;
  descricao: string;
  estado: {
    id: number;
    descricao: string;
    sigla: string;
  }
}

export default function FormDialog({ setUpdateTable }: { setUpdateTable: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState('');

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    const data = {
      nome: formJson.nome,
      cidade_id: parseInt(formJson.cidade_id),
      diretor: formJson.diretor,
      localizacao: formJson.localizacao === "Urbana" ? 1 : 2,
      turnos: formJson.turnos.split(",")
    }

    try {
      await axios.post(`${BASE_URL}/escolas`, data, CONFIG)
        .then(_ => setUpdateTable(prevValue => !prevValue));
  
      handleClose();
    } catch (error) {
      console.error('Erro ao adicionar escola:', error);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} className="self-start !text-base !font-mulish !bg-[#6691ff] hover:!bg-[#567bd8] !normal-case !px-[2.2rem] !py-[0.6rem]">
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
        <DialogTitle className="!text-2xl !text-[#6691ff]">Adicionar escola</DialogTitle>
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
                onChange={e => setCity(e.target.value)}
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
                onChange={e => setLocation(e.target.value)}
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
          <Button type="submit" className="!text-white !bg-[#6691ff] hover:!bg-[#567bd8]">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
