import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';

const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2023',
    description: 'Projet de reforme nationale, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'stockligne',
    downloads: '594'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2023',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Application de don de charite',
    downloads: '625'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2023',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Formation',
    downloads: '857'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2023',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'E-commerce',
    downloads: '406'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2023',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logos/logo-github.png',
    title: 'Importation Chine',
    downloads: '835'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    logo: '/assets/logos/logo-squarespace.png',
    title: 'Restauration',
    downloads: '835'
  }
];
const useProjet = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useProjetIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const projets = useProjet(data, page, rowsPerPage);
  const projetIds = useProjetIds(projets);
  const projetSelection = useSelection(projetIds);

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projets');
        const result = await response.json();
        setData(result);
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
          Projets | Pouapeu
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Projets
                </Typography>
                {/* <Stack
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
                    Importer
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Exporter
                  </Button>
                </Stack> */}
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
                  Ajouter
                </Button>
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid
              container
              spacing={3}
            >
              {projets.map((company,index) => (
                
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={index}
                >
                  <CompanyCard company={company} onClik/>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
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
