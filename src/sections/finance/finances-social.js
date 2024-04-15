import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
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
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const FinancesSocial = (props) => {
  const {
    items = [],
    selected = []
  } = props;

  // Organiser les finances par membre et par mois
  const financesByMemberAndMonth = items.reduce((acc, finance) => {
    const memberId = finance.memberId;
    const monthYear = format(new Date(finance.createdAt), 'MM/yyyy');
    const amount = parseFloat(finance.tontine);
    
    if (!acc[memberId]) {
      acc[memberId] = {};
    }
    
    if (!acc[memberId][monthYear]) {
      acc[memberId][monthYear] = {
        total: 0,
        finances: []
      };
    }
    
    acc[memberId][monthYear].total += amount;
    acc[memberId][monthYear].finances.push(finance);
    
    return acc;
  }, {});

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Membre
                </TableCell>
                <TableCell>
                  SEANCE
                </TableCell>
                <TableCell>
                  TYPE COTISATION
                </TableCell>
               
                <TableCell>
                  MONTANT
                </TableCell>
                <TableCell>
                  DATE
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {Object.entries(financesByMemberAndMonth).map(([memberId, financesByMonth]) => (
                Object.entries(financesByMonth).map(([monthYear, data]) => (
                  data.finances.map((finance) => {
                    const isSelected = selected.includes(finance.id);
                    const createdAt = format(new Date(finance.createdAt), 'dd/MM/yyyy');
                    
                    return (
                      <TableRow
                        hover
                        key={finance.id}
                        selected={isSelected}
                      >
                        <TableCell>{finance.name}</TableCell>
                        <TableCell>{monthYear}</TableCell>
                        <TableCell>{monthYear}</TableCell>
                        
                        <TableCell>{finance.tontine}</TableCell>
                        <TableCell>{createdAt}</TableCell>
                        
                      </TableRow>
                    );
                  })
                ))
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

FinancesSocial.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.array
};




// import PropTypes from 'prop-types';
// import { format, parseISO } from 'date-fns';
// import React from 'react';
// import {
//   Avatar,
//   Box,
//   Card,
//   Checkbox,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography
// } from '@mui/material';
// import { Scrollbar } from 'src/components/scrollbar';
// import { getInitials } from 'src/utils/get-initials';
// import { getMonth } from 'date-fns';

// export const FinancesSanctions = (props) => {
//   const {
//     count = 0,
//     items = [],
//     onDeselectOne,
//     onPageChange = () => {},
//     onRowsPerPageChange,
//     onSelectOne,
//     page = 0,
//     rowsPerPage = 5,
//     selected = []
//   } = props;

//   // Fonction pour organiser les finances par mois et calculer le total de chaque finance par mois
//   const financesByMonth = items.reduce((acc, finance) => {
//     const monthYear = getMonth(new Date(finance.createdAt)) +1;
//     const amount = parseFloat(finance.tontine);
    
//     if (!acc[monthYear]) {
//       acc[monthYear] = {
//         total: 0,
//         finances: []
//       };
//     }
    
//     acc[monthYear].total += amount;
//     acc[monthYear].finances.push(finance);
    
//     return acc;
//   }, {});

//   return (
//     <Card>
//       <Scrollbar>
//         <Box sx={{ minWidth: 800 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   Mois
//                 </TableCell>
//                 <TableCell>
//                   NOM
//                 </TableCell>
//                 <TableCell>
//                   MOTIF
//                 </TableCell>
//                 <TableCell>
//                   MONTANT
//                 </TableCell>
//                 <TableCell>
//                   DATE
//                 </TableCell>
//                 <TableCell>
//                   STATUS
//                 </TableCell>
//               </TableRow>
//             </TableHead>
            
//             <TableBody>
//               {Object.entries(financesByMonth).map(([monthYear, data]) => (
//                 <React.Fragment key={monthYear}>
//                   <TableRow>
//                     <TableCell colSpan={6}>
//                       <Typography variant="h6">{monthYear}</Typography>
//                       <Typography variant="subtitle1">Total: {data.total}</Typography>
//                     </TableCell>
//                   </TableRow>
//                   {data.finances.map((finance) => {
//                     const isSelected = selected.includes(finance.id);
//                     const createdAt = format(new Date(finance.createdAt), 'dd/MM/yyyy');
                    
//                     return (
//                       <TableRow
//                         hover
//                         key={finance.id}
//                         selected={isSelected}
//                       >
//                         <TableCell>{monthYear}</TableCell>
//                         <TableCell>{finance.name}</TableCell>
//                         <TableCell>{finance.motif}</TableCell>
//                         <TableCell>{finance.tontine}</TableCell>
//                         <TableCell>{createdAt}</TableCell>
//                         <TableCell>{finance.status}</TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </Scrollbar>
//       <TablePagination
//         component="div"
//         count={count}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Card>
//   );
// };
// FinancesSanctions.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array
// };
