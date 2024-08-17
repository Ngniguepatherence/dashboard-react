import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FinancesTable } from "src/sections/finance/finance-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
// import { FinancesSanction } from 'src/sections/finance/FinancesSanction';
import Head from "next/head";
import { FinanceBouffe } from "src/sections/finance/FinanceBouffe";
import { FinancesSanction } from "src/sections/finance/FinancesSanction";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";
import { FinancesSanctions } from "../sections/finance/finances-sanctions";
import { FinanceFondDeCaisse } from "src/sections/finance/finance-fond-de-caisse";
import { FinanceFondSanction } from "src/sections/finance/finance-fond-sanctions";
import { FinanceTotalCotisation } from "src/sections/finance/finance-total-cotisation";
import { subDays, subHours } from "date-fns";
import NextLink from "next/link";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { Box, Container, Grid, Stack, Link, Typography, Button, SvgIcon } from "@mui/material";
import axios from "axios";

import getConfig from "next/config";
import { MotifSanctionAccordion } from "../components/sanctions/motifs_accordeon";
import { FormSanction } from "../components/sanctions/form_sanction";
import { loadingAction, store } from "../store/store";
import { sum } from "pdf-lib";
import { AutoSanctions } from "../sections/finance/automatiation-sanctions";
import { FormAutoSanction } from "../components/sanctions/form_auto_sanction";
const { publicRuntimeConfig } = getConfig();

const now = new Date();

const total = [
  {
    id: "f69f88012978187a6c12897f",
    ref: "DEV1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: "9eaa1c7dd4433f413c308ce2",
    ref: "DEV1048",
    amount: 25.1,
    customer: {
      name: "Cao Yu",
    },
    createdAt: 1555016400000,
    status: "delivered",
  },
];

const useEvents = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};
const useEventSanctions = (page, rowsPerPage) => {
  return useMemo(() => {
    const data = [
      {
        id: "5e887ac47eed253091be10Ob",
        motif: "Absence Seance",
        createdAt: subDays(subHours(now, 7), 1).getTime(),
        contribution_au_plat: "3000",
        name: "MBOGNE  FOTSI RODRIGUE",
        tontine: "10000",
        status: "Non",
      },
      {
        id: "5e887ac47eed253091be10Oa",
        motif: "Retard",
        createdAt: subDays(subHours(now, 7), 1).getTime(),
        name: "SEULE TCHONANG GLADYS STÉPHANE",
        tontine: "200",
        status: "oui",
      },
    ];
    return applyPagination(total, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useEventIds = (finances) => {
  return useMemo(() => {
    return finances.map((finance) => finance.id);
  }, [finances]);
};
const useEventSanctioonIds = (sanctions) => {
  return useMemo(() => {
    return sanctions.map((autoSanction) => autoSanction.id);
  }, [sanctions]);
};

export const fetchAutoSanctions = async () => {
  store.dispatch(loadingAction);
  try {
    const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/automatisation_sanction`);
    const rep = await response.data;
    store.dispatch(loadingAction);
    return rep;
  } catch (error) {
    console.error(error);
    store.dispatch(loadingAction);
    return [];
  }
};

export const fetchAutoSanctionPossible = async () => {
  store.dispatch(loadingAction);
  try {
    const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/sanctions`);
    const rep = await response.data;
    store.dispatch(loadingAction);
    return rep;
  } catch (error) {
    console.error(error);
    store.dispatch(loadingAction);
    return [];
  }
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataAutoSanctions, setDataAutoSanctions] = useState([]);

  const [openSanctionModal, setOpenAutoSanctionModal] = useState(false);
  const [currentAutoSanction, setCurrenAutotSanction] = useState({});
  const [bilan, setBBilan] = useState({
    total: 0,
    paye: 0,
    non_paye: 0,
  });

  const finances = useEvents(dataAutoSanctions, page, rowsPerPage);
  const sanctions = useEventSanctions(page, rowsPerPage);
  const financesIds = useEventIds(finances);
  const SanctionsIds = useEventSanctioonIds(sanctions);
  const financesSelection = useSelection(financesIds);
  const sanctionsSelection = useSelection(SanctionsIds);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const openAutoSanction = (autoSanction) => {
    setCurrenAutotSanction({ ...autoSanction });
    setOpenAutoSanctionModal(true);
  };

  useEffect(() => {
    try {
      (async () => {
        // setDataAutoSanctions([])
        setDataAutoSanctions(await fetchAutoSanctions());
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const total = sum(dataAutoSanctions.map((elt) => elt.motif.cout));
    const paye = sum(dataAutoSanctions.filter((elt) => elt.paye).map((elt) => elt.motif.cout));
    const non_paye = sum(dataAutoSanctions.filter((elt) => !elt.paye).map((elt) => elt.motif.cout));

    setBBilan({
      total: total,
      paye: paye,
      non_paye: non_paye,
    });
  }, [dataAutoSanctions]);

  return (
    <>
      <Head>
        <title>Sanctions | Pouapeu</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="l">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Automatisation des Sanctions</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h6">
                {/* Recensement des sanctions de la saison */}
              </Typography>

              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  onClick={() => {
                    setCurrenAutotSanction({})
                    setOpenAutoSanctionModal(true);
                    console.log("open");
                  }}
                  variant="contained"
                >
                  Ajouter
                </Button>
              </div>
            </Stack>

            <AutoSanctions
              count={dataAutoSanctions.length}
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
              openAutoSanction={openAutoSanction}
            />
            {/* <FinancesSanction count={total.length} orders={sanctions} /> */}
          </Stack>
        </Container>
      </Box>

      <FormAutoSanction
        reload={async () => setDataAutoSanctions(await fetchAutoSanctions())}
        open={openSanctionModal}
        setOpenModal={setOpenAutoSanctionModal}
        autoSanction={currentAutoSanction}
      />

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
