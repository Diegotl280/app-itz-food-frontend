"use client"
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Field, FieldGroup } from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';

const formSchema = z.object({
    searchQuery: z.string({ message: 'Nombre del restaurante es requerido' })
}); // Fin de formSchema

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
}

export default function SearchBar({ onSubmit, onReset, placeHolder, searchQuery }: Props) {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ''
        }
    });

    useEffect(() => {
        form.reset({ searchQuery });
    }, [form, searchQuery]);

    const handleReset = () => {
        form.reset({ searchQuery: '' });
        if (onReset)
            onReset();
    }; // Fin de handleReset

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className='w-full'>
                <Controller
                    name="searchQuery"
                    control={form.control}
                    render={({ field }) => (
                        <Field>
                            <ButtonGroup>
                                <Input
                                    {...field}
                                    placeholder={placeHolder}
                                    id="searchQuery"
                                    className='shadow-none text-xl focus-visible:ring-0 focus-visible:border-orange-500'
                                />
                                <Button
                                    onClick={handleReset}
                                    type="button"
                                    variant="ghost"
                                    className="rounded-full border-blue-100 ml-2 mr-2"
                                >
                                    Limpiar
                                </Button>
                                <Button
                                    variant="outline"
                                    aria-label="Search"
                                    type='submit'
                                    className='rounded-full bg-orange-500'
                                >
                                    Buscar
                                    <SearchIcon className='text-orange-500' />
                                </Button>
                            </ButtonGroup>
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}