// Calendar date stored as YYYY-MM-DD. Parsed as a local date so UTC midnight
// does not move the day. Year is included only when it is not the current year.

export function formatProgressDate(iso, now = new Date(), locale) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!match) return iso;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return iso;
  }

  const options = { month: 'short', day: 'numeric' };
  if (year !== now.getFullYear()) options.year = 'numeric';
  return new Intl.DateTimeFormat(locale, options).format(date);
}
