import React, { useState,useCallback,useMemo } from "react";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FinancesTable } from 'src/sections/finance/finance-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';

import Head from "next/head";
import { FinancesSanction } from 'src/sections/finance/FinancesPlat';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { FinancesPlat } from "../sections/finance/finances-plat";
import { FinanceFondPlat } from 'src/sections/finance/finance-fond-plat';
import { subDays, subHours } from 'date-fns';
import NextLink from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Container,Grid, Stack,Link, Typography,Button,SvgIcon } from "@mui/material";

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10Ob',
    motif: "Absence Seance",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    contribution_au_plat: '3000',
    name: 'MOKTO NEGUE WILFRIED HYACINTHE',
    tontine: '10000',
    status: 'Non'
  },
  {
    id: '5e887ac47eed253091be10Oa',
    motif: "Retard",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    name: 'KEPSEU JASPERS',
    tontine: '200',
    status: 'oui'
  },
  
];
const total = [
  {
    id: 'f69f88012978187a6c12897f',
    ref: 'DEV1049',
    amount: 50000,
    customer: {
      name: 'SOUGANG TCHIMWA CEDRIC'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: '9eaa1c7dd4433f413c308ce2',
    ref: 'DEV1048',
    amount: 50000,
    customer: {
      name: 'TAPE JEAN CALVIN'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
];

const useEvents = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};
const useEventSanctions = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(total, page, rowsPerPage);
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
const useEventSanctioonIds = (sanctions) => {
  return useMemo(
    () => {
      return sanctions.map((sanction) => sanction.id);
    },
    [sanctions]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const finances = useEvents(page, rowsPerPage);
  const sanctions = useEventSanctions(page, rowsPerPage);
  const financesIds = useEventIds(finances);
  const SanctionsIds = useEventSanctioonIds(sanctions);
  const financesSelection = useSelection(financesIds);
  const sanctionsSelection = useSelection(SanctionsIds);
  const [isAdding, setIsAdding] = useState(false);


  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

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
          Plat | Pouapeu
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Finance Plat
                </Typography>
                
              </Stack>
              <div>
                
                <Button onClick={handleAddButtonClick}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                 <Link
                      style={{ color: 'white', textDecoration: 'none' }}
                      color='white'
                      component={NextLink}
                      underline="none"
                      href="/addPlat">
                      Add
                    </Link>
                </Button>
              </div>
            </Stack>

            <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <FinanceFondPlat
              difference={23}
              positive={true}
              sx={{ height: '100%' }}
              value="100,000 F CFA"
            />
          </Grid>
            
            <Typography variant="h6">
            Recensement des Plats de la saison
            </Typography> 

            <FinancesPlat
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
            <FinancesSanction
            count={total.length}
            orders={sanctions}
            
            />
          </Stack>
        </Container>
      </Box>
    </>
    );
}


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;