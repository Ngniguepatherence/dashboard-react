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
import { format_montant } from '../../utils/formatting';

export const FinancesTransactions = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectOne,
        onPageChange = () => { },
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
                                    MONTANT
                                </TableCell>
                                <TableCell>
                                    TYPE
                                </TableCell>
                                <TableCell>
                                    DATE
                                </TableCell>
                                <TableCell>
                                    REFERENCE
                                </TableCell>
                                <TableCell>
                                    DESCRIPTION
                                </TableCell>
                                <TableCell>
                                    ACTION
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((transaction) => {
                                console.log(transaction)
                                const isSelected = selected.includes(transaction._id);
                                const date = format(new Date(transaction.date), 'yyyy-MM-dd');

                                return (
                                    <>
                                        <TableRow
                                            hover
                                            key={transaction._id}
                                            selected={isSelected}
                                        >
                                            <TableCell>
                                                {`${format_montant(transaction.montant) }`}
                                            </TableCell>
                                            <TableCell color={transaction.type ==='input' ? 'green' : 'red'}>
                                                <Typography color={transaction.type ==='input' ? 'green' : 'red'}>
                                                    {transaction.type ==='input' ? 'Entrée' : 'Sortie'}
                                                </Typography>

                                            </TableCell>
                                            <TableCell>
                                                {date}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.reference}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.description}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => openSanction({
                                                    _id: transaction._id,
                                                    saison: transaction.saison,
                                                    inscrit: transaction.inscrit._id,
                                                    motif: transaction.motif._id,
                                                    date: date,
                                                    paye: transaction.paye
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

FinancesTransactions.propTypes = {
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
