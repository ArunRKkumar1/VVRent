
export const SearchResultsList = ({ results, setPick }) => {
    return (
        <div className="results-list ">
            {results.map((result, id) => {
                return <div
                    className="search-result"
                    onClick={(e) => setPick(result.bike)}
                >
                    <div>
                        {result.bike}
                    </div>
                    <div>
                        {result.RC}
                    </div>
                </div>

                // <SearchResult result={result.name} key={id} />;
            })}
        </div>
    );
};
