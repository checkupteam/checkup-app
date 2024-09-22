import { FirebaseAnalytics } from "@capacitor-firebase/analytics";
import { useIonRouter } from "@ionic/react";
import { ReactNode, useEffect } from "react";
import { useGetUserQuery } from "../api/auth";

const Analytics: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useIonRouter();
    const user = useGetUserQuery();

    useEffect(() => {
        if (router.routeInfo.tab) {
            FirebaseAnalytics.setCurrentScreen({
                screenName: router.routeInfo.tab,
            });
        } else {
            FirebaseAnalytics.setCurrentScreen({
                screenName: router.routeInfo.pathname,
            });
        }
    }, [router]);

    useEffect(() => {
        if (user.data) {
            FirebaseAnalytics.setUserId({ userId: user.data.id.toString() });
        } else {
            FirebaseAnalytics.resetAnalyticsData();
        }
    }, [user]);

    return <>{children}</>;
};

export default Analytics;
