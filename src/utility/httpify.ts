/**
 * httpify will add http prefix to the url if it doesn't already exists
 * @param url url
 */
export default function(url: string): string {
  return url?.startsWith('http') ? url : "http://" + url
}
