import LiveTimeCounter from "@/components/liveCounter";
import { WorkoutTable } from "@/components/workoutTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-black p-4">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Back Day</h1>
				<LiveTimeCounter />
			</div>

			<WorkoutTable />
		</div>
	);
}
