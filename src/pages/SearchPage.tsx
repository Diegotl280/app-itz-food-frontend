import { useState } from "react";
import { useParams } from "react-router";
import { useSearchRestaurantes, type SearchState } from "@/api/RestauranteApi";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultCard from "@/components/Search/SearchResultCard";
import SortOptionsDropdown from "@/components/Search/SortOptionsDropdown";
import PaginationSelector from "@/components/Search/PaginationSelector";
import CuisineFilter from "@/components/CuisineFilter";

export default function SearchPage() {
    const { city } = useParams();

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const { data: results, isLoading } = useSearchRestaurantes(searchState, city);

    const setSearchQuery = (searchFormValues: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormValues.searchQuery,
            page: 1,
        }));
    }; // Fin de setSearchQuery

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    }; // Fin de resetSearch

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    }; // Fin de setPage

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    }; // Fin de setSelectedCuisines

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }));
    }; // Fin de setSortOption

    if (isLoading) {
        return <span>Cargando...</span>;
    }

    if (!results?.data || !city) {
        return <span>¡No hay resultados!</span>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines_list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() =>
                        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
                    }
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    placeHolder="Busca por cocina o restaurante"
                    onSubmit={setSearchQuery}
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo
                        total={results.pagination.total}
                        city={city}
                    />
                    <SortOptionsDropdown
                        sortOption={searchState.sortOption}
                        onChange={setSortOption}
                    />
                </div>
                {results.data.map((restaurante) => (
                    <SearchResultCard
                        key={restaurante._id}
                        restaurante={restaurante}
                    />
                ))}
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
