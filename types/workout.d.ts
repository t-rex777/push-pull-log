export interface IExerciseSet {
	reps: number;
	weight: number;
	completed: boolean;
}

export interface IExercise {
	name: string;
	sets: IExerciseSet[];
}

export interface IControlledInputProps {
	name: string;
	placeholder?: string;
	readOnly?: boolean;
	onChange?: FormEventHandler<HTMLButtonElement> | undefined;
}
