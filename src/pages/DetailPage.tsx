import { useState } from "react";
import { useParams } from "react-router";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import LoadingButton from "@/components/LoadingButton";
import { useGetRestauranteById } from "@/api/RestauranteApi";
import type { CartItem, CheckOutSessionRequest, MenuItem } from "@/api/types";
import RestaurantInfo from "@/components/Search/RestaurantInfo";
import MenuItemCard from "@/components/Search/MenuItemCard";
import OrderSummary from "@/components/Search/OrderSummary";
import CheckOutButton from "@/components/Search/CheckOutButton";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckOutSession } from "@/api/OrderApi";

const CART_ITEMS_SESSION_STORAGE_KEY = "cartItems";

export default function DetailPage() {
    const { restauranteId } = useParams();
    const { data: restaurante, isLoading } = useGetRestauranteById(restauranteId);
    const createCheckOutSessionRequest = useCreateCheckOutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(CART_ITEMS_SESSION_STORAGE_KEY);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const saveCartItems = (updatedCartItems: CartItem[]) => {
        setCartItems(updatedCartItems);
        sessionStorage.setItem(
            CART_ITEMS_SESSION_STORAGE_KEY,
            JSON.stringify(updatedCartItems)
        );
    };

    const addToCart = (menuItem: MenuItem) => {
        const existingCartItem = cartItems.find(
            (cartItem) => cartItem._id === menuItem._id
        );

        let updatedCartItems: CartItem[];

        if (existingCartItem) {
            updatedCartItems = cartItems.map((cartItem) =>
                cartItem._id === menuItem._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            updatedCartItems = [
                ...cartItems,
                {
                    _id: menuItem._id,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: 1
                }
            ];
        }

        saveCartItems(updatedCartItems);
    };

    const removeFromCart = (cartItem: CartItem) => {
        const updatedCartItems = cartItems.filter(
            (item) => item._id !== cartItem._id
        );
        saveCartItems(updatedCartItems);
    };

    const onCheckout = (userFormData: UserFormData) => {
        if (!restaurante || !restauranteId || !userFormData.email) {
            return;
        }

        const checkOutData: CheckOutSessionRequest = {
            cartItems,
            restauranteId,
            deliveryDetails: {
                email: userFormData.email,
                name: userFormData.name,
                address: userFormData.address,
                city: userFormData.city,
                country: userFormData.country
            }
        };

        createCheckOutSessionRequest.mutate(checkOutData, {
            onSuccess: (data) => {
                window.location.href = data.url;
            }
        });
    };

    if (isLoading) {
        return <LoadingButton />;
    }

    if (!restaurante) {
        return <span>Restaurante no encontrado</span>;
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5} className="overflow-hidden rounded-md">
                <img
                    src={restaurante.imageUrl}
                    className="object-cover w-full h-full"
                    alt={restaurante.restauranteName}
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurante={restaurante} />
                    <span className="text-2xl font-bold tracking-tight">
                        Menú
                    </span>
                    {restaurante.menuItems.map((menuItem) => (
                        <MenuItemCard
                            key={menuItem._id}
                            menuItem={menuItem}
                            addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            restauranteName={restaurante.restauranteName}
                            cartItems={cartItems}
                            deliveryPrice={restaurante.deliveryPrice}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckOutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={createCheckOutSessionRequest.isPending}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
