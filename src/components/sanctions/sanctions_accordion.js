import PlusIcon from "@heroicons/react/24/solid/PlusIcon"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, DialogTitle, FormControl, FormLabel, Input, Modal, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { GridExpandMoreIcon } from "@mui/x-data-grid"
import { useCallback, useEffect, useMemo, useState } from "react"
import { modal_style } from "../saison/inscriptions_box";
import axios from "axios";
import { useSelection } from 'src/hooks/use-selection';
import getConfig from 'next/config';
import { FormSanction } from "./form_sanction";
import { applyPagination } from 'src/utils/apply-pagination';
import { FinancesSanctions } from "../../sections/finance/finances-sanctions";
const { publicRuntimeConfig } = getConfig();

const useEvents = (data, page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [data, page, rowsPerPage]
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

export const SanctionsAccordeon = (props) => {
    const {seance_id, sanctions, initSanction, reload} = props

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [expended, setEcpended] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [sanction, setSanction] = useState(initSanction)

    const finances = useEvents(sanctions, page, rowsPerPage);
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
    const openSanction = (sanction) => {
        console.log('Sanction to open: ',sanction)
        setSanction({...sanction})
        setOpenModal(true)
    }



    // const handleChange = (event) => {
    //     const { name, value} = event.target;
    //     console.log("Change")
    //     setValues({
    //       ...values,
    //       [name]: value,
    //     });

    //     console.log(values)
    //   };

    useEffect(() => {
        try{
            setSanction({
                ...initSanction
            })
          }catch(error){
            console.error(error)
          }
    }, [initSanction])

    return (
        <>
            <Accordion 
                expanded={expended} 
                onChange={()=>setEcpended(!expended)}> 
                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Liste des sanctions de la Séance
                        </Typography>

                        
                </AccordionSummary>

                <AccordionDetails>
                    <Box display="flex" 
                        justifyContent='end'>
                        <Button variant="contained"
                            onClick={()=>openSanction(initSanction)}
                            startIcon={(
                                <SvgIcon fontSize="small">
                                  <PlusIcon />
                                </SvgIcon>
                              )}
                        >
                        Ajouter
                        </Button>
                    </Box>
                    <FinancesSanctions
                        count={sanctions.length}
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
                        openSanction = {openSanction}
                    />
                </AccordionDetails>
                
            </Accordion>
            <FormSanction seance_id={seance_id} 
                open={openModal}
                setOpenModal={setOpenModal}
                sanction={sanction}
                reload={reload}
            />
        </>
    )
}

 