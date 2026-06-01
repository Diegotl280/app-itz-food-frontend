import { useGetOrders } from "@/api/OrderApi";
import LoadingButton from "@/components/LoadingButton";
import OrderStatusDetail from "@/components/Orders/OrderStatusDetail";
import OrderStatusHeader from "@/components/Orders/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function OrderStatusPage() {
    const { data: orders, isLoading } = useGetOrders();

    const getSecureImageUrl = (imageUrl: string) => {
        return imageUrl.replace(/^http:\/\//, "https://");
    };

    if (isLoading) {
        return <LoadingButton />;
    }

    if (!orders || orders.length === 0) {
        return <span>No hay órdenes para mostrar</span>;
    }

    return (
        <div className="space-y-10">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="space-y-5 rounded-lg border p-5"
                >
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 9}>
                            <img
                                src={getSecureImageUrl(order.restaurante.imageUrl)}
                                className="h-full w-full rounded-md object-cover"
                                alt={order.restaurante.restauranteName}
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    );
}
