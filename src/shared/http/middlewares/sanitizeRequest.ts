const sanitizeHtml = require('sanitize-html')

function sanitizeObject(obj) {
  if (typeof obj === 'string') {
    return sanitizeHtml(obj)
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeObject)
  } else if (obj !== null && typeof obj === 'object') {
    const sanitized = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key])
      }
    }
    return sanitized
  }
  return obj
}

/**
 * @param {Array<'body' | 'query' | 'params'>} parts
 */
function sanitizeRequest(parts = ['body']) {
  return (req, res, next) => {
    parts.forEach(part => {
      if (req[part]) {
        req[part] = sanitizeObject(req[part])
      }
    })
    next()
  }
}

module.exports = sanitizeRequest
