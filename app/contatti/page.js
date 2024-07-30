import classes from '@/app/contatti/page.module.css';

const Contatti = () => (
    <div>
        <div className={classes.mappa}>
            <iframe
                width="100%"
                height="300px"
                frameBorder="0"
                allowFullScreen
                allow="geolocation"
                src="//umap.openstreetmap.fr/it/map/mappa-senza-nome_1098870?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=false&searchControl=false&tilelayersControl=false&embedControl=false&datalayersControl=false&onLoadPanel=none&captionBar=false&captionMenus=false"
                title="Mappa Semplificata"
            ></iframe>
        </div>
        <div className={`container ${classes.container}`}>
            <div className={classes.mainContent}>
                <h1>Contenuto Principale</h1>
                <p>Questo è il contenuto principale a sinistra.</p>
                <p>Puoi aggiungere qui altre informazioni.</p>
            </div>
            <div className={classes.sidebar}>
                <div className={classes.main}>
                    <div className={classes.outlinedText}>Se</div>
                </div>
                <p>Questo è il contenuto della sidebar a destra.</p>
                <p>Puoi aggiungere qui ulteriori dettagli o link.</p>
            </div>
        </div>
    </div>
);

export default Contatti;
