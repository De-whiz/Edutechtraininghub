export interface PurchaseEntry {
  id: number;
  title: string;
}

function readObj<T>(key: string): Record<string, T> {
  try {
    const raw = localStorage.getItem(key);
    const data = raw ? (JSON.parse(raw) as unknown) : {};
    return data && typeof data === 'object' && !Array.isArray(data)
      ? (data as Record<string, T>)
      : {};
  } catch {
    return {};
  }
}

function writeObj(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore storage errors */
  }
}

export function enrollCourses(userId: string, entries: PurchaseEntry[]) {
  if (!userId) return;
  const enrollMap = readObj<number[]>('eth_enroll');
  const ids = new Set(enrollMap[userId] || []);
  entries.forEach((e) => ids.add(Number(e.id)));
  enrollMap[userId] = Array.from(ids);
  writeObj('eth_enroll', enrollMap);

  const activityMap = readObj<Array<{ ts: number; text: string }>>('eth_activity');
  const list = activityMap[userId] || [];
  entries.forEach((e) => {
    list.unshift({ ts: Date.now(), text: 'Enrolled in \u201C' + e.title + '\u201D' });
  });
  activityMap[userId] = list.slice(0, 15);
  writeObj('eth_activity', activityMap);
}