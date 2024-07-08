"use client"
import React, {useEffect, useState, useRef} from 'react';
import classes from '@/app/home-accesso/page.module.css';
import Link from "next/link";

export default function Home() {
    const [activeSection, setActiveSection] = useState('section1');
    const [manualNavigation, setManualNavigation] = useState(false);
    const sectionRefs = useRef({
        section1: useRef(null),
        section2: useRef(null),
        section3: useRef(null),
        section4: useRef(null),
        section5: useRef(null),
        section6: useRef(null),
        section7: useRef(null),
        section8: useRef(null),
        section9: useRef(null),
        section10: useRef(null),
        section11: useRef(null),
        section12: useRef(null),
    });
    const sidebarRef = useRef(null); // Ref per la sidebar

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    if (!manualNavigation) {
                        setActiveSection(entry.target.id);
                        scrollToActiveLink(entry.target.id);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        Object.values(sectionRefs.current).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs.current).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [manualNavigation]);

    const handleNavigation = (e, section) => {
        e.preventDefault();
        setManualNavigation(true);
        const sectionElement = sectionRefs.current[section].current;
        const offsetTop = 110;

        window.scrollTo({
            top: sectionElement.offsetTop - offsetTop, behavior: 'smooth'
        });

        setActiveSection(section);
        setTimeout(() => {
            setManualNavigation(false);
            scrollToActiveLink(section);
        }, 10000);
    };

    const scrollToActiveLink = (sectionId) => {
        const activeLink = sidebarRef.current?.querySelector(`.${classes.active}`);
        if (activeLink) {
            sidebarRef.current.scrollTop = activeLink.offsetTop - sidebarRef.current.offsetTop - 100;
        }
    };

    return (<div className={`${classes.container} container`}>
        <nav className={classes.sidebar}>
            <ul className="nav flex-column">
                {Object.keys(sectionRefs.current).map((key) => (<li key={key} className="nav-item">
                    <a
                        className={`${classes.navLink} ${activeSection === key ? classes.active : ''}`}
                        href={`#${key}`}
                        onClick={(e) => handleNavigation(e, key)}
                    >
                        {key.replace('section', 'Section ')}
                    </a>
                </li>))}
            </ul>
        </nav>
        <main className={classes.mainContent}>
            <div id="section1" ref={sectionRefs.current.section1} className={classes.section}>
                <h1 className={classes.sectionTitle}>Sales Funnel Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>

                <iframe id="dashboard" title="Dashboard Sublitex" width="800" height="467"
                        src="https://app.powerbi.com/reportEmbed?reportId=92de7c0c-f0f4-4307-a2e9-6f0512b178b9&autoAuth=true&ctid=552bed02-4512-450c-858d-84cfe2b4186d&filterPaneEnabled=false&navContentPaneEnabled=false"
                        frameBorder="0" allowFullScreen="true"></iframe>

                <div className="cta-wrapper d-flex flex">
                    <a href="/home-accesso/powerbi" className={classes.bottonePowerbi}>Visualliza PowerBI</a>
                </div>

            </div>
            <div id="section2" ref={sectionRefs.current.section2} className={classes.section}>
                <h1 className={classes.sectionTitle}>Sales Dashboard in Power BI</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section3" ref={sectionRefs.current.section3} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section4" ref={sectionRefs.current.section4} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section5" ref={sectionRefs.current.section5} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section6" ref={sectionRefs.current.section6} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section7" ref={sectionRefs.current.section7} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section8" ref={sectionRefs.current.section8} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section9" ref={sectionRefs.current.section9} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section10" ref={sectionRefs.current.section10} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section11" ref={sectionRefs.current.section11} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
            <div id="section12" ref={sectionRefs.current.section12} className={classes.section}>
                <h1 className={classes.sectionTitle}>Daily Sales Flash Power BI Dashboard</h1>
                <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum
                    è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo
                    prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non
                    solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                    sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da
                    software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
            </div>
        </main>


    </div>);

}
