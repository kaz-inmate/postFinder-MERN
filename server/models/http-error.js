class HttpError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.code = statusCode;
    }
}

module.exports = HttpError;