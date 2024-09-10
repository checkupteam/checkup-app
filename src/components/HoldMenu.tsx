import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { useLongPress } from "@reactuses/core";
import { ReactNode, useState } from "react";

const HoldMenu: React.FC<{
    children: ReactNode;
    menu: React.FC<{ close: () => void }>;
}> = ({ children, menu }) => {
    const [visible, setVisible] = useState(false);

    const onLongPress = () => {
        Haptics.impact({ style: ImpactStyle.Light });
        setVisible(true);
    };

    const longPressEvent = useLongPress(onLongPress, {
        isPreventDefault: false,
        delay: 300,
    });

    return (
        <>
            {visible && (
                <div
                    className="z-40 absolute top-0 left-0 h-full w-full bg-black/30 backdrop-blur-xs animate-fadeIn"
                    onClick={() => setVisible(false)}
                ></div>
            )}
            <div
                className={"relative " + (visible ? "z-50" : "")}
                {...longPressEvent}
            >
                {children}
                {visible && (
                    <div className="absolute z-50 -bottom-2 translate-y-full w-full">
                        {menu({ close: () => setVisible(false) })}
                    </div>
                )}
            </div>
        </>
    );
};

export default HoldMenu;
