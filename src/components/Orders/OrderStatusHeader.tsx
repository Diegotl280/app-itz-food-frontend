"use client";

import type { Order, OrderStatusInfo } from "@/api/types";
import { Progress } from "@/components/ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";
import OrderStatusMessage from "./OrderStatusMessage";

type Props = {
    order: Order;
};

export default function OrderStatusHeader({ order }: Props) {
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);
        created.setMinutes(
            created.getMinutes() + order.restaurante.estimatedDeliveryTime
        );

        const hours = created.getHours();
        const minutes = created.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderStatusInfo = (): OrderStatusInfo => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) ||
            ORDER_STATUS[0]
        );
    };

    const orderStatusInfo = getOrderStatusInfo();

    return (
        <>
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Estado de la orden: {orderStatusInfo.label}
                </h1>
                <div className="md:justify-self-center">
                    <OrderStatusMessage
                        status={order.status}
                        label={orderStatusInfo.label}
                    />
                </div>
                <div className="text-xl font-bold md:justify-self-end">
                    Entrega esperada: {getExpectedDelivery()}
                </div>
            </div>
            <Progress
                value={orderStatusInfo.progressValue}
                className="[&_[data-slot=progress-indicator]]:bg-orange-500 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-orange-100"
            />
        </>
    );
}
