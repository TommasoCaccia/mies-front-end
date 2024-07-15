import classes from "@/app/creazione-utente/page.module.css";

export default function Register() {

    return (
        <div className={`${classes.loginContainer} container`}>
            <h2 className={`active ${classes.titoloCreazioneUtente}`}>Creazione Utente</h2>
            <form>
                <div className={`form-group ${classes.formUsername}`}>
                    <input type="text" className={`form-control ${classes.username}`} id="username" name="username"
                           required/>
                    <span className={classes.Username}>Username</span>
                </div>
                <div className={`form-group ${classes.formPassword}`}>
                    <input type="password" className={`form-control ${classes.password}`} id="password" name="password"
                           required/>
                    <span className={classes.Password}>Password</span>
                </div>
                <button type="submit" className={`${classes.creaUtente}`}>Crea Utente</button>
            </form>
        </div>
    );
}
