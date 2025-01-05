import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import zipPack from 'vite-plugin-zip-pack';

import path from 'path';
const cwd = process.cwd();

export default defineConfig({
	server: {
		https: true,
		proxy: {},
		port: 3000
	},
	plugins: [
		sveltekit(),
		mkcert(),
		zipPack({
			inDir: path.join(cwd, 'build'),
			outDir: path.join(cwd, 'build')
		})
	]
});
