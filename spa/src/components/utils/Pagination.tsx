import React, {useEffect, useState} from 'react';

export class PaginationFilter {
    page = 1;
    limit = 100;
    constructor(page = 1, limit = 100) {
        this.page = page;
        this.limit = limit;
    }
}

class PaginationProps {
    pagination?: PaginationFilter = new PaginationFilter();
    onClickHandle: any;
    maxPage?: number = 0;
    currentPage: number = 1;
    length?: number = 5;
}

const Pagination: React.FC<PaginationProps> = ({onClickHandle, pagination, maxPage, currentPage, length}) => {
    const [pages, setPages] = useState<Array<number>>([]);

    const onPrevClickHandle = () => {
        if (pagination && pagination.page > 1) {
            pagination.page -= 1;
        }
        onClickHandle(pagination);
    };
    const onNextClickHandle = () => {
        if (pagination && (maxPage === undefined || maxPage === 0 || pagination.page < maxPage)) {
            pagination.page += 1;
        }
        onClickHandle(pagination);
    };
    const onPageClick = (page: number) => {
        if (pagination) {
            pagination.page = page;
        }
        onClickHandle(pagination);
    }
    useEffect(() => {
        let p = [];
        let leg = length || 5;
        if (currentPage && currentPage <= leg / 2) {
            for (var i = 0; i < leg; i++) {
                p.push(i + 1);
            }
            setPages(p);
            return;
        }
    }, [currentPage, length]);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href={'javascript:void(0)'} onClick={onPrevClickHandle}>Previous</a></li>
                {pages.map(i => <li className="page-item"><a className="page-link" href={'javascript:void(0)'} onClick={e => onPageClick(i)}>{i}</a></li>)}
                <li className="page-item"><a className="page-link" href={'javascript:void(0)'} onClick={onNextClickHandle}>Next</a></li>
            </ul>
        </nav>
    );
};
export default Pagination;
