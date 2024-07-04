import React from 'react';
import classes from '@/Components/footer/main-footer.module.css';

const MainFooter = () => {
    return (
        <footer>
            <div className={`${classes.container} container-wrap`}>
            <div className={`${classes.sedeOperativa} text-center py-2 `}>
                <small>
                    Sede Operativa - Via Cremona 1 - Legnano 20025 (MI) -
                    <a href="mailto:amministrazione@miesgroup.it"
                       className={`${classes.email} text-darknav`}> amministrazione@miesgroup.it</a>
                </small>
            </div>
            <div className={`${classes.sedeLegale} text-white text-center py-2 `}>
                <small>
                    © Copyright 2018-24 - MIES S.r.l. - All rights reserved - Sede legale
                    Via Puricelli 1, 21013 Gallarate (VA) - P.iva 03635250123
                </small>
            </div>
        </div>
        </footer>
    );
}

export default MainFooter;
