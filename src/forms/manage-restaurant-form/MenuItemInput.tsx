import { Button } from '@/components/ui/button';
import { Controller, useFormContext } from "react-hook-form"
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type Props = {
    index: number;
    removeMenuItem: () => void;
}

export default function MenuItemInput({index, removeMenuItem}: Props) {
    const { control } = useFormContext();
    return (
        <div className='flex flex-row items-end gap-2'>
            <Controller
                control={control}
                name={`menuItems.${index}.name`}
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='flex items-center gap-1'>
                            Nombre
                        </FieldLabel>
                        <Input
                            {...field}
                            placeholder='Hamburguesa'
                            className="bg-white"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={control}
                name={`menuItems.${index}.price`}
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='flex items-center gap-1'>
                            Precio ($)
                        </FieldLabel>
                        <Input
                            {...field}
                            placeholder='99.99'
                            className="bg-white"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                        )}
                    </Field>
                )}
            />
            <Button
                type='button'
                onClick={removeMenuItem}
                className="bg-red-500 max-h-fit"
            >
                Eliminar
            </Button>
        </div>
    )
}