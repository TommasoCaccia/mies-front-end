"use client";
import React, {useEffect, useState, useRef} from "react";
import classes from '@/app/energy-portfolio/futures/pages.module.css';
import Swal from "sweetalert2";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {futures} from '@/Components/PBI/reportsConfig';


const DynamicPowerBIReport = dynamic(() => import('@/Components/PBI/DynamicPowerBIReport'), {ssr: false});

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
    const [frequencyAlert, setFrequencyAlert] = useState("Weekly And Monthly");
    const [checkModalityYearly, setCheckModalityYearly] = useState(false);
    const [frequencyYearly, setFrequencyYearly] = useState("Weekly And Monthly");
    const [checkModalityQuarterly, setCheckModalityQuarterly] = useState(false);
    const [frequencyQuarterly, setFrequencyQuarterly] = useState("Weekly And Monthly");
    const [checkModalityMonthly, setCheckModalityMonthly] = useState(false);
    const [frequencyMonthly, setFrequencyMonthly] = useState("Weekly And Monthly")

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

    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV

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


    const getLimit = () => {
        if (checkModality === 'percentage') {
            return 100; // Limite per la percentuale
        }
        return 400; // Limite per il valore
    };

    // Funzioni di controllo per gli input
    const handleMinimumLevelBlur = (level, setLevel, setError) => {
        const limit = getLimit();
        const value = parseFloat(level);

        // Verifica se il valore è tra 0 e il limite
        if (value < 0 || value > limit) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleMaximumLevelBlur = (level, setLevel, setError, minLevel, setRangeError) => {
        const limit = getLimit();
        const value = parseFloat(level);

        // Verifica se il valore è tra 0 e il limite
        if (value < 0 || value > limit) {
            setError(true);
        } else {
            setError(false);
        }

        // Controllo se il massimo è minore del minimo
        if (parseFloat(level) < parseFloat(minLevel) && minLevel !== '') {
            setRangeError(true);
        } else {
            setRangeError(false);
        }
    };

    useEffect(() => {
        if (deleteAlert.active) {
            sendEmail();
        }
    }, [deleteAlert]); // useEffect si attiva quando deleteAlert cambia

    const fetchCheckAlert = async () => {
        try {
            const response = await fetch(`${PATH_DEV}/cliente/checkAlert`, {
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
            if (data == "ok") {
                // Se tutto è corretto, invia direttamente l'email
                sendEmail();
            } else {
                /*
                                if (!(String(minimumLevel).trim()) || !(String(maximumLevel).trim()) || !(String(minimumLevelYearly).trim()) ||
                                    !(String(maximumLevelYearly).trim()) || !(String(minimumLevelQuarterly).trim()) || !(String(maximumLevelQuarterly).trim()) ||
                                    !(String(minimumLevelMonthly).trim()) || !(String(maximumLevelMonthly).trim())){
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Attention!",
                                        text: "Please fill in all required fields before proceeding.",
                                        confirmButtonText: "OK",
                                    });
                                    return; // Interrompe l'esecuzione
                                }

                 */
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
                        alert("isConfirmed")
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
            const response = await fetch(`${PATH_DEV}/cliente/checkAlertField`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Errore: ${errorText}`);
                return;
            }

            const data = await response.json();
            //alert(JSON.stringify(data, null, 2));
            // Assicuriamoci che `alertData` sia effettivamente un array prima di iterarlo
            if (!data.alertData || !Array.isArray(data.alertData)) {
                console.error("Errore: alertData non è un array valido", data);
                return;
            }

            let check = [false, false, false]; // [Yearly, Quarterly, Monthly]
            let minimumLevelYearly, maximumLevelYearly, checkModalityYearly, frequencyYearly;
            let minimumLevelQuarterly, maximumLevelQuarterly, checkModalityQuarterly, frequencyQuarterly;
            let minimumLevelMonthly, maximumLevelMonthly, checkModalityMonthly, frequencyMonthly;
            let minimumLevel, maximumLevel, checkModality, frequencyAlert;

            data.alertData.forEach((alertFutures) => {

                if (!alertFutures) {
                    return; // Salta l'iterazione corrente
                }

                const tableName = alertFutures.futuresType;
                const normalizedFuturesType = tableName.replace("Alert", "");

                switch (normalizedFuturesType) {
                    case "Yearly":
                        minimumLevelYearly = alertFutures.minPriceValue || "";
                        maximumLevelYearly = alertFutures.maxPriceValue || "";
                        checkModalityYearly = !!alertFutures.checkModality;
                        frequencyYearly = alertFutures.frequencyA || "Weekly and Monthly";
                        check[0] = true;  // Imposta Yearly a true
                        break;
                    case "Quarterly":
                        minimumLevelQuarterly = alertFutures.minPriceValue || "";
                        maximumLevelQuarterly = alertFutures.maxPriceValue || "";
                        checkModalityQuarterly = !!alertFutures.checkModality;
                        frequencyQuarterly = alertFutures.frequencyA || "Weekly and Monthly";
                        check[1] = true;  // Imposta Quarterly a true
                        break;
                    case "Monthly":
                        minimumLevelMonthly = alertFutures.minPriceValue || "";
                        maximumLevelMonthly = alertFutures.maxPriceValue || "";
                        checkModalityMonthly = !!alertFutures.checkModality;
                        frequencyMonthly = alertFutures.frequencyA || "Weekly and Monthly";
                        check[2] = true;  // Imposta Monthly a true
                        break;
                    case "General":
                        minimumLevel = alertFutures.minPriceValue || "";
                        maximumLevel = alertFutures.maxPriceValue || "";
                        checkModality = !!alertFutures.checkModality;
                        frequencyAlert = alertFutures.frequencyA || "Weekly and Monthly";
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
                setFrequencyYearly(frequencyYearly);
                setMinimumLevelQuarterly(minimumLevelQuarterly);
                setMaximumLevelQuarterly(maximumLevelQuarterly);
                setCheckModalityQuarterly(checkModalityQuarterly);
                setFrequencyQuarterly(frequencyQuarterly);
                setMinimumLevelMonthly(minimumLevelMonthly);
                setMaximumLevelMonthly(maximumLevelMonthly);
                setCheckModalityMonthly(checkModalityMonthly);
                setFrequencyMonthly(frequencyMonthly);
            } else if (check[0]) {
                setFuturesType("Yearly");
                setMinimumLevel(minimumLevelYearly);
                setMaximumLevel(maximumLevelYearly);
                setCheckModality(checkModalityYearly);
                setFrequencyAlert(frequencyYearly);
            } else if (check[1]) {
                setFuturesType("Quarterly");
                setMinimumLevel(minimumLevelQuarterly);
                setMaximumLevel(maximumLevelQuarterly);
                setCheckModality(checkModalityQuarterly);
                setFrequencyAlert(frequencyQuarterly);
            } else if (check[2]) {
                setFuturesType("Monthly");
                setMinimumLevel(minimumLevelMonthly);
                setMaximumLevel(maximumLevelMonthly);
                setCheckModality(checkModalityMonthly);
                setFrequencyAlert(frequencyMonthly);
            } else {
                setFuturesType("General");
                setMinimumLevel(minimumLevel);
                setMaximumLevel(maximumLevel);
                setCheckModality(checkModality);
                setFrequencyAlert(frequencyAlert);
            }

            setActiveAlert(data.checkEmail || false);

        } catch (error) {
            console.error("Errore durante il recupero dei dati degli alert:", error);
        }
    };

    useEffect(() => {
        fetchAlertData();
    }, []);
    useEffect(() => {

    }, [checkModalityMonthly, checkModalityQuarterly, checkModalityYearly, frequencyYearly, frequencyQuarterly, frequencyMonthly]);

    // Funzione per inviare l'email
    const sendEmail = async () => {
        // Verifica se ci sono errori
        const hasErrors = minimumLevelError || maximumLevelError || rangeError || minimumLevelYearlyError || maximumLevelYearlyError || rangeYearlyError || minimumLevelQuarterlyError || maximumLevelQuarterlyError || rangeQuarterlyError || minimumLevelMonthlyError || maximumLevelMonthlyError || rangeMonthlyError;

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

        try {
            let response;
            if (futuresType === "All") {
                response = await fetch(`${PATH_DEV}/cliente/sendWeeklyEmail`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        minimumLevelYearly,
                        maximumLevelYearly,
                        checkModalityYearly,
                        frequencyYearly,
                        minimumLevelQuarterly,
                        maximumLevelQuarterly,
                        checkModalityQuarterly,
                        frequencyQuarterly,
                        minimumLevelMonthly,
                        maximumLevelMonthly,
                        checkModalityMonthly,
                        frequencyMonthly,
                        futuresYearly,
                        futuresQuarterly,
                        futuresMonthly,
                        futuresType,
                        deleteAlert,
                        activeAlert
                    }),
                });
            } else {
                response = await fetch(`${PATH_DEV}/cliente/send-email`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        minimumLevel,
                        maximumLevel,
                        checkModality,
                        frequencyAlert,
                        futuresType,
                        deleteAlert,
                        activeAlert
                    }),
                });
            }

            if (response.ok) {
                alert(`Email inviata con successo!`);
            } else {
                const errorText = await response.text();
                alert(`Errore: ${errorText}`);
            }
        } catch (error) {
            console.error("Errore durante l'invio dell'email:", error);
            //alert("Si è verificato un errore durante l'invio dell'email.");
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

                    <div id="Alert" ref={sectionRefs.current.Alert}>
                        <div className={classes.alertContainer}>
                            {/* Titolo "Email Alert" */}
                            <h1 className={classes.alertTitle}>Email Alert</h1>
                            {/* Futures type select */}
                            <div className={classes.inputGroupHorizontal} style={{paddingTop: '5%'}}>
                                <label className={classes.label}>Futures type</label>
                                <select className={classes.select} value={futuresType}
                                        onChange={(e) => setFuturesType(e.target.value)}>
                                    <option value="General">General</option>
                                    <option value="All">All</option>
                                    <option value="Yearly">Yearly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>

                            {/* Conditionally render fields based on futuresType */}
                            {futuresType === "General" && (
                                <div className={classes.converterContainer}>
                                    {/* Input per il minimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Minimum level</label>
                                        <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                               value={minimumLevel}
                                               onChange={(e) => setMinimumLevel(e.target.value)}
                                               onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError)}
                                               className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {minimumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    {/* Input per il massimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Maximum level</label>
                                        <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                               value={maximumLevel}
                                               onChange={(e) => setMaximumLevel(e.target.value)}
                                               onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                               className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {maximumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Frequency</label>
                                        <select
                                            className={classes.select}
                                            value={frequencyAlert}  // Imposta il valore su quello dello stato
                                            onChange={(e) => setFrequencyAlert(e.target.value)}
                                        >
                                            <option value="Weekly and Monthly">Weekly and Monthly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Modality</label>
                                        <select className={classes.select}
                                                value={checkModality ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
                                                onChange={(e) => setCheckModality(e.target.value === "Percentage")}>
                                            <option value="Value">Value</option>
                                            <option value="Percentage">Percentage</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {futuresType === "All" && (
                                <>
                                    <h3 className={classes.h3}>Yearly</h3>
                                    <div className={classes.converterContainer}>
                                        {/* Input Yearly Minimo */}
                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input type="number" placeholder="Enter minimum level"
                                                   value={minimumLevelYearly}
                                                   onChange={(e) => setMinimumLevelYearly(e.target.value)}
                                                   onBlur={() => handleMinimumLevelBlur(minimumLevelYearly, setMinimumLevelYearly, setMinimumLevelYearlyError)}
                                                   className={`${classes.input} ${minimumLevelYearlyError ? classes.errorInput : ''}`}
                                            />
                                            {minimumLevelYearlyError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input Yearly Massimo */}
                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input type="number" placeholder="Enter maximum level"
                                                   value={maximumLevelYearly}
                                                   onChange={(e) => setMaximumLevelYearly(e.target.value)}
                                                   onBlur={() => handleMaximumLevelBlur(maximumLevelYearly, setMaximumLevelYearly, setMaximumLevelYearlyError, minimumLevelYearly, setRangeYearlyError)}
                                                   className={`${classes.input} ${maximumLevelYearlyError ? classes.errorInput : ''}`}
                                            />
                                            {maximumLevelYearlyError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Frequency</label>
                                            <select className={classes.select}
                                                    value={frequencyYearly}  // Imposta il valore su quello dello stato
                                                    onChange={(e) => setFrequencyYearly(e.target.value)}>
                                                <option value="Weekly and Monthly">Weekly and Monthly</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Weekly">Weekly</option>
                                            </select>
                                        </div>

                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Modality</label>
                                            <select className={classes.select}
                                                    value={checkModalityYearly ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
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
                                    <h3 className={classes.h3}>Quarterly</h3>
                                    <div className={classes.converterContainer}>
                                        {/* Input Quarterly Minimo */}
                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input type="number" placeholder="Enter minimum level"
                                                   value={minimumLevelQuarterly}
                                                   onChange={(e) => setMinimumLevelQuarterly(e.target.value)}
                                                   onBlur={() => handleMinimumLevelBlur(minimumLevelQuarterly, setMinimumLevelQuarterly, setMinimumLevelQuarterlyError)}
                                                   className={`${classes.input} ${minimumLevelQuarterlyError ? classes.errorInput : ''}`}
                                            />
                                            {minimumLevelQuarterlyError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input Quarterly Massimo */}
                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input type="number" placeholder="Enter maximum level"
                                                   value={maximumLevelQuarterly}
                                                   onChange={(e) => setMaximumLevelQuarterly(e.target.value)}
                                                   onBlur={() => handleMaximumLevelBlur(maximumLevelQuarterly, setMaximumLevelQuarterly, setMaximumLevelQuarterlyError, minimumLevelQuarterly, setRangeQuarterlyError)}
                                                   className={`${classes.input} ${maximumLevelQuarterlyError ? classes.errorInput : ''}`}
                                            />
                                            {maximumLevelQuarterlyError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Frequency</label>
                                            <select
                                                className={classes.select}
                                                value={frequencyQuarterly}  // Imposta il valore su quello dello stato
                                                onChange={(e) => setFrequencyQuarterly(e.target.value)}
                                            >
                                                <option value="Weekly and Monthly">Weekly and Monthly</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Weekly">Weekly</option>
                                            </select>
                                        </div>

                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Modality</label>
                                            <select
                                                className={classes.select}
                                                value={checkModalityQuarterly ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
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
                                    <h3 className={classes.h3}>Monthly</h3>
                                    <div className={classes.converterContainer}>
                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Minimum level</label>
                                            <input type="number" placeholder="Enter minimum level"
                                                   value={minimumLevelMonthly}
                                                   onChange={(e) => setMinimumLevelMonthly(e.target.value)}
                                                   onBlur={() => handleMinimumLevelBlur(minimumLevelMonthly, setMinimumLevelMonthly, setMinimumLevelMonthlyError)}
                                                   className={`${classes.input} ${minimumLevelMonthlyError ? classes.errorInput : ''}`}
                                            />
                                            {minimumLevelMonthlyError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        {/* Input Monthly Massimo */}
                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Maximum level</label>
                                            <input type="number" placeholder="Enter maximum level"
                                                   value={maximumLevelMonthly}
                                                   onChange={(e) => setMaximumLevelMonthly(e.target.value)}
                                                   onBlur={() => handleMaximumLevelBlur(maximumLevelMonthly, setMaximumLevelMonthly, setMaximumLevelMonthlyError, minimumLevelMonthly, setRangeMonthlyError)}
                                                   className={`${classes.input} ${maximumLevelMonthlyError ? classes.errorInput : ''}`}
                                            />
                                            {maximumLevelMonthlyError && (
                                                <div className={classes.errorMessage}>
                                                    The value must be between 0 and {getLimit()}!
                                                </div>
                                            )}
                                        </div>

                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Frequency</label>
                                            <select className={classes.select}
                                                    value={frequencyMonthly}  // Imposta il valore su quello dello stato
                                                    onChange={(e) => setFrequencyMonthly(e.target.value)}>
                                                <option value="Weekly and Monthly">Weekly and Monthly</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Weekly">Weekly</option>
                                            </select>
                                        </div>

                                        <div className={classes.inputGroupHorizontal}>
                                            <label className={classes.label}>Modality</label>
                                            <select className={classes.select}
                                                    value={checkModalityMonthly ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
                                                    onChange={(e) => setCheckModalityMonthly(e.target.value === "Percentage")}>
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
                                </>
                            )}

                            {futuresType === "Yearly" && (
                                <div className={classes.converterContainer}>
                                    {/* Input per il minimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Minimum level</label>
                                        <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                               value={minimumLevel}
                                               onChange={(e) => setMinimumLevel(e.target.value)}
                                               onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError)}
                                               className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {minimumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    {/* Input per il massimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Maximum level</label>
                                        <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                               value={maximumLevel}
                                               onChange={(e) => setMaximumLevel(e.target.value)}
                                               onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                               className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {maximumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Frequency</label>
                                        <select
                                            className={classes.select}
                                            value={frequencyAlert}  // Imposta il valore su quello dello stato
                                            onChange={(e) => setFrequencyAlert(e.target.value)}
                                        >
                                            <option value="Weekly and Monthly">Weekly and Monthly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Modality</label>
                                        <select
                                            className={classes.select}
                                            value={checkModality ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
                                            onChange={(e) => setCheckModality(e.target.value === "Percentage")}
                                        >
                                            <option value="Value">Value</option>
                                            <option value="Percentage">Percentage</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {futuresType === "Quarterly" && (
                                <div className={classes.converterContainer}>
                                    {/* Input per il minimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Minimum level</label>
                                        <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                               value={minimumLevel}
                                               onChange={(e) => setMinimumLevel(e.target.value)}
                                               onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError)}
                                               className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {minimumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    {/* Input per il massimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Maximum level</label>
                                        <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                               value={maximumLevel}
                                               onChange={(e) => setMaximumLevel(e.target.value)}
                                               onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                               className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {maximumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Frequency</label>
                                        <select
                                            className={classes.select}
                                            value={frequencyAlert}  // Imposta il valore su quello dello stato
                                            onChange={(e) => setFrequencyAlert(e.target.value)}
                                        >
                                            <option value="Weekly and Monthly">Weekly and Monthly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Modality</label>
                                        <select
                                            className={classes.select}
                                            value={checkModality ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
                                            onChange={(e) => setCheckModality(e.target.value === "Percentage")}
                                        >
                                            <option value="Value">Value</option>
                                            <option value="Percentage">Percentage</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {futuresType === "Monthly" && (
                                <div className={classes.converterContainer}>
                                    {/* Input per il minimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Minimum level</label>
                                        <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`}
                                               value={minimumLevel}
                                               onChange={(e) => setMinimumLevel(e.target.value)}
                                               onBlur={() => handleMinimumLevelBlur(minimumLevel, setMinimumLevel, setMinimumLevelError)}
                                               className={`${classes.input} ${minimumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {minimumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    {/* Input per il massimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Maximum level</label>
                                        <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`}
                                               value={maximumLevel}
                                               onChange={(e) => setMaximumLevel(e.target.value)}
                                               onBlur={() => handleMaximumLevelBlur(maximumLevel, setMaximumLevel, setMaximumLevelError, minimumLevel, setRangeError)}
                                               className={`${classes.input} ${maximumLevelError ? classes.errorInput : ''}`}
                                        />
                                        {maximumLevelError && (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Frequency</label>
                                        <select className={classes.select} value={frequencyAlert}
                                                onChange={(e) => setFrequencyAlert(e.target.value)}>
                                            <option value="Weekly and Monthly">Weekly and Monthly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Modality</label>
                                        <select className={classes.select}
                                                value={checkModality ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
                                                onChange={(e) => setCheckModality(e.target.value === "Percentage")}>
                                            <option value="Value">Value</option>
                                            <option value="Percentage">Percentage</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            {rangeError && (
                                <div className={classes.errorMessage}>
                                    The minimum value cannot be greater than the maximum value!
                                </div>
                            )}
                            <div style={{marginTop: '2%'}}>
                                <input type="checkbox" className={classes} checked={activeAlert}
                                       onChange={(e) => setActiveAlert(e.target.checked)}/>
                                <label className={classes.label} style={{marginLeft: '4px'}}>Active Alert</label>
                            </div>

                            <button className={classes.convertButton} onClick={fetchCheckAlert}>
                                Send email
                            </button>
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