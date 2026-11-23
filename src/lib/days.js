// Calendar-day helpers. Days are keyed in the phone's local time zone, so a
// workout done at 1 a.m. in India counts for that day, not the day before (UTC).

export function localDayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dayKeyOffset(offset, from = new Date()) {
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
  return localDayKey(date);
}

/** Consecutive days ending today, or ending yesterday when today is not done yet. */
export function currentStreak(completedDays, now = new Date()) {
  const done = new Set(completedDays || []);
  let offset = done.has(localDayKey(now)) ? 0 : -1;
  let count = 0;
  while (done.has(dayKeyOffset(offset, now))) {
    count += 1;
    offset -= 1;
  }
  return count;
}
