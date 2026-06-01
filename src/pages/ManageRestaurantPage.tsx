import { useCreateRestaurante, useGetRestaurante, useGetRestaurantOrders, useUpdateRestaurante } from "@/api/RestauranteApi"
import OrderItemsCard from "@/components/Orders/OrderItemsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

export default function ManageRestaurantPage() {
    const createRestauranteRequest = useCreateRestaurante();
    const { data:restaurante, isLoading} = useGetRestaurante();
    const updateRestauranteRequest = useUpdateRestaurante();
    const { data: orders } = useGetRestaurantOrders();

    const isEdditing = !!restaurante;

  return (
    <Tabs defaultValue="orders" className="gap-5">
        <TabsList className="w-full">
            <TabsTrigger value="orders" className="flex-1">
                Órdenes
            </TabsTrigger>
            <TabsTrigger value="manage-restaurant" className="flex-1">
                Administrar Restaurante
            </TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-5">
            {orders?.length ? (
                orders.map((order) => (
                    <OrderItemsCard key={order._id} order={order} />
                ))
            ) : (
                <span>No hay órdenes para mostrar</span>
            )}
        </TabsContent>
        <TabsContent value="manage-restaurant">
            <ManageRestaurantForm 
                restaurante={restaurante}
                onSave={isEdditing? updateRestauranteRequest.mutate : createRestauranteRequest.mutate}
                isLoading={isLoading}
            />
        </TabsContent>
    </Tabs>
  )
}
