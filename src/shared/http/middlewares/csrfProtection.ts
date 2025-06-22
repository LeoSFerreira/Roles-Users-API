import { strict } from 'assert'
import csrf from 'csurf'

export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: 'none',
    secure: false,
  },
})
