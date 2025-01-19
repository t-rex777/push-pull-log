import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({}),
		react(),
		VitePWA({
			registerType: "autoUpdate",
			strategies: "generateSW",
			injectRegister: "auto",
			manifest: {
				name: "My PWA App",
				short_name: "PWA App",
				description: "My Progressive Web App",
				theme_color: "#ffffff",
				icons: [
					{
						src: "icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
			},
			workbox: {
				globPatterns: [
					"**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot,json}",
					"index.html",
				],
				navigateFallback: "index.html",
				navigateFallbackAllowlist: [/^\/$/],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.*/i,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							networkTimeoutSeconds: 5,
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
				cleanupOutdatedCaches: true,
			},
			devOptions: {
				enabled: true,
				type: "module",
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
