import { useFieldArray, useFormContext } from 'react-hook-form';
import MenuItemInput from './MenuItemInput';
import { Button } from '@/components/ui/button';

export default function MenuSection() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'menuItems'
    })
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menú</h2>
                <p className="text-sm text-gray-500">
                    Crea tu menú y asigna a cada item un nombre y precio
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                {fields.map((_, index) => (
                    <MenuItemInput
                        key={index}
                        index={index}
                        removeMenuItem={() => remove(index)}
                    />
                ))}
            </div>
            <Button className='bg-black text-white'
                type='button' onClick={() => append({ name: "", price: "" })}>
                Agregar al menú
            </Button>
        </div>
    )
}