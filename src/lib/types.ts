export type ObjectType = Record<string, any>

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
