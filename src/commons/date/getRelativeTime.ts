import { DateTime } from "luxon";

export const getRelativeTime = (date: string) => {
  const now = DateTime.local(); // 현재 로컬 시간
  const targetDate = DateTime.fromISO(date, { zone: "utc" }); // 서버의 UTC 시간 (ISO 형식)

  const diffInSeconds = now.diff(targetDate, "seconds").seconds;

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)}초 전`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  } else if (diffInSeconds < 30 * 86400) {
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  } else {
    return `${Math.floor(diffInSeconds / (30 * 86400))}개월 전`;
  }
};
