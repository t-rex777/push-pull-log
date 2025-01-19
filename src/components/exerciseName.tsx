import { CheckIcon, Edit2Icon } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { ControlledInput } from "./inputs/controlledInput";

interface IExerciseNameProps {
	name: string;
}

const ExerciseName = memo(({ name }: IExerciseNameProps): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [editMode, setEditMode] = useState(false);

	const handleEdit = () => {
		setEditMode(true);
		inputRef.current?.focus();
	};

	const handleDone = () => {
		setEditMode(false);
	};

	useEffect(() => {
		if (editMode) {
			inputRef.current?.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					setEditMode(false);
				}
			});
		}

		return () => {
			inputRef.current?.removeEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					setEditMode(false);
				}
			});
		};
	}, [editMode]);

	return (
		<div className="flex items-center gap-2">
			<ControlledInput
				onBlur={handleDone}
				ref={inputRef}
				readOnly={!editMode}
				name={name}
				type="text"
				className={editMode ? "w-full" : "w-fit"}
			/>

			{!editMode && <Edit2Icon size={16} onClick={handleEdit} />}
			{editMode && <CheckIcon size={16} onClick={handleDone} />}
		</div>
	);
});

ExerciseName.displayName = "ExerciseName";

export { ExerciseName };
