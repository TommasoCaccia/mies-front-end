"use client";

import {useEffect, useRef} from "react";
import * as pbi from "powerbi-client";
import classes from "./PowerBIReport.module.css";

const PATH = process.env.NEXT_PUBLIC_PATH_DEV

export default function PowerBIReport({reportId, embedUrl}) {
    const reportRef = useRef(null);

    useEffect(() => {
        async function embedReport() {
            if (!reportRef.current) {
                console.error("Il container del report non è stato trovato.");
                return;
            }

            try {
                const res = await fetch(`${PATH}/api/pbitoken`);
                const {token} = await res.json();

                const embedConfig = {
                    type: "report",
                    id: reportId,
                    embedUrl: embedUrl,
                    accessToken: token,
                    tokenType: pbi.models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: true,
                            pageNavigation: true,
                        },
                        mobileOptimized: true,
                        showMobileLayout: true
                    },
                };

                const powerbiService = new pbi.service.Service(
                    pbi.factories.hpmFactory,
                    pbi.factories.wpmpFactory,
                    pbi.factories.routerFactory
                );

                const report = powerbiService.embed(reportRef.current, embedConfig);

                report.on("loaded", () => {
                    console.log("Report caricato correttamente.");
                });

                report.on("error", (event) => {
                    console.error("Errore durante l'embedding del report:", event.detail);
                });
            } catch (error) {
                console.error("Errore durante l'embedding del report:", error);
            }
        }

        embedReport();
    }, [reportId, embedUrl]);

    return (
        <div className={classes.iframeContainer}>
            <div ref={reportRef} className={classes.reportContainer}></div>
        </div>
    );
}
