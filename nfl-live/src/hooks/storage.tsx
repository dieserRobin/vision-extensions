/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

type StoragePayload = {
    extension?: any;
    layer?: any;
}

type StorageMessage = {
    type: string;
    payload: StoragePayload;
}

const useStorageSettings = () => {
    const [layerSettings, setLayerSettings] = useState<any | null>(null);
    const [extensionSettings, setExtensionSettings] = useState<any | null>(null);

    useEffect(() => {
        const requestStorageData = () => {
            window.parent.postMessage({ type: "get_storage" }, "*");
        };

        const onMessage = (event: MessageEvent) => {
            if (event.source !== window.parent && event.source !== window.parent) {
                return;
            }

            const data = event.data as StorageMessage;

            if (data.type === "storage") {
                if (data.payload.layer) {
                    setLayerSettings(data.payload.layer);
                }

                if (data.payload.extension) {
                    setExtensionSettings(data.payload.extension);
                }
            }
        };

        window.addEventListener("message", onMessage);

        // Request storage data initially
        requestStorageData();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("message", onMessage);
        };
    }, []);

    const updateStorage = (newData: StoragePayload) => {
        window.parent.postMessage({
            type: "storage",
            payload: newData,
        }, "*");

        if (newData.layer) {
            setLayerSettings(newData.layer);
        }

        if (newData.extension) {
            setExtensionSettings(newData.extension);
        }
    };

    return { layerSettings, extensionSettings, updateStorage };
};

export default useStorageSettings;