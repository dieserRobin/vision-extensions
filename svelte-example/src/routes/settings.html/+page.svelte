<script lang="ts">
	import { layerSettings, extensionSettings, initializeStorage, updateStorage } from '$lib/storage';
	import type { LayerSettings, ExtensionSettings } from '$lib/storage';
	import { onMount } from 'svelte';

	let localLayerSettings: LayerSettings;
	let localExtensionSettings: ExtensionSettings;

	// Subscribe to stores
	$: $layerSettings, (localLayerSettings = $layerSettings);
	$: $extensionSettings, (localExtensionSettings = $extensionSettings);

	onMount(() => {
		const cleanup = initializeStorage();
		document.body.classList.add('settings');

		return cleanup;
	});

	const updateSettings = () => {
		updateStorage({
			layer: { key: 'value' },
			extension: { feature: 'enabled' }
		});
	};

	const updatePoints = (e: Event) => {
		const target = e.target as HTMLInputElement;
		updateStorage({
			layer: { points: Number(target.value) }
		});
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3 p-3">
	<span class="text-lg text-white">Punkte</span>
	<input
		type="number"
		value={localLayerSettings?.points ?? 0}
		on:change={updatePoints}
		class="w-max rounded-lg bg-white/25 px-4 py-2 text-lg text-white"
	/>
</div>
