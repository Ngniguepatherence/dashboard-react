import PlusIcon from "@heroicons/react/24/solid/PlusIcon"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, DialogTitle, FormControl, FormLabel, Input, MenuItem, Modal, Radio, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { GridExpandMoreIcon } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { modal_style } from "../saison/inscriptions_box";
import axios from "axios";
import getConfig from 'next/config';
import { fetchMotifsSanction } from "./motifs_accordeon";
import { useRouter } from "next/router";
import { fetchSaisons } from "../session_form/session_basic_info";
import { loadingAction, store } from "../../store/store";
const { publicRuntimeConfig } = getConfig();


export const FormSanction = (props) => {
    const {open, setOpenModal, sanction, reload, seance_id} = props

    const router = useRouter()
    const [saisons, setSaisons] = useState([])
    const [inscrits, setInscrits] = useState([])
    const [motifsSanctions, setMotifsSanction] = useState([])
    const [values, setValues] = useState({
        inscrit: undefined,
        motif: undefined,
        date: '',
        paye: false,
        saison: undefined,
        ...sanction
    })

    const [errors, setErrors] = useState({
        inscrit: '',
        motif: '',
        date: '',
        paye: '',
        saison: '',
    })
    const submit =  async () => {
        store.dispatch(loadingAction)
        try {
            console.log("submitting: ", values)
            var response = undefined
            if(!values._id){
                if(seance_id){
                    console.log("Adding Sanction to seance :",seance_id )
                    response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/seance/${seance_id}/add_sanction`, {
                        ...values,
                        paye: values.paye === 'on' || values.paye === true
                    });
                }else{
                    response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/sanctions`, {
                        ...values,
                        paye: values.paye === 'on' || values.paye === true
                    });
                }
            }else{
                response = await axios.put(`${publicRuntimeConfig.api.baseURL}/api/sanctions/${values._id}`, {
                    ...values,
                    paye: values.paye === 'on' || values.paye === true
                });
            }
            const rep = await response.data
            setOpenModal(false)
            if(reload)
                reload()
        }catch(err){
            console.error(err)
        }
        store.dispatch(loadingAction)
    }
    const handleChange = (event) => {
        const { name, value} = event.target;
        console.log("Change")
        setValues({
          ...values,
          [name]: value,
        });

      };

    useEffect(() => {
        try{
            (async () => {
                setMotifsSanction(await fetchMotifsSanction())
                setSaisons(await fetchSaisons())
            })();
            
          }catch(error){
            console.error(error)
            setMotifsSanction([])
            setInscrits([])
          }
    }, [])

    useEffect(()=>{
        setValues({
            inscrit: undefined,
            motif: undefined,
            date: '',
            paye: false,
            saison: undefined,
            ...sanction
        })
    },[sanction])

    useEffect(()=>{
        const current_saison = saisons.find(elt => elt._id == values.saison)
            if(current_saison){
                console.log(current_saison)
                setInscrits(current_saison.participants)
            }
    },[values.saison, saisons])

    return(
        <>

            <Modal
                keepMounted
                open={open}
                onClose={() => setOpenModal(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                    
                    <Box sx={modal_style}>
                        <DialogTitle>{values._id ?"Modifier":"Ajouter"} une Sanction</DialogTitle>
                        {/* <DialogContent>Fill in the information of the project.</DialogContent> */}
                        <form>
                            <Stack spacing={2}>

                            <FormControl>
                                    <FormLabel>Saison</FormLabel>
                                    <Select
                                        value={values.saison || ''}
                                        fullWidth
                                        labelId="saison"
                                        id="saison"
                                        onChange={handleChange}
                                        name="saison"
                                        error={!!errors.saison}
                                        helperText={errors.saison}
                                    >
                                        {saisons.map( m=> (
                                            <MenuItem key={m._id} value={m._id}>{m.libelle}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Membre</FormLabel>
                                    <Select
                                        value={values.inscrit || ''}
                                        fullWidth
                                        labelId="inscrit"
                                        id="inscrit"
                                        onChange={handleChange}
                                        name="inscrit"
                                        error={!!errors.inscrit}
                                        helperText={errors.inscrit}
                                    >
                                        {inscrits.map( m=> (
                                            <MenuItem key={m._id} value={m._id}>{m.membre.name +" "+ m.membre.surname}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Motif - Cout</FormLabel>
                                    <Select
                                        value={values.motif || ''}
                                        fullWidth
                                        labelId="motif"
                                        id="motif"
                                        onChange={handleChange}
                                        name="motif"
                                        error={!!errors.motif}
                                        helperText={errors.motif}
                                    >
                                        {motifsSanctions.map( m=> (
                                            <MenuItem key={m._id} value={m._id}>{m.libelle +" -> "+ m.cout}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                    <Input
                                        type='date' 
                                        required
                                        onChange={handleChange}
                                        value={values.date}
                                        name='date'
                                        error={!!errors.date}
                                        helperText={errors.date} />
                                </FormControl>

                                <FormControl >
                                    <FormLabel>status</FormLabel>
                                    <Select
                                        value={values.paye}
                                        fullWidth
                                        labelId="paye"
                                        id="paye"
                                        onChange={handleChange}
                                        name="paye"
                                        error={!!errors.paye}
                                        helperText={errors.paye}
                                    >
                                        <MenuItem key='status_non_paye' 
                                            value={false}>Nom Payé</MenuItem>
                                        <MenuItem key='status_paye' 
                                            value={true}>Payé</MenuItem>
                                        
                                    </Select>
                                    
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
