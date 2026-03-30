import {useEffect, useState} from "react";
// Import reusable components
import ReportList from "../components/ReportList";
import AnalyticsPanel from "../components/AnalyticsPanel";

// Type definition for a report object
interface Report {
    id: string;
    reason: string;
    reportedUser: string;
    date: string;
}

// Type definition for analytics data
interface Analytics {
    totalUsers: number;
    activeUsers: number;
    totalReports: number;
}

const Admin = () => {
    // State to store reports and analytical data
    const [reports, setReports] = useState<Report[]>([]);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    // Loading state for UI feedback
    const [loading, setLoading] = useState(true);

    // Runs once when component mounts
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Fetch reports and analytics at the same time
                const [reportsRes, analyticsRes] = await Promise.all([
                    fetch("/api/admin/reports"),
                    fetch("/api/admin/analytics"),
                ])

                const reportsData = await reportsRes.json();
                const analyticsData = await analyticsRes.json();

                // Update state with fetched data
                setReports(reportsData);
                setAnalytics(analyticsData);

            } catch (err) {
                console.error("Error fetching admin data: ", err);
            } finally {
                // Stop loading regardless of success/failure
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    // Show loading message while fetching data
    if (loading) return <div>Loading Admin dashboard...</div>;

    return (
        <div style={{ padding: "2rem" }}>
        <h1>Admin Dashboard</h1>

        {/* Only render analytics if data exists */}
        {analytics && <AnalyticsPanel analytics={analytics}/>}

        <h2 style={{ marginTop: "2rem" }}>User Reports</h2>
        {/* Pass reports data into ReportList component */}
        <ReportList reports={reports} />
        </div>
    );
};

export default Admin;