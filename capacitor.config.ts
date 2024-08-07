import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "ionic.checkup",
    appName: "checkup",
    webDir: "dist",
    plugins: {
        CapacitorSQLite: {
            iosDatabaseLocation: "Library/CapacitorDatabase",
            iosIsEncryption: true,
            iosKeychainPrefix: "checkup",
            androidIsEncryption: true,
        },
    },
};

export default config;
