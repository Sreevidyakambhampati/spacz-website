/** SPACZ public contact address — the single source for every mailto link on the site. */
export const SUPPORT_EMAIL = 'support@spacz.com'

/** Builds a mailto: link with a properly encoded subject (and optional body). */
export function mailto(subject: string, body?: string) {
  const params = [`subject=${encodeURIComponent(subject)}`]
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${SUPPORT_EMAIL}?${params.join('&')}`
}

export const STUDY_SPACE_INQUIRY_SUBJECT = 'Study Space Inquiry – SPACZ'

/** "Find a Study Space" — opens an email to SPACZ instead of an on-page listing. */
export const studySpaceInquiryHref = mailto(STUDY_SPACE_INQUIRY_SUBJECT)

export const listYourHallHref = mailto('List my study hall on SPACZ')
