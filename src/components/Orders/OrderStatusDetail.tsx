import type { Order } from "@/api/types";
import { Separator } from "@/components/ui/separator";

type Props = {
    order: Order;
};

export default function OrderStatusDetail({ order }: Props) {
    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold">Entregar a:</span>
                <span>{order.deliveryDetails.name}</span>
                <span>
                    {order.deliveryDetails.address}, {order.deliveryDetails.city}
                </span>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
                <span className="font-bold">Tu pedido:</span>
                {order.cartItems.map((item) => (
                    <span key={item.menuItemId}>
                        {item.name} x {item.quantity}
                    </span>
                ))}
            </div>
            <Separator />
            <div className="flex flex-col">
                <span className="font-bold">Total:</span>
                <span>${(order.totalAmount / 100).toFixed(2)}</span>
            </div>
        </div>
    );
}
