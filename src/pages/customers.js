import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Link } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
  import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
const now = new Date();
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
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
  const customers = useCustomers(data, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [isAdding, setIsAdding] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({
    id: '',
    address: {
      city: '',
      country: '',
      state: '',
      street: '',
    },
    avatar: '',
    createdAt: new Date().toISOString(), // Utilisez la date actuelle comme exemple
    email: '',
    name: '',
    phone: '',
  });


  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await fetch(`${publicRuntimeConfig.api.baseURL}/api/profiles`);
        const result = await response.json();
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

  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyez les données du nouveau client au serveur
      await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles`, newCustomerData);

      // Réinitialisez les données du nouveau client et désactivez le mode ajout
      setNewCustomerData({
        id: '',
        address: {
          city: '',
          country: '',
          state: '',
          street: '',
        },
        avatar: '',
        createdAt: new Date().toISOString(),
        email: '',
        name: '',
        phone: '',
      });
      setIsAdding(false);

      // Rafraîchissez les données en rechargeant la liste des clients
      const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/profiles`);
      setData(response.data);
    } catch (error) {
      console.error('Error adding new customer:', error);
    }
  };

  return (
    <>
      <Head>
        <title>
          Membres | Pouapeu
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
                  Membres de l'association Pouapou
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  {/* <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Importer
                  </Button> */}
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
                </Stack>
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
                      href="/addmembers">
                      Ajouter un membre
                    </Link>
                </Button> 
              </div>
            </Stack>
            
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
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
