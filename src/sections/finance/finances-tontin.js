import PropTypes from 'prop-types';
import { format } from 'date-fns';
const { startOfMonth, endOfMonth, getMonth, getYear } = require('date-fns');

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

export const FinancesTontinT = (props) => {
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
  
  function totalTontineParMois() {
    const totals = {};
  
    items.forEach(entry => {
      const date = new Date(entry.createat);
      const mois = getMonth(date) + 1; // Ajouter 1 car les mois sont indexés à partir de 0
      // console.log(mois)
      // Créer une clé de mois et d'année
      const key = `${mois}-${getYear(date)}`;
      // console.log(key)
      // Si la clé de mois n'existe pas encore, initialiser le total à 0
      if (!totals[key]) {
        totals[key] = 0;
      }
  
      // Ajouter le montant de tontine à la somme totale pour ce mois
      totals[key] += parseInt(entry.Montant);
    });
    // console.log(totals)
  
    return totals;
  }

  const [filtreDateDebut, setFiltreDateDebut] = useState('');
  const [filtreDateFin, setFiltreDateFin] = useState('');

  // Calculer la somme des montants de tontine par mois
  const totauxTontineParMois = totalTontineParMois();

  // Filtrer les données par date de début et date de fin
  const filteredData = items.filter(entry => {
    if (filtreDateDebut && entry.createdAt < new Date(filtreDateDebut).getTime()) {
      return false;
    }
    if (filtreDateFin && entry.createdAt > new Date(filtreDateFin).getTime()) {
      return false;
    }
    return true;
  });



  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Periode
                </TableCell>
                <TableCell>
                  Total Mensuel
                </TableCell>
                <TableCell>
                  Echec
                </TableCell>
                <TableCell>
                  Prelevement FS
                </TableCell>
                <TableCell>
                  Total remis Beneficiaire
                </TableCell>
                <TableCell>
                  Montant Demi Nom decaissé
                </TableCell>
                <TableCell>
                 Solde en Caisse de Tontine
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
           
            {Object.keys(totauxTontineParMois).map((moisAnnee, index) => {
            const [mois, annee] = moisAnnee.split('-');
            const moisLabel = new Date(annee, mois - 1).toLocaleString('default', { month: 'long' });
                
                return (
                  <>
                  <TableRow
                    hover
                    key={index}
                    // selected={isSelected}
                  >
                    <TableCell>
                    {moisLabel} {annee}
                    </TableCell>
                    <TableCell>
                    {totauxTontineParMois[moisAnnee]}
                    </TableCell>
                    <TableCell>
                     0
                    </TableCell>
                    <TableCell>
                    0
                    </TableCell>
                    0
                    <TableCell>
                    </TableCell>
                    0
                    <TableCell>
                    
                    </TableCell>
                    <TableCell>
                      0
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

FinancesTontinT.propTypes = {
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
