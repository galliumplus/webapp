export enum ErrorCode {
  // codes standard Gallium+
  CantSell = 'CantSell',
  DuplicateItem = 'DuplicateItem',
  InvalidItem = 'InvalidItem',
  ItemNotFound = 'ItemNotFound',
  PermissionDenied = 'PermissionDenied',
  ServiceUnavailable = 'ServiceUnavailable',
  FailedPrecondition = 'FailedPrecondition',

  // codes spécifiques à l'appli web
  Unknown = 'Unknown',
  Unauthenticated = 'Unauthenticated',
  InvalidInput = 'InvalidInput'
}

export class Problem {
  private readonly _errorCode: ErrorCode
  private readonly _message: string

  public get errorCode(): ErrorCode {
    return this._errorCode
  }

  public get message(): string {
    return this._message
  }

  public constructor(message: string, errorCode: ErrorCode = ErrorCode.Unknown) {
    this._errorCode = errorCode
    this._message = message
  }

  public static handle(error: any): Problem {
    if (error instanceof Problem) {
      return error
    } else {
      throw error
    }
  }
}
