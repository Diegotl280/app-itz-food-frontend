import type { BackEndUser } from "@/api/types";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import UserProfileForm, { type UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router";

type Props = {
    disabled: boolean;
    onCheckout: (userFormData: UserFormData) => void;
    isLoading: boolean;
}

export default function CheckOutButton({
    disabled,
    onCheckout,
    isLoading
}: Props) {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
    const { pathname } = useLocation();
    const { data: getUser, isLoading: isGetUserLoading } = useGetUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        });
    };

    if (!isAuthenticated) {
        return (
            <Button
                className="bg-orange-500 flex-1 text-white"
                onClick={onLogin}
            >
                Iniciar sesión para comprar
            </Button>
        );
    }

    if (isAuthLoading || !getUser || isGetUserLoading) {
        return <LoadingButton />;
    }

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button
                        disabled={disabled}
                        className="bg-orange-500 flex-1 text-white"
                    />
                }
            >
                Confirmar compra
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Confirmar detalles de entrega</DialogTitle>
                    <DialogDescription>
                        Confirma tus datos antes de proceder al pago
                    </DialogDescription>
                </DialogHeader>
                <UserProfileForm
                    getUser={getUser as BackEndUser}
                    onSave={onCheckout}
                    title="Confirma tus datos de entrega"
                    buttonText={isLoading ? "Procesando..." : "Pagar"}
                />
            </DialogContent>
        </Dialog>
    );
}
