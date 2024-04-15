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

export const Pret = (props) => {
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Beneficiare
                </TableCell>
                <TableCell>
                  Date Remboursement
                </TableCell>
                <TableCell>
                  Date du Prêt
                </TableCell>
                <TableCell>
                  Libelé
                </TableCell>
                <TableCell>
                  MONTANT
                </TableCell>
                <TableCell>
                  STATUS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((pret) => {
                const isSelected = selected.includes(pret.id);
                const createdAt = format(pret.createdAt, 'dd/MM/yyyy');

                return (
                  <>
                  <TableRow
                    hover
                    key={pret.id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {pret.name}
                    </TableCell>
                    <TableCell>
                    {pret.motif}
                    </TableCell>
                    <TableCell>
                      {pret.tontine}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {pret.status}
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

Pret.propTypes = {
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
