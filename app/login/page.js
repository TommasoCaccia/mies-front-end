"use client";
import classes from '@/app/login/page.module.css';

const LoginForm = () => {
    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username ? event.target.username.value : undefined;
        const password = event.target.password ? event.target.password.value : undefined;

        const response = await fetch('http://localhost:8080/Autentication/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
           // console.log(response);
            localStorage.setItem("accessoEffettuato", true);
            const data = await response; // Cambiato da response a response.json()
            //console.log('Risposta del server:', data);
            //console.log('Login effettuato con successo');
        } else {
            const text = await response.text();
            //console.log('Errore del server:', text);
            //console.error('Errore durante il login');
        }
    };

    return (
        <div className={classes.loginContainer}>
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
                <form onSubmit={handleLogin}> {/* Aggiunto form con onSubmit */}
                    <div className={`form-group ${classes.GruppoUsername}`}>
                        <input type="text" className={`form-control ${classes.Username2}`} id="username" name="username" required/>
                        <span className={classes.Username}>Username</span>
                    </div>
                    <div className="form-group">
                        <input type="password" className={`form-control ${classes.Password2}`} id="password" name="password" required/>
                        <span className={classes.Password}>Password</span>
                    </div>
                    <div className={`form-group form-check ${classes.GruppoRicordami}`}>
                        <input type="checkbox" className={`form-check-input ${classes.Spunta}`} id="checkbox-1-1"/>
                        <label className={`form-check-label ${classes.Ricordami}`}
                               htmlFor="checkbox-1-1">Ricordami</label>
                    </div>
                    <button type="submit" className={`btn btn-primary ${classes.Pulsante1}`}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
