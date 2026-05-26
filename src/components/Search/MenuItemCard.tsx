import type { MenuItem } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
}

export default function MenuItemCard({ menuItem, addToCart }: Props) {
    return (
        <Card
            className="cursor-pointer hover:border-orange-500 hover:shadow-md"
            onClick={addToCart}
        >
            <CardContent className="font-bold">
                <div className="flex justify-between gap-4">
                    <span>{menuItem.name}</span>
                    <span>${menuItem.price}</span>
                </div>
            </CardContent>
        </Card>
    );
}
