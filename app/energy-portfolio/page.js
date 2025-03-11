"use client"
import React, {useEffect, useState, useRef} from 'react';
import classes from '@/app/energy-portfolio/page.module.css';
import dynamic from "next/dynamic";
import {reports } from '@/Components/PBI/reportsConfig';
import DynamicPowerBIReport from "@/Components/PBI/DynamicPowerBIReport";

const PowerBIReport = dynamic(
    () => import("@/Components/PBI/PowerBIReport"),
    {ssr: false}
);

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div className={classes.container}>
            {/* Hamburger Menu Button */}
            <div>
                <button className={classes.hamburger} onClick={() => setIsOpen(!isOpen)}>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                </button>

                {/* Sidebar Navigation */}
                <nav className={`${classes.sidebar} ${isOpen ? classes.show : ''}`}>
                    <ul className="nav flex-column">
                        {Object.keys(sectionRefs.current).map((key) => (
                            <li key={key} className="nav-item">
                                <a
                                    className={`${classes.navLink} ${activeSection === key ? classes.active : ''}`}
                                    href={`#${key}`}
                                    onClick={(e) => handleNavigation(e, key)}
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

                    <div>
                        {reports.map((report) => (
                            <div key={report.id} className="h-screen my-5">
                                <DynamicPowerBIReport
                                    reportId={report.reportId}
                                    embedUrl={report.embedUrl}
                                />
                            </div>
                        ))}
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
                </div>
            </main>
        </div>
    );
}
