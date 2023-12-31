export default class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getHeaders() {
        return this._headers;
    }

    // _getJson(res) {
    //     if (res.ok) {
    //         return res.json();
    //     }
    //     return Promise.reject(`Ошибка: ${res.status}`);
    // }

    async _getJson(res) {
        const result = await res.json();
        return res.ok ? result : Promise.reject(result.message);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            headers: this._headers,
        }).then(this._getJson);
    }
}




