import { STORAGE_VERSION } from '@/shared/constants/storage';

// バージョン管理されたストレージデータの型
interface VersionedData<T> {
  version: number;
  data: T;
}

// レガシーデータ（バージョン情報なし）かチェック
function isLegacyData<T>(parsed: unknown): parsed is T {
  return parsed !== null && typeof parsed === 'object' && !('version' in parsed);
}

// バージョン付きデータかチェック
function isVersionedData<T>(parsed: unknown): parsed is VersionedData<T> {
  return (
    parsed !== null &&
    typeof parsed === 'object' &&
    'version' in parsed &&
    'data' in parsed
  );
}

export function getItem<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);

    // バージョン付きデータの場合
    if (isVersionedData<T>(parsed)) {
      if (parsed.version === STORAGE_VERSION) {
        return parsed.data;
      }
      // 古いバージョンのデータは破棄（必要に応じてマイグレーション処理を追加）
      console.warn(
        `Storage schema mismatch for key "${key}". Expected v${STORAGE_VERSION}, found v${parsed.version}. Data will be reset.`
      );
      removeItem(key);
      return null;
    }

    // レガシーデータ（バージョン情報なし）の場合
    if (isLegacyData<T>(parsed)) {
      console.info(
        `Migrating legacy data for key "${key}" to v${STORAGE_VERSION}`
      );
      // レガシーデータを新バージョン形式で保存し直す
      setItem(key, parsed);
      return parsed;
    }

    return null;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    const versionedData: VersionedData<T> = {
      version: STORAGE_VERSION,
      data: value,
    };
    const serialized = JSON.stringify(versionedData);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error setting item to localStorage: ${key}`, error);
  }
}

export function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error);
  }
}

export function clear(): void {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage', error);
  }
}
