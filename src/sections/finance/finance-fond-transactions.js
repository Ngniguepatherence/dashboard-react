import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Grid, Stack, SvgIcon, Typography } from '@mui/material';
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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {bilan.map((elt, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Typography
                  color='text.ptimary'
                  variant="h6"
                >
                  {elt.label}
                </Typography>
                <Typography
                  variant="h8"
                  color={elt.type == 'input' ? 'green' : 'red'}
                >
                  {format_montant(elt.value)}
                </Typography>

              </Grid>
            ))}
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
          </Stack >
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
