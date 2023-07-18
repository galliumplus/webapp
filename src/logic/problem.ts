export enum ErrorCode {
  UNKNOWN,
  UNAUTHENTICATED
}

export default class Problem {
  private _errorCode: ErrorCode
  private _message: string

  public get errorCode(): ErrorCode {
    return this._errorCode
  }

  public get message(): string {
    return this._message
  }

  public constructor(message: string, errorCode: ErrorCode = ErrorCode.UNKNOWN) {
    this._errorCode = errorCode
    this._message = message
  }

  public static handle(error: any): Problem {
    if (error instanceof Problem)
    {
      return error
    }
    else {
      throw error;
    }
  }
}
