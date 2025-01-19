import { memo } from "react";
import { ControlledCheckbox } from "./inputs/controlledCheckbox";
import { ControlledInput } from "./inputs/controlledInput";

interface IWorkoutRowProps {
	exerciseIndex: number;
	setIndex: number;
}

const WorkoutRow = memo(
	({ exerciseIndex, setIndex }: IWorkoutRowProps): JSX.Element => {
		return (
			<tr>
				<td className="py-3 text-sm">{setIndex + 1}</td>
				<td className="px-2 py-3">
					<ControlledInput
						type="text"
						placeholder="--"
						name={`exercises.${exerciseIndex}.sets.${setIndex}.previous`}
						readOnly
					/>
				</td>

				<td className="px-2 py-3">
					<ControlledInput
						type="number"
						placeholder="--"
						name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
					/>
				</td>
				<td className="px-2 py-3">
					<ControlledInput
						type="number"
						placeholder="--"
						name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
					/>
				</td>

				<td className="px-2 py-3">
					<ControlledCheckbox
						name={`exercises.${exerciseIndex}.sets.${setIndex}.completed`}
					/>
				</td>
			</tr>
		);
	},
);

WorkoutRow.displayName = "WorkoutRow";

export { WorkoutRow };
