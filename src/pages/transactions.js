import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FinancesTable } from 'src/sections/finance/finance-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
// import { FinancesTransactions } from 'src/sections/finance/FinancesTransactions';
import Head from "next/head";
import { FinanceBouffe } from 'src/sections/finance/FinanceBouffe';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { FinanceFondDeCaisse } from 'src/sections/finance/finance-fond-de-caisse';
import { FinanceFondTransactions } from 'src/sections/finance/finance-fond-transactions';
import { FinanceTotalCotisation } from 'src/sections/finance/finance-total-cotisation'
import { subDays, subHours } from 'date-fns';
import NextLink from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Container, Grid, Stack, Link, Typography, Button, SvgIcon, FormControl, FormLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

import getConfig from 'next/config';
import { loadingAction, store } from "../store/store";
import { sum } from "pdf-lib";
import { FinanceFondTransaction } from "../sections/finance/finance-fond-transactions";
import { FinancesTransactions } from "../sections/finance/finances-transactions";
import { fetchSaisons } from "../components/session_form/session_basic_info";
import { flexbox } from "@mui/system";
const { publicRuntimeConfig } = getConfig();


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

const useEvents = (data, page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(data, page, rowsPerPage);
        },
        [data, page, rowsPerPage]
    );
};
const useEventTransactionss = (page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(total, page, rowsPerPage);
        },
        [page, rowsPerPage]
    );
};

const useEventIds = (transactions) => {
    return useMemo(
        () => {
            return transactions.map((finance) => finance.id);
        },
        [transactions]
    );
};
const useEventSanctioonIds = (transactions) => {
    return useMemo(
        () => {
            return transactions.map((trans) => trans.id);
        },
        [transactions]
    );
};

export const fetchTransactions = async (saison_id = undefined) => {
    store.dispatch(loadingAction)
    try {
        let request_url = "/api/transactions"
        console.log("Saison id: ",saison_id )
        if (saison_id) request_url = `/api/transactions/saison/${saison_id}`
        const response = await axios.get(`${publicRuntimeConfig.api.baseURL}${request_url}`);
        const rep = await response.data
        store.dispatch(loadingAction)
        return rep
    } catch (error) {
        console.error(error)
        store.dispatch(loadingAction)
        return []
    }

}
const Page = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataTransactions, setDataTransactions] = useState([])

    const [openTransactionsModal, setOpenTransactionsModal] = useState(false)
    const [currentTransactions, setCurrentTransactions] = useState({})
    const [bilan, setBBilan] = useState([])
    const [saisons, setSaisons] = useState([]) 

    const transactions = useEvents(dataTransactions, page, rowsPerPage);
    const transactionsSets = useEventTransactionss(page, rowsPerPage);
    const financesIds = useEventIds(transactions);
    const TransactionssIds = useEventSanctioonIds(transactionsSets);
    const financesSelection = useSelection(financesIds);
    const transactionsSelection = useSelection(TransactionssIds);
    const [isAdding, setIsAdding] = useState(false);
    const [saison_id, setSaison_id] = useState(undefined)



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

    const openTransactions = (trans) => {
        setCurrentTransactions({ ...trans })
        setOpenTransactionsModal(true)
    }

    useEffect(() => {
        try{
            (async () => {
                setSaisons(await fetchSaisons())
            })();
          }catch(error){
            console.error(error)
          }
    }, [])

    useEffect(() => {
        try {
            (async () => {
                // setDataTransactions([])
                const rep = await fetchTransactions(saison_id)
                setDataTransactions(rep.transactions)
                setBBilan(rep.bilan)
            })();
        } catch (error) {
            console.error(error)
        }


    }, [saison_id])


    return (
        <>
            <Head>
                <title>
                    Transactionss | Pouapeu
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
                                    Bilan Transactionss
                                </Typography>

                            </Stack>
                        </Stack>

                        <Stack spacing={3}>
                            <Stack display={flexbox} direction="row"
                                justifyContent='end'  >
                                <Stack  display={flexbox} direction="row"
                                    justifyContent='end' spacing={5} alignItems="center" width={{ xs: "100%", sm: "80%", md: "50%", lg:"30%" }}>
                                    <Typography color='text.ptimary'
                                        variant="h6">Saison </Typography>
                                    <Select
                                        value={saison_id || ""}
                                        fullWidth
                                        labelId="saison"
                                        id="saison"
                                        onChange={(event)=>setSaison_id(event.target.value)}
                                        name="saison"
                                        // error={!!errors.motif}
                                        // helperText={errors.motif}
                                    >
                                        <MenuItem key={"152all"} value={undefined}>
                                            Toutes les saisona
                                        </MenuItem>
                                        {saisons.map((m) => (
                                            <MenuItem key={m._id} value={m._id}>
                                                {m.libelle + " -> " + m.cout}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                            </Stack>

                            <FinanceFondTransaction
                                difference={23}
                                positive={true}
                                bilan={bilan}
                                sx={{ height: '100%' }}
                                value="100,000 F CFA"
                            />
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Typography variant="h6">
                                Recensement des transactions de la saison
                            </Typography>

                            <div>

                                {/* <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    onClick={() => {
                                        setCurrentTransactions({})
                                        setOpenTransactionsModal(true)

                                        console.log('open')
                                    }}
                                    variant="contained"
                                >
                                    Ajouter
                                </Button> */}
                            </div>
                        </Stack>

                        <FinancesTransactions
                            count={dataTransactions.length}
                            items={transactions}
                            onDeselectAll={financesSelection.handleDeselectAll}
                            onDeselectOne={financesSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={financesSelection.handleSelectAll}
                            onSelectOne={financesSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={financesSelection.selected}
                            openTransactions={openTransactions}
                        />
                        {/* <FinancesTransactions
                            count={total.length}
                            orders={transactionsSets}

                        /> */}
                    </Stack>
                </Container>
            </Box>

            {/* <FormTransactions
                reload={async () => setDataTransactions(await fetchTransactions())}
                open={openTransactionsModal}
                setOpenModal={setOpenTransactionsModal}
                trans={currentTransactions} /> */}
        </>
    );
}


Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;