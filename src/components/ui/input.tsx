import React from "react";

export default function Input(
	props: React.InputHTMLAttributes<HTMLInputElement>
) {
	return (
		<input
			{...props}
			className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-base 
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-green-500 
                  focus:border-transparent ${props.className || ""}`}
		/>
	);
}
