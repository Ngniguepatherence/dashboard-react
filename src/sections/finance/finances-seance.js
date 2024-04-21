import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const FinancesSeances = (props) => {
  
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 5,
    selected = []
  } = props;

  const [filtreDateDebut, setFiltreDateDebut] = useState('');
  const [filtreDateFin, setFiltreDateFin] = useState('');
  const router = useRouter()
  // Fonction de filtrage des cotisations
  const filteredCotisations = items.filter(cotisation => {
    const dateCotisation = new Date(cotisation.date);
    const debutFiltre = filtreDateDebut ? new Date(filtreDateDebut) : null;
    const finFiltre = filtreDateFin ? new Date(filtreDateFin) : null;

    if (debutFiltre && dateCotisation < debutFiltre) {
      return false;
    }
    if (finFiltre && dateCotisation > finFiltre) {
      return false;
    }
    return true;
  });

  const openSeance = (seance_id) => {
    router.push(`/seance_detail?seance_id=${seance_id}`)
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
        <div>
            <label>Date de début: </label>
            <input type="date" value={filtreDateDebut} onChange={e => setFiltreDateDebut(e.target.value)} />
            <label>Date de fin: </label>
            <input type="date" value={filtreDateFin} onChange={e => setFiltreDateFin(e.target.value)} />
        </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date & ID
                </TableCell>
                <TableCell>
                  Type Meeting
                </TableCell>
                <TableCell>
                 Nbre Tontinard
                </TableCell>
                <TableCell>
                Nbre non Tontinard
                </TableCell>
                <TableCell>
                Effectif
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCotisations.map((finance) => {
                const isSelected = selected.includes(finance.id);
                const createdAt = format(new Date(finance.date), 'dd/MM/yyyy');

                return (
                  <>
                  <TableRow
                    hover
                    key={finance._id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {createdAt}
                    </TableCell>
                    <TableCell>
                    {finance.type_seance}
                    </TableCell>
                    <TableCell>
                      {finance.nbre_pers_tontinard}
                    </TableCell>
                    <TableCell>
                    {finance.nbre_pers_non_tontinard }
                    </TableCell>
                    <TableCell>
                    {finance.effectif }
                    </TableCell>
                    <TableCell
                      onClick={()=>openSeance(finance._id)}
                    >
                      Ouvrir
                    </TableCell>
                  </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

FinancesSeances.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
