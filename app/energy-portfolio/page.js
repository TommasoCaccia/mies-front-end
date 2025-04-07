"use client";

import React, { useEffect, useState, useRef } from 'react';
import classes from '@/app/energy-portfolio/page.module.css';
import dynamic from "next/dynamic";
import { energyportfolio } from '@/Components/PBI/reportsConfig';
import DynamicPowerBIReport from "@/Components/PBI/DynamicPowerBIReport";

const PATH = process.env.NEXT_PUBLIC_PATH_DEV;

const PowerBIReport = dynamic(() => import("../../Components/PBI/PowerBIReport"), {
    ssr: false,
});

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeSection, setActiveSection] = useState('section1');
    const [manualNavigation, setManualNavigation] = useState(false);
    const sectionRefs = useRef({
        section1: useRef(null),
        section2: useRef(null)
    });
    const sidebarRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        // ✅ CHIAMATA all'endpoint Quarkus che invia i dati a Power BI
        fetch(`${PATH}/proxy/articoli`, {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => console.log("✅ Dati inviati a Power BI:", data))
            .catch(err => console.error("❌ Errore durante invio:", err));
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
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
                observerRef.current.observe(ref.current);
            }
        });

        return () => {
            if (observerRef.current) {
                Object.values(sectionRefs.current).forEach(ref => {
                    if (ref.current) {
                        observerRef.current.unobserve(ref.current);
                    }
                });
            }
        };
    }, [manualNavigation]);

    const scrollToActiveLink = (sectionId) => {
        const activeLink = sidebarRef.current?.querySelector(`.${classes.active}`);
        if (activeLink) {
            sidebarRef.current.scrollTop = activeLink.offsetTop - sidebarRef.current.offsetTop - 100;
        }
    };

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
    };

    const handleNavigation = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const enterFullScreen = (containerId) => {
        const iframeContainer = document.getElementById(containerId);
        if (!iframeContainer) return;

        if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
        } else if (iframeContainer.mozRequestFullScreen) {
            iframeContainer.mozRequestFullScreen();
        } else if (iframeContainer.webkitRequestFullscreen) {
            iframeContainer.webkitRequestFullscreen();
        } else if (iframeContainer.msRequestFullscreen) {
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
        getCookie();
    }, []);

    return (
        <div className={classes.container}>
            <div>
                <header className={classes.header}>
                    <button className={classes.menuButton} onClick={() => setIsOpen(!isOpen)}>
                        Menu
                    </button>
                </header>

                <nav className={`${classes.sidebar} ${isOpen ? classes.show : ''}`} ref={sidebarRef}>
                    <button className={classes.closeButton} onClick={() => setIsOpen(false)}>
                        ✕
                    </button>
                    <ul className="nav flex-column">
                        {Object.keys(sectionRefs.current).map((key) => (
                            <li key={key} className="nav-item">
                                <a
                                    className={`${classes.navLink} ${activeSection === key ? classes.active : ''}`}
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
                    <p>Lorem Ipsum...</p>

                    <div id="pbi1">
                        <DynamicPowerBIReport
                            reportId={energyportfolio.reports.home.reportId}
                            embedUrl={energyportfolio.reports.home.embedUrl}
                        />
                        {isFullScreen && (
                            <div className={classes.fullscreenExit}>
                                <button onClick={exitFullScreen} className={classes.fullscreenButton}>Exit Full Screen</button>
                            </div>
                        )}
                        {!isFullScreen && (
                            <div className={classes.fullscreenEnter}>
                                <button onClick={() => enterFullScreen("pbi1")} className={classes.fullscreenButton}>Full Screen</button>
                            </div>
                        )}
                    </div>
                </div>

                <div id="section2" ref={sectionRefs.current.section2} className={classes.section}>
                    <h1 className={classes.sectionTitle}>Sales Dashboard in Power BI</h1>
                    <p>Lorem Ipsum...</p>

                    <div id="pbi2">
                        <DynamicPowerBIReport
                            reportId={energyportfolio.reports.controllo.reportId}
                            embedUrl={energyportfolio.reports.controllo.embedUrl}
                        />
                        {isFullScreen && (
                            <div className={classes.fullscreenExit}>
                                <button onClick={exitFullScreen} className={classes.fullscreenButton}>Exit Full Screen</button>
                            </div>
                        )}
                        {!isFullScreen && (
                            <div className={classes.fullscreenEnter}>
                                <button onClick={() => enterFullScreen("pbi2")} className={classes.fullscreenButton}>Full Screen</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
