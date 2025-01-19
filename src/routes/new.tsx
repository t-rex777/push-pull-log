import LiveTimeCounter from "@/components/liveCounter";
import { WorkoutTable } from "@/components/workoutTable";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { IExercise } from "types/workout";

export const Route = createFileRoute("/new")({
	component: RouteComponent,
});

function RouteComponent() {
	// should be a form
	const [exercises, setExercises] = useState<IExercise[]>([
		{
			name: "Pull ups",
			sets: [
				{
					completed: true,
					reps: 10,
					weight: 10,
				},
			],
		},
	]);

	return (
		<div className="min-h-screen bg-black p-4">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Back Day</h1>
				<LiveTimeCounter />
			</div>

			<WorkoutTable exercises={exercises} />
		</div>
	);
}
