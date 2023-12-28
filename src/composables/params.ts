import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { UrlSearchParam } from '@/logic/url-params'

export default function useParams(
  route: RouteLocationNormalizedLoaded
): Record<string | symbol, UrlSearchParam> {
  return new Proxy(route.query, {
    get(target: any, prop) {
      return UrlSearchParam.buildFrom(Reflect.get(target, prop))
    }
  })
}
