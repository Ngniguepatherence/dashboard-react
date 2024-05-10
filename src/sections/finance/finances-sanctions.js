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
    selected = [],
    openSanction
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  NOM & PRENOM
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
                <TableCell>
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((sanction) => {
                console.log(sanction)
                const isSelected = selected.includes(sanction._id);
                const date = format(new Date(sanction.date), 'yyyy-MM-dd');

                return (
                  <>
                  <TableRow
                    hover
                    key={sanction._id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {`${sanction.inscrit.membre.name} ${sanction.inscrit.membre.surname}`}
                    </TableCell>
                    <TableCell>
                    {sanction.motif.libelle}
                    </TableCell>
                    <TableCell>
                    {sanction.motif.cout}
                    </TableCell>
                    <TableCell>
                      {date}
                    </TableCell>
                    <TableCell color={sanction.paye? 'green':'red'}>
                      <Typography color={sanction.paye? 'green':'red'}>
                        {sanction.paye? 'Payé':'Non Payé'}
                      </Typography>
                      
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=>openSanction({
                        _id: sanction._id,
                        saison: sanction.saison,
                        inscrit: sanction.inscrit._id,
                        motif: sanction.motif._id,
                        date: date,
                        paye: sanction.paye
                      })}
                            variant='text'>
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
  selected: PropTypes.array,
  openSanction: PropTypes.func
};
