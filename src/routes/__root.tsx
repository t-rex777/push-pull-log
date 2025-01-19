import { BottomNav } from "@/components/bottomNav";
import { OfflineStatus } from "@/components/offlineStatus";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="flex min-h-screen flex-col bg-black text-white">
			<OfflineStatus />

			<main className="flex-1 pb-16">
				<Outlet />
			</main>

			{/* todo: hide bottom nav when workout is started */}
			<BottomNav />
			{/* <TanStackRouterDevtools position="top-right" /> */}
		</div>
	);
}
