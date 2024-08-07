import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize, KeyboardStyle } from "@capacitor/keyboard";

const config: CapacitorConfig = {
    appId: "ionic.checkup",
    appName: "checkup",
    webDir: "dist",
    plugins: {
        Keyboard: {
            resize: KeyboardResize.Body,
            style: KeyboardStyle.Dark,
            resizeOnFullScreen: true,
        },
    },
};

export default config;
