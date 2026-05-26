import type { Restaurante } from "@/api/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Dot } from "lucide-react";

type Props = {
    restaurante: Restaurante;
}

export default function RestaurantInfo({ restaurante }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {restaurante.restauranteName}
                </CardTitle>
                <CardDescription>
                    {restaurante.city}, {restaurante.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap">
                {restaurante.cuisines.map((cuisine, index) => (
                    <span key={cuisine} className="flex items-center">
                        <span>{cuisine}</span>
                        {index < restaurante.cuisines.length - 1 && <Dot />}
                    </span>
                ))}
            </CardContent>
        </Card>
    );
}
