/**
 * Utility functions for determining if a drip should be published.
 * Drips are published at 8 AM Central Time (America/Chicago) on their publish date.
 */

/**
 * Get the publish time for a drip (8 AM Central Time on the given date).
 * @param dateStr - The date string in YYYY-MM-DD format (from drip folder name)
 * @returns Date object representing when the drip should publish
 */
export function getPublishTime(dateStr: string): Date {
  // Parse the date string
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Central Time offset in minutes: -360 (CST/UTC-6) or -300 (CDT/UTC-5)
  // Determine if DST is in effect for this date
  const jan = new Date(year, 0, 1);
  const jul = new Date(year, 6, 1);
  const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  const targetDate = new Date(year, month - 1, day);
  const isDST = targetDate.getTimezoneOffset() < stdOffset;
  
  const centralOffset = isDST ? -300 : -360;
  const localOffset = targetDate.getTimezoneOffset();
  const diffMinutes = localOffset + centralOffset;
  
  // Create the publish time at 8 AM, adjusted for timezone difference
  const result = new Date(year, month - 1, day, 8, 0, 0, 0);
  result.setMinutes(result.getMinutes() - diffMinutes);
  
  return result;
}

/**
 * Check if a drip should be published based on its date.
 * Drips are published at 8 AM Central Time on their publish date.
 * @param dateStr - The date string in YYYY-MM-DD format (from drip folder name)
 * @returns true if the drip should be visible
 */
export function isDripPublished(dateStr: string): boolean {
  const now = new Date();
  const publishTime = getPublishTime(dateStr);
  return now >= publishTime;
}
