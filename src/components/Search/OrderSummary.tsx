import type { CartItem } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

type Props = {
    restauranteName: string;
    cartItems: CartItem[];
    deliveryPrice: number;
    removeFromCart: (cartItem: CartItem) => void;
}

export default function OrderSummary({
    restauranteName,
    cartItems,
    deliveryPrice,
    removeFromCart
}: Props) {
    const getTotalCost = () => {
        const totalInPesos = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );

        return totalInPesos + deliveryPrice;
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Tu orden</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((cartItem) => (
                    <div
                        key={cartItem._id}
                        className="flex justify-between"
                    >
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {cartItem.quantity}
                            </Badge>
                            {cartItem.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash
                                className="cursor-pointer text-red-500"
                                size={18}
                                onClick={() => removeFromCart(cartItem)}
                            />
                            ${cartItem.price * cartItem.quantity}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between my-2">
                    <span>Entrega</span>
                    <span>${deliveryPrice}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span>Restaurante</span>
                    <span>{restauranteName}</span>
                </div>
            </CardContent>
        </>
    );
}
