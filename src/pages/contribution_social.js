import React, { useState,useCallback,useMemo, useEffect } from "react";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Head from "next/head";
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { FinancesSocial } from "../sections/finance/finances-social";
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Container,Grid, Stack, Typography,Button,SvgIcon } from "@mui/material";
import { FinancesContrib } from "../sections/finance/finances-contrib";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from "axios";

const now = new Date();

// const data = [
//   {
//     id: '5e887ac47eed253091be10Ob',
//     motif: "Absence Seance",
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     contribution_au_plat: '3000',
//     name: 'MBOGNE  FOTSI RODRIGUE',
//     tontine: '10000',
//     status: 'Non'
//   },
//   {
//     id: '5e887ac47eed253091be10Oa',
//     motif: "Retard",
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     name: 'SEULE TCHONANG GLADYS STÉPHANE',
//     tontine: '200',
//     status: 'oui'
//   },
  
// ];
// const total = [
//   {
//     id: 'f69f88012978187a6c12897f',
//     ref: 'DEV1049',
//     amount: 30.5,
//     customer: {
//       name: 'Ekaterina Tankova'
//     },
//     createdAt: 1555016400000,
//     status: 'pending'
//   },
//   {
//     id: '9eaa1c7dd4433f413c308ce2',
//     ref: 'DEV1048',
//     amount: 25.1,
//     customer: {
//       name: 'Cao Yu'
//     },
//     createdAt: 1555016400000,
//     status: 'delivered'
//   },
// ];

const useEvents = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};
const useEventSanctions = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data,page, rowsPerPage]
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
  const [data, setData] = useState([]) ;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const finances = useEvents(data, page, rowsPerPage);
  const sanctions = useEventSanctions(data,page, rowsPerPage);
  const financesIds = useEventIds(finances);
  const SanctionsIds = useEventSanctioonIds(sanctions);
  const financesSelection = useSelection(financesIds);
  const sanctionsSelection = useSelection(SanctionsIds);



  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await fetch(`${publicRuntimeConfig.api.baseURL}/api/participations/tontines`);
        const result = await response.json();
        console.log(result);
        setData(result);
      }
      catch(error) {
        console.error('Error fetching data: ',error);
      }
    };
    fetchData();
  },[]);

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
          Contribution Sociale | Pouapeu
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
                  Contribution Sociale
                </Typography>
                
              </Stack>
              {/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                 Add
                </Button>
              </div> */}
            </Stack>

            <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            {/* <FinanceFondSanction
              difference={23}
              positive={true}
              sx={{ height: '100%' }}
              value="100,000 F CFA"
            /> */}
          </Grid>
            
            <Typography variant="h6">
            Recensement des Contributions Sociales de la saison
            </Typography> 

            <FinancesSocial
              count={data.length}
              items={data}
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
           
            {/* <FinancesContrib
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
            /> */}
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