import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationSelector({ page, pages, onPageChange }: Props) {
    const pageList = [];
    for (let i = 1; i <= pages; i++) {
        pageList.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                {page !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(page - 1)}
                        />
                    </PaginationItem>
                )}
                {pageList.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            href="#"
                            onClick={() => onPageChange(pageNumber)}
                            isActive={page === pageNumber}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {page !== pageList.length && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => onPageChange(page + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
