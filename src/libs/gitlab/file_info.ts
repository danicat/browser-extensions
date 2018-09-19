import { propertyIsDefined } from '@sourcegraph/codeintellify/lib/helpers'
import { Observable, of } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'

import { resolveRev, retryWhenCloneInProgressError } from '../../shared/repo/backend'
import { FileInfo } from '../code_intelligence'

function parseURL(): { repoPath: string; filePath: string; rev: string } {
    const parts = window.location.href.split('/')

    const host = parts[2]
    const owner = parts[3]
    const repoName = parts[4]
    const rev = parts[6]
    const filePath = parts.slice(7).join('/')

    return {
        repoPath: [host, owner, repoName].join('/'),
        filePath,
        rev,
    }
}

export const resolveFileInfo = (codeView: HTMLElement): Observable<FileInfo> =>
    of(codeView).pipe(
        map(() => {
            const { repoPath, filePath, rev } = parseURL()

            return { repoPath, filePath, rev }
        }),
        filter(propertyIsDefined('filePath')),
        switchMap(({ repoPath, rev, ...rest }) =>
            resolveRev({ repoPath, rev }).pipe(
                retryWhenCloneInProgressError(),
                map(commitID => ({ ...rest, repoPath, commitID, rev: rev || commitID }))
            )
        )
    )
