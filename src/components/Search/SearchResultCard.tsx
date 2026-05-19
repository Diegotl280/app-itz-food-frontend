import type { Restaurante } from "@/api/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dot, Clock } from "lucide-react";
import { Link } from "react-router";

type Props = {
    restaurante: Restaurante;
}

export default function SearchResultCard({ restaurante }: Props) {
    return (
        <Link
            to={`/detail/${restaurante._id}`}
            className="grid lg:grid-cols-[2fr_3fr] gap-4 group"
        >
            <AspectRatio ratio={16 / 6}>
                <img
                    src={restaurante.imageUrl}
                    className="rounded-md object-cover w-full h-full"
                    alt={restaurante.restauranteName}
                />
            </AspectRatio>
            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                    {restaurante.restauranteName}
                </h3>
                <div id="card-content" className="grid md:grid-cols-2 gap-2">
                    <div className="flex flex-row flex-wrap">
                        {restaurante.cuisines.map((item, index) => (
                            <span key={index} className="flex items-center">
                                <span>{item}</span>
                                {index < restaurante.cuisines.length - 1 && <Dot />}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3 flex-col">
                        <div className="flex items-center gap-1 text-green-600">
                            <Clock className="text-green-600" />
                            {restaurante.estimatedDeliveryTime} min
                        </div>
                        <div>
                            Costo de entrega: ${restaurante.deliveryPrice}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
