import { useEffect, useState } from "react"
import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, SvgIcon, TextField } from "@mui/material"
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import getConfig from 'next/config';
import { format } from 'date-fns';
const { publicRuntimeConfig } = getConfig();

import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import axios from "axios";
import { loadingAction, store } from "../../store/store";




const SaisonBasicInfo = (props) => {
    const {saison, updateSaison } = props

    const [values, setValues] = useState(saison)
    const [errors, setErrors] = useState({
        libelle: '',
        date_debut:'',
        date_fin: '',
        montant_contribution_social: '',
        montant_contribution_plat: '',
        montant_un_nom: '',
    })

    const submitSaison = async ()=>{
        store.dispatch(loadingAction)
        try{
            console.log(values)
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/saisons`, values);
            const rep = await response.data
            updateSaison(rep)
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


    useEffect(() => {
        
    }, [])

    useEffect(()=>{
        if(saison._id)
            setValues({
                ...saison,
                date_debut : format(new Date(saison.date_debut), 'yyyy-MM-dd'),
                date_fin : format(new Date(saison.date_fin), 'yyyy-MM-dd')
            })

    },[saison])

    return(
        <>
            <Stack padding={3} spacing={3}>
                <Grid container
                        spacing={2}
                        gap={3}
                >

                    <Grid items md={12} lg={5}>
                        Libellé
                        <TextField
                            fullWidth
                            name="libelle"
                            type="text"
                            value={values.libelle}
                            onChange={handleChange}
                            error={!!errors.libelle}
                            helperText={errors.libelle}
                            />
                    </Grid>

                    <Grid items md={12} lg={5}>
                        Date Début
                        <TextField
                            fullWidth
                            name="date_debut"
                            type="date"
                            value={values.date_debut}
                            onChange={handleChange}
                            error={!!errors.date_debut}
                            helperText={errors.date_debut}
                            />
                    </Grid>

                    <Grid items md={12} lg={5}>
                        Date Fin
                        <TextField
                            fullWidth
                            name="date_fin"
                            type="date"
                            value={values.date_fin}
                            onChange={handleChange}
                            error={!!errors.date_fin}
                            helperText={errors.date_fin}
                            />
                    </Grid>

                    <Grid items md={12} lg={5}>
                        Montant Contribution Sociale par Séance
                        <TextField
                            fullWidth
                            name="montant_contribution_social"
                            type="number"
                            value={values.montant_contribution_social}
                            onChange={handleChange}
                            error={!!errors.montant_contribution_social}
                            helperText={errors.montant_contribution_social}
                            />
                    </Grid>

                    <Grid items md={12} lg={5}>
                        Montant Contribution au Plat par Séance
                        <TextField
                            fullWidth
                            name="montant_contribution_plat"
                            type="number"
                            value={values.montant_contribution_plat}
                            onChange={handleChange}
                            error={!!errors.montant_contribution_plat}
                            helperText={errors.montant_contribution_plat}
                            />
                    </Grid>

                    <Grid items md={12} lg={5}>
                        Montant "un non" Tontine
                        <TextField
                            fullWidth
                            name="montant_un_nom"
                            type="number"
                            value={values.montant_un_nom}
                            onChange={handleChange}
                            error={!!errors.montant_un_nom}
                            helperText={errors.montant_un_nom}
                            />
                    </Grid>

                </Grid>

                <Box display="flex"
                     justifyContent="end"
                >
                    {!saison._id && <Button variant="contained"
                            onClick={submitSaison}
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

export default SaisonBasicInfo