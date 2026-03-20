import React from "react";

interface Analytics {
    totalUsers: number;
    activeUsers: number;
    totalReports: number;
}

// Props passed from Admin page
interface Props {
    analytics: Analytics;
}

const AnalyticsPanel: React.FC<Props> = ({ analytics }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        marginTop: "1rem",
        flexWrap: "wrap",
      }}
    >
      <StatCard label="Total Users" value={analytics.totalUsers} />
      <StatCard label="Active Users" value={analytics.activeUsers} />
      <StatCard label="Total Reports" value={analytics.totalReports} />
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        minWidth: "150px",
      }}
    >
      <h3>{label}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default AnalyticsPanel;