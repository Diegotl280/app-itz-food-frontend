import type { Order, OrderStatus } from "@/api/types";
import { useUpdateRestauranteOrder } from "@/api/RestauranteApi";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Props = {
    order: Order;
};

export default function OrderItemsCard({ order }: Props) {
    const updateRestauranteOrder = useUpdateRestauranteOrder();

    const getTime = () => {
        const created = new Date(order.createdAt);
        const hours = created.getHours();
        const minutes = created.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const handleStatusChange = (newStatus: OrderStatus) => {
        updateRestauranteOrder.mutate({
            orderId: order._id,
            status: newStatus,
        });
    };

    const getStatusLabel = (status: OrderStatus) => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === status)
                ?.label || status
        );
    };

    return (
        <Card className="mb-2">
            <CardHeader>
                <CardTitle className="grid gap-4 md:grid-cols-4">
                    <div>
                        Cliente
                        <span className="block font-normal text-muted-foreground">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Dirección
                        <span className="block font-normal text-muted-foreground">
                            {order.deliveryDetails.address}, {order.deliveryDetails.city}
                        </span>
                    </div>
                    <div>
                        Hora
                        <span className="block font-normal text-muted-foreground">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total
                        <span className="block font-normal text-muted-foreground">
                            ${(order.totalAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-5 pt-6">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((cartItem) => (
                        <span key={cartItem.menuItemId}>
                            <Badge variant="outline" className="mr-2">
                                {cartItem.quantity}
                            </Badge>
                            {cartItem.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>¿Cuál es el estatus de la orden?</Label>
                    <Select
                        value={order.status}
                        onValueChange={(value) =>
                            handleStatusChange(value as OrderStatus)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue>
                                {getStatusLabel(order.status)}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {ORDER_STATUS.map((orderStatus) => (
                                <SelectItem
                                    key={orderStatus.value}
                                    value={orderStatus.value}
                                >
                                    {orderStatus.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
