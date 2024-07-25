import classes from "@/app/creazione-utente/page.module.css";

export default function Register() {

    const creaUtente = async () => {
        event.preventDefault();
        const username = event.target.username.value ? event.target.username.value : null;
        const password = event.target.password.value ? event.target.password.value : null;
        const response = await fetch("http://localhost:8080/Autentication/Register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            localStorage.setItem("accessoEffettuato", true);
            const data = await response;
        } else {
            const text = await response.text();
            console.error('Errore durante la creazione dell\'utente:', text);
        }
    }

    return (
        <div className={`${classes.loginContainer} container`}>
            <h2 className={`active ${classes.titoloCreazioneUtente}`}>Creazione Utente</h2>
            <form onSubmit={creaUtente}>
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