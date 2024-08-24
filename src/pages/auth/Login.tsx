import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { FaLock, FaUser } from "react-icons/fa";
import { Route, useHistory } from "react-router";

const Login: React.FC = () => {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar class="h-0"></IonToolbar>
            </IonHeader>
            <IonContent
                scrollY={false}
                className="h-full flex flex-col items-center gap-20 pt-10"
            >
                <div className="h-full flex flex-col items-center px-6">
                    <div className="text-7xl h-1/3 flex justify-center items-center">
                        LOGO
                    </div>
                    <div className="text-2xl font-semibold pb-1 border-b-2 border-black/20 w-full uppercase">
                        {/* Login */}
                    </div>
                    <form className="flex flex-col gap-2 mt-5 w-full text-xl">
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaUser className="text-xl w-5" />
                            <input
                                type="text"
                                placeholder="Username"
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                            />
                        </div>
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaLock className="text-xl w-5" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                            />
                        </div>

                        <button className="bg-accent text-white p-2 rounded-lg h-12 font-semibold mt-6 uppercase">
                            Login
                        </button>
                        <div className="border-t-2 border-black/20 w-full mt-2 flex flex-col items-center pt-2 gap-2 ">
                            <div className="text-white/90 font-semibold text-lg">
                                Don't have account?
                            </div>
                            <button
                                className="text-white font-semibold cursor-pointer w-full bg-white/10 h-12 rounded-lg uppercase"
                                onClick={() => router.push("/auth/singup")}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {/* <div className="absolute bottom-10 bg-black opacity-25 w-full h-56">
                        {" "}
                        cool grafika{" "}
                    </div> */}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
