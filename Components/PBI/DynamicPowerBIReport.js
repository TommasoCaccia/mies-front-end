// components/DynamicPowerBIReport.jsx
import dynamic from "next/dynamic";

const PowerBIReportNoSSR = dynamic(() => import("./PowerBIReport"), { ssr: false });

export default function DynamicPowerBIReport({ reportId, embedUrl }) {
    return <PowerBIReportNoSSR reportId={reportId} embedUrl={embedUrl} />;
}
