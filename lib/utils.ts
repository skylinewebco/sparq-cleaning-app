export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function reference() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `SPQ-${n}`;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Build a calendar grid (6 weeks) for the given month, Monday-first. */
export function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1);
  // getDay: 0=Sun..6=Sat -> convert to Monday-first index
  const startOffset = (first.getDay() + 6) % 7;
  const days: Array<{ date: Date; inMonth: boolean }> = [];
  const start = new Date(year, month, 1 - startOffset);
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({ date: d, inMonth: d.getMonth() === month });
  }
  return days;
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
