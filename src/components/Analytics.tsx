import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { useIonRouter } from "@ionic/react";
import { ReactNode, useEffect } from "react";
import { useGetUserQuery } from "../api/auth";

const Analytics: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useIonRouter();
    const user = useGetUserQuery();

    useEffect(() => {
        if (router.routeInfo.tab) {
            FirebaseAnalytics.setScreenName({
                screenName: router.routeInfo.tab,
            });
        } else {
            FirebaseAnalytics.setScreenName({
                screenName: router.routeInfo.pathname,
            });
        }
    }, [router]);

    useEffect(() => {
        if (user.data) {
            FirebaseAnalytics.setUserId({ userId: user.data.id.toString() });
        } else {
            FirebaseAnalytics.reset();
        }
    }, [user]);

    return <>{children}</>;
};

export default Analytics;
