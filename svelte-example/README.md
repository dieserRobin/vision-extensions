# Build a vision extension using SvelteKit

This is a simple example of how to build a vision extension using SvelteKit.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

In this example, `vite-plugin-mkcert` is used to generate a local development certificate, which is required to test the extension in the Vision editor.
After starting the dev server, you need to create a new version of the extension in Vision and set the local url.

## Building

To create a production version of your app:

```bash
npm run build
```

This will create a `build` directory with a zip file inside. You can then upload this zip to Vision.
