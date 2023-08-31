export function filterBySearchText(movies, searchText) {
    if(searchText==='') return [];
    return movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
    );
}

export function filterByShortDuration(movies) {
    return movies.filter((movie) => movie.duration <= 40);
}