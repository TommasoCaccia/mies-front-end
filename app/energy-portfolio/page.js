"use client"
import React, {useEffect, useState, useRef} from 'react';
import classes from '@/app/energy-portfolio/page.module.css';
import dynamic from "next/dynamic";
import {energyportfolio, futures} from '@/Components/PBI/reportsConfig';
import DynamicPowerBIReport from "@/Components/PBI/DynamicPowerBIReport";

const PATH = process.env.NEXT_PUBLIC_PATH_DEV


const PowerBIReport = dynamic(() => import("../../Components/PBI/PowerBIReport"),
    {ssr: false}
);

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeSection, setActiveSection] = useState('section1');
    const [manualNavigation, setManualNavigation] = useState(false);
    const sectionRefs = useRef({
        section1: useRef(null),
        section2: useRef(null)
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

    const scrollToActiveLink = (sectionId) => {
        const activeLink = sidebarRef.current?.querySelector(`.${classes.active}`);
        if (activeLink) {
            sidebarRef.current.scrollTop = activeLink.offsetTop - sidebarRef.current.offsetTop - 100;
        }
    };

    //Cookie-extract
    const getCookie = async () => {
        const response = await fetch(`${PATH}/session/extract-cookie`, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            console.log("Cookie estratto con successo");
        } else {
            console.error("Errore durante l'estrazione del cookie");
        }

    }

    const handleNavigation = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const enterFullScreen = (containerId) => {
        const iframeContainer = document.getElementById(containerId);
        if (!iframeContainer) return; // Se il contenitore non esiste, esce

        if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
        } else if (iframeContainer.mozRequestFullScreen) { // Firefox
            iframeContainer.mozRequestFullScreen();
        } else if (iframeContainer.webkitRequestFullscreen) { // Chrome, Safari, Opera
            iframeContainer.webkitRequestFullscreen();
        } else if (iframeContainer.msRequestFullscreen) { // IE/Edge
            iframeContainer.msRequestFullscreen();
        }

        setIsFullScreen(true);
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setIsFullScreen(false);
    };

    useEffect(() => {
        getCookie()
    }, []);

    return (
        <div className={classes.container}>
            {/* Hamburger Menu Button */}
            <div>
                <header className={classes.header}>
                    <button className={classes.menuButton} onClick={() => setIsOpen(!isOpen)}>
                        Menu
                    </button>
                </header>

                {/* Sidebar come menu overlay */}
                <nav className={`${classes.sidebar} ${isOpen ? classes.show : ''}`}>
                    <button className={classes.closeButton} onClick={() => setIsOpen(false)}>
                        ✕
                    </button>
                    <ul className="nav flex-column">
                        {Object.keys(sectionRefs.current).map((key) => (
                            <li key={key} className="nav-item">
                                <a
                                    className={`${classes.navLink} ${
                                        activeSection === key ? classes.active : ''
                                    }`}
                                    href={`#${key}`}
                                    onClick={(e) => {
                                        handleNavigation(e, key);
                                        setIsOpen(false);
                                    }}
                                >
                                    {key.replace('section', 'Section ')}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <main className={classes.mainContent}>
                <div id="section1" ref={sectionRefs.current.section1} className={classes.section}>
                    <h1 className={classes.sectionTitle}>Sales Funnel Power BI Dashboard</h1>
                    <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem
                        Ipsum
                        è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo
                        tipografo
                        prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto
                        non
                        solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                        sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                        caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente
                        da
                        software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>

                    <div id={"pbi1"}>
                        <div >
                            <DynamicPowerBIReport
                                reportId={energyportfolio.reports.home.reportId}
                                embedUrl={energyportfolio.reports.home.embedUrl}
                            />
                            {isFullScreen && (
                                <div className={classes.fullscreenExit}>
                                    <button onClick={exitFullScreen} className={classes.fullscreenButton}>Exit Full Screen
                                    </button>
                                </div>
                            )}
                        </div>
                        {!isFullScreen && (
                            <div className={classes.fullscreenEnter}>
                                <button onClick={() => enterFullScreen("pbi1")}
                                        className={classes.fullscreenButton}>Full Screen
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div id="section2" ref={sectionRefs.current.section2} className={classes.section}>
                    <h1 className={classes.sectionTitle}>Sales Dashboard in Power BI</h1>
                    <p>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem
                        Ipsum
                        è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo
                        tipografo
                        prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto
                        non
                        solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci
                        sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                        caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente
                        da
                        software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.</p>
                    <div  id={"pbi2"}>
                        <div>
                            <DynamicPowerBIReport
                                reportId={energyportfolio.reports.controllo.reportId}
                                embedUrl={energyportfolio.reports.controllo.embedUrl}
                            />{isFullScreen && (
                            <div className={classes.fullscreenExit}>
                                <button onClick={exitFullScreen} className={classes.fullscreenButton}>Exit Full Screen
                                </button>
                            </div>
                        )}
                        </div>
                        {!isFullScreen && (
                            <div className={classes.fullscreenEnter}>
                                <button onClick={() => enterFullScreen("pbi2")}
                                        className={classes.fullscreenButton}>Full Screen
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}
