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

export const FinancesSanctions = (props) => {
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
                  NOM
                </TableCell>
                <TableCell>
                  MOTIF
                </TableCell>
                <TableCell>
                  MONTANT
                </TableCell>
                <TableCell>
                  DATE
                </TableCell>
                <TableCell>
                  STATUS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((finance) => {
                const isSelected = selected.includes(finance.id);
                const createdAt = format(finance.createdAt, 'dd/MM/yyyy');

                return (
                  <>
                  <TableRow
                    hover
                    key={finance.id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {finance.name}
                    </TableCell>
                    <TableCell>
                    {finance.motif}
                    </TableCell>
                    <TableCell>
                      {finance.tontine}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {finance.status}
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

FinancesSanctions.propTypes = {
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
