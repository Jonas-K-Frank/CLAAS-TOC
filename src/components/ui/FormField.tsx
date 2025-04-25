// src/components/ui/FormField.tsx
import { ReactNode } from "react";

interface FormFieldProps {
	label: string;
	children: React.ReactNode;
}

export default function FormField({ label, children }: FormFieldProps) {
	return (
		<div className="flex flex-col">
			<label className="mb-2 text-sm font-semibold text-gray-700">
				{label}
			</label>
			{children}
		</div>
	);
}
