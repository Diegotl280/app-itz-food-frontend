import { useEffect } from 'react';
import SearchBar, { type SearchForm } from '@/components/SearchBar';
import landingImage from '../assets/landing.png';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('orderStatus') === 'success') {
            toast.success('Pedido realizado correctamente');
            setSearchParams({});
        }
    }, [searchParams, setSearchParams]);

    const handleSearchSubmit = ( searchFormValues: SearchForm) => {
        navigate({
            pathname: '/search/' + searchFormValues.searchQuery
        })
    } // Fin de handleSearchSubmit

  return (
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8
                        flex flex-col gap-5 text-center -mt16">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                Disfruta tu comida para llevar
            </h1>
            <span className="text-x1">
                ¡Tu comida está a un solo clic!
            </span>
            <SearchBar
                placeHolder='Busca por ciudad o país'
                onSubmit={handleSearchSubmit}
                searchQuery=''
            />
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className='font-bold text-3xl tracking-tighter'>
                        Pide comida para llevar aún más rápido
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
