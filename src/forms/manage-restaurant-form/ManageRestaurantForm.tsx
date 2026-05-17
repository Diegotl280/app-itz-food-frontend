import { z } from 'zod';
import { formSchema } from './RestaurantFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import type { Restaurante } from '@/api/types';
import { useEffect } from 'react';

type Props = {
    restaurante?: Restaurante
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

export type RestaurantFormData = z.infer<typeof formSchema>;

export default function ManageRestaurantForm({onSave, isLoading, restaurante}: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        restauranteName: "",
        city: "Zacatecas",
        country: "México",
        deliveryPrice: 100,
        estimatedDeliveryTime: 30,
        cuisines: [],
        menuItems: [{name: "", price: 0}]
    }
  })

  useEffect(() => {
    if (!restaurante)
        return

    // Formateamos a numérico el precio de entrega
    const deliveryPriceFormatted = parseInt(
        restaurante.deliveryPrice
    );

    // Formateamos a númerico el tiempo de entrega
    const estimatedDeliveryTimeFormatted = parseInt(
        restaurante.estimatedDeliveryTime
    )

    // Cargamos los datos restantes extraídos del backend de la variable
    // Restaurante en updateRestaurante y los complementamos
    // Con los datos formateados
    const updateRestaurante = {
        ...restaurante,
        deliveryPrice: deliveryPriceFormatted,
        estimatedDeliveryTime: estimatedDeliveryTimeFormatted
    }

    // Asignamos los datos del restaurante cargado en updateRestaurante al formulario
    form.reset(updateRestaurante);

  }, [form, restaurante]); // Fin de useEffect

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // Convertimos los datos del formulario a un objeto formData
    const formData = new FormData()

    formData.append("restauranteName", formDataJson.restauranteName);

    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

    // Procesamos el arreglo de cocinas
    formDataJson.cuisines.forEach(
        (cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        }
    );

    //Procesamos el arreglo de los items del menú
    formDataJson.menuItems.forEach(
        (menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString())
        }
    );

    // Verificamos que exista la imagen para un nuevo restaurante
    if (formDataJson.imageFile){
        // Procesamos la imagen del restaurante
        formData.append("imageFile", formDataJson.imageFile ||"")
    }

    // Enviamos los datos al backend
    onSave(formData)
    
    // Procesamos la imagen del restaurante
    //formData.append("imageFile", formDataJson.imageFile);
  } // Fin de onSubmit

  return (
    <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 bg-gray-50 p-10 rounded-lg'
        >
            <DetailsSection />
            <Separator />
            <CuisinesSection />
            <Separator />
            <MenuSection />
            <Separator />
            <ImageSection />
            {
                isLoading ? <LoadingButton /> :
                            <Button className='bg-black text-white'
                                type='submit'>Guardar</Button>
            }
        </form>
    </FormProvider>
  )
}