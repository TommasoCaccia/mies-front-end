import classes from '@/app/contatti/page.module.css';
import Card from '../../Components/cardTeam/cardTeam'
import SendEmailForm from "@/Components/formEmail/form";

const Contatti = () => (
    <div>
        <div className={classes.mappa}>
            <iframe
                width="100%"
                height="300px"
                allowFullScreen
                allow="geolocation"
                src="//umap.openstreetmap.fr/it/map/mappa-senza-nome_1098870?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=false&searchControl=false&tilelayersControl=false&embedControl=false&datalayersControl=false&onLoadPanel=none&captionBar=false&captionMenus=false"
                title="Mappa Semplificata"
            ></iframe>
        </div>
        <div className={classes.container}>
            <div className={classes.mainContent}>
                <h1 className={classes.titoloPrincipale}>LA SEDE MIES</h1>
                <p>Ti diamo il benvenuto in MIES. <br></br>
                    Mettiti in contatto senza alcun impegno, ti risponderemo al più presto!
                </p>
                <div>
                    <Card/>
                </div>
                <div>
                    <h1>Inviaci un email</h1>
                    <SendEmailForm/>
                </div>
            </div>
            <div className={classes.sidebarContainer}>
                <div>
                    <h2 className={classes.sedeLegale}>Sede Legale</h2>
                    <p className={classes.paragrafiSedeLegale}>
                        <strong className={classes.strong}>Indirizzo</strong>
                        <br></br>Via Puricelli 1
                        <br></br>Gallarate 21013 (VA) - Italia
                    </p>
                    <p className={classes.paragrafiSedeLegale}>
                        <strong className={classes.strong}>Contatti</strong>
                        <br></br>amministrazione@miesgroup.it
                    </p>
                    <p className={classes.paragrafiSedeLegale}>
                        <strong className={classes.strong}>Orari di apertura</strong>
                        <br></br>Lun-Ven: 9:00-18:00
                    </p>
                </div>
                <div>
                    <h2 className={classes.sedeOperativa}>Sede Operativa</h2>
                    <p className={classes.paragrafiSedeLegale}>
                        <strong className={classes.strong}>Indirizzo</strong>
                        <br></br>Via Cremona 1
                        <br></br>Legnano 20025 (MI) - Italia
                    </p>
                    <p className={classes.paragrafiSedeLegale}>
                        <strong className={classes.strong}>Contatti</strong>
                        <br></br>amministrazione@miesgroup.it
                    </p>
                    <p className={classes.paragrafiSedeLegale}>
                        <strong className={classes.strong}>Orari di apertura</strong>
                        <br></br>Lun-Ven: 9:00-18:00
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Contatti;
