import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { FaAt, FaLock, FaMailBulk, FaUser } from "react-icons/fa";
import { useSingupMutation } from "../../api/auth";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import LongSeal from "../../assets/long_seal.svg";

const SignUp: React.FC = () => {
    const router = useIonRouter();
    const { register, handleSubmit } = useForm();
    const [signup, { status, error }] = useSingupMutation();
    const [errorText, setErrorText] = useState<string | null>(null);

    const onSubmit = (data: any) => {
        if (data.hash !== data.repeatPassword) {
            setErrorText("Passwords do not match");
            return;
        }

        delete data.repeatPassword;
        signup(data);
    };

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            router.push("/auth/login");
        } else if (status === QueryStatus.rejected) {
            setErrorText((error as any).data.message);
        }
    }, [status]);

    return (
        <IonPage>
            <IonContent scrollY={false} className="">
                <div className="h-full flex flex-col items-center px-6 bg-gradient-to-b from-darker-violet-800 to-zinc-900 pt-safe">
                    <div className="text-5xl h-[30%] w-full flex flex-col justify-center relative uppercase font-bold px-2">
                        <div className="text-xl text-darker-violet-400">
                            Welcome
                        </div>
                        <div className="font-semibold">Sign up</div>
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
                        <div className="flex gap-2 w-full">
                            <div className="flex-1 w-0 rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                                <FaUser className="text-xl w-5" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="bg-transparent border-none outline-none placeholder:text-white/20 w-0 flex-1"
                                    {...register("name", { required: true })}
                                />
                            </div>
                            <div className="flex-1 w-0 rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                                <FaUser className="text-xl w-5" />
                                <input
                                    type="text"
                                    placeholder="Surname"
                                    className="bg-transparent border-none outline-none placeholder:text-white/20 w-0 flex-1"
                                    {...register("surname", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaAt className="text-xl w-5" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaLock className="text-xl w-5" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                                {...register("hash", { required: true })}
                            />
                        </div>
                        <div className="w-full rounded-lg flex bg-black/20 p-3 pl-4 items-center gap-3">
                            <FaLock className="text-xl w-5" />
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                className="bg-transparent border-none outline-none placeholder:text-white/20"
                                {...register("repeatPassword", {
                                    required: true,
                                })}
                            />
                        </div>
                        {errorText && (
                            <div className="text-red-500 font-semibold text-base text-center h-6">
                                {errorText}
                            </div>
                        )}
                        <button className="bg-violet-800 text-white p-2 rounded-lg h-12 font-semibold mt-4 uppercase">
                            Sign Up
                        </button>
                        <div className="border-t-2 border-black/20 w-full mt-2 flex flex-col items-center pt-2 gap-2">
                            <div className="text-white/90 font-semibold text-lg">
                                Already have account?
                            </div>
                            <div
                                className="text-white font-semibold cursor-pointer w-full bg-white/10 h-12 rounded-lg uppercase flex justify-center items-center"
                                onClick={() => router.push("/auth/login")}
                            >
                                Login
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

export default SignUp;
