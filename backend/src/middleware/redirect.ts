const ALLOWED_REDIRECTS = process.env.ALLOWED_REDIRECTS
  ?.split(",")
  .map(url => url.trim()) ?? ["https://mategroup.id"]

export function validateRedirect(url?: string) {
  if (!url) return ALLOWED_REDIRECTS[0]

  return ALLOWED_REDIRECTS.includes(url)
    ? url
    : ALLOWED_REDIRECTS[0]
}
