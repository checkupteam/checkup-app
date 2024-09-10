import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth";
import { useGetUserQuery } from "../api/auth";
import Loading from "../components/Loading";

const AccountPage: React.FC = () => {
    const { data, isLoading } = useGetUserQuery();
    const dispatch = useDispatch();
    const router = useIonRouter();

    const logout = () => {
        router.push("/auth/login");
        setTimeout(() => {
            dispatch(setToken(null));
        }, 500);
    };

    return (
        <IonPage>
            <IonHeader className="shadow-none">
                <IonToolbar>
                    <div className="flex justify-between items-center px-2 pl-3 text-xl font-bold text-white">
                        <div className="py-2">Your Account</div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                {!isLoading && data ? (
                    <div className="flex flex-col w-full p-3 gap-3">
                        <div className="bg-black/30 rounded-2xl p-3 px-5 gap-1 flex flex-col">
                            <div className="text-2xl font-semibold leading-6">
                                {data.name} {data.surname}
                            </div>
                            <div className="text-zinc-500 text-lg font-semibold leading-5">
                                {data.email}
                            </div>
                        </div>
                        <div className="bg-black/30 rounded-2xl p-3 px-5 gap-1 flex flex-col">
                            <div
                                className="text-lg font-semibold leading-6 text-red-500 uppercase text-center"
                                onClick={() => logout()}
                            >
                                Wyloguj
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </IonContent>
        </IonPage>
    );
};

export default AccountPage;
