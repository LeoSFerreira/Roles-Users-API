import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { errors } from 'celebrate'
import { routes } from './routes'
import helmet from 'helmet'
import { AppError } from '../errors/AppError'
import swaggerFile from '../../swagger.json'
import '../container'
import { errorHandler } from '../errors/errorHandler'
import cookieParser from 'cookie-parser'
const sanitizeRequest = require('../../shared/http/middlewares/sanitizeRequest')

const app = express()

app.use(express.json())

/* app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://site.com']
  const origin = req.headers.origin
  const referer = req.headers.referer

  const isOriginValid = origin && allowedOrigins.includes(origin)
  const isRefererValid =
    referer && allowedOrigins.some(domain => referer.startsWith(domain))

  const strict = process.env.STRICT_ORIGIN === 'true'

  if (strict) {
    if (!isOriginValid && !isRefererValid) {
      return res
        .status(403)
        .json({ error: 'Origem não permitida (modo estrito)' })
    }
  } else {
    if (origin || referer) {
      if (!isOriginValid && !isRefererValid) {
        return res.status(403).json({ error: 'Origem não permitida' })
      }
    }
  }

  next()
})
 */
app.use(cookieParser())
/* app.use((req, res, next) => {
  const csrfCookie = req.headers.cookie
    ?.split(';')
    .find(c => c.trim().startsWith('_csrf='))

  if (csrfCookie && csrfCookie.includes('SameSite=None')) {
    return res
      .status(403)
      .json({ error: 'Cookie CSRF inválido (SameSite=None)' })
  }

  next()
}) */

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
    },
  }),
)

app.get('/xss-test', sanitizeRequest(['query']), (req, res) => {
  res.set('Cache-Control', 'no-store')
  const { search } = req.query

  res.send(`
      <html><body><h1>Resultado: ${search}</h1></body></html>
    `)
})

app.use(routes)
app.use(errors())
app.use(errorHandler)
export { app }
