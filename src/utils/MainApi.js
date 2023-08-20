export default class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getHeaders() {
        return this._headers;
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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
                trailer: movie.trailer,
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

    makeRequest = (path, method, body, token) => {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const options = { method, headers,};
        if (token) { headers.Authorization = `Bearer ${token}`; }
        if (body) { options.body = JSON.stringify(body); }
        return fetch(`${this.baseUrl}${path}`, options).then(this._getJson);
    };

    registerUser = (email, password) => this.makeRequest("/signup", "POST", { email, password }, null);
    loginUser = (email, password) => this.makeRequest("/signin", "POST", { email, password }, null);

}



