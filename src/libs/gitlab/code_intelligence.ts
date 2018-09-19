import { CodeHost, CodeView } from '../code_intelligence'
import { singleFileDOMFunctions } from './dom_functions'
import { resolveFileInfo } from './file_info'

const toolbarButtonProps = {
    className: 'btn btn-default btn-sm',
    style: { marginRight: '5px', textDecoration: 'none', color: 'inherit' },
}

export function checkIsGitlab(): boolean {
    return !!document.head.querySelector('meta[content="GitLab"]')
}

const createToolbarMount = (codeView: HTMLElement) => {
    const fileActions = codeView.querySelector('.file-actions')
    if (!fileActions) {
        throw new Error('Unable to find mount location')
    }

    const mount = document.createElement('div')
    mount.classList.add('btn-group')
    mount.classList.add('sg-toolbar-mount')

    fileActions.insertAdjacentElement('afterbegin', mount)

    return mount
}

const singleFileCodeView: CodeView = {
    selector: '.file-holder',
    dom: singleFileDOMFunctions,
    getToolbarMount: createToolbarMount,
    resolveFileInfo,
    toolbarButtonProps,
}

export const gitlabCodeHost: CodeHost = {
    name: 'gitlab',
    check: checkIsGitlab,
    codeViews: [singleFileCodeView],
}
