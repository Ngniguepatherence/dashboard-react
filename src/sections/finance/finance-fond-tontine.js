import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Grid, Stack, SvgIcon, Typography } from '@mui/material';

export const FinanceFondSanction = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid container spacing={2}>
            <Grid item xs={4} spacing={7} >
            <Typography >
            <Typography
              color="text.primary"
              variant="h6"
            >
              Total Mensuel 
            </Typography>
            <Typography variant="h8">
              {value}
            </Typography>
            </Typography>
            
            <Typography
              color="text.primary"
              variant="h6"
            >
             Fond Social
            </Typography>
            <Typography variant="h8">
              {value}
            </Typography>
            
            </Grid>
            <Grid item xs={4}>
            
            <Typography
              color="text.primary"
              variant="h6"
            >
              Solde en Caisse
            </Typography>
            <Typography variant="h8">
              {value}
            </Typography>
            <Typography
              color="text.primary"
              variant="h6"
            >
              Beneficiaire
            </Typography>
            <Typography variant="h8">
              John
            </Typography>
            </Grid>
          </Grid>
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
        
      </CardContent>
    </Card>
  );
};

FinanceFondSanction.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
