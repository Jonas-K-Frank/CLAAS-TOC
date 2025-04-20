import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TCOCalculator() {
	const [data, setData] = useState({
		purchasePrice: 1500000,
		interestRate: 4, // % pr. år
		years: 5,
		hoursPerYear: 900,
		fuelConsumption: 22, // liter/time
		fuelPrice: 10, // DKK/l
		servicePerYear: 35000,
		insurancePerYear: 12000,
		resalePercent: 35, // % af købspris
	});

	// Ensartet handler der bruger valueAsNumber så man kan skrive frit i feltet
	const handleChange = (field) => (e) => {
		const val = e.target.value;
		// Tillad tomt felt – brugeren sletter for at skrive nyt
		if (val === "") {
			setData({ ...data, [field]: "" });
			return;
		}
		setData({ ...data, [field]: e.target.valueAsNumber });
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

		// Simpelt input‑guard – hvis ét felt er tomt, returner 0
		if (Object.values(data).some((v) => v === "" || isNaN(v))) {
			return { totalCost: 0, costPerHour: 0 };
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
		<div className="container mx-auto p-4 max-w-3xl">
			<h1 className="text-3xl font-bold mb-6">CLAAS TCO‑kalkulator</h1>

			<Card className="mb-6 p-6 space-y-6">
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{fields.map(({ label, field, step }) => (
						<div key={field} className="flex flex-col space-y-1">
							<Label htmlFor={field}>{label}</Label>
							<Input
								id={field}
								type="number"
								step={step}
								value={data[field] === "" ? "" : data[field]}
								onChange={handleChange(field)}
							/>
						</div>
					))}
				</CardContent>
			</Card>

			<Card className="p-6">
				<CardContent className="space-y-3">
					<h2 className="text-2xl font-semibold">Resultat</h2>
					<p className="text-lg">
						Samlet TCO:{" "}
						<span className="font-bold">
							{result.totalCost.toLocaleString()} DKK
						</span>
					</p>
					<p className="text-lg">
						Pris pr. driftstime:{" "}
						<span className="font-bold">
							{result.costPerHour.toLocaleString()} DKK
						</span>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
