import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { format_montant } from '../../utils/formatting';

export const FinanceFondTransaction = (props) => {
  const { difference, positive = false, sx, value, bilan } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.primary"
              variant="h6"
            >
              Différence 
            </Typography>
            <Typography variant="h8">
              {format_montant(bilan.diff) }
            </Typography>
            
            <Typography
              color="text.primary"
              variant="h6"
            >
              Total Des Entréess
            </Typography>
            <Typography 
              color="green"
              variant="h8">
              {format_montant(bilan.entrees)}
            </Typography>
            <Typography
              color="text.primary"
              variant="h6"
            >
              Total Des Sorties:
            </Typography>
            <Typography variant="h8"
              color="red">
              {format_montant(bilan.sorties)}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Depuis le mois passe
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

FinanceFondTransaction.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
