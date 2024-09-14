import React, { useState,useCallback,useMemo,useEffect } from "react";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FinancesTable } from 'src/sections/finance/finance-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
// import { FinancesSanction } from 'src/sections/finance/FinancesSanction';
import Head from "next/head";
import { FinanceBouffe } from 'src/sections/finance/FinanceBouffe';
import { FinancesSanction } from 'src/sections/finance/FinancesTontine';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { FinanceFondDeCaisse } from 'src/sections/finance/finance-fond-de-caisse';
import { FinanceTotalCotisation } from 'src/sections/finance/finance-total-cotisation'
import { subDays, subHours } from 'date-fns';
import NextLink from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Container,Grid, Stack,Link, Typography,Button,SvgIcon } from "@mui/material";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from "axios";
import { SaisonList } from "../../sections/finance/saison-list";
import { useRouter } from "next/router";


const now = new Date();

const total = [
  {
    id: 'f69f88012978187a6c12897f',
    ref: 'DEV1049',
    amount: 1128000,
    customer: {
      name: 'AMO NOKAM GUY MARTIAL'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: '9eaa1c7dd4433f413c308ce2',
    ref: 'DEV1048',
    amount: 1128000,
    customer: {
      name: 'MOKTO NEGUE WILFRIED HYACINTHE I'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
];

const useEvents = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data,page, rowsPerPage]
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
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [final, setFinal] = useState([]);
  const finances = useEvents(final,page, rowsPerPage);
  const financesIds = useEventIds(finances);
  const financesSelection = useSelection(financesIds);
  


  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/saisons`);
        const result = await response.data;
        setFinal(result);
        // console.log(result);
        // console.log(final);
        // console.log(result)
      }
      catch(error) {
        console.error('Error fetching data: ',error);
      }
    };
    fetchData();
  },[]);

  const handleAddButtonClick = () => {
    router.push("/saison/saison_detail")
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
          Saisons | Pouapeu
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
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
                  BILAN MEETING
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
                      Ajouter
                </Button>
              </div>
            </Stack>

            
            
            <Typography variant="h6">
            Liste des Saisons
            </Typography> 

            <SaisonList
              count={final.length}
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
}


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;