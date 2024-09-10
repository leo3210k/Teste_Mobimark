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

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [school, setSchool] = React.useState<Data>();
  const [cities, setCities] = React.useState();

  React.useEffect(() => {
    // Função para fazer a requisição GET
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cidades`, CONFIG);
        setCities(response.data); // Armazena os dados recebidos
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            handleClose();
          },
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
              id="name"
              name="name"
              label="Nome da escola"
              type="name"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="director"
              name="director"
              label="Nome do diretor"
              type="director"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex gap-6">
            <TextField
              autoFocus
              required
              margin="dense"
              id="city"
              name="city"
              label="Cidade"
              type="city"
              fullWidth
              variant="outlined"
            />
            <FormControl className="w-full" margin="dense">
              <InputLabel id="location-autowidth-label">Localização</InputLabel>
              <Select
                required
                labelId="location-autowidth-label"
                id="location-autowidth"
                name="location"
                type="location"
                value={location}
                onChange={handleChange}
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
