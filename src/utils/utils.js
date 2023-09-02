export function filterBySearchText(movies, searchText) {
    if (searchText === '') return [];
    return movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
    );
}

export function filterByShortDuration(movies) {
    return movies.filter((movie) => movie.duration <= 40);
}

export function formatMoviesLoacalToApi(list, baseUrl) {
    return list.map(item => ({
        ...item,
        id: item.movieId,
        image: {
            url: item.image.replace(baseUrl, "")
        },
    }));
}

// export function formatMoviesApiToLocal(movie,baseUrl) {
//     return {
//         country: movie.country,
//         director: movie.director,
//         duration: movie.duration,
//         year: movie.year,
//         description: movie.description,
//         image: `https://api.nomoreparties.co${movie.image.url}`,
//         trailerLink: movie.trailerLink,
//         nameRU: movie.nameRU,
//         nameEN: movie.nameEN,
//         thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
//         movieId: movie.id,
//     }
// }

export function convertDurationToHoursMinutes(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
}