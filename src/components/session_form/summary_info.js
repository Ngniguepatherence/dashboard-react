import { Box, Card, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"



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
                        {label: 'Montant remis au BOUFEUR',
                            value: seance.montant_beneficiaire},
                        {label: 'Bouffeur Selectionner ',
                            value: seance.beneficaire_tontine ? 
                                (seance.beneficaire_tontine.membre.name + " " + seance.beneficaire_tontine.membre.surname)
                                : ''
                        },
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

                    <Table>
                        <TableBody>
                            {
                                datas.map( data =>(
                                    <SummaryRow key={data.label} 
                                                label={data.label}
                                                value={data.value}  />
                                ))
                            }
                        </TableBody>
                    </Table>

                </Box>
                
            </Card>
            
        </>
    )
}

const SummaryRow = (props) => {
    const {label, value} = props

    return(
        <TableRow>
            <TableCell>
                <Typography fontWeight="bold">
                    {label}
                </Typography>
            </TableCell>

            <TableCell>
                <Typography fontStyle="italic">
                    {value}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

export default SummaryInfo;