import { BottomNav } from "@/components/bottomNav";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="flex min-h-screen flex-col bg-black text-white">
			<main className="flex-1 pb-16">
				<Outlet />
			</main>
			<BottomNav />
			<TanStackRouterDevtools position="top-right" />
		</div>
	);
}
