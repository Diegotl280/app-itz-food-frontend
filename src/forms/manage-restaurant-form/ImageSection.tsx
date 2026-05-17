import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Controller, useFormContext } from 'react-hook-form';
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ImageSection() {
    const { control, watch } = useFormContext()
    const existingImageUrl = watch("imageUrl")

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Imagen</h2>
                <p className="text-sm text-gray-500 m-2">
                    Agregue una imagen que se mostrará en la sección
                    de búsqueda del listado de restaurantes
                </p>
                <p className="text-sm text-gray-500 m-2">
                    Agregar una imagen sustituye una existente
                </p>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl && (
                    <AspectRatio ratio={16/9}>
                        <img
                            src={existingImageUrl}
                            className="rounded-md object-cover h-full w-full"
                        />
                    </AspectRatio>
                )}
                <Controller
                    control={control}
                    name="imageFile"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Input
                                className="bg-white"
                                type="file"
                                accept=".jpg, .jpeg, .png, .webp"
                                onChange={(event) =>
                                    field.onChange(
                                        event.target.files ? event.target.files[0] : null
                                    )
                                }
                            />
                        </Field>
                    )}
                />
            </div>
        </div>
    )
}