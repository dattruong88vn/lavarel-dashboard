import React, { FC, useEffect, useState } from "react"
import { PAGE_PREVIOUS, PAGE_NEXT, PAGE_DOTS, PagingProps } from "components/utils/Paging/index.d"
import "components/utils/Paging/index.scss"

const rangeStep = (from: number, to: number, step = 1) => {
    let i = from
    const range = []

    while (i <= to) {
        range.push(i)
        i += step
    }

    return range
}

export const Paging: FC<PagingProps> = (props) => {
    const { totalRecords, limit, filter } = props
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState([])
    const [currentRecords, setCurrentRecords] = useState({start: 0, end: 0});
   
    const totalPages = Math.ceil(totalRecords / limit)
    const pages = rangeStep(1, totalPages)
    const pageNeighbours = 7

    useEffect(() => {
        setPagination(fetchPageNumbers())
        setCurrentRecords(getCurrentRecords());
    }, [currentPage, totalRecords])

    useEffect(() => {
        if(currentPage === 1) {
            setPagination(fetchPageNumbers())
            setCurrentRecords(getCurrentRecords());
            return;
        }
        setCurrentPage(1)
    }, [limit, filter])

    const getCurrentRecords = (): any => {
        const number = (totalRecords - ((currentPage - 1 ) * limit)) > limit ? limit : (totalRecords - ((currentPage - 1 ) * limit))
        const start = ((currentPage - 1) * limit) + 1
        const end = ((currentPage - 1) * limit) + number
        return {start, end}
    }

    const fetchPageNumbers = (): any => {
        if (totalPages > pageNeighbours) {
            const pageDotsLeft = (currentPage - 1) > 3 ? PAGE_DOTS : 2; 
            const pageDotsRight = (totalPages - currentPage > 3) ? PAGE_DOTS : (totalPages - 1);
            const pageMid = (pageDotsLeft === 2) ? [3, 4, 5] : (pageDotsRight === totalPages -1) ? [totalPages - 4, totalPages - 3, totalPages - 2] : [currentPage - 1, currentPage, currentPage + 1];
            return [PAGE_PREVIOUS, 1, pageDotsLeft, ...pageMid, pageDotsRight, totalPages, PAGE_NEXT];
        }
        return [PAGE_PREVIOUS, ...pages, PAGE_NEXT];
    }

    // useEffect(() => {
    //     if (typeof pageNeighboursLocal === "number") {
    //         setPageNeighboursLocal(
    //             Math.max(0, Math.min(pageNeighboursLocal, 2))
    //         )
    //     }
    // }, [pageNeighboursLocal])

    const gotoPage = (page: number) => {
        page = Math.max(0, Math.min(page, totalPages))

        setCurrentPage(page)

        const paginationData = {
            currentPage: page,
            totalPages: totalPages,
            pageLimit: limit,
            totalRecords,
        }

        props.onPageChanged(paginationData)
    }

    const handleClick = (page: number | string) => {
        if (typeof page === "number") {
            gotoPage(page)
        } else {
            gotoPage(0)
        }
    }

    // const handleMoveLeft = () => {
    //     gotoPage(currentPage - pageNeighboursLocal * 2 - 1)
    // }

    // const handleMoveRight = () => {
    //     gotoPage(currentPage + pageNeighboursLocal * 2 + 1)
    // }

    const renderPage = (page: string | number, index: number) => {
        if (page === PAGE_PREVIOUS) {
            let renderPrevPage = <span>{PAGE_PREVIOUS}</span>
            if (currentPage > 1) {
                renderPrevPage = (
                    <a
                        className="page-link"
                        href="#"
                        onClick={(e) => handleClick(currentPage - 1)}
                    >
                        {page}
                    </a>
                )
            }
            return (
                <li key={`page-item-${index}`} className="page-item">
                    {renderPrevPage}
                </li>
            )
        }
        if (page === PAGE_NEXT) {
            let renderPrevPage = <span>{PAGE_NEXT}</span>
            if (currentPage < totalPages) {
                renderPrevPage = (
                    <a
                        className="page-link"
                        href="#"
                        onClick={(e) => handleClick(currentPage + 1)}
                    >
                        {page}
                    </a>
                )
            }
            return (
                <li key={`page-item-${index}`} className="page-item">
                    {renderPrevPage}
                </li>
            )
        }

        // if (page === LEFT_PAGE)
        //     return (
        //         <li key={`page-item-${index}`} className="page-item">
        //             <a
        //                 className="page-link"
        //                 href="#"
        //                 aria-label="Previous"
        //                 onClick={() => handleMoveLeft()}
        //             >
        //                 <span aria-hidden="true">&laquo;</span>
        //                 <span className="sr-only">
        //                     Previous
        //                 </span>
        //             </a>
        //         </li>
        //     )

        // if (page === RIGHT_PAGE) {
        //     return (
        //         <li key={`page-item-${index}`} className="page-item">
        //             <a
        //                 className="page-link"
        //                 href="#"
        //                 aria-label="Next"
        //                 onClick={() => handleMoveRight()}
        //             >
        //                 <span aria-hidden="true">&raquo;</span>
        //                 <span className="sr-only">Next</span>
        //             </a>
        //         </li>
        //     )
        // }

        if (page === PAGE_DOTS) {
            return (
                <li key={`page-item-${index}`} className="page-item">
                    <span>{PAGE_DOTS}</span>
                </li>
            )
        }

        return (
            <li
                key={`page-item-${index}`}
                className={`page-item${
                    currentPage === page ? " active" : ""
                }`}
            >
                <a
                    className="page-link"
                    href="#"
                    onClick={(e) => handleClick(page)}
                >
                    {page}
                </a>
            </li>
        )
    }

    return (
        <div className="pagination-box">
            <div className="pagination-item">
                {totalRecords > 0 && <span>Đang xem {currentRecords.start} đến {currentRecords.end} trong tổng số {totalRecords} mục</span>}
            </div>
            <div className="pagination-item">
                <nav aria-label="Countries Pagination">
                    <ul className="pagination">
                        {pagination.map((page, index) => renderPage(page, index))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
