// utils.ts
export default function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function getSideBarTimeStamp(dateString: string): string {
  const inputDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputDate.toDateString() === today.toDateString()) {
    return inputDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  if (inputDate.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return inputDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTimestampFromISOString(dateString: string): string {
  const inputDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputDate.toDateString() === today.toDateString()) {
    return inputDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  if (inputDate.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return inputDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
