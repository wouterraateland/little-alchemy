"use client";

import { differenceInMilliseconds } from "date-fns";
import {
  millisecondsInDay,
  millisecondsInHour,
  millisecondsInMinute,
} from "date-fns/constants";
import { useEffect, useRef } from "react";
import { formatRelativeTime } from "utils/intl";

const formatAge = (
  age: number,
  options: Intl.RelativeTimeFormatOptions = {},
) => {
  if (Math.abs(age) < millisecondsInMinute)
    return formatRelativeTime(Math.floor(age / 1000), {
      ...options,
      unit: "seconds",
    });
  if (Math.abs(age) < millisecondsInHour)
    return formatRelativeTime(Math.floor(age / (1000 * 60)), {
      ...options,
      unit: "minutes",
    });
  if (Math.abs(age) < millisecondsInDay)
    return formatRelativeTime(Math.floor(age / (1000 * 60 * 60)), {
      ...options,
      unit: "hours",
    });
  return formatRelativeTime(Math.floor(age / (1000 * 60 * 60 * 24)), {
    ...options,
    unit: "days",
  });
};

export default function AgeLabel({
  date,
  options,
}: {
  date: Date;
  options?: Intl.RelativeTimeFormatOptions;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const span = ref.current;
    if (!span) return;

    const interval = setInterval(() => {
      span.innerText = formatAge(
        differenceInMilliseconds(date, Date.now()),
        optionsRef.current,
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {formatAge(differenceInMilliseconds(date, Date.now()), options)}
    </span>
  );
}
