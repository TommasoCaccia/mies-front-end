import classes from './page.module.css';

const LoginForm = () => {
    return (
        <div className={classes.root}>
            <div className={classes.leftSection}>
                <h1 className={classes.title}>Mies</h1>
                <p className={classes.description}>
                    Lorem ipsum dolor sit amet,<br/>
                    Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,<br/>
                    Lorem ipsum dolor sit amet,<br/>
                    Lorem ipsum dolor sit amet,sit amet<br/>
                    Lorem ipsum dolor sit amet,.<br/>
                    Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,<br/>
                    Lorem ipsum dolor sit amet,
                </p>
            </div>
            <div className={classes.login}>
                <h2 className={`active ${classes.Sign}`}>Login</h2>
                <form>
                    <div className={`form-group ${classes.GruppoUsername}`}>
                        <input type="email" className={`form-control ${classes.Username2}`} name="username"/>
                        <span className={classes.Username}>Username</span>
                    </div>
                    <div className="form-group">
                        <input type="password" className={`form-control ${classes.Password2}`} name="password"/>
                        <span className={classes.Password}>Password</span>
                    </div>
                    <div className={`form-group form-check ${classes.GruppoRicordami}`}>
                        <input type="checkbox" className={`form-check-input ${classes.Spunta}`} id="checkbox-1-1"/>
                        <label className={`form-check-label ${classes.Ricordami}`} htmlFor="checkbox-1-1">Ricordami</label>
                    </div>
                    <button type="submit" className={`btn btn-primary ${classes.Pulsante1}`}>Login
                    </button>
                    <div className="nav-item">
                        <a href="/registrazione" className={`nav-link ${classes.Registrazione}`}>Crea Il Tuo Accocunt</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;