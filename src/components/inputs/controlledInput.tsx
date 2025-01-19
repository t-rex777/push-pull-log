import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { IControlledInputProps } from "types/workout";
import { Input } from "../ui/input";

const ControlledInput = memo(
	(
		props: IControlledInputProps & {
			type: "text" | "number";
		},
	): JSX.Element => {
		const form = useFormContext();

		if (form === null || !form.control) {
			return <Input {...props} className="w-full bg-transparent" />;
		}

		return (
			<Controller
				name="MyCheckbox"
				control={form.control}
				rules={{ required: true }}
				render={({ field }) => (
					<Input {...props} className="w-full bg-transparent" />
				)}
			/>
		);
	},
);

ControlledInput.displayName = "ControlledInput";

export { ControlledInput };
