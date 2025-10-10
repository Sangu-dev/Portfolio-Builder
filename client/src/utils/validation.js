/**
 * Validation utilities for portfolio form
 */

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateURL = (url) => {
  if (!url) return true // URL is optional
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateProfile = (profile) => {
  const errors = {}

  if (!profile.name || profile.name.trim().length === 0) {
    errors.name = 'Name is required'
  }

  if (!profile.role || profile.role.trim().length === 0) {
    errors.role = 'Role is required'
  }

  if (profile.contact.email && !validateEmail(profile.contact.email)) {
    errors.email = 'Invalid email format'
  }

  if (profile.contact.linkedin && !validateURL(profile.contact.linkedin)) {
    errors.linkedin = 'Invalid LinkedIn URL'
  }

  // Validate project links
  profile.projects.forEach((project, index) => {
    if (project.link && !validateURL(project.link)) {
      errors[`project_${index}_link`] = `Invalid URL for project: ${project.title}`
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input.trim().replace(/[<>]/g, '')
}
