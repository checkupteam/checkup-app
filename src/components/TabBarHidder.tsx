import { useIonRouter, useIonViewDidEnter } from "@ionic/react";
import { ReactNode, useEffect } from "react";
import { showTabBar } from "../utils/tabBar";

const TabBarHidder: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useIonRouter();

    useEffect(() => {
        return () => {
            showTabBar();
        };
    }, [router.routeInfo.pathname]);

    return children;
};

export default TabBarHidder;
