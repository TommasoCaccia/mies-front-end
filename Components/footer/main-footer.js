import React from 'react';
import classes from '@/Components/footer/main-footer.module.css';

const MainFooter = () => {
    return (
        <footer>
            <div className={`${classes.bgLightFullWidth} bg-light py-4`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4 text-left mb-3 mb-md-0">
                            <img src="/Logo.png" className={`${classes.logo} d-block`} alt="Logo" />
                        </div>
                        <div className={`${classes.paragrafoFooter} col-md-4 text-center mb-3 mb-md-0`}>
                            <p className="mb-0">
                                Sede Operativa<br />
                                Via Cremona 1<br />
                                Legnano 20025 (MI)<br />
                                <a href="mailto:amministrazione@miesgroup.it" className="text-dark">amministrazione@miesgroup.it</a>
                            </p>
                        </div>
                        <div className="col-md-4 text-right mb-3 mb-md-0">
                            <div className="d-flex justify-content-end">
                                <iframe className={`${classes.map} d-block`}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2347.9031074488107!2d8.903980330954933!3d45.587668366027046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47868d05ab1c0383%3A0x355256489dea9cd2!2sVia%20Cremona%2C%208%2C%2020025%20Legnano%20MI!5e0!3m2!1sit!2sit!4v1718956551353!5m2!1sit!2sit"
                                    ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${classes.sedeLegale} text-white text-center py-2`}>
                <small>
                    © Copyright 2019-23 - MIES S.r.l. - All rights reserved - Sede legale
                    Via Puricelli 1, 21013 Gallarate (VA) - P.iva 03635250123
                </small>
            </div>
        </footer>
    );
}

export default MainFooter;
