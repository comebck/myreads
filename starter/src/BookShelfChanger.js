import PropTypes from "prop-types";

function BookShelfChanger({
    shelf,
    handleBookShelfChange
}) {

    const onBookShelfChange = (event) => {
        handleBookShelfChange(event.target.value);
    };

    return (
        <div className="book-shelf-changer">
            <select value={shelf ? shelf: "none"} onChange={onBookShelfChange}>
                <option value="none" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">
                    Currently Reading
                </option>
                <option value="wantToRead">
                    Want to Read
                </option>
                <option value="read">
                    Read
                </option>
                {shelf ? (
                    <option value="none">
                        None
                    </option>
                ) : (null)}
                
            </select>
        </div>
    );
};

BookShelfChanger.propTypes = {
    handleBookShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string    
};

export default BookShelfChanger;