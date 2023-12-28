import _ from 'lodash'

export default class RestService {
  private readonly _baseUrl: string
  private readonly _apiKey: string

  public constructor(baseUrl: string, apiKey: string)
  public constructor(parent: RestService)
  public constructor(baseUrlOrParent: string | RestService, apiKey?: string) {
    if (baseUrlOrParent instanceof RestService) {
      this._baseUrl = baseUrlOrParent._baseUrl
      this._apiKey = baseUrlOrParent._apiKey
    } else {
      this._baseUrl = _.trimEnd(baseUrlOrParent, '/')
      this._apiKey = apiKey ?? ''
    }
  }

  private urlForResource(resource: string): string {
    return this._baseUrl + '/' + _.trimStart(resource, '/')
  }

  public async put(resource: string, data: any): Promise<any> {
    let response = await fetch(this.urlForResource(resource), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'X-Api-Key': this._apiKey, 'Content-Type': 'application/json' }
    })
    return await response.json()
  }
}
