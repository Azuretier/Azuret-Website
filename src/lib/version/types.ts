/**
 * UI Version types and metadata
 */

export type UIVersion = '1.0.0' | '1.0.1';

export interface VersionInfo {
  version: UIVersion;
  name: string;
  description: string;
}

export const VERSIONS: Record<UIVersion, VersionInfo> = {
  '1.0.0': {
    version: '1.0.0',
    name: 'Discord-like UI',
    description: 'Interactive messenger interface with Discord-inspired design',
  },
  '1.0.1': {
    version: '1.0.1',
    name: 'Patreon User UI',
    description: 'Clean and elegant Patreon-inspired user interface',
  },
};

export const DEFAULT_VERSION: UIVersion = '1.0.0';
