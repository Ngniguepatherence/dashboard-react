import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
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

export const SaisonList = (props) => {
  
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

  const openSaison = (saison_id) => {
    router.push(`/saison/saison_detail?saison_id=${saison_id}`)
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
                  Libellé
                </TableCell>
                <TableCell>
                  Début
                </TableCell>
                <TableCell>
                 Fin
                </TableCell>
                <TableCell>
                  Nbr inscrit
                </TableCell>
                <TableCell>
                ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCotisations.map((saison) => {
                const isSelected = selected.includes(saison.id);
                const date_debut = format(new Date(saison.date_debut), 'dd/MM/yyyy');
                const date_fin = format(new Date(saison.date_fin), 'dd/MM/yyyy');

                return (
                  <>
                  <TableRow
                    hover
                    key={saison._id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {saison.libelle}
                    </TableCell>
                    <TableCell>
                    {date_debut}
                    </TableCell>
                    <TableCell>
                    {date_fin}
                    </TableCell>
                    <TableCell>
                      {saison.participants.length}
                    </TableCell>
                    {/* <TableCell>
                    {finance.effectif }
                    </TableCell> */}
                    <TableCell>
                      <Button variant="text"
                            onClick={()=>openSaison(saison._id)}
                            >
                        Ouvrir
                    </Button>
                      
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

SaisonList.propTypes = {
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
