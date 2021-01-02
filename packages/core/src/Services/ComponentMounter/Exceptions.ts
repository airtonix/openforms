export class MissingSelectorMounterException extends Error {
    name = 'The mounting factory requires a html selector'
}

export class MissingComponentNameMounterException extends Error {
    constructor (
        public selector: string,
        public element: HTMLElement
    ) {
        super()
        this.name = `The mounting factory mounted an element without a component name`
    }
}