import classes from "@/app/form-accesso/page.module.css";

export default function Register() {

    return (
        <div className={`${classes.loginContainer} container`}>
            <h2 className={`active ${classes.titoloCreazioneUtente}`}>Info Utente</h2>
            <form>
                <div className={classes.formRow}>
                    <div className={`form-group ${classes.formSedeLegale}`}>
                        <input type="text" className={`form-control ${classes.sedeLegale}`} id="sedeLegale" name="sedeLegale" required/>
                        <span className={classes.SedeLegale}>Sede Legale</span>
                    </div>
                    <div className={`form-group ${classes.formPIva}`}>
                        <input type="text" className={`form-control ${classes.pIva}`} id="pIva" name="pIva" required/>
                        <span className={classes.PIva}>P.IVA</span>
                    </div>
                </div>
                <div className={classes.formRow}>
                    <div className={`form-group ${classes.formEmail}`}>
                        <input type="email" className={`form-control ${classes.email}`} id="email" name="email" required/>
                        <span className={classes.Email}>Email</span>
                    </div>
                    <div className={`form-group ${classes.formTelefono}`}>
                        <input type="tel" className={`form-control ${classes.telefono}`} id="telefono" name="telefono" required/>
                        <span className={classes.Telefono}>Telefono</span>
                    </div>
                </div>
                <div className={classes.formRow}>
                    <div className={`form-group ${classes.formStato}`}>
                        <input type="text" className={`form-control ${classes.stato}`} id="stato" name="stato" required/>
                        <span className={classes.Stato}>Stato</span>
                    </div>
                    <div className={`form-group ${classes.formClasseAgevolazione}`}>
                        <input type="text" className={`form-control ${classes.classeAgevolazione}`} id="classeAgevolazione" name="classeAgevolazione" required/>
                        <span className={classes.ClasseAgevolazione}>Classe di Agevolazione</span>
                    </div>
                </div>
                <button type="submit" className={`${classes.invia}`}>Invia</button>
            </form>
        </div>
    );
}
