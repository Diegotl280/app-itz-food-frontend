import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from "@/components/ui/input";

export default function DetailsSection() {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Detalles</h2>
                <p className="text-sm text-gray-500">Detalles del restaurante</p>
            </div>
            <FieldGroup>
                <Controller control={control}
                    name="restauranteName"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nombre del restaurante</FieldLabel>
                            <Input {...field}
                                className="bg-white"
                                placeholder="Ej: Restaurante ITZ"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="flex gap-4">
                <FieldGroup className="flex-1">
                    <Controller control={control}
                        name="city"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Ciudad</FieldLabel>
                                <Input {...field}
                                    className="bg-white"
                                    placeholder="Ej: Zacatecas"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup className="flex-1">
                    <Controller control={control}
                        name="country"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>País</FieldLabel>
                                <Input {...field}
                                    className="bg-white"
                                    placeholder="Ej: México"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </div>
            <div className="flex gap-4">
                <FieldGroup className="max-w-[25%] md:max-w-[50%]">
                    <Controller control={control}
                        name="deliveryPrice"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Precio de entrega ($ pesos)</FieldLabel>
                                <Input {...field}
                                    className="bg-white"
                                    placeholder="Ej: 100.00"
                                    type="number"
                                    step="0.50"
                                    min="0"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup className="max-w-[25%] md:max-w-[50%]">
                    <Controller control={control}
                        name="estimatedDeliveryTime"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Tiempo estimado de entrega (minutos)</FieldLabel>
                                <Input {...field}
                                    className="bg-white"
                                    placeholder="Ej: 30"
                                    type="number"
                                    min="0"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </div>
        </div>
    )
}