import { SHORT_MOVIE_DURATION } from "./constants";

export function filterBySearchText(movies, searchText) {
    if (searchText === '') return [];
    return movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
    );
}

export function filterByShortDuration(movies) {
    return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
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

export function convertDurationToHoursMinutes(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours ? `${hours}m ${minutes}m` : `${minutes}m`;
}