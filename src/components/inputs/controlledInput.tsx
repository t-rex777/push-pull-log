import clsx from "clsx";
import { forwardRef, memo, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { IControlledInputProps } from "types/workout";
import { Input } from "../ui/input";

const ControlledInput = memo(
	forwardRef(
		(
			props: IControlledInputProps & {
				type: "text" | "number";
			},
			ref,
		): JSX.Element => {
			const form = useFormContext();

			const className = useMemo(() => {
				return clsx(
					"w-full bg-transparent",
					props.readOnly
						? "cursor-not-allowed border-0 ml-[1px] !focus:ring-0"
						: "",
				);
			}, [props.readOnly]);

			if (form === null || !form.control) {
				return (
					<Input
						{...props}
						// @ts-expect-error fix type later
						ref={ref}
						className={className}
					/>
				);
			}

			return (
				<Controller
					name={props.name}
					control={form.control}
					rules={{ required: true }}
					render={({ field }) => (
						<Input
							{...props}
							{...field}
							// @ts-expect-error fix type later
							ref={ref}
							className={className}
						/>
					)}
				/>
			);
		},
	),
);

ControlledInput.displayName = "ControlledInput";

export { ControlledInput };
