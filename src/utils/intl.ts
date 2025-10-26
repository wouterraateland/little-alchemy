export const formatRelativeTime = (
  value: number,
  {
    unit,
    ...options
  }: { unit: Intl.RelativeTimeFormatUnit } & Intl.RelativeTimeFormatOptions,
) => new Intl.RelativeTimeFormat("nl-NL", options).format(value, unit);
