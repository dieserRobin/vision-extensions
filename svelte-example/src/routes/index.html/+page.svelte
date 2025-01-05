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

		return cleanup;
	});
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div class="w-max rounded-lg bg-white/25 px-4 py-2 text-lg text-white">
		{localLayerSettings?.points ?? 0}
		Punkte
	</div>
</div>
