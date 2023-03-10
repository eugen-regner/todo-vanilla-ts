export type ObjectType = Record<string, any>

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

export type ItemStatus = 'active' | 'completed'
export type SelectedItemTypes = 'all' | ItemStatus

export type Listener = (data: any) => void
export interface Listeners {
  [key: string] : Listener[]
}

export type SelectItemsCommands = 'select-all' | 'select-active' | 'select-completed' | 'clear-completed'
export type ManageItemCommands = 'add-item' | 'remove-item' | 'set-to-completed'
