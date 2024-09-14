import { useEffect, useState } from "react"
import { fetchMembres } from "../../pages/addSeance"
import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, SvgIcon, TextField } from "@mui/material"
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import axios from "axios";
import { loadingAction, store } from "../../store/store";


export const fetchSaisons = async ()=>{

    store.dispatch(loadingAction)
    try {
        const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/saisons`);
        const rep = await response.data
        return rep
      } catch (error) {
          new Error(error)    
      }
      store.dispatch(loadingAction)
}

const SeanceBasicInfo = (props) => {
    const {seance, reload_seance } = props

    const [membres, setMembres] = useState([]) 
    const [inscrits, setInscrits] = useState([])
    const [saisons, setSaisons] = useState([]) 
    const [values, setValues] = useState(seance)
    const [errors, setErrors] = useState({
        date: '',
        saison:'',
        beneficaire_plat: "",
    })

    const submitSeance = async ()=>{
        store.dispatch(loadingAction)
        try{
            console.log(values)
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/seance`, values);
            const rep = await response.data
            reload_seance(rep._id)

        }catch(error){
            console.error(error)
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

        console.log(values)
      };

      useEffect(()=>{
        const current_saison = saisons.find(elt => elt._id == values.saison)
            if(current_saison){
                console.log(current_saison)
                setInscrits(current_saison.participants)
            }
    },[values.saison, saisons])

    useEffect(() => {
        try{
            (async () => {
                setMembres(await fetchMembres())
                setSaisons(await fetchSaisons())
            })();
          }catch(error){
            console.error(error)
          }
    }, [])

    useEffect(()=>{
        if(seance._id)
            setValues({
                date: seance.date,
                beneficaire_plat: seance.beneficaire_plat ? seance.beneficaire_plat._id : '',
                // beneficaire_tontine: seance.beneficaire_tontine._id,
                saison: seance.saison._id
            })

    },[seance])


    return(
        <>
            <Stack padding={3} spacing={3}>
                <Grid container
                        spacing={2}
                        gap={3}
                >
                    <Grid items md={12} lg={5}>
                        Date
                        <TextField
                            fullWidth
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            error={!!errors.date}
                            helperText={errors.date}
                            />
                    </Grid>
                    <Grid items md={12} lg={5}>
                        Saison
                        <Select
                            fullWidth
                            labelId="saison"
                            id="saison"
                            name="saison"
                            value={values.saison || ''}
                            onChange={handleChange}
                            error={!!errors.saison}
                            helperText={errors.saison}
                            >
                                {saisons.map(opt=>(
                                    <MenuItem 
                                        key={opt._id} 
                                        value={opt._id}
                                    >
                                        {opt.libelle}
                                    </MenuItem>
                                ))}
                            </Select>
                    </Grid>
                    {/* <Grid items md={12} lg={5}>
                        
                        Bouffeur de la Tontine
                        <Select
                            value={values.beneficaire_tontine || ''}
                            fullWidth
                            labelId="beneficaire_tontine"
                            id="beneficaire_tontine"
                            onChange={handleChange}
                            label="Bouffeur de la Tontine"
                            name="beneficaire_tontine"
                            error={!!errors.beneficaire_tontine}
                            helperText={errors.beneficaire_tontine}
                        >
                            {membres.map( m=> (
                                <MenuItem key={m._id} value={m._id}>{m.name +" "+ m.surname}</MenuItem>
                            ))}
                        </Select>
                    </Grid> */}
                    <Grid items md={12} lg={5}>
                        Receveur de la Swance
                        <Select
                            value={values.beneficaire_plat || ''}
                            fullWidth
                            labelId="beneficaire_plat"
                            id="beneficaire_plat"
                            onChange={handleChange}
                            name="beneficaire_plat"
                            error={!!errors.beneficaire_plat}
                            helperText={errors.beneficaire_plat}
                        >
                            {inscrits.map( m=> (
                                <MenuItem key={m._id} 
                                    value={m._id}>{m.membre.name +" "+ m.membre.surname}</MenuItem>
                            ))}
                        </Select>
                    </Grid>

                </Grid>

                <Box display="flex"
                     justifyContent="end"
                >
                    {!seance._id && <Button variant="contained"
                            onClick={submitSeance}
                            color="success"
                            startIcon={(
                                <SvgIcon fontSize="small">
                                  <CheckIcon />
                                </SvgIcon>
                              )}
                    >
                        Valider
                    </Button>}
                </Box>
            </Stack>
        </>
    )
}

export default SeanceBasicInfo