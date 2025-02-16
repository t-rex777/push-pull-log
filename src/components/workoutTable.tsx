import { DEFAULT_EXERCISE } from "@/constants/default";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlocker } from "@tanstack/react-router";
import { Dumbbell, PlusCircle } from "lucide-react";
import { memo, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { ExerciseTable } from "./exerciseTable";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

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

const WorkoutTable = memo((): JSX.Element => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			exercises: [
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
			],
		},
	});

	// prevents the user from accidentally leaving the page
	useBlocker({
		shouldBlockFn: () => {
			if (form.formState.isDirty) {
				return false;
			}

			// todo: add it back
			return false;
			// const shouldLeave = confirm("Are you sure you want to leave?");
			// return !shouldLeave;
		},
	});

	const { fields, append } = useFieldArray({
		control: form.control,
		name: "exercises",
	});

	const handleSubmit = useCallback((formData: Record<string, unknown>) => {
		console.log({ formData });
	}, []);

	const handleAddExercise = useCallback(() => {
		append(DEFAULT_EXERCISE);
	}, [append]);

	return (
		<Form {...form}>
			<form
				className="space-y-8"
				onSubmit={form.handleSubmit(handleSubmit)}
				onChange={(props) => console.log(props)}
			>
				{fields.map((exercise, exerciseIndex) => (
					<ExerciseTable index={exerciseIndex} key={exercise.id} />
				))}

				<div className="flex flex-col gap-4">
					<Button variant="outline" type="button" onClick={handleAddExercise}>
						<PlusCircle />
						Add Exercise
					</Button>

					<Button variant="outline" type="submit">
						<Dumbbell />
						Finish Workout
					</Button>
				</div>
			</form>
		</Form>
	);
});

WorkoutTable.displayName = "WorkoutTable";

export { WorkoutTable };
