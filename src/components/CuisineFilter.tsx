import type { ChangeEvent } from "react";
import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

type Props = {
    selectedCuisines: string[];
    onChange: (cuisines: string[]) => void;
    isExpanded: boolean;
    onExpandedClick: () => void;
}

export default function CuisineFilter({
    selectedCuisines,
    onChange,
    isExpanded,
    onExpandedClick,
}: Props) {
    const handleCuisinesReset = () => onChange([]);

    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;

        const newCuisinesList = isChecked
            ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

        onChange(newCuisinesList);
    };

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filtrar por tipo de cocina</div>
                <div
                    onClick={handleCuisinesReset}
                    className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
                >
                    Limpiar filtros
                </div>
            </div>
            {cuisineList
                .slice(0, isExpanded ? undefined : 7)
                .map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine);
                    return (
                        <div key={cuisine} className="flex">
                            <input
                                id={`cuisine_${cuisine}`}
                                type="checkbox"
                                className="hidden"
                                value={cuisine}
                                checked={isSelected}
                                onChange={handleCuisinesChange}
                            />
                            <Label
                                htmlFor={`cuisine_${cuisine}`}
                                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                                    isSelected
                                        ? "border border-green-600 text-green-600"
                                        : "border border-slate-300"
                                }`}
                            >
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cuisine}
                            </Label>
                        </div>
                    );
                })}
            <Button
                onClick={onExpandedClick}
                variant="link"
                className="mt-4 flex-1"
            >
                {isExpanded ? (
                    <span className="flex flex-row items-center">
                        Ver menos <ChevronUp />
                    </span>
                ) : (
                    <span className="flex flex-row items-center">
                        Ver más <ChevronDown />
                    </span>
                )}
            </Button>
        </>
    );
}
