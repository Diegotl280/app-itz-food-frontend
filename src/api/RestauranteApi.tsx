import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'sonner';
import type {
    Order,
    Restaurante,
    RestauranteSearchResponse,
    UpdateOrderStatusRequest,
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


//Hook para obtener los datos de un restaurante del backend
export function useGetRestaurante() {
    const { getAccessTokenSilently } = useAuth0();

    //Función para obtener un Restaurante
    const getRestauranteRequest = async (): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error("Error al obtener los datos del restaurante")
        }
        return res.json()
    } //Fin de getUserRequest

    return useQuery({
        queryKey: ['restaurante'],
        queryFn: getRestauranteRequest,
    }); // Fin de return
}//Fin de useGetRestaurante

// Hook para obtener los datos de un restaurante por ID
export function useGetRestauranteById(restauranteId?: string) {
    const getRestauranteByIdRequest = async (): Promise<Restaurante> => {
        const res = await fetch(API_BASE_URL + `/api/restaurante/${restauranteId}`);

        if (!res.ok) {
            throw new Error("Error al obtener los datos del restaurante")
        }

        return res.json()
    }

    return useQuery({
        queryKey: ['restaurante', restauranteId],
        queryFn: getRestauranteByIdRequest,
        enabled: !!restauranteId,
    });
}//Fin de useGetRestauranteById

// Hook para crear un restaurante
export function useCreateRestaurante() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    //Función para crear un restaurante en el backend
    const createRestauranteRequest = async (restaurantFormData: FormData): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaurantFormData
        });
        if (!res.ok) {
            throw new Error("Error al crear el restaurante")
        }
        return res.json()

    } //Fin de createRestauranteRequest

    return useMutation({
        mutationFn: (restaurante: FormData) => createRestauranteRequest(restaurante),
        onError: (err) => {
            toast.error("Error al crear el restaurante");
            console.log(err);
            throw new Error("Error al crear el restaurante")
        },
        onSuccess: (restaurante) => {
            toast.success("Restaurante creado correctamente");
            console.log(restaurante)
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        },
    }) // Fin de return

} //Fin de useCreateRestaurante

// Hook para actualizar un restaurante
export function useUpdateRestaurante() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    // Función para actualizar un restaurante
    const updateRestauranteRequest = async (restauranteFormData: FormData): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
            body: restauranteFormData
        });
        if (!res.ok) {
            throw new Error("Error al actualizar el Restaurante")
        }
        return res.json()
    } // Fin de updateRestauranteRequest

    return useMutation({
        mutationFn: (formData: FormData) => updateRestauranteRequest(formData),
        onError: (err) => {
            console.log(err);
            toast.error(err.toString());
            throw new Error("Error al actualizar el Restaurante");
        },
        onSuccess: () => {
            toast.success("Restaurante actualizado")
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        }
    }) //Fin de return
} // Fin de useUpdateRestaurante

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
}

// Función para buscar restaurantes
export const useSearchRestaurantes = (searchState: SearchState, city?: string) => {
    const getSearchRestauranteRequest = async (): Promise<RestauranteSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));
        params.set("sortOptions", searchState.sortOption);

        const res = await fetch(
            `${API_BASE_URL}/api/restaurante/search/${city}?${params.toString()}`
        );

        if (!res.ok) {
            throw new Error("Error al buscar un restaurante");
        }

        return res.json();
    }; // Fin de getSearchRestauranteRequest

    return useQuery({
        queryKey: ["searchRestaurantes", city, searchState],
        queryFn: getSearchRestauranteRequest,
        enabled: !!city,
    }); // Fin de return
}; // Fin de useSearchRestaurantes

export function useGetRestaurantOrders() {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + "/api/order/restaurant", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Error al obtener las órdenes del restaurante");
        }

        return res.json();
    };

    return useQuery({
        queryKey: ["restaurantOrders"],
        queryFn: getRestaurantOrdersRequest,
        refetchInterval: 5000,
    });
}

export function useUpdateRestauranteOrder() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const updateRestauranteOrderRequest = async (
        updateStatusOrderRequest: UpdateOrderStatusRequest
    ): Promise<Order> => {
        const accessToken = await getAccessTokenSilently();

        const res = await fetch(
            API_BASE_URL + `/api/order/${updateStatusOrderRequest.orderId}/status`,
            {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: updateStatusOrderRequest.status })
            }
        );

        if (!res.ok) {
            throw new Error("Error al actualizar el estado de la orden");
        }

        return res.json();
    };

    return useMutation({
        mutationFn: updateRestauranteOrderRequest,
        onError: (err) => {
            toast.error(err.toString());
        },
        onSuccess: () => {
            toast.success("Orden actualizada");
            queryClient.invalidateQueries({ queryKey: ["restaurantOrders"] });
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    });
}
