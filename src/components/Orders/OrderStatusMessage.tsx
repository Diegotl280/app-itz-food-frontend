import type { OrderStatus } from "@/api/types";
import {
    FaCheckCircle,
    FaClipboardList,
    FaClock,
    FaTimesCircle,
    FaTruck,
} from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";

type Props = {
    status: OrderStatus;
    label: string;
};

export default function OrderStatusMessage({ status, label }: Props) {
    const statusStyles: Record<OrderStatus, string> = {
        placed: "text-rose-500",
        paid: "text-orange-500",
        inProgress: "text-yellow-500",
        outForDelivery: "text-teal-500",
        delivered: "text-green-600",
    };

    const colorClass = statusStyles[status] || "text-red-500";
    const iconStyles = `${colorClass} size-5`;
    const wrapperStyles = `flex items-center gap-2 text-xl font-bold ${colorClass}`;

    if (status === "placed") {
        return (
            <span className={wrapperStyles}>
                <FaClipboardList className={iconStyles} />
                {label}
            </span>
        );
    }

    if (status === "paid") {
        return (
            <span className={wrapperStyles}>
                <FaClock className={iconStyles} />
                {label}
            </span>
        );
    }

    if (status === "inProgress") {
        return (
            <span className={wrapperStyles}>
                <FaKitchenSet className={iconStyles} />
                {label}
            </span>
        );
    }

    if (status === "outForDelivery") {
        return (
            <span className={wrapperStyles}>
                <FaTruck className={iconStyles} />
                {label}
            </span>
        );
    }

    if (status === "delivered") {
        return (
            <span className={wrapperStyles}>
                <FaCheckCircle className={iconStyles} />
                {label}
            </span>
        );
    }

    return (
        <span className={wrapperStyles}>
            <FaTimesCircle className={iconStyles} />
            Estado inválido
        </span>
    );
}
