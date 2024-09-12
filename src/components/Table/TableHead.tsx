import * as React from 'react';
import { Order, TableData } from './SchoolsTable';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface HeadCell {
  mobileHidden: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nome',
    numeric: false,
    mobileHidden: false,
    label: 'Nome',
  },
  {
    id: 'diretor',
    numeric: true,
    mobileHidden: true,
    label: 'Diretor',
  },
  {
    id: 'localizacao',
    numeric: true,
    mobileHidden: true,
    label: 'Localizacao',
  },
  {
    id: 'turnos',
    numeric: true,
    mobileHidden: false,
    label: 'Turnos',
  },
  {
    id: 'cidade',
    numeric: true,
    mobileHidden: false,
    label: 'Cidade',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            className={headCell.mobileHidden ? '!hidden md:!table-cell' : ''}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className="font-bold"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}