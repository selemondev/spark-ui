export interface Aliases {
  [key: string]: string[];
}

export interface RegistryComponent {
  name: string;
  slug: string;
  sourcePath?: string;
  lastCommitHash?: string;
  usesFramerMotion?: boolean;
  [key: string]: unknown;
}

export interface MissingComponent extends RegistryComponent {
  issueTitle: string;
  targetBranch: string;
  pullRequestTitle: string;
  requirements: string[];
}

export interface ComponentRegistry<T = RegistryComponent> {
  generatedAt?: string;
  components: T[];
  [key: string]: unknown;
}

export interface HistoryEntry {
  name: string;
  slug: string;
  sourcePath?: string;
  firstSeenAt?: string;
  latestSeenAt?: string;
  status?: string;
  issueNumber?: number | null;
  mergedPullRequest?: string | null;
  [key: string]: unknown;
}

export interface ComponentHistory {
  $schema?: string;
  generatedAt?: string;
  components: Record<string, HistoryEntry>;
}
