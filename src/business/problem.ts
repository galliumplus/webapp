export enum ErrorCode {
  // codes standard Gallium+, présents dans la liste ci-dessous
  CantSell = 'CantSell',
  DuplicateItem = 'DuplicateItem',
  InvalidResource = 'InvalidResource',
  ItemNotFound = 'ItemNotFound',
  PermissionDenied = 'PermissionDenied',
  ServiceUnavailable = 'ServiceUnavailable',
  FailedPrecondition = 'FailedPrecondition',
  AccessMethodNotAllowed = 'AccessMethodNotAllowed',
  DisabledApplication = 'DisabledApplication',

  // codes spécifiques à l'appli web
  Unknown = 'Unknown',
  Unauthenticated = 'Unauthenticated'
}

const galliumErrorCodes: ErrorCode[] = [
  ErrorCode.CantSell,
  ErrorCode.DuplicateItem,
  ErrorCode.InvalidResource,
  ErrorCode.ItemNotFound,
  ErrorCode.PermissionDenied,
  ErrorCode.ServiceUnavailable,
  ErrorCode.FailedPrecondition,
  ErrorCode.AccessMethodNotAllowed,
  ErrorCode.DisabledApplication
]

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

  public static fromGalliumError(error: unknown): Problem {
    let matchingCode, message
    if (typeof error === 'object' && error !== null) {
      message = 'message' in error && error.message ? String(error.message) : undefined
      const code = 'code' in error && error.code ? String(error.code) : undefined

      if (code !== undefined) {
        matchingCode = galliumErrorCodes.find((c) => c.toLowerCase() == code.toLowerCase())
      }
    }
    return new Problem(message ?? 'Une erreur inconnue est survenue', matchingCode)
  }

  public static handle(error: any): Problem {
    if (error instanceof Problem) {
      return error
    } else {
      throw error
    }
  }
}
