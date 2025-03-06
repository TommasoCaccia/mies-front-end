"use client";
import classes from '@/app/login/page.module.css';
import {useState} from "react";

const LoginForm = () => {

    const PATH = process.env.NEXT_PUBLIC_PATH_DEV
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username ? event.target.username.value : undefined;
        const password = event.target.password ? event.target.password.value : undefined;

        const response = await fetch(`${PATH}/Autentication/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            const data = await response;
            window.location.href = "/";
        } else {
            setError('password o username errati ');
        }
    };


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
            {error && <div className={classes.error}>{error}</div>}
        </div>

    );
};

export default LoginForm;
