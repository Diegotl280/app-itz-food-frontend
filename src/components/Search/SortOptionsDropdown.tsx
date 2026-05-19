import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const SORT_OPTIONS = [
    { label: "Mejor Coincidencia", value: "bestMatch" },
    { label: "Tiempo de Entrega", value: "estimatedDeliveryTime" },
    { label: "Precio de Entrega", value: "deliveryPrice" },
];

type Props = {
    sortOption: string;
    onChange: (value: string) => void;
}

export default function SortOptionsDropdown({ onChange, sortOption }: Props) {
    const selectedSortLabel =
        SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
        SORT_OPTIONS[0].label;

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <Button variant="outline" className="w-full">
                        Ordenar por: {selectedSortLabel}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            className="cursor-pointer"
                            onClick={() => onChange(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
