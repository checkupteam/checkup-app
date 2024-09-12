import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { Route, useHistory } from "react-router";
import { useLoginMutation } from "../../api/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/auth";
import LongSeal from "../../assets/long_seal.svg";

const Login: React.FC = () => {
    const router = useIonRouter();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [login, { status, error, data }] = useLoginMutation();
    const [errorText, setErrorText] = useState<string | null>(null);

    const onSubmit = (data: any) => {
        login(data);
    };

    useEffect(() => {
        if (status === "fulfilled") {
            if (data.access_token) dispatch(setToken(data.access_token));
            router.push("/app");
        } else if (status === "rejected") {
            setErrorText((error as any).data.message);
        }
    }, [status]);

    return (
        <IonPage>
            <IonContent
                scrollY={false}
                className="h-full flex flex-col items-center gap-20 pt-10"
            >
                <div className="h-full flex flex-col items-center px-6 bg-gradient-to-b from-darker-violet-800 to-zinc-900 pt-safe">
                    <div className="text-5xl h-[30%] w-full flex flex-col justify-center relative uppercase font-bold px-2">
                        <div className="text-xl text-darker-violet-400">
                            Welcome
                        </div>
                        <div className="font-semibold">login</div>
                        <img
                            src={LongSeal}
                            alt=""
                            className="absolute top-1/2 -translate-y-1/2 -right-[18%] -rotate-[55deg] h-[75%]"
                        />
                    </div>
                    <div className="text-2xl font-semibold pb-1 border-b-2 border-black/20 w-full uppercase"></div>
                    <form
                        className="flex flex-col gap-2 mt-5 w-full text-xl"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaUser className="text-xl w-5" />
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                            />
                        </div>
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaLock className="text-xl w-5" />
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("pass", { required: true })}
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                            />
                        </div>
                        {errorText && (
                            <div className="text-red-500 font-semibold text-base text-center h-6">
                                {errorText}
                            </div>
                        )}
                        <button className="bg-accent text-white p-2 rounded-lg h-12 font-semibold mt-6 uppercase">
                            Login
                        </button>
                        <div className="border-t-2 border-black/20 w-full mt-2 flex flex-col items-center pt-2 gap-2 ">
                            <div className="text-white/90 font-semibold text-lg">
                                Don't have account?
                            </div>
                            <div
                                className="text-white font-semibold cursor-pointer w-full bg-white/10 h-12 rounded-lg uppercase flex justify-center items-center"
                                onClick={() => router.push("/auth/signup")}
                            >
                                Sign Up
                            </div>
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
