"use client";
import React, {useEffect, useState, useRef} from "react";
import classes from '@/app/energy-portfolio/futures/pages.module.css';
import Swal from "sweetalert2";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {futures} from '@/Components/PBI/reportsConfig';

const DynamicPowerBIReport = dynamic(() => import('../../../Components/PBI/DynamicPowerBIReport'), {ssr: false});

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("Futures");
    const [manualNavigation, setManualNavigation] = useState(false);
    const sidebarRef = useRef(null);

    const [minimumLevel, setMinimumLevel] = useState("");
    const [maximumLevel, setMaximumLevel] = useState("");
    const [minimumLevelYearly, setMinimumLevelYearly] = useState("");
    const [maximumLevelYearly, setMaximumLevelYearly] = useState("");
    const [minimumLevelQuarterly, setMinimumLevelQuarterly] = useState("");
    const [maximumLevelQuarterly, setMaximumLevelQuarterly] = useState("");
    const [minimumLevelMonthly, setMinimumLevelMonthly] = useState("");
    const [maximumLevelMonthly, setMaximumLevelMonthly] = useState("");

    const [checkModality, setCheckModality] = useState(false);
    const [checkModalityYearly, setCheckModalityYearly] = useState(false);
    const [checkModalityQuarterly, setCheckModalityQuarterly] = useState(false);
    const [checkModalityMonthly, setCheckModalityMonthly] = useState(false);

    const [futuresType, setFuturesType] = useState("General");

    const [futuresYearly, setFuturesYearly] = useState("Yearly");
    const [futuresQuarterly, setFuturesQuarterly] = useState("Quarterly");
    const [futuresMonthly, setFuturesMonthly] = useState("Monthly");

    const [minimumLevelError, setMinimumLevelError] = useState(false);
    const [maximumLevelError, setMaximumLevelError] = useState(false);
    const [rangeError, setRangeError] = useState(false);
    const [minimumLevelYearlyError, setMinimumLevelYearlyError] = useState(false);
    const [maximumLevelYearlyError, setMaximumLevelYearlyError] = useState(false);
    const [rangeYearlyError, setRangeYearlyError] = useState(false);

    const [minimumLevelQuarterlyError, setMinimumLevelQuarterlyError] = useState(false);
    const [maximumLevelQuarterlyError, setMaximumLevelQuarterlyError] = useState(false);
    const [rangeQuarterlyError, setRangeQuarterlyError] = useState(false);

    const [minimumLevelMonthlyError, setMinimumLevelMonthlyError] = useState(false);
    const [maximumLevelMonthlyError, setMaximumLevelMonthlyError] = useState(false);
    const [rangeMonthlyError, setRangeMonthlyError] = useState(false);

    const [deleteAlert, setDeleteAlert] = useState({active: false, message: ""});
    const [activeAlert, setActiveAlert] = useState(false);

    const PATH = process.env.NEXT_PUBLIC_PATH_DEV

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

    useEffect(() => {
        getCookie()
    }, []);

