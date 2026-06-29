import { useEffect, useState, useCallback } from 'react';
import { useVersionStore, VersionService } from '@/lib/versionStore';
import type { VersionConfig } from '@/types/version';

export function useVersion() {
  const store = useVersionStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVersionConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const config = await VersionService.fetchVersionConfig();
      useVersionStore.getState().setVersionConfig(config);
    } catch (err) {
      setError('Failed to load version information');
      console.error('Version config load error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleContinue = useCallback(() => {
    const currentState = useVersionStore.getState();
    if (currentState.releaseNotes) {
      currentState.setLastSeenVersion(currentState.releaseNotes.version);
      currentState.setShouldShowReleaseNotes(false);
    }
  }, []);

  const markReleaseNotesAsSeen = useCallback(() => {
    const currentState = useVersionStore.getState();
    if (currentState.releaseNotes) {
      currentState.setLastSeenVersion(currentState.releaseNotes.version);
      currentState.setShouldShowReleaseNotes(false);
    }
  }, []);

  const shouldBlockApp = store.forceUpgradeRequired;
  const shouldShowNotes = store.shouldShowReleaseNotes && !store.forceUpgradeRequired;

  return {
    isLoading,
    error,
    currentVersion: store.currentVersion,
    latestVersion: store.latestVersion,
    forceUpgradeRequired: store.forceUpgradeRequired,
    releaseNotes: store.releaseNotes,
    shouldBlockApp,
    shouldShowNotes,
    loadVersionConfig,
    handleContinue,
    markReleaseNotesAsSeen,
  };
}