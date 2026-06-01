import type { OrderStatusInfo } from "@/api/types";

export const ORDER_STATUS: OrderStatusInfo[] = [
    { label: "Recibido", value: "placed", progressValue: 0 },
    { label: "Esperando confirmación del restaurante", value: "paid", progressValue: 25 },
    { label: "En progreso", value: "inProgress", progressValue: 50 },
    { label: "En reparto", value: "outForDelivery", progressValue: 75 },
    { label: "Entregada", value: "delivered", progressValue: 100 },
];
