import { z } from 'zod';

export const formSchema = z.object({
    restauranteName: z.string({
        required_error: 'El nombre del restaurante es requerido'
    }),
    city: z.string({
        required_error: 'El nombre de la ciudad es requerido'
    }),
    country: z.string({
        required_error: 'El nombre del país es requerido'
    }),
    deliveryPrice: z.coerce.number({
        required_error: 'El precio de entrega es requerido',
        invalid_type_error: 'El precio debe ser un número válido'
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'El tiempo de entrega es requerido',
        invalid_type_error: 'El tiempo debe ser un número válido'
    }),
    cuisines: z.array(z.string()).nonempty({
        message: 'Por favor selecciona un item de cocina'
    }),
    menuItems: z.array(
        z.object({
            name: z.string({ required_error: "El nombre debe ser requerido" })
                .min(1, "El nombre debe tener al menos 1 caracter"),
            price: z.coerce.number({
                required_error: 'El precio es requerido',
                invalid_type_error: 'El precio debe ser un número válido'
            })
        })
    ),
    imageFile: z.instanceof(File, { message: 'Imagen es requerida' }).optional(),
    imageUrl: z.string().optional()
}).refine ( (data) =>
    data.imageUrl || data.imageFile,
    {
        message: 'Se debe proporcionar un archivo de imagen o una URL de la imagen',
        path: ["imageFile"]
    }
); // Fin de formSchema

export type RestaurantFormData = z.infer<typeof formSchema>;