import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError } from '@/components/ui/field';
import { cuisineList } from "@/config/restaurant-options-config";
import CuisineCheckbox from "./CuisineCheckbox";

export default function CuisinesSection() {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cocinas</h2>
                <p className="text-sm text-gray-500">
                    Selecciona el tipo de cocina que el restaurante servirá
                </p>
            </div>
            <Controller control={control}
                name="cuisines"
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisineList.map((cuisineItem) => (
                                <CuisineCheckbox
                                    key={cuisineItem}
                                    cuisine={cuisineItem}
                                    field={field}
                                />
                            ))}
                        </div>
                        {fieldState.invalid && (
                            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                        )}
                    </Field>
                )}
            />
        </div>
    )
}