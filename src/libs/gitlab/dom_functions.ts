import { DOMFunctions } from '@sourcegraph/codeintellify'

export const singleFileDOMFunctions: DOMFunctions = {
    getCodeElementFromTarget: target => target.closest('span.line') as HTMLElement | null,
    getLineNumberFromCodeElement: codeElement => {
        const line = codeElement.id.replace(/^LC/, '')

        return parseInt(line, 10)
    },
    getCodeElementFromLineNumber: (codeView, line) => codeView.querySelector(`#LC${line}`) as HTMLElement | null,
}
