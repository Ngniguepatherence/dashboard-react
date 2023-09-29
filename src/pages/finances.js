import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { FinanceBouffe } from 'src/sections/finance/FinanceBouffe';
import { FinancesSanction } from 'src/sections/finance/FinancesSanction';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FinancesTable } from 'src/sections/finance/finance-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { FinanceFondDeCaisse } from 'src/sections/finance/finance-fond-de-caisse';
import { FinanceFondSocial } from 'src/sections/finance/finance-fond-social';
import { FinanceTotalCotisation } from 'src/sections/finance/finance-total-cotisation'

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Sud',
      country: 'Cameroon',
      state: 'Bertoua',
      street: '2849 Fulton Street'
    },
    rappel_tontine: ' ',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    contribution_au_plat: '3000',
    name: 'Carson',
    tontine: '10000'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Sud-ouest',
      country: 'Cameroon',
      state: 'limbe',
      street: '1865  Pleasant Hill Road'
    },
    rappel_tontine: '10000',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    contribution_au_plat: '3000',
    name: 'Fran Perez',
    tontine: '10000'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'Nord ouest',
      country: 'Cameroon',
      state: 'Bamenda',
      street: '4894  Lakeland Park Drive'
    },
    rappel_tontine: ' ',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    contribution_au_plat: '3000',
    name: 'Njie wilfried',
    tontine: '10000'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Paris',
      country: 'France',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    rappel_tontine: '3000',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    contribution_au_plat: '3000',
    name: 'Adonise',
    tontine: '10000'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    rappel_tontine: '2000',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    contribution_au_plat: '3000',
    name: 'fingon tralala',
    tontine: '10000'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    rappel_tontine: '3000',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    contribution_au_plat: '3000',
    name: 'elodie',
    tontine: '10000'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    rappel_tontine: ' ',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    contribution_au_plat: '3000',
    name: 'silas',
    tontine: '10000'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Douala',
      country: 'Cameroon',
      state: 'Nord',
      street: '1798  Hickory Ridge Drive'
    },
    rappel_tontine: '2500',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    contribution_au_plat: '3000',
    name: 'Siegbert Gottfried',
    tontine: '10000'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Douala',
      country: 'Cameroon',
      state: 'Yaounde',
      street: '3934  Wildrose Lane'
    },
    rappel_tontine: ' ',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    contribution_au_plat: '3000',
    name: 'Iulia Albu',
    tontine: '10000'
  },
  {
    id: '3000',
    address: {
      city: 'Douala',
      country: 'Cameroon',
      state: 'Littoral',
      street: 'des avocats'
    },
    rappel_tontine: '2000',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    contribution_au_plat: '3000',
    name: 'Jean felix',
    tontine: '10000'
  }
];

const useEvents = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useEventIds = (finances) => {
  return useMemo(
    () => {
      return finances.map((finance) => finance.id);
    },
    [finances]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const finances = useEvents(page, rowsPerPage);
  const financesIds = useEventIds(finances);
  const financesSelection = useSelection(financesIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Transactions | Assocition GTR
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >

        <Container maxWidth="l">

        <Grid
          container
          spacing={4}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <FinanceFondDeCaisse
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <FinanceFondSocial
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <FinanceTotalCotisation
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <FinanceBouffe
              membres={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Jean',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Theodore',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Sebastien',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Tagnie Deffo',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Auguste',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <FinancesSanction
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  status: 'pending'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'delivered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  status: 'refunded'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 96.43,
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  status: 'pending'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 32.54,
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 16.76,
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  status: 'delivered'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>


          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  listes contisations
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Importer fichier xls de transactions
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Exporter liste des transactions
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Ajouter des entres de caisse
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <FinancesTable
              count={data.length}
              items={finances}
              onDeselectAll={financesSelection.handleDeselectAll}
              onDeselectOne={financesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={financesSelection.handleSelectAll}
              onSelectOne={financesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={financesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
