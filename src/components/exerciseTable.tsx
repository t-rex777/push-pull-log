import clsx from "clsx";
import { memo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ExerciseName } from "./exerciseName";
import { WorkoutRow } from "./workoutRow";

interface IExerciseTableProps {
	index: number;
}
const TableHeader = memo(
	({
		children,
		className,
	}: { className?: string; children?: React.ReactNode }) => {
		return (
			<td
				className={clsx(
					"py-2 text-left text-sm font-normal text-white/60",
					className,
				)}
			>
				{children}
			</td>
		);
	},
);

const ExerciseTable = memo(
	({ index }: IExerciseTableProps): JSX.Element | null => {
		const form = useFormContext();

		const { fields: sets } = useFieldArray({
			control: form.control,
			name: `exercises.${index}.sets`,
		});

		return (
			<div className="space-y-4">
				<ExerciseName name={`exercises.${index}.name`} />

				<div className="overflow-x-auto">
					<table className="w-full border-separate border-spacing-0 p-4">
						<thead>
							<tr>
								<TableHeader className="w-16">SET</TableHeader>
								<TableHeader className="px-2">PREVIOUS</TableHeader>
								<TableHeader className="px-2">WEIGHT</TableHeader>
								<TableHeader className="px-2">REPS</TableHeader>
								<TableHeader className="w-16" />
							</tr>
						</thead>

						<tbody>
							{sets.map((set, setIndex) => (
								<WorkoutRow
									key={set.id}
									exerciseIndex={index}
									setIndex={setIndex}
								/>
							))}

							{/* <tr>
								<td />
								<td />
								<td />
								<td />
								<td className="flex items-center justify-end">
									<Button variant="outline" type="button">
										<PlusCircle />
										Add Set
									</Button>
								</td>
							</tr> */}
						</tbody>
					</table>
				</div>
			</div>
		);
	},
);

ExerciseTable.displayName = "ExerciseTable";

export { ExerciseTable };
