"use client"
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type BackEndUser } from '@/api/types';
import { useEffect } from 'react';

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string({ required_error: "El nombre debe de ser requerido" })
        .min(3, 'El nombre debe de tener al menos 3 carácteres'),
    address: z.string({ required_error: "Dirección debe de ser requerida" }),
    city: z.string({ required_error: 'Ciudad es requerida' }),
    country: z.string({ required_error: 'País es requerido' })
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (userProfileData: UserFormData) => void;
    getUser: BackEndUser;
}

export default function UserProfileForm({ onSave, getUser }: Props) {
    const form = useForm<UserFormData>({
        defaultValues:{
            name: '',
            address:'',
            city:'',
            country:''
        },
        resolver: zodResolver(formSchema),
        mode: 'onSubmit'
    }) // Fin de form

    function onSubmit (data:UserFormData){
        //console.log(JSON.stringify(data));
        onSave(data);
    }; // Fin de onSubmit

    useEffect(  ()=>{
        form.reset(getUser);
    }, [getUser, form])

    return (
        <Card>
            <form id='user-profile-form' 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 bg-gray-50 rounded-lg md:pd-10'
            >
                <CardHeader>
                    <CardTitle>
                        Perfil de usuario
                    </CardTitle>
                    <CardDescription>
                        Consulta y cambia la información de tu perfil aquí
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        placeholder="Teclea tu email"
                                        className='bg-white'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}
                                        className='mt-4'    
                                >
                                    <FieldLabel>Nombre</FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        placeholder="Teclea tu nombre"
                                        className='bg-white'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <FieldGroup>
                            <Controller
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                            className='mt-4'    
                                    >
                                        <FieldLabel>Dirección</FieldLabel>
                                        <Input
                                            {...field}
                                            id="address"
                                            placeholder="Teclea tu dirección"
                                            className='bg-white'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                            className='mt-4'    
                                    >
                                        <FieldLabel>Ciudad</FieldLabel>
                                        <Input
                                            {...field}
                                            id="city"
                                            placeholder="Teclea tu ciudad"
                                            className='bg-white'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Controller
                                name="country"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}
                                            className='mt-4'    
                                    >
                                        <FieldLabel>País</FieldLabel>
                                        <Input
                                            {...field}
                                            id="country"
                                            placeholder="Teclea tu país"
                                            className='bg-white'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </div>
                </CardContent>
                <CardFooter className='mt-4'>
                            <Field orientation="horizontal">
                                <Button type='submit'
                                        form='user-profile-form'
                                        className="bg-orange-500 text-white"
                                >
                                    Actualizar
                                </Button>
                            </Field>
                </CardFooter>
            </form>
        </Card>
    )
}


