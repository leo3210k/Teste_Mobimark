import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { BASE_URL, CONFIG } from '../utils/Api';
import { EnhancedTableHead } from './TableHead';

export interface TableData {
  nome: string;
  cidade: string;
  localizacao: string;
  turnos: string;
  diretor: string;  
}

interface GetSchool {
  nome: string;
  cidade_id: number;
  localizacao: number;
  turnos: Shift[];
  diretor: string;
}

interface Shift {
  turno: string;
  escola_id: number;
  turno_sigla: string;
}

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

export type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function SchoolsTable({ updateTable }: { updateTable: boolean }) {
  const [rows, setRows] = React.useState<TableData[]>([]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableData>('nome');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${BASE_URL}/escolas`, CONFIG);
        const schools: GetSchool[] = response.data.data;

        const citiesResponse = await axios.get(`${BASE_URL}/cidades`, CONFIG);
        const cities: City[] = citiesResponse.data;

        const formattedSchools: TableData[] = schools.map(school => {
          const city = cities.find(element => element.id === school.cidade_id);
          const cityName = city ? city.descricao : 'Desconhecida';

          return {
            nome: school.nome,
            cidade: cityName,
            localizacao: school.localizacao === 1 ? 'Urbana' : 'Rural',
            turnos: formatShifts(school.turnos),
            diretor: school.diretor,
          };
        });

        setRows(formattedSchools);
    
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [updateTable]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatShifts = (shifts: Shift[]): string => {
    let formattedShifts: string[] = [];

    shifts.forEach(shift => {
      formattedShifts.push(shift.turno_sigla);
    })

    return formattedShifts.join();
  }


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = rows
    .sort(getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 1300 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="center"
                    >
                      {row.nome}
                    </TableCell>
                    <TableCell align="center">{row.diretor}</TableCell>
                    <TableCell align="center">{row.localizacao}</TableCell>
                    <TableCell align="center">{row.turnos}</TableCell>
                    <TableCell align="center">{row.cidade}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:  53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
