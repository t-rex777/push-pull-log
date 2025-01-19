import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import type { IExercise } from "types/workout";
import { z } from "zod";
import { Form } from "./ui/form";
import { WorkoutRow } from "./workoutRow";

interface IWorkoutTableProps {
	exercises: IExercise[];
}
const formSchema = z.object({
	exercises: z.array(
		z.object({
			name: z.string(),
			sets: z.array(
				z.object({
					completed: z.boolean(),
					reps: z.number(),
					weight: z.number(),
				}),
			),
		}),
	),
});

const WorkoutTable = memo(({ exercises }: IWorkoutTableProps): JSX.Element => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			exercises: [],
		},
	});

	const handleSubmit = useCallback((formData: Record<string, unknown>) => {
		console.log({ formData });
	}, []);

	return (
		<Form {...form}>
			<form
				className="space-y-8"
				onSubmit={form.handleSubmit(handleSubmit)}
				onChange={(props) => console.log(props)}
			>
				{exercises.map((exercise, exerciseIndex) => (
					<div key={exerciseIndex.toString()} className="space-y-4">
						<h2 className="text-xl font-semibold">{exercise.name}</h2>

						<div className="overflow-x-auto">
							<table className="w-full border-separate border-spacing-0">
								<thead>
									<tr>
										<th className="w-16 py-2 text-left text-sm font-normal text-white/60">
											SET
										</th>
										<th className="px-4 py-2 text-left text-sm font-normal text-white/60">
											PREVIOUS
										</th>
										<th className="px-4 py-2 text-left text-sm font-normal text-white/60">
											WEIGHT
										</th>
										<th className="px-4 py-2 text-left text-sm font-normal text-white/60">
											REPS
										</th>
										<th className="w-16 py-2 text-left text-sm font-normal text-white/60" />
									</tr>
								</thead>

								<tbody>
									{exercise.sets.map((set, setIndex) => (
										<WorkoutRow
											key={(setIndex + 1).toString()}
											sequence={setIndex + 1}
										/>
									))}
								</tbody>
							</table>
						</div>
					</div>
				))}
			</form>
		</Form>
	);
});

WorkoutTable.displayName = "WorkoutTable";

export { WorkoutTable };
