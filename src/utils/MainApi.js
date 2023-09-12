export default class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getHeaders() {
        return this._headers;
    }

    setHeaderToken(jwt) {
        this._headers.authorization = `Bearer ${jwt}`;
    }

    // _getJson(res) {
    //     if (res.ok) {
    //         return res.json();
    //     }
    //     return Promise.reject(res.json().message);
    // }

    async _getJson(res) {
        const result = await res.json();
        return res.ok ? result : Promise.reject(result.message);
    }

    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._getJson);
    }

    setCurrentUser(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        }).then(this._getJson);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers,
        }).then(this._getJson);
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailerLink: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: movie.thumbnail,
                movieId: movie.movieId,
            }),
        }).then(this._getJson);
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._getJson);
    }

    registerUser(email, password, name) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name,
            }),
        }).then(this._getJson);
    }

    loginUser(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(this._getJson);
    }

    
    checkToken(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(this._getJson);
    }

}



