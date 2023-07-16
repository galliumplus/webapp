enum ErrorCode {
	UNKNOWN = "UNKNOWN"
}

export default class Problem {
	private _errorCode: ErrorCode;
	private _message: string;

	public get errorCode(): ErrorCode { return this._errorCode }

	public get message(): string { return this._message }

	public constructor(errorCode: ErrorCode, message: string) {
		this._errorCode = errorCode
		this._message = message
	}
} 