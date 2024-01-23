export class CustomError extends Error {
    private readonly _code: number = 0;
    get code(): number {
        return this._code;
    }

    constructor(message: string, code: number) {
        super(message);
        this._code = code;
    }
}
