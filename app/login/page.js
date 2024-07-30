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
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            localStorage.setItem("accessoEffettuato", true);
            const data = await response;
            handlePrimoAccesso();
        } else {
            const text = await response.text();
        }
    };

    const handlePrimoAccesso = async () => {
        const response = await fetch('http://localhost:8080/cliente', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem("tipologia", data.tipologia);
            if (data.loginEffettuato === 0) {
                window.location.href = "/form-accesso";
            }else{
                window.location.href = "/";
            }
        } else {
            const text = await response.text();
            console.error('Errore durante il recupero dei dati:', text);
        }
    }

    return (
        <div className={`${classes.loginContainer} container`}>
            <h2 className={`active ${classes.titoloLogin}`}>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className={`${classes.login}`}>Login</button>
            </form>
        </div>

    );
};

export default LoginForm;
