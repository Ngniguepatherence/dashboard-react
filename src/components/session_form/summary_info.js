import { Box, Card, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"



const SummaryInfo = (props) => {
    const {seance } = props

    return(
        <>
            <Box padding={3}
                 display="flex"
                 justifyContent="space-between"
            >
                <SummaryCard 
                    title="Plat"
                    subtitle=""
                        datas = {[
                        {label: 'Recette TOTAL mensuel', 
                            value: seance.recette_total_plat
                        },
                        {label: 'Echec',
                            value: seance.echec_plat},
                        {label: 'Montant décaissé au membre qui reçoit la reunion',             
                            value: seance.montant_receptioniste},
                        {label: 'Solde contribution au plat de la seance ',
                            value: seance.solde_contribution__plat
                        },
                    ]} />
                <SummaryCard 
                    title="Tontine"
                    subtitle=""
                    datas = {[
                        {label: 'Recette tontine mensuel', 
                            value: seance.recette_total_tontine
                        },
                        {label: 'Echec',
                            value: seance.echec_tontine},
                        {label: 'Bouffeur 1  ',
                            value: seance.beneficaire_tontine1 ? 
                                (seance.beneficaire_tontine1.membre.name + " " + seance.beneficaire_tontine1.membre.surname)
                                : ''
                        },
                        {label: 'Montant remis au BOUFEUR 1',
                            value: seance.montant_beneficiaire1},
                        {label: 'Bouffeur 2 ',
                            value: seance.beneficaire_tontine2 ? 
                                (seance.beneficaire_tontine2.membre.name + " " + seance.beneficaire_tontine2.membre.surname)
                                : ''
                        },
                        {label: 'Montant remis au BOUFEUR 2',
                            value: seance.montant_beneficiaire2},
                    ]} />

                <SummaryCard 
                    title="Contributions Sociale "
                    datas = {[
                        {label: 'reversement du fond social des membres', 
                        value: seance.cs_total
                        },
                        {label: 'Echec',
                        value: seance.echec_cs},
                ]} />
            </Box>
        </>
    )
}

const SummaryCard = (props) => {
    const {title, subtitle, datas} = props

    return (
        <>
            <Card padding={3}>
                <Box padding={3}>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <Typography variant="body">
                        {subtitle}
                    </Typography>

                    <Stack marginBlock={2} >
                        <Stack spacing={2}>
                            {
                                datas.map( data =>(
                                    <SummaryRow key={data.label} 
                                                label={data.label}
                                                value={data.value}  />
                                ))
                            }
                        </Stack>
                    </Stack>

                </Box>
                
            </Card>
            
        </>
    )
}

const SummaryRow = (props) => {
    const {label, value} = props

    return(
        <Stack  
            direction="column">
                <Typography fontWeight="bold">
                    {label}
                </Typography>

                <Typography fontStyle="italic">
                    {value}
                </Typography>
        </Stack>
    )
}

export default SummaryInfo;