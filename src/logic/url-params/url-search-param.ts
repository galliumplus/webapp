import type { LocationQueryValue, RouteParamValue } from 'vue-router'

export default class UrlSearchParam {
  private readonly _rawValues: Array<string | null>

  public get asString(): string | null {
    let valueAsString = null

    if (this._rawValues.length > 0) {
      valueAsString = this._rawValues[0]
    }

    return valueAsString
  }

  private constructor(rawValues: Array<string | null>) {
    this._rawValues = rawValues
  }

  static buildFrom(
    paramValue: undefined | LocationQueryValue | LocationQueryValue[]
  ): UrlSearchParam {
    let paramObject

    if (paramValue === undefined) {
      paramObject = new UrlSearchParam([])
    } else if (Array.isArray(paramValue)) {
      paramObject = new UrlSearchParam(paramValue)
    } else {
      paramObject = new UrlSearchParam([paramValue])
    }

    return paramObject
  }
}
