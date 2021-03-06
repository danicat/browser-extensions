export interface RepoLocations {
    [key: string]: string
}

export interface PhabricatorMapping {
    callsign: string
    path: string
}

/**
 * The feature flags available.
 */
export interface FeatureFlags {
    newTooltips: boolean
    newInject: boolean
}

export const featureFlagDefaults: FeatureFlags = {
    newTooltips: true,
    newInject: false,
}

// TODO(chris) Switch to Partial<StorageItems> to eliminate bugs caused by
// missing items.
export interface StorageItems {
    sourcegraphURL: string
    gitHubEnterpriseURL: string
    phabricatorURL: string
    inlineSymbolSearchEnabled: boolean
    renderMermaidGraphsEnabled: boolean
    repositoryFileTreeEnabled: boolean
    executeSearchEnabled: boolean
    sourcegraphRepoSearchToggled: boolean
    openEditorEnabled: boolean
    identity: string
    serverUrls: string[]
    enterpriseUrls: string[]
    serverUserId: string
    hasSeenServerModal: boolean
    repoLocations: RepoLocations
    phabricatorMappings: PhabricatorMapping[]
    openFileOnSourcegraph: boolean
    sourcegraphAnonymousUid: string
    disableExtension: boolean
    /**
     * Enable the use of Sourcegraph extensions.
     */
    useExtensions: boolean
    /**
     * Storage for feature flags
     */
    featureFlags: FeatureFlags
    clientConfiguration: ClientConfigurationDetails
    /**
     * Overrides settings from Sourcegraph.
     */
    clientSettings: string
    hasEnableDomainContextMenu: boolean
}

interface ClientConfigurationDetails {
    contentScriptUrls: string[]
    parentSourcegraph: {
        url: string
    }
}

export const defaultStorageItems: StorageItems = {
    sourcegraphURL: 'https://sourcegraph.com',
    serverUrls: ['https://sourcegraph.com'],
    gitHubEnterpriseURL: '',
    phabricatorURL: '',
    inlineSymbolSearchEnabled: true,
    renderMermaidGraphsEnabled: false,
    repositoryFileTreeEnabled: true,
    executeSearchEnabled: false,
    sourcegraphRepoSearchToggled: true,
    openEditorEnabled: false,
    identity: '',
    enterpriseUrls: [],
    serverUserId: '',
    hasSeenServerModal: false,
    repoLocations: {},
    phabricatorMappings: [],
    openFileOnSourcegraph: true,
    sourcegraphAnonymousUid: '',
    disableExtension: false,
    useExtensions: false,
    featureFlags: featureFlagDefaults,
    clientConfiguration: {
        contentScriptUrls: [],
        parentSourcegraph: {
            url: 'https://sourcegraph.com',
        },
    },
    clientSettings: '',
    hasEnableDomainContextMenu: false,
}

export type StorageChange = { [key in keyof StorageItems]: chrome.storage.StorageChange }
