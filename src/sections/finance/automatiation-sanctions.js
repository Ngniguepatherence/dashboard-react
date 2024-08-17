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

export const AutoSanctions = (props) => {
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
    openAutoSanction
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  CODE
                </TableCell>
                <TableCell>
                  LIBELLE
                </TableCell>
                <TableCell>
                  MOTIF
                </TableCell>
                <TableCell>
                  MONTANT
                </TableCell>
                <TableCell>
                  ETAT
                </TableCell>
                <TableCell>
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((autoSanction) => {
                console.log(autoSanction)
                const isSelected = selected.includes(autoSanction._id);
                

                return (
                  <>
                  <TableRow
                    hover
                    key={autoSanction._id}
                    selected={isSelected}
                  >
                    <TableCell>
                    {`${autoSanction.code}`}
                    </TableCell>
                    <TableCell>
                    {`${autoSanction.label}`}
                    </TableCell>
                    <TableCell>
                    {autoSanction.motif.libelle}
                    </TableCell>
                    <TableCell>
                    {autoSanction.motif.cout}
                    </TableCell>
                    <TableCell color={autoSanction.actif? 'green':'red'}>
                      <Typography color={autoSanction.actif? 'green':'red'}>
                        {autoSanction.actif?'Actif':'Desactif'}
                      </Typography>
                      
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=>openAutoSanction({
                        _id: autoSanction._id,
                        code: autoSanction.code,
                        label: autoSanction.label,
                        motif: autoSanction.motif._id,
                        actif: autoSanction.actif,
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

AutoSanctions.propTypes = {
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
  openAutoSanction: PropTypes.func
};
 