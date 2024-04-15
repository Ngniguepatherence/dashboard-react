import React, { useState,useCallback,useMemo } from "react";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FinancesTable } from 'src/sections/finance/finance-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
// import { FinancesSanction } from 'src/sections/finance/FinancesSanction';
import Head from "next/head";
import { FinanceBouffe } from 'src/sections/finance/FinanceBouffe';
import { FinancesSanction } from 'src/sections/finance/FinancesSanction';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { FinancesSanctions } from "../sections/finance/finances-sanctions";
import { FinanceFondDeCaisse } from 'src/sections/finance/finance-fond-de-caisse';
import { FinanceFondSanction } from 'src/sections/finance/finance-fond-sanctions';
import { FinanceTotalCotisation } from 'src/sections/finance/finance-total-cotisation'
import { subDays, subHours } from 'date-fns';
import NextLink from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Container,Grid, Stack,Link, Typography,Button,SvgIcon } from "@mui/material";

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10Ob',
    motif: "Absence Seance",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    contribution_au_plat: '3000',
    name: 'MBOGNE  FOTSI RODRIGUE',
    tontine: '10000',
    status: 'Non'
  },
  {
    id: '5e887ac47eed253091be10Oa',
    motif: "Retard",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    name: 'SEULE TCHONANG GLADYS STÉPHANE',
    tontine: '200',
    status: 'oui'
  },
  
];
const total = [
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
          Sanctions | Pouapeu
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
                  Bilan Sanctions
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
                      href="/addSanctions">
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
            <FinanceFondSanction
              difference={23}
              positive={true}
              sx={{ height: '100%' }}
              value="100,000 F CFA"
            />
          </Grid>
            
            <Typography variant="h6">
            Recensement des projets de la saison
            </Typography> 

            <FinancesSanctions
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