// Refs corretti
    const sectionRefs = useRef({
        Futures: useRef(null),
        Alert: useRef(null),
        FuturesAnalysis: useRef(null),
        Past: useRef(null),
    });

    const sectionVariants = {
        hidden: {opacity: 0, y: -20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
    };
// Nomi leggibili per la sidebar
    const readableNames = {
        Futures: "Futures",
        Alert: "Email Alert",
        FuturesAnalysis: "Futures Analysis",
        Past: "Past",
    };

// Funzione di navigazione
    const handleNavigation = (e, section) => {
        e.preventDefault();
        setActiveSection(section);

        const sectionElement = sectionRefs.current[section]?.current;
        if (!sectionElement) return;

        sectionElement.scrollIntoView({behavior: "smooth", block: "center"});
    };

    useEffect(() => {
        const observerOptions = {
            root: null, // Osserva rispetto al viewport
            rootMargin: "0px",
            threshold: 0.5, // Cambia stato quando il 50% della sezione è visibile
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.keys(sectionRefs.current).forEach((key) => {
            const section = sectionRefs.current[key].current;
            if (section) observer.observe(section);
        });

        return () => {
            Object.keys(sectionRefs.current).forEach((key) => {
                const section = sectionRefs.current[key].current;
                if (section) observer.unobserve(section);
            });
        };
    }, []);


    // Funzioni di validazione migliorate per essere utilizzate con il JSX aggiornato

// Funzione per ottenere il limite corretto in base alla modalità
    const getLimit = (modalityType) => {
        // Controlla quale modalità è attiva in base al parametro
        switch (modalityType) {
            case 'general':
                return checkModality ? 100 : 400;
            case 'yearly':
                return checkModalityYearly ? 100 : 400;
            case 'quarterly':
                return checkModalityQuarterly ? 100 : 400;
            case 'monthly':
                return checkModalityMonthly ? 100 : 400;
            default:
                return 400; // Default fallback
        }
    };

// Funzione per verificare la relazione tra minimo e massimo
    const checkRangeError = (min, max, setRangeError) => {
        const minValue = parseFloat(min);
        const maxValue = parseFloat(max);

        if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
            setRangeError(true);
        } else {
            setRangeError(false);
        }
    };

// Funzione per la validazione del minimo
    const handleMinimumLevelBlur = (level, setLevel, setError, maxLevel, setRangeError, modalityType) => {
        const limit = getLimit(modalityType);
        const value = parseFloat(level);

        // Verifica se il valore è tra 0 e il limite
        if (isNaN(value) || value < 0 || value > limit) {
            setError(true);
        } else {
            setError(false);
        }

        // Verifica la relazione minimo/massimo
        if (maxLevel !== '') {
            checkRangeError(level, maxLevel, setRangeError);
        }
    };

// Funzione per la validazione del massimo
    const handleMaximumLevelBlur = (level, setLevel, setError, minLevel, setRangeError, modalityType) => {
        const limit = getLimit(modalityType);
        const value = parseFloat(level);

        // Verifica se il valore è tra 0 e il limite
        if (isNaN(value) || value < 0 || value > limit) {
            setError(true);
        } else {
            setError(false);
        }

        // Verifica la relazione minimo/massimo
        if (minLevel !== '') {
            checkRangeError(minLevel, level, setRangeError);
        }
    };

// UseEffect per rieseguire le validazioni quando cambia la modalità general
    useEffect(() => {
        // Validazione General
        if (minimumLevel !== '') {
            handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError,
                maximumLevel, setRangeError, 'general');
        }
        if (maximumLevel !== '') {
            handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError,
                minimumLevel, setRangeError, 'general');
        }
    }, [checkModality]);

// UseEffect per la sezione Yearly
    useEffect(() => {
        // Validazione Yearly
        if (minimumLevelYearly !== '') {
            handleMinimumLevelBlur(minimumLevelYearly, setMinimumLevelYearly, setMinimumLevelYearlyError,
                maximumLevelYearly, setRangeYearlyError, 'yearly');
        }
        if (maximumLevelYearly !== '') {
            handleMaximumLevelBlur(maximumLevelYearly, setMaximumLevelYearly, setMaximumLevelYearlyError,
                minimumLevelYearly, setRangeYearlyError, 'yearly');
        }
    }, [checkModalityYearly]);

// UseEffect per la sezione Quarterly
    useEffect(() => {
        // Validazione Quarterly
        if (minimumLevelQuarterly !== '') {
            handleMinimumLevelBlur(minimumLevelQuarterly, setMinimumLevelQuarterly, setMinimumLevelQuarterlyError,
                maximumLevelQuarterly, setRangeQuarterlyError, 'quarterly');
        }
        if (maximumLevelQuarterly !== '') {
            handleMaximumLevelBlur(maximumLevelQuarterly, setMaximumLevelQuarterly, setMaximumLevelQuarterlyError,
                minimumLevelQuarterly, setRangeQuarterlyError, 'quarterly');
        }
    }, [checkModalityQuarterly]);

