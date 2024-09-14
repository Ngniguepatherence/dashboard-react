import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { format_montant } from '../../utils/formatting';

export const FinanceFondSanction = (props) => {
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
          <Stack spacing={1} 
              display="flex"
              justifyContent="space-between"
              flexGrow="1"
              direction={{ xs: "column", md:"row"}}>
                <Stack spacing={1}>
                  <Typography
                    color="text.primary"
                    variant="h6"
                  >
                    Total Sanctions 
                  </Typography>
                  <Typography variant="h8">
                    {format_montant(bilan.total) }
                  </Typography>
                </Stack>
                  
                <Stack spacing={1}>
                  <Typography
                    color="text.primary"
                    variant="h6"
                  >
                    Total payer
                  </Typography>
                  <Typography 
                    color="green"
                    variant="h8">
                    {format_montant(bilan.paye)}
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Typography
                    color="text.primary"
                    variant="h6"
                  >
                  Total Non Payer:
                </Typography>
                <Typography variant="h8"
                  color="red">
                  {format_montant(bilan.non_paye)}
                </Typography>

                </Stack>
            
           
            
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
        {/* {difference && (
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
        )} */}
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
