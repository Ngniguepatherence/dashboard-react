import PlusIcon from "@heroicons/react/24/solid/PlusIcon"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, DialogTitle, FormControl, FormLabel, Input, Modal, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { GridExpandMoreIcon } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { modal_style } from "../saison/inscriptions_box";
import axios from "axios";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();


export const fetchMotifsSanction = async() => {
    try {
        const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/sanctions/motifs_sanction`);
        const rep = await response.data
        return rep
      } catch (error) {
          console.error(error)    
      }
}

export const MotifSanctionAccordion = () => {
    const [expended, setExpended] = useState(false)
    const [motifsSanction, setMotifsSanction] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [values, setValues] = useState({
        libelle: '',
        cout: ''
    })
    const [errors, setErrors] = useState({
        libelle: '',
        cout: ''
    })

    const openMotif = (motif) => {
        setValues({
            libelle: motif.libelle || '',
            cout: motif.cout || '',
            _id: motif._id  || undefined
        })
        setExpended(true)
        setOpenModal(true)
    }

    const submit =  async () => {
        try {
            console.log("submitting: ", values)
            var response = undefined
            if(!values._id){
                response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/sanctions/motifs_sanction`, values);
            }else{
                response = await axios.put(`${publicRuntimeConfig.api.baseURL}/api/sanctions/motifs_sanction/${values._id}`, {
                    libelle: values.libelle,
                    cout: values.cout
                });
            }
            const rep = await response.data
            setMotifsSanction(await fetchMotifsSanction())
            setOpenModal(false)
        }catch(err){
            console.error(err)
        }
    }
    const handleChange = (event) => {
        const { name, value} = event.target;
        console.log("Change")
        setValues({
          ...values,
          [name]: value,
        });

        console.log(values)
      };

    useEffect(() => {
        try{
            (async () => {
                setMotifsSanction(await fetchMotifsSanction())
            })();
            
          }catch(error){
            console.error(error)
            setMotifsSanction([])
          }
    }, [])
    return (
        <>
            <Accordion 
                expanded={expended} 
                onChange={()=>setExpended(!expended)}> 
                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                        <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h6">
                            Liste des motifs de sanction
                        </Typography>

                        
                </AccordionSummary>

                <AccordionDetails>
                    <Box display="flex" justifyContent='end'>
                        <Button variant="contained"
                                onClick={()=>openMotif({_id:undefined,cout:'',libelle:''})}
                                startIcon={(
                                    <SvgIcon fontSize="small">
                                    <PlusIcon />
                                    </SvgIcon>
                                )}>
                            Ajouter
                        </Button>
                    </Box>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>
                            Motif
                            </TableCell>
                            <TableCell>
                            Coût (FCFA)
                            </TableCell>

                            <TableCell>
                                Action
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {motifsSanction && motifsSanction.map((motif) => {
                            return (
                            <>
                            <TableRow
                                hover
                                key={motif._id}>
                                <TableCell>
                                {motif.libelle}
                                </TableCell>
                                <TableCell>
                                {motif.cout}
                                </TableCell>
                                <TableCell>
                                <Button variant="text"
                                        onClick={()=>openMotif(motif)}
                                        >
                                    Ouvrir
                                </Button>
                                
                                </TableCell>
                            </TableRow>
                            </>
                            );
                        })}
                        </TableBody>
                    </Table> 
                </AccordionDetails>
                
            </Accordion>
            <Modal
                keepMounted
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                    
                    <Box sx={modal_style}>
                        <DialogTitle>{values._id ?"Modifier":"Ajouter"} un motif</DialogTitle>
                        {/* <DialogContent>Fill in the information of the project.</DialogContent> */}
                        <form>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Motif</FormLabel>
                                    <TextField
                                        value={values.libelle || ''}
                                        fullWidth
                                        labelId="libelle"
                                        id="libelle"
                                        onChange={handleChange}
                                        name="libelle"
                                        error={!!errors.libelle}
                                        helperText={errors.libelle}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Coût (FCFA)</FormLabel>
                                    <Input
                                        type='number' 
                                        required
                                        onChange={handleChange}
                                        value={values.cout}
                                        name='cout'
                                        error={!!errors.cout}
                                        helperText={errors.cout} />
                                </FormControl>
                                <Button 
                                    type="button" 
                                    onClick={submit}>Valider</Button>
                            </Stack>
                        </form>
                    
                    </Box>
            </Modal>
        </>
    )
}

 