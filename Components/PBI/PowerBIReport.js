"use client";

import { useEffect, useRef } from "react";
import * as pbi from "powerbi-client";
import classes from "./PowerBIReport.module.css";

const PATH = process.env.NEXT_PUBLIC_PATH_DEV;

export default function PowerBIReport({ reportId, embedUrl }) {
    const reportRef = useRef(null);

    useEffect(() => {
        async function embedReport() {
            const container = reportRef.current;
            if (!container) {
                console.error("❌ Il container del report non è stato trovato.");
                return;
            }

            try {
                // ✅ Recupero token da endpoint backend
                const res = await fetch(`${PATH}/api/pbitoken`, {
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Errore nel recupero del token Power BI.");
                }

                const { token } = await res.json();

                // ✅ Configurazione dell'embedding
                const embedConfig = {
                    type: "report",
                    id: reportId,
                    embedUrl: embedUrl,
                    accessToken: token,
                    tokenType: pbi.models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: { visible: true },
                            pageNavigation: { visible: false },
                        },
                        navContentPaneEnabled: false,
                        background: pbi.models.BackgroundType.Transparent,
                        layoutType: pbi.models.LayoutType.Custom,
                        customLayout: {
                            displayOption: pbi.models.DisplayOption.FitToPage,
                            pageSize: {
                                type: pbi.models.PageSizeType.Widescreen,
                            },
                        },
                    },
                };

                // ✅ Istanza Power BI Service
                const powerbiService = new pbi.service.Service(
                    pbi.factories.hpmFactory,
                    pbi.factories.wpmpFactory,
                    pbi.factories.routerFactory
                );

                // 🔁 Reset prima di un nuovo embedding per evitare conflitti
                powerbiService.reset(container);

                // 🚀 Esegui embedding
                const report = powerbiService.embed(container, embedConfig);

                // ✅ Eventi di feedback
                report.on("loaded", () => {
                    console.log("✅ Report caricato correttamente.");
                });

                report.on("error", (event) => {
                    console.error("❌ Errore durante l'embedding del report:", event.detail);
                });
            } catch (error) {
                console.error("❌ Errore generale durante l'embedding del report:", error);
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
