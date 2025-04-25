import React, { useState, useMemo } from "react";
import Card, { CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import FormField from "./components/ui/FormField";
import Input from "./components/ui/input";

export default function TCOCalculator() {
	const [data, setData] = useState({
		purchasePrice: "",
		interestRate: "",
		years: "",
		hoursPerYear: "",
		fuelConsumption: "",
		fuelPrice: "",
		servicePerYear: "",
		insurancePerYear: "",
		resalePercent: "",
	});

	const handleChange = (field) => (e) => {
		const val = e.target.value;
		setData((prev) => ({
			...prev,
			[field]: val === "" ? "" : e.target.valueAsNumber,
		}));
	};

	const result = useMemo(() => {
		const {
			purchasePrice,
			interestRate,
			years,
			hoursPerYear,
			fuelConsumption,
			fuelPrice,
			servicePerYear,
			insurancePerYear,
			resalePercent,
		} = data;

		if (
			[
				purchasePrice,
				interestRate,
				years,
				hoursPerYear,
				fuelConsumption,
				fuelPrice,
				servicePerYear,
				insurancePerYear,
				resalePercent,
			].some((v) => v === "" || isNaN(v))
		) {
			return null;
		}

		const financingCost = purchasePrice * (interestRate / 100) * years;
		const serviceCost = servicePerYear * years;
		const insuranceCost = insurancePerYear * years;
		const fuelCost = fuelConsumption * fuelPrice * hoursPerYear * years;
		const resaleValue = purchasePrice * (resalePercent / 100);

		const totalCost =
			purchasePrice +
			financingCost +
			serviceCost +
			insuranceCost +
			fuelCost -
			resaleValue;
		const totalHours = hoursPerYear * years;
		const costPerHour = totalCost / totalHours;

		return {
			totalCost: Math.round(totalCost),
			costPerHour: Math.round(costPerHour * 100) / 100,
		};
	}, [data]);

	const fields = [
		{ label: "Købspris (DKK)", field: "purchasePrice", step: 10000 },
		{ label: "Rente (% pr. år)", field: "interestRate", step: 0.1 },
		{ label: "Ejertid (år)", field: "years", step: 1 },
		{ label: "Driftstimer pr. år", field: "hoursPerYear", step: 10 },
		{ label: "Brændstof (l/t)", field: "fuelConsumption", step: 0.1 },
		{ label: "Dieselpris (DKK/l)", field: "fuelPrice", step: 0.1 },
		{ label: "Serviceløn pr. år (DKK)", field: "servicePerYear", step: 1000 },
		{ label: "Forsikring pr. år (DKK)", field: "insurancePerYear", step: 1000 },
		{ label: "Restværdi (% af købspris)", field: "resalePercent", step: 1 },
	];

	return (
		<form onSubmit={(e) => e.preventDefault()} className="space-y-8">
			<Card className="bg-white rounded-lg shadow p-6">
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{fields.map(({ label, field, step }) => (
						<FormField key={field} label={label}>
							<Input
								id={field}
								type="number"
								step={step}
								value={data[field]}
								onChange={handleChange(field)}
								className="w-full"
							/>
						</FormField>
					))}
				</CardContent>
				<div className="pt-4">
					<Button
						type="submit"
						className="bg-green-700 hover:bg-green-800 text-white font-medium rounded transition px-6 py-2"
					>
						Beregn
					</Button>
				</div>
			</Card>

			{result && (
				<Card className="bg-white rounded-lg shadow p-6">
					<CardContent>
						<h2 className="text-2xl font-semibold mb-4">Resultat</h2>
						<p className="mb-2">
							<span className="font-medium">Samlet TCO:</span>{" "}
							<span className="font-bold">
								{result.totalCost.toLocaleString()} DKK
							</span>
						</p>
						<p>
							<span className="font-medium">Pris pr. driftstime:</span>{" "}
							<span className="font-bold">
								{result.costPerHour.toLocaleString()} DKK
							</span>
						</p>
					</CardContent>
				</Card>
			)}
		</form>
	);
}
