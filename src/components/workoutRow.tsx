import { memo } from "react";
import { ControlledCheckbox } from "./inputs/controlledCheckbox";
import { ControlledInput } from "./inputs/controlledInput";

interface IWorkoutRowProps {
	sequence: number;
}

const WorkoutRow = memo(({ sequence }: IWorkoutRowProps): JSX.Element => {
	return (
		<tr>
			<td className="py-3 text-sm">{sequence}</td>
			<td className="px-4 py-3">
				<ControlledInput
					type="text"
					placeholder="--"
					name="previous"
					readOnly
				/>
			</td>

			<td className="px-4 py-3">
				<ControlledInput type="number" placeholder="--" name="weight" />
			</td>
			<td className="px-4 py-3">
				<ControlledInput type="number" placeholder="--" name="reps" />
			</td>

			<td className="py-3 px-4">
				<ControlledCheckbox name="completed" />
			</td>
		</tr>
	);
});

WorkoutRow.displayName = "WorkoutRow";

export { WorkoutRow };
