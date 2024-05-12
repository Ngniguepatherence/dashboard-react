export function format_montant(montant){
    var chaine = ""
    var quotient = 0, reste = 0 , dividante = montant

    while(dividante >= 1){
        reste = dividante % 1000

        if(dividante < 1000 )
            chaine = reste + chaine
        else if(reste == 0)
            chaine = " 000" + chaine
        else if(reste < 10)
            chaine = " 00"+reste + chaine
        else if(reste < 100)
            chaine = " 0"+reste + chaine
        else
            chaine = " "+reste + chaine

        console.log("dividante :",dividante)
        console.log("reste :",reste)

        dividante = dividante / 1000
        
    }

    return chaine +" F"
    
}