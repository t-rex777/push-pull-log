import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(workout)/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(workout)/new"!</div>;
}
