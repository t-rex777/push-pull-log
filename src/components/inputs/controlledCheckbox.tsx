import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { IControlledInputProps } from "types/workout";
import { Checkbox } from "../ui/checkbox";

const ControlledCheckbox = memo((props: IControlledInputProps): JSX.Element => {
	const form = useFormContext();

	if (form === null || !form.control) {
		return <Checkbox {...props} />;
	}

	return (
		<Controller
			name="MyCheckbox"
			control={form.control}
			rules={{ required: true }}
			render={({ field }) => <Checkbox {...props} />}
		/>
	);
});

ControlledCheckbox.displayName = "ControlledCheckbox";

export { ControlledCheckbox };