// UseEffect per la sezione Monthly
    useEffect(() => {
        // Validazione Monthly
        if (minimumLevelMonthly !== '') {
            handleMinimumLevelBlur(minimumLevelMonthly, setMinimumLevelMonthly, setMinimumLevelMonthlyError,
                maximumLevelMonthly, setRangeMonthlyError, 'monthly');
        }
        if (maximumLevelMonthly !== '') {
            handleMaximumLevelBlur(maximumLevelMonthly, setMaximumLevelMonthly, setMaximumLevelMonthlyError,
                minimumLevelMonthly, setRangeMonthlyError, 'monthly');
        }
    }, [checkModalityMonthly]);

    useEffect(() => {
        if (deleteAlert.active) {
            sendEmail();
        }
    }, [deleteAlert]); // useEffect si attiva quando deleteAlert cambia

    const fetchCheckAlert = async () => {
        try {
            const response = await fetch(`${PATH}/email/checkAlert`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({futuresType: futuresType}),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Errore: ${errorText}`);
                Swal.fire({
                    icon: "error",
                    title: "Errore!",
                    text: "Errore durante il recupero dei dati degli alert.",
                });
                return;
            }

            const data = await response.text(); // Il backend restituisce TEXT_PLAIN

            if (data == "Nessun alert attivo") {
                // Se tutto è corretto, invia direttamente l'email
                sendEmail();
            } else {
                // Valida solo i campi relativi al tipo di futures selezionato
                let isValid = true;

                if (futuresType === "All") {
                    if (!(String(minimumLevelYearly).trim()) || !(String(maximumLevelYearly).trim())) {
                        isValid = false;
                    }else if (!(String(minimumLevelQuarterly).trim()) || !(String(maximumLevelQuarterly).trim())) {
                        isValid = false;
                    }else if (!(String(minimumLevelMonthly).trim()) || !(String(maximumLevelMonthly).trim())) {
                        isValid = false;
                    }
                } else {
                    if (!(String(minimumLevel).trim()) || !(String(maximumLevel).trim())) {
                        isValid = false;
                    }
                }

                if (!isValid) {
                    Swal.fire({
                        icon: "warning",
                        title: "Attention!",
                        text: "Please fill in all required fields before proceeding.",
                        confirmButtonText: "OK",
                    });
                    return; // Interrompe l'esecuzione
                }

                Swal.fire({
                    icon: "warning",
                    title: "Attention!",
                    text: "To proceed you must delete the previous alert.",
                    showCancelButton: true,
                    confirmButtonText: "Go on",
                    cancelButtonText: "Cancel",
                    reverseButtons: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // L'utente ha premuto "Continua"
                        setDeleteAlert({active: true, message: data});
                    }
                });
            }
        } catch (error) {
            console.error("Errore durante il recupero dei dati degli alert:", error);
            Swal.fire({
                icon: "error",
                title: "Errore!",
                text: "Si è verificato un errore durante il recupero dei dati degli alert.",
            });
        }
    };

    const fetchAlertData = async () => {
        try {
            const response = await fetch(`${PATH}/email/checkAlertField`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log(`Errore: ${errorText}`);
                return;
            }

            const data = await response.json();
            // Assicuriamoci che `alertData` sia effettivamente un array prima di iterarlo
            if (!data.alerts || !Array.isArray(data.alerts)) {
                console.log("Errore: alertData non è un array valido", data);
                return;
            }

            let check = [false, false, false]; // [Yearly, Quarterly, Monthly]
            let minimumLevelYearly, maximumLevelYearly, checkModalityYearly;
            let minimumLevelQuarterly, maximumLevelQuarterly, checkModalityQuarterly;
            let minimumLevelMonthly, maximumLevelMonthly, checkModalityMonthly;
            let minimumLevel, maximumLevel, checkModality;

            data.alerts.forEach((alertFutures) => {

                if (!alertFutures) {
                    return;
                }

                const tableName = alertFutures.futuresType;
                const normalizedFuturesType = tableName.replace("Alert", "");

                switch (normalizedFuturesType) {
                    case "Yearly":
                        minimumLevelYearly = alertFutures.minPriceValue || "";
                        maximumLevelYearly = alertFutures.maxPriceValue || "";
                        checkModalityYearly = !!alertFutures.checkModality;
                        check[0] = true;  // Imposta Yearly a true
                        break;
                    case "Quarterly":
                        minimumLevelQuarterly = alertFutures.minPriceValue || "";
                        maximumLevelQuarterly = alertFutures.maxPriceValue || "";
                        checkModalityQuarterly = !!alertFutures.checkModality;
                        check[1] = true;  // Imposta Quarterly a true
                        break;
                    case "Monthly":
                        minimumLevelMonthly = alertFutures.minPriceValue || "";
                        maximumLevelMonthly = alertFutures.maxPriceValue || "";
                        checkModalityMonthly = !!alertFutures.checkModality;
                        check[2] = true;  // Imposta Monthly a true
                        break;
                    case "General":
                        minimumLevel = alertFutures.minPriceValue || "";
                        maximumLevel = alertFutures.maxPriceValue || "";
                        checkModality = !!alertFutures.checkModality;
                        break;
                    default:
                        console.warn(`Tipo di alert non riconosciuto: ${normalizedFuturesType}`);
                }
            });

            if (check.every(value => value === true)) {
                setFuturesType("All");
                setMinimumLevelYearly(minimumLevelYearly);
                setMaximumLevelYearly(maximumLevelYearly);
                setCheckModalityYearly(checkModalityYearly);
                setMinimumLevelQuarterly(minimumLevelQuarterly);
                setMaximumLevelQuarterly(maximumLevelQuarterly);
                setCheckModalityQuarterly(checkModalityQuarterly);
                setMinimumLevelMonthly(minimumLevelMonthly);
                setMaximumLevelMonthly(maximumLevelMonthly);
                setCheckModalityMonthly(checkModalityMonthly);
            } else if (check[0]) {
                setFuturesType("Yearly");
                setMinimumLevel(minimumLevelYearly);
                setMaximumLevel(maximumLevelYearly);
                setCheckModality(checkModalityYearly);
            } else if (check[1]) {
                setFuturesType("Quarterly");
                setMinimumLevel(minimumLevelQuarterly);
                setMaximumLevel(maximumLevelQuarterly);
                setCheckModality(checkModalityQuarterly);
            } else if (check[2]) {
                setFuturesType("Monthly");
                setMinimumLevel(minimumLevelMonthly);
                setMaximumLevel(maximumLevelMonthly);
                setCheckModality(checkModalityMonthly);
            } else {
                setFuturesType("General");
                setMinimumLevel(minimumLevel);
                setMaximumLevel(maximumLevel);
                setCheckModality(checkModality);
            }

            setActiveAlert(data.checkEmail || false);

        } catch (error) {
            console.log("Errore durante il recupero dei dati degli alert:", error);
        }
    };

    useEffect(() => {
        fetchAlertData();
    }, []);
    useEffect(() => {

    }, [checkModalityMonthly, checkModalityQuarterly, checkModalityYearly]);

// Funzione per inviare l'email
    const sendEmail = async () => {
        // Verifica se ci sono errori in base al tipo di futures selezionato
        let hasErrors = false;

        if (futuresType === "General") {
            hasErrors = minimumLevelError || maximumLevelError || rangeError;
        } else if (futuresType === "Yearly") {
            hasErrors = minimumLevelYearlyError || maximumLevelYearlyError || rangeYearlyError;
        } else if (futuresType === "Quarterly") {
            hasErrors = minimumLevelQuarterlyError || maximumLevelQuarterlyError || rangeQuarterlyError;
        } else if (futuresType === "Monthly") {
            hasErrors = minimumLevelMonthlyError || maximumLevelMonthlyError || rangeMonthlyError;
        } else if (futuresType === "All") {
            hasErrors = minimumLevelYearlyError || maximumLevelYearlyError || rangeYearlyError ||
                minimumLevelQuarterlyError || maximumLevelQuarterlyError || rangeQuarterlyError ||
                minimumLevelMonthlyError || maximumLevelMonthlyError || rangeMonthlyError;
        }

        // Se ci sono errori, non inviare l'email
        if (hasErrors) {
            Swal.fire({
                icon: "warning",
                title: "Attention!",
                text: "Please correct any errors in the fields before triggering the alert.",
                confirmButtonText: "OK",
            });
            return; // Ferma l'esecuzione
        }

        // Verifica che tutti i campi richiesti siano compilati in base al tipo di futures selezionato
        let isValid = true;

        if (futuresType === "All") {
            if (!(String(minimumLevelYearly).trim()) || !(String(maximumLevelYearly).trim())) {
                isValid = false;
            }else if (!(String(minimumLevelQuarterly).trim()) || !(String(maximumLevelQuarterly).trim())) {
                isValid = false;
            }else if (!(String(minimumLevelMonthly).trim()) || !(String(maximumLevelMonthly).trim())) {
                isValid = false;
            }
        } else {
            if (!(String(minimumLevel).trim()) || !(String(maximumLevel).trim())) {
                isValid = false;
            }
        }

        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Attention!",
                text: "Please fill in all required fields before proceeding.",
                confirmButtonText: "OK",
            });
            return; // Interrompe l'esecuzione
        }

        try {
            let response;
            if (futuresType === "All") {
                response = await fetch(`${PATH}/email/send-email`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        minimumLevelYearly,
                        maximumLevelYearly,
                        checkModalityYearly,
                        minimumLevelQuarterly,
                        maximumLevelQuarterly,
                        checkModalityQuarterly,
                        minimumLevelMonthly,
                        maximumLevelMonthly,
                        checkModalityMonthly,
                        futuresYearly,
                        futuresQuarterly,
                        futuresMonthly,
                        futuresType,
                        deleteAlert,
                        activeAlert
                    }),
                });
            } else {
                response = await fetch(`${PATH}/email/send-email`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        minimumLevel,
                        maximumLevel,
                        checkModality,
                        futuresType,
                        deleteAlert,
                        activeAlert
                    }),
                });
            }

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Email inviata con successo!",
                    confirmButtonText: "OK",
                });
            } else {
                const errorText = await response.text();
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `Errore: ${errorText}`,
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Errore durante l'invio dell'email:", error);
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Si è verificato un errore durante l'invio dell'email.",
                confirmButtonText: "OK",
            });
        }
    };

    const iframeRef = useRef(null);

    const goFullScreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            } else if (iframeRef.current.mozRequestFullScreen) { // Firefox
                iframeRef.current.mozRequestFullScreen();
            } else if (iframeRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                iframeRef.current.webkitRequestFullscreen();
            } else if (iframeRef.current.msRequestFullscreen) { // IE/Edge
                iframeRef.current.msRequestFullscreen();
            }
        }
    };

    const [isFullScreen, setIsFullScreen] = useState(false);

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


    return (
        <div className={classes.container}>
            <nav className={`${classes.sidebar}`}>
                <ul className="nav flex-column">
                    {Object.keys(sectionRefs.current).map((key) => (
                        <li key={key} className="nav-item">
                            <a
                                className={`${classes.navLink} ${activeSection === key ? classes.active : ""}`}
                                href={`#${key}`}
                                onClick={(e) => handleNavigation(e, key)}
                            >
                                {key}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <main className={classes.mainContent}>
                {/* 🔹 Sezione Futures con animazione */}
                <motion.div id="Futures" ref={sectionRefs.current.Futures} className={classes.section} initial="hidden"
                            animate="visible" variants={sectionVariants}>
                    <h1>Futures</h1>
                    <div id="FuturesContainer" className={classes.iframeContainer}>
                        <DynamicPowerBIReport
                            reportId={futures.reports.energia.reportId}
                            embedUrl={futures.reports.energia.embedUrl}
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
                            <button onClick={() => enterFullScreen("FuturesContainer")}
                                    className={classes.fullscreenButton}>Full Screen
                            </button>
                        </div>
                    )}
                </motion.div>

                <motion.div id="Alert" ref={sectionRefs.current.Alert} className={classes.section} initial="hidden"
                            animate="visible" variants={sectionVariants}>

                    <div className={classes.container}>
                        <div className={classes.emailContent}>
                            <h1 className={classes.pageTitle}>Email Alert</h1>

                            <div className={classes.formGroup}>
                                <label className={classes.label} htmlFor="futures-type">Futures type</label>
                                <select
                                    id="futures-type"
                                    className={classes.select}
                                    value={futuresType}
                                    onChange={(e) => setFuturesType(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Yearly">Yearly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="General">General</option>
                                </select>
                            </div>

                            {futuresType === "General" && (
                                <div className={classes.formSection}>
                                    <div style={{position: 'relative'}}>
                                        <span className={classes.sectionTitleBefore}></span>
                                        <h2 className={classes.sectionTitle}>General</h2>
                                    </div>
                                    <div className={classes.formRow}>
                                        {/* Input for minimum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                                value={minimumLevel}
                                                onChange={(e) => {
                                                    setMinimumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (maximumLevel !== '') {
                                                        checkRangeError(e.target.value, maximumLevel, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError, maximumLevel, setRangeError)}
                                            />
                                            {minimumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input for maximum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                                value={maximumLevel}
                                                onChange={(e) => {
                                                    setMaximumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (minimumLevel !== '') {
                                                        checkRangeError(minimumLevel, e.target.value, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                            />
                                            {maximumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Modality</label>
                                            <select
                                                className={classes.select}
                                                value={checkModality ? "Percentage" : "Value"}
                                                onChange={(e) => setCheckModality(e.target.value === "Percentage")}
                                            >
                                                <option value="Value">Value</option>
                                                <option value="Percentage">Percentage</option>
                                            </select>
                                        </div>
                                    </div>
                                    {rangeError && (
                                        <div style={classes.errorMessage}>
                                            The minimum value cannot be greater than the maximum value!
                                        </div>
                                    )}
                                </div>
                            )}

                            {futuresType === "All" && (
                                <>
                                    {/* Yearly Section */}
                                    <div className={classes.formSection}>
                                        <div style={{position: 'relative'}}>
                                            <span className={classes.sectionTitleBefore}></span>
                                            <h2 className={classes.sectionTitle}>Yearly</h2>
                                        </div>
                                        <div className={classes.formRow}>
                                            {/* Input Yearly Minimum */}
                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Minimum level</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Enter minimum level (0 to ${getLimit('yearly')})`}
                                                    className={`${classes.input} ${minimumLevelYearlyError ? classes.errorInput : ''}`}
                                                    value={minimumLevelYearly}
                                                    onChange={(e) => {
                                                        setMinimumLevelYearly(e.target.value);
                                                        if (maximumLevelYearly !== '') {
                                                            checkRangeError(e.target.value, maximumLevelYearly, setRangeYearlyError);
                                                        }
                                                    }}
                                                    onBlur={() => handleMinimumLevelBlur(minimumLevelYearly, setMinimumLevelYearly, setMinimumLevelYearlyError, maximumLevelYearly, setRangeYearlyError, 'yearly')}
                                                />
                                                {minimumLevelYearlyError && (
                                                    <div className={classes.errorMessage}>
                                                        The value must be between 0 and {getLimit('yearly')}!
                                                    </div>
                                                )}
                                            </div>

                                            {/* Input Yearly Maximum */}
                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Maximum level</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Enter maximum level (0 to ${getLimit('yearly')})`}
                                                    className={`${classes.input} ${maximumLevelYearlyError ? classes.errorInput : ''}`}
                                                    value={maximumLevelYearly}
                                                    onChange={(e) => {
                                                        setMaximumLevelYearly(e.target.value);
                                                        if (minimumLevelYearly !== '') {
                                                            checkRangeError(minimumLevelYearly, e.target.value, setRangeYearlyError);
                                                        }
                                                    }}
                                                    onBlur={() => handleMaximumLevelBlur(maximumLevelYearly, setMaximumLevelYearly, setMaximumLevelYearlyError, minimumLevelYearly, setRangeYearlyError, 'yearly')}
                                                />
                                                {maximumLevelYearlyError && (
                                                    <div className={classes.errorMessage}>
                                                        The value must be between 0 and {getLimit('yearly')}!
                                                    </div>
                                                )}
                                            </div>

                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Modality</label>
                                                <select
                                                    className={classes.select}
                                                    value={checkModalityYearly ? "Percentage" : "Value"}
                                                    onChange={(e) => setCheckModalityYearly(e.target.value === "Percentage")}
                                                >
                                                    <option value="Value">Value</option>
                                                    <option value="Percentage">Percentage</option>
                                                </select>
                                            </div>
                                        </div>
                                        {rangeYearlyError && (
                                            <div className={classes.errorMessage}>
                                                The minimum value cannot be greater than the maximum value!
                                            </div>
                                        )}
                                    </div>

                                    {/* Quarterly Section */}
                                    <div className={classes.formSection}>
                                        <div style={{position: 'relative'}}>
                                            <span className={classes.sectionTitleBefore}></span>
                                            <h2 className={classes.sectionTitle}>Quarterly</h2>
                                        </div>
                                        <div className={classes.formRow}>
                                            {/* Input Quarterly Minimum */}
                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Minimum level</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Enter minimum level (0 to ${getLimit('quarterly')})`}
                                                    className={`${classes.input} ${minimumLevelQuarterlyError ? classes.errorInput : ''}`}
                                                    value={minimumLevelQuarterly}
                                                    onChange={(e) => {
                                                        setMinimumLevelQuarterly(e.target.value);
                                                        if (maximumLevelQuarterly !== '') {
                                                            checkRangeError(e.target.value, maximumLevelQuarterly, setRangeQuarterlyError);
                                                        }
                                                    }}
                                                    onBlur={() => handleMinimumLevelBlur(minimumLevelQuarterly, setMinimumLevelQuarterly, setMinimumLevelQuarterlyError, maximumLevelQuarterly, setRangeQuarterlyError, 'quarterly')}
                                                />
                                                {minimumLevelQuarterlyError && (
                                                    <div className={classes.errorMessage}>
                                                        The value must be between 0 and {getLimit('quarterly')}!
                                                    </div>
                                                )}
                                            </div>

                                            {/* Input Quarterly Maximum */}
                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Maximum level</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Enter maximum level (0 to ${getLimit('quarterly')})`}
                                                    className={`${classes.input} ${maximumLevelQuarterlyError ? classes.errorInput : ''}`}
                                                    value={maximumLevelQuarterly}
                                                    onChange={(e) => {
                                                        setMaximumLevelQuarterly(e.target.value);
                                                        if (minimumLevelQuarterly !== '') {
                                                            checkRangeError(minimumLevelQuarterly, e.target.value, setRangeQuarterlyError);
                                                        }
                                                    }}
                                                    onBlur={() => handleMaximumLevelBlur(maximumLevelQuarterly, setMaximumLevelQuarterly, setMaximumLevelQuarterlyError, minimumLevelQuarterly, setRangeQuarterlyError, 'quarterly')}
                                                />
                                                {maximumLevelQuarterlyError && (
                                                    <div className={classes.errorMessage}>
                                                        The value must be between 0 and {getLimit('quarterly')}!
                                                    </div>
                                                )}
                                            </div>

                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Modality</label>
                                                <select
                                                    className={classes.select}
                                                    value={checkModalityQuarterly ? "Percentage" : "Value"}
                                                    onChange={(e) => setCheckModalityQuarterly(e.target.value === "Percentage")}
                                                >
                                                    <option value="Value">Value</option>
                                                    <option value="Percentage">Percentage</option>
                                                </select>
                                            </div>
                                        </div>
                                        {rangeQuarterlyError && (
                                            <div className={classes.errorMessage}>
                                                The minimum value cannot be greater than the maximum value!
                                            </div>
                                        )}
                                    </div>

                                    {/* Monthly Section */}
                                    <div className={classes.formSection}>
                                        <div style={{position: 'relative'}}>
                                            <span className={classes.sectionTitleBefore}></span>
                                            <h2 className={classes.sectionTitle}>Monthly</h2>
                                        </div>
                                        <div className={classes.formRow}>
                                            {/* Input Monthly Minimum */}
                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Minimum level</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Enter minimum level (0 to ${getLimit('monthly')})`}
                                                    className={`${classes.input} ${minimumLevelMonthlyError ? classes.errorInput : ''}`}
                                                    value={minimumLevelMonthly}
                                                    onChange={(e) => {
                                                        setMinimumLevelMonthly(e.target.value);
                                                        if (maximumLevelMonthly !== '') {
                                                            checkRangeError(e.target.value, maximumLevelMonthly, setRangeMonthlyError);
                                                        }
                                                    }}
                                                    onBlur={() => handleMinimumLevelBlur(minimumLevelMonthly, setMinimumLevelMonthly, setMinimumLevelMonthlyError, maximumLevelMonthly, setRangeMonthlyError, 'monthly')}
                                                />
                                                {minimumLevelMonthlyError && (
                                                    <div className={classes.errorMessage}>
                                                        The value must be between 0 and {getLimit('monthly')}!
                                                    </div>
                                                )}
                                            </div>

                                            {/* Input Monthly Maximum */}
                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Maximum level</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Enter maximum level (0 to ${getLimit('monthly')})`}
                                                    className={`${classes.input} ${maximumLevelMonthlyError ? classes.errorInput : ''}`}
                                                    value={maximumLevelMonthly}
                                                    onChange={(e) => {
                                                        setMaximumLevelMonthly(e.target.value);
                                                        if (minimumLevelMonthly !== '') {
                                                            checkRangeError(minimumLevelMonthly, e.target.value, setRangeMonthlyError);
                                                        }
                                                    }}
                                                    onBlur={() => handleMaximumLevelBlur(maximumLevelMonthly, setMaximumLevelMonthly, setMaximumLevelMonthlyError, minimumLevelMonthly, setRangeMonthlyError, 'monthly')}
                                                />
                                                {maximumLevelMonthlyError && (
                                                    <div className={classes.errorMessage}>
                                                        The value must be between 0 and {getLimit('monthly')}!
                                                    </div>
                                                )}
                                            </div>

                                            <div className={classes.formControl}>
                                                <label className={classes.label}>Modality</label>
                                                <select
                                                    className={classes.select}
                                                    value={checkModalityMonthly ? "Percentage" : "Value"}
                                                    onChange={(e) => setCheckModalityMonthly(e.target.value === "Percentage")}
                                                >
                                                    <option value="Value">Value</option>
                                                    <option value="Percentage">Percentage</option>
                                                </select>
                                            </div>
                                        </div>
                                        {rangeMonthlyError && (
                                            <div className={classes.errorMessage}>
                                                The minimum value cannot be greater than the maximum value!
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {futuresType === "Yearly" && (
                                <div className={classes.formSection}>
                                    <div style={{position: 'relative'}}>
                                        <h2 className={classes.sectionTitle}>Yearly</h2>
                                    </div>
                                    <div className={classes.formRow}>
                                        {/* Input for minimum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                                value={minimumLevel}
                                                onChange={(e) => {
                                                    setMinimumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (maximumLevel !== '') {
                                                        checkRangeError(e.target.value, maximumLevel, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError, maximumLevel, setRangeError)}
                                            />
                                            {minimumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input for maximum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                                value={maximumLevel}
                                                onChange={(e) => {
                                                    setMaximumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (minimumLevel !== '') {
                                                        checkRangeError(minimumLevel, e.target.value, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                            />
                                            {maximumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Modality</label>
                                            <select
                                                className={classes.select}
                                                value={checkModality ? "Percentage" : "Value"}
                                                onChange={(e) => setCheckModality(e.target.value === "Percentage")}
                                            >
                                                <option value="Value">Value</option>
                                                <option value="Percentage">Percentage</option>
                                            </select>
                                        </div>
                                    </div>
                                    {rangeError && (
                                        <div className={classes.errorMessage}>
                                            The minimum value cannot be greater than the maximum value!
                                        </div>
                                    )}
                                </div>
                            )}
                            {futuresType === "Quarterly" && (
                                <div className={classes.formSection}>
                                    <div style={{position: 'relative'}}>
                                        <span className={classes.sectionTitleBefore}></span>
                                        <h2 className={classes.sectionTitle}>Quarterly</h2>
                                    </div>
                                    <div className={classes.formRow}>
                                        {/* Input for minimum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                                value={minimumLevel}
                                                onChange={(e) => {
                                                    setMinimumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (maximumLevel !== '') {
                                                        checkRangeError(e.target.value, maximumLevel, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError, maximumLevel, setRangeError)}
                                            />
                                            {minimumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input for maximum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                                value={maximumLevel}
                                                onChange={(e) => {
                                                    setMaximumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (minimumLevel !== '') {
                                                        checkRangeError(minimumLevel, e.target.value, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                            />
                                            {maximumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Modality</label>
                                            <select
                                                className={classes.select}
                                                value={checkModality ? "Percentage" : "Value"}
                                                onChange={(e) => setCheckModality(e.target.value === "Percentage")}
                                            >
                                                <option value="Value">Value</option>
                                                <option value="Percentage">Percentage</option>
                                            </select>
                                        </div>
                                    </div>
                                    {rangeError && (
                                        <div style={classes.errorMessage}>
                                            The minimum value cannot be greater than the maximum value!
                                        </div>
                                    )}
                                </div>
                            )}
                            {futuresType === "Monthly" && (
                                <div className={classes.formSection}>
                                    <div style={{position: 'relative'}}>
                                        <span className={classes.sectionTitleBefore}></span>
                                        <h2 className={classes.sectionTitle}>Monthly</h2>
                                    </div>
                                    <div className={classes.formRow}>
                                        {/* Input for minimum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                                value={minimumLevel}
                                                onChange={(e) => {
                                                    setMinimumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (maximumLevel !== '') {
                                                        checkRangeError(e.target.value, maximumLevel, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError, maximumLevel, setRangeError)}
                                            />
                                            {minimumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input for maximum */}
                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input
                                                type="number"
                                                placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                                className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                                value={maximumLevel}
                                                onChange={(e) => {
                                                    setMaximumLevel(e.target.value);
                                                    // Validazione anche durante l'immissione dei caratteri per un'esperienza utente migliore
                                                    if (minimumLevel !== '') {
                                                        checkRangeError(minimumLevel, e.target.value, setRangeError);
                                                    }
                                                }}
                                                onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                            />
                                            {maximumLevelError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.formControl}>
                                            <label className={classes.label}>Modality</label>
                                            <select
                                                className={classes.select}
                                                value={checkModality ? "Percentage" : "Value"}
                                                onChange={(e) => setCheckModality(e.target.value === "Percentage")}
                                            >
                                                <option value="Value">Value</option>
                                                <option value="Percentage">Percentage</option>
                                            </select>
                                        </div>
                                    </div>
                                    {rangeError && (
                                        <div style={classes.errorMessage}>
                                            The minimum value cannot be greater than the maximum value!
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className={classes.alertBottom}>
                                <div className={classes.toggleContainer}>
                                    <label className={classes.switch}>
                                        <input
                                            type="checkbox"
                                            className={classes.checkbox}
                                            checked={activeAlert}
                                            onChange={(e) => setActiveAlert(e.target.checked)}
                                        />
                                        <span className={`${classes.slider} ${classes.round}`}></span>
                                    </label>
                                    <span className={classes.toggleLabel}>Active Alert</span>
                                </div>

                                <button className={classes.convertButton} onClick={fetchCheckAlert}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 🔹 Sezione Futures Analysis */}
                <motion.div id="FuturesAnalysis" ref={sectionRefs.current.FuturesAnalysis} className={classes.section}
                            initial="hidden" animate="visible" variants={sectionVariants}>
                    <h1>Futures Analysis</h1>
                    <div id="FuturesAnalysisContainer" className={classes.iframeContainer}>
                        <DynamicPowerBIReport
                            reportId={futures.reports.futuresAnalysis.reportId}
                            embedUrl={futures.reports.futuresAnalysis.embedUrl}
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
                            <button onClick={() => enterFullScreen("FuturesAnalysisContainer")}
                                    className={classes.fullscreenButton}>Full Screen
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* 🔹 Sezione Past */}
                <motion.div id="Past" ref={sectionRefs.current.Past} className={classes.section} initial="hidden"
                            animate="visible" variants={sectionVariants}>
                    <h1>Past</h1>
                    <div id="PastContainer" className={classes.iframeContainer}>
                        <DynamicPowerBIReport
                            reportId={futures.reports.past.reportId}
                            embedUrl={futures.reports.past.embedUrl}
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
                            <button onClick={() => enterFullScreen("PastContainer")}
                                    className={classes.fullscreenButton}>Full Screen
                            </button>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}