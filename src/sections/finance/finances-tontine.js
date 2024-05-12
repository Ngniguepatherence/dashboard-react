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

export const FinancesTontines = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectOne,
    page = 0,
    rowsPerPage = 5,
    selected = []
  } = props;

  const [filtreDateDebut, setFiltreDateDebut] = useState('');
  const [filtreDateFin, setFiltreDateFin] = useState('');
  
  // Fonction de filtrage des cotisations
  const filteredCotisations = items.filter(cotisation => {
    const dateCotisation = new Date(cotisation.createdAt);
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
                  NOM
                </TableCell>
                {/* <TableCell>
                  Type Cotisation
                </TableCell> */}
                <TableCell>
                  Montant
                </TableCell>
                {/* <TableCell>
                 Beneficiaire ?
                </TableCell> */}
                <TableCell>
                  DATE
                </TableCell>
                {/* <TableCell>
                  STATUS
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCotisations.map((finance) => {
                const isSelected = selected.includes(finance.id);
                const createdAt = format(new Date(finance.createat), 'dd/MM/yyyy');

                return (
                  <>
                  {finance.inscrit && <TableRow
                    hover
                    key={finance._id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {`${finance.inscrit.membre.name} ${finance.inscrit.membre.surname}`}
                    </TableCell>
                    {/* <TableCell>
                    {finance.type_cotisation}
                    </TableCell> */}
                    <TableCell>
                      {finance.montant_tontine}
                    </TableCell>
                    {/* <TableCell>
                    {finance.Beneficiaire }
                    </TableCell> */}
                    
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    {/* <TableCell>
                      {finance.status}
                    </TableCell> */}
                  </TableRow>}
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

FinancesTontines.propTypes = {
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
