import { writable } from 'svelte/store';

// Define types for storage payload
export type LayerSettings = Record<string, unknown> | null;
export type ExtensionSettings = Record<string, unknown> | null;

export interface StoragePayload {
	layer?: LayerSettings;
	extension?: ExtensionSettings;
}

export interface StorageMessage {
	type: string;
	payload: StoragePayload;
}

// Writable stores for layer and extension settings
export const layerSettings = writable<LayerSettings>(null);
export const extensionSettings = writable<ExtensionSettings>(null);

/**
 * Initialize the storage logic.
 *
 * @returns {() => void} A cleanup function to remove event listeners.
 */
export const initializeStorage = (): (() => void) => {
	const requestStorageData = (): void => {
		window.parent.postMessage({ type: 'get_storage' }, '*');
	};

	const onMessage = (event: MessageEvent): void => {
		if (event.source !== window.parent) {
			return;
		}

		const data = event.data as StorageMessage;

		if (data.type === 'storage') {
			if (data.payload?.layer) {
				layerSettings.set(data.payload.layer);
			}

			if (data.payload?.extension) {
				extensionSettings.set(data.payload.extension);
			}
		}
	};

	// Request storage data initially
	requestStorageData();

	// Listen for messages
	window.addEventListener('message', onMessage);

	// Cleanup function
	return () => {
		window.removeEventListener('message', onMessage);
	};
};

/**
 * Update storage and notify the parent window.
 *
 * @param {StoragePayload} newData - The new storage data.
 */
export const updateStorage = (newData: StoragePayload): void => {
	window.parent.postMessage(
		{
			type: 'storage',
			payload: newData
		},
		'*'
	);

	if (newData.layer) {
		layerSettings.set(newData.layer);
	}

	if (newData.extension) {
		extensionSettings.set(newData.extension);
	}
};
