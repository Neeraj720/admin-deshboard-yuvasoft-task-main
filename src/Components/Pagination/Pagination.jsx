// eslint-disable-next-line react/prop-types
function Pagination({ totalPages, currentPage, onPageChange }) {
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item" onClick={handlePrevious}><a className="page-link" >Previous</a></li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`btn mx-2  ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => onPageChange(index + 1)}
                        >
                            {index + 1}
                        </li>
                    ))}
                    <li className="page-item" onClick={handleNext}><a className="page-link">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination