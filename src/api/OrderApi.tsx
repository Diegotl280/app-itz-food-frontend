import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CheckOutSessionRequest, CheckOutSessionResponse } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useCreateCheckOutSession() {
    const { getAccessTokenSilently } = useAuth0();

    const createCheckOutSessionRequest = async (
        checkOutSessionRequest: CheckOutSessionRequest
    ): Promise<CheckOutSessionResponse> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(
            API_BASE_URL + "/api/order/checkout/create-checkout-session",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkOutSessionRequest)
            }
        );

        if (!res.ok) {
            throw new Error("Error al crear la sesión de checkout");
        }

        return res.json();
    };

    return useMutation<
        CheckOutSessionResponse,
        Error,
        CheckOutSessionRequest
    >({
        mutationFn: createCheckOutSessionRequest,
        onError: (err) => {
            toast.error(err.toString());
        },
        onSuccess: () => {
            toast.success("Sesión de checkout en Stripe creada correctamente");
        }
    });
}
