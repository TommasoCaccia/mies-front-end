// components/PowerBIReport.js
import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const PowerBIReport = () => {
    const embedConfig = {
        type: 'report',   // Specify embed type as report
        id: '<YOUR_REPORT_ID>', // Replace with your report ID
        embedUrl: '<YOUR_EMBED_URL>', // Replace with your embed URL
        accessToken: '<YOUR_ACCESS_TOKEN>', // Replace with your access token
        tokenType: models.TokenType.Embed,
        settings: {
            panes: {
                filters: {
                    visible: false
                },
                pageNavigation: {
                    visible: true
                }
            }
        }
    };

    return (
        <div style={{ height: '500px' }}>
            <PowerBIEmbed
                embedConfig={embedConfig}
                cssClassName="report-style-class"
                getEmbeddedComponent={(embeddedReport) => {
                    console.log('Report embedded:', embeddedReport);
                }}
            />
        </div>
    );
};

export default PowerBIReport;
