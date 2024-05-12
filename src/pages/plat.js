import React, { useState,useCallback,useMemo, useEffect } from "react";
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
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const now = new Date();


const useEvents = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data,page, rowsPerPage]
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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState([]);

  const finances = useEvents(data, page, rowsPerPage);
  const sanctions = useEventSanctions(data, page, rowsPerPage);
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

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await fetch(`${publicRuntimeConfig.api.baseURL}/api/participations/tontines`);
        const result = await response.json();
        setData(result);
        console.log(result  );
        // console.log(result)
      }
      catch(error) {
        console.error('Error fetching data: ',error);
      }
    };
    fetchData();
  },[]);
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
              {/* <div>
                
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
              </div> */}
            </Stack>

            {/* <Grid
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
          </Grid> */}
            
            <Typography variant="h6">
            Recensement des Plats de la saison
            </Typography> 

            <FinancesPlat
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
            {/* <FinancesSanction
            count={total.length}
            orders={sanctions}
            
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