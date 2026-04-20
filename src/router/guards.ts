import { type RouteLocationNormalizedLoadedGeneric, type Router } from "vue-router";

function resolveTransitions(route: RouteLocationNormalizedLoadedGeneric): Record<string, string> {
  const result: Record<string, string> = {};

  for (const match of route.matched) {
    const transitions: Record<any, any> | undefined = typeof match.meta.transitions == 'object' && match.meta.transitions
      ? match.meta.transitions
      : undefined;

    for (const key in transitions) {
      if (!Object.hasOwn(result, key) && typeof key == 'string' && typeof transitions[key] == 'string' && transitions[key])
        result[key] = transitions[key];
    }
  }

  return result;
}

export function transitionGuard(router: Router) {
  router.afterEach((to, from) => to.meta.transition = resolveTransitions(to)[String(from.name)]);
}
