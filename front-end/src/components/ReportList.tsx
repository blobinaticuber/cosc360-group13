import React from "react";

interface Report {
    id: string;
    reason: string;
    reportedUser: string;
    date: string;
}

// Props expected from parent component
interface Props{
    reports: Report[];
}

const ReportList: React.FC<Props> = ({ reports }) => {
    // If there are no reports, show a message
    if (reports.length===0) {
        return <p>No reports found.</p>
    }

    return (
        // Table to display reports
        <table style={{ width: "100%", borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Reason</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {/* Loop through reports and render each as a row */}
                {reports.map((report) => (
                    <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.reportedUser}</td>
                        <td>{report.reason}</td>
                        <td>{new Date(report.date).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReportList;