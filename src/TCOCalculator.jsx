import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TCOCalculator() {
  const [data, setData] = useState({
    purchasePrice: 1500000,
    interestRate: 4,
    years: 5,
    hoursPerYear: 900,
    fuelConsumption: 22,
    fuelPrice: 10,
    servicePerYear: 35000,
    insurancePerYear: 12000,
    resalePercent: 35
  });

  const handleChange = field => e => {
    setData({ ...data, [field]: Number(e.target.value) });
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
      resalePercent
    } = data;

    const capitalCost = purchasePrice;
    const financingCost = (purchasePrice * (interestRate / 100)) * years;
    const serviceCost = servicePerYear * years;
    const insuranceCost = insurancePerYear * years;
    const fuelCost = fuelConsumption * fuelPrice * hoursPerYear * years;
    const resaleValue = purchasePrice * (resalePercent / 100);

    const totalCost = capitalCost + financingCost + serviceCost + insuranceCost + fuelCost - resaleValue;
    const totalHours = hoursPerYear * years;
    const costPerHour = totalCost / totalHours;

    return {
      totalCost: Math.round(totalCost),
      costPerHour: Math.round(costPerHour * 100) / 100
    };
  }, [data]);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">CLAAS TCO‑kalkulator</h1>

      <Card className="mb-6 p-4 space-y-4">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Købspris (DKK)", field: "purchasePrice" },
            { label: "Rente (% pr. år)", field: "interestRate" },
            { label: "Ejertid (år)", field: "years" },
            { label: "Driftstimer pr. år", field: "hoursPerYear" },
            { label: "Brændstof (l/t)", field: "fuelConsumption" },
            { label: "Dieselpris (DKK/l)", field: "fuelPrice" },
            { label: "Serviceløn pr. år (DKK)", field: "servicePerYear" },
            { label: "Forsikring pr. år (DKK)", field: "insurancePerYear" },
            { label: "Restværdi (% af købspris)", field: "resalePercent" }
          ].map(({ label, field }) => (
            <div key={field} className="flex flex-col space-y-1">
              <Label htmlFor={field}>{label}</Label>
              <Input
                id={field}
                type="number"
                value={data[field]}
                onChange={handleChange(field)}
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Resultat</h2>
          <p className="text-lg">
            Samlet TCO: <span className="font-bold">{result.totalCost.toLocaleString()} DKK</span>
          </p>
          <p className="text-lg">
            Pris pr. driftstime: <span className="font-bold">{result.costPerHour.toLocaleString()} DKK</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
