class Api {
    constructor(url) {
        this._url = url;
    }

    // get all data
    async get() {
        try {
            const response = await fetch(this._url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

export { Api };
