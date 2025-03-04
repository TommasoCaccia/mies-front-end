"use client";
import React, { useEffect, useState, useRef } from "react";
import classes from '@/app/energy-portfolio/futures/pages.module.css';
import Swal from "sweetalert2";

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

    const [deleteAlert, setDeleteAlert] = useState({active: false, message: "" });
    const [activeAlert, setActiveAlert] = useState(false);

    const PATH_PRODUCTION = process.env.NEXT_PUBLIC_PATH_PRODUCTION;
    const PATH_DEV = process.env.NEXT_PUBLIC_PATH_DEV

    /*TODO:
     * Server
     * Controllo per evitare email non desiderate ed eventuali errori:
     * 1. l'utente non può avere più di un alert attivo
     * 2. nel caso vuole attivare un alert diverso devo cancellare quello precedentemente creato
     * Server
     * Creazione di scedulazione per analisi e eventuale invio dell'email
     * Creazione dell'email nel caso di invio di email dopo analisi dati
     */

    // Refs corretti
    const sectionRefs = useRef({
        Futures: useRef(null),
        Alert: useRef(null),
        FuturesAnalysis: useRef(null),
        Past: useRef(null),
    });

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
    const showAlert = () => {
        alert(`Futures Type: ${futuresType}\n\n` +
            `Active Alert: ${activeAlert}\n\n` +
            `General:\n` +
            `- Minimum Level: ${minimumLevel} ${checkModality ? '%' : ''}\n` +
            `- Maximum Level: ${maximumLevel} ${checkModality ? '%' : ''}\n` +
            `- Frequency: ${frequencyAlert}\n\n` +
            `Yearly:\n` +
            `- Futures Type: ${futuresYearly}\n` +
            `- Minimum Level: ${minimumLevelYearly} ${checkModalityYearly ? '%' : ''}\n` +
            `- Maximum Level: ${maximumLevelYearly} ${checkModalityYearly ? '%' : ''}\n` +
            `- Frequency: ${frequencyYearly}\n\n` +
            `Quarterly:\n` +
            `- Futures Type: ${futuresQuarterly}\n` +
            `- Minimum Level: ${minimumLevelQuarterly} ${checkModalityQuarterly ? '%' : ''}\n` +
            `- Maximum Level: ${maximumLevelQuarterly} ${checkModalityQuarterly ? '%' : ''}\n` +
            `- Frequency: ${frequencyQuarterly}\n\n` +
            `Monthly:\n` +
            `- Futures Type: ${futuresMonthly}\n` +
            `- Minimum Level: ${minimumLevelMonthly} ${checkModalityMonthly ? '%' : ''}\n` +
            `- Maximum Level: ${maximumLevelMonthly} ${checkModalityMonthly ? '%' : ''}\n` +
            `- Frequency: ${frequencyMonthly}\n\n` +
            `Errors:\n` +
            `- Minimum Level Error: ${minimumLevelError}\n` +
            `- Maximum Level Error: ${maximumLevelError}\n` +
            `- Range Error: ${rangeError}\n` +
            `- Minimum Level Yearly Error: ${minimumLevelYearlyError}\n` +
            `- Maximum Level Yearly Error: ${maximumLevelYearlyError}\n` +
            `- Range Yearly Error: ${rangeYearlyError}\n` +
            `- Minimum Level Quarterly Error: ${minimumLevelQuarterlyError}\n` +
            `- Maximum Level Quarterly Error: ${maximumLevelQuarterlyError}\n` +
            `- Range Quarterly Error: ${rangeQuarterlyError}\n` +
            `- Minimum Level Monthly Error: ${minimumLevelMonthlyError}\n` +
            `- Maximum Level Monthly Error: ${maximumLevelMonthlyError}\n` +
            `- Range Monthly Error: ${rangeMonthlyError}\n\n` +
            `Delete Alert: ${deleteAlert.active ? `Active (${deleteAlert.message})` : 'Inactive'}\n`

        );
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
                body: JSON.stringify({ futuresType: futuresType }),
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
                        setDeleteAlert({ active: true, message: data});
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
            alert(JSON.stringify(data, null, 2));
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

    }, [checkModalityMonthly, checkModalityQuarterly, checkModalityYearly, frequencyYearly, frequencyQuarterly,frequencyMonthly]);

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
            }else{
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
        setManualNavigation(true);

        const sectionElement = sectionRefs[section]?.current;
        if (!sectionElement) {
            console.error(`Sezione con ID ${section} non trovata.`);
            return;
        }

        const offsetTop = 110;

        window.scrollTo({
            top: sectionElement.offsetTop - offsetTop,
            behavior: "smooth",
        });

        setActiveSection(section);

        const onScroll = () => {
            setManualNavigation(false);
            window.removeEventListener("scroll", onScroll);
        };
        window.addEventListener("scroll", onScroll);
    };

    const powerBIConfig = {
        baseURL: "https://app.powerbi.com/reportEmbed",
        tenantId: "69da13af-78cb-4dd9-b20c-087550f2b912",
        reports: {
            Futures: "e1eb76d5-5c75-442e-84b0-a88d20d3847f",
            FuturesAnalysis: "38831d35-3aac-49b8-8f1a-8afbf6f96e43",
            Past: "f9f7a1d8-32e8-4b04-9cb8-9f83c0e25858",
        },
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


    return (
        <div className={classes.container}>
            <nav
                className={`${classes.sidebar} ${isOpen ? classes.show : ""}`}
                ref={sidebarRef}
            >
                <ul className="nav flex-column">
                    {Object.keys(sectionRefs.current).map((key) => (
                        <li key={key} className="nav-item">
                            <a
                                className={`${classes.navLink} ${
                                    activeSection === key ? classes.active : ""
                                }`}
                                href={`#${key}`}
                                onClick={(e) => handleNavigation(e, key)}
                            >
                                {readableNames[key]}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <main className={classes.mainContent}>
                <div id="Futures" ref={sectionRefs.current.Futures} className={classes.section}>
                    <h1>Futures</h1>
                    <div style={{position: "relative", width: "100%", height: 0, paddingBottom: "50%"}}>

                        <iframe ref={iframeRef} title="FuturesVisual" style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                            src={`${powerBIConfig.baseURL}?reportId=${powerBIConfig.reports.Futures}&autoAuth=true&ctid=${powerBIConfig.tenantId}&filterPaneEnabled=false&navContentPaneEnabled=false`}
                            frameBorder="0" allowFullScreen={true}>
                        </iframe>
                        <button onClick={goFullScreen} style={{ position: "absolute", top: 10, right: 10, padding: "10px", background: "black", color: "white", border: "none", cursor: "pointer" }}>
                            Fullscreen
                        </button>
                    </div>
                </div>


                <div id="Alert" ref={sectionRefs.current.Alert} className={classes.section}>
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
                                    <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`} value={minimumLevel}
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
                                    <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`} value={maximumLevel}
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
                                    <select className={classes.select} value={checkModality ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
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
                                        <input type="number" placeholder="Enter minimum level" value={minimumLevelYearly}
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
                                        <input type="number" placeholder="Enter maximum level" value={maximumLevelYearly}
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
                                        <select className={classes.select} value={frequencyYearly}  // Imposta il valore su quello dello stato
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
                                        <input type="number" placeholder="Enter minimum level" value={minimumLevelQuarterly}
                                            onChange={(e) => setMinimumLevelQuarterly(e.target.value)}
                                            onBlur={() => handleMinimumLevelBlur(minimumLevelQuarterly, setMinimumLevelQuarterly, setMinimumLevelQuarterlyError)}
                                            className={`${classes.input} ${minimumLevelQuarterlyError ? classes.errorInput : ''}`}
                                        />
                                        {minimumLevelQuarterlyError&& (
                                            <div className={classes.errorMessage}>
                                                The value must be between 0 and {getLimit()}!
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Quarterly Massimo */}
                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Maximum level</label>
                                        <input type="number" placeholder="Enter maximum level" value={maximumLevelQuarterly}
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
                                        <input type="number" placeholder="Enter minimum level" value={minimumLevelMonthly}
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
                                        <input type="number" placeholder="Enter maximum level" value={maximumLevelMonthly}
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
                                        <select className={classes.select} value={frequencyMonthly}  // Imposta il valore su quello dello stato
                                            onChange={(e) => setFrequencyMonthly(e.target.value)}>
                                            <option value="Weekly and Monthly">Weekly and Monthly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className={classes.inputGroupHorizontal}>
                                        <label className={classes.label}>Modality</label>
                                        <select className={classes.select} value={checkModalityMonthly ? "Percentage" : "Value"}  // Imposta il valore in base allo stato booleano
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
                                    <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`} value={minimumLevel}
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
                                    <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`} value={maximumLevel}
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
                                    <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`} value={minimumLevel}
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
                                    <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`} value={maximumLevel}
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
                                    <input type="number" placeholder={`Enter minimum level (0 to ${getLimit()})`} value={minimumLevel}
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
                                    <input type="number" placeholder={`Enter maximum level (0 to ${getLimit()})`} value={maximumLevel}
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


                <div id="FuturesAnalysis" ref={sectionRefs.current.FuturesAnalysis} className={classes.section}>
                    <h1>Futures Analysis</h1>
                    <div style={{position: "relative", width: "100%", height: 0, paddingBottom: "50%"}}>
                        <iframe title="FuturesAnalysis" style={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0}}
                            src={`${powerBIConfig.baseURL}?reportId=${powerBIConfig.reports.FuturesAnalysis}&autoAuth=true&ctid=${powerBIConfig.tenantId}&filterPaneEnabled=false&navContentPaneEnabled=false`}
                            frameBorder="0" allowFullScreen={true}>
                        </iframe>
                        <button onClick={goFullScreen} style={{ position: "absolute", top: 10, right: 10, padding: "10px", background: "black", color: "white", border: "none", cursor: "pointer" }}>
                            Fullscreen
                        </button>
                    </div>
                </div>

                <div id="Past" ref={sectionRefs.current.Past} className={classes.section}>
                    <h1>Past</h1>
                    <div style={{position: "relative", width: "100%", height: 0, paddingBottom: "50%"}}>
                        <iframe title="FuturesAnalysis" style={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0}}
                            src={`${powerBIConfig.baseURL}?reportId=${powerBIConfig.reports.Past}&autoAuth=true&ctid=${powerBIConfig.tenantId}&filterPaneEnabled=false&navContentPaneEnabled=false`}
                            frameBorder="0" allowFullScreen={true}>
                        </iframe>
                        <button onClick={goFullScreen} style={{ position: "absolute", top: 10, right: 10, padding: "10px", background: "black", color: "white", border: "none", cursor: "pointer" }}>
                            Fullscreen
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}