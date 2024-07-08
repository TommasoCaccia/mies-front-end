import React from "react";
import classes from "@/app/home-accesso/powerbi/page.module.css";

export default function Powerbi() {
    const iframeSrc = "https://app.powerbi.com/reportEmbed?reportId=92de7c0c-f0f4-4307-a2e9-6f0512b178b9&autoAuth=true&ctid=552bed02-4512-450c-858d-84cfe2b4186d&filterPaneEnabled=false&navContentPaneEnabled=false";

    return (
        <main className={`container ${classes.powerbi}`}>
            <iframe
                id="dashboard"
                title="Dashboard Sublitex"
                src={iframeSrc}
                frameBorder="0"
                allowFullScreen={true}
                className={classes.responsiveIframe}>
            </iframe>
        </main>
    );
}
