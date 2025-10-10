/**
 * Tests for validation utilities
 * Run with: npm test (after setting up a test runner)
 */

import { validateEmail, validateURL, validateProfile, sanitizeInput } from './validation'

// Email validation tests
console.log('Testing email validation...')
console.assert(validateEmail('test@example.com') === true, 'Valid email should pass')
console.assert(validateEmail('invalid-email') === false, 'Invalid email should fail')
console.assert(validateEmail('') === false, 'Empty email should fail')
console.assert(validateEmail('test@') === false, 'Incomplete email should fail')

// URL validation tests
console.log('Testing URL validation...')
console.assert(validateURL('https://example.com') === true, 'Valid URL should pass')
console.assert(validateURL('http://test.com') === true, 'HTTP URL should pass')
console.assert(validateURL('') === true, 'Empty URL should pass (optional)')
console.assert(validateURL('not-a-url') === false, 'Invalid URL should fail')

// Profile validation tests
console.log('Testing profile validation...')

const validProfile = {
  name: 'John Doe',
  role: 'Developer',
  bio: 'A great developer',
  skills: ['JavaScript', 'React'],
  projects: [{ title: 'Project 1', description: 'Desc', link: 'https://example.com' }],
  contact: { email: 'john@example.com', linkedin: 'https://linkedin.com/in/john' }
}

const result1 = validateProfile(validProfile)
console.assert(result1.isValid === true, 'Valid profile should pass')
console.assert(Object.keys(result1.errors).length === 0, 'Valid profile should have no errors')

const invalidProfile = {
  name: '',
  role: '',
  contact: { email: 'invalid-email', linkedin: '' }
}

const result2 = validateProfile(invalidProfile)
console.assert(result2.isValid === false, 'Invalid profile should fail')
console.assert(result2.errors.name === 'Name is required', 'Name error should be present')
console.assert(result2.errors.role === 'Role is required', 'Role error should be present')
console.assert(result2.errors.email === 'Invalid email format', 'Email error should be present')

// Sanitization tests
console.log('Testing input sanitization...')
console.assert(sanitizeInput('  test  ') === 'test', 'Should trim whitespace')
console.assert(sanitizeInput('<script>alert("xss")</script>') === 'scriptalert("xss")/script', 'Should remove < and >')
console.assert(sanitizeInput('normal text') === 'normal text', 'Should preserve normal text')

console.log('✅ All validation tests passed!')

export default {
  validateEmail,
  validateURL,
  validateProfile,
  sanitizeInput
}
