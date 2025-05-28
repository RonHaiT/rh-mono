interface StorageData<T> {
  value: T;
  expire?: number; // 过期时间的时间戳（毫秒）
}

export class Storage {
  // 设置缓存，支持过期时间（单位：秒）
  static set<T>(key: string, value: T, expire?: number): void {
    const data: StorageData<T> = {
      value,
      expire: expire ? new Date().getTime() + expire * 1000 : undefined,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  // 获取缓存，若已过期则返回 null
  static get<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    if (!json) return null;

    try {
      const data: StorageData<T> = JSON.parse(json);
      if (data.expire && data.expire < new Date().getTime()) {
        localStorage.removeItem(key);
        return null;
      }
      return data.value;
    } catch (e) {
      console.error("Storage get error:", e);
      return null;
    }
  }

  // 删除缓存
  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  // 清空所有缓存
  static clear(): void {
    localStorage.clear();
  }
}
