import { useIonRouter } from "@ionic/react";
import React from "react";
import { FaBook, FaCalendarAlt, FaClipboardList, FaUser } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

const routesWithBar = ["/journal", "/home", "/calendar", "/tasks"];

const RouteIcon: React.FC<{ icon: React.ReactNode; path: string }> = ({
    icon,
    path,
}) => {
    const router = useIonRouter();

    return (
        <div
            className={`flex flex-col items-center ${
                router.routeInfo.pathname === path
                    ? "text-white/80"
                    : "text-background"
            }`}
            onClick={() => router.push(path)}
        >
            {icon}
        </div>
    );
};

const NavBar: React.FC = () => {
    const router = useIonRouter();

    return (
        routesWithBar.includes(router.routeInfo.pathname) && (
            <div className="fixed p-3 bottom-0 left-0 w-full flex flex-col">
                <div className="bg-primary/30 rounded-full w-full h-18 flex justify-evenly items-center text-2xl text-background">
                    <RouteIcon icon={<FaCalendarAlt />} path="/calendar" />                    
                    <RouteIcon icon={<FaBook />} path="/journal" />
                    <RouteIcon icon={<FaHouse />} path="/home" /> 
                    <RouteIcon icon={<FaClipboardList />} path="/tasks" />            
                    <FaUser /> 
                </div>
            </div>
        )
    );
};

export default NavBar;
