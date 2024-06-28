// pages/login.js
import React from 'react';
import classes from '@/app/login/page.module.css';  // Importa il modulo CSS

export default function Login() {
    return (
        <>
            <div className={`container ${classes.loginContainer}`}>
                <div className="row justify-content-center">
                    <h2 className={`text-center mb-4 ${classes.titoloLogin}`}>Login</h2>
                    <form className={classes.formLogin}>
                        <div className={`form-group ${classes.formEmail}`}>
                        <input type="email" className={`form-control ${classes.email}`} id="email" required/>
                            <label htmlFor="email">Indirizzo Email</label>
                        </div>
                        <div className={`form-group ${classes.formPassword}`}>
                            <input type="password" className={`form-control ${classes.password}`} id="password"
                                   required/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" className={`btn btn-primary w-100 ${classes.login}`}>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
