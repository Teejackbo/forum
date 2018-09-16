'use strict'
const BaseExceptionHandler = use('BaseExceptionHandler')
const Drive = use('Drive')
const Mail = use('Mail')
const Env = use('Env')
const Helpers = use('Helpers')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (Env.get('NODE_ENV') === 'development') {
      return super.handle(...arguments)
    }
    if (error.name === 'InvalidSessionException') {
      return response.redirect('404')
    }
    return super.handle(...arguments)
  }

  async report (error, { request }) {
    if (error) {
      if (
        error.name !== 'ValidationException' &&
        error.name !== 'InvalidSessionException' &&
        Env.get('NODE_ENV') === 'production'
      ) {
        const data = {
          error: error,
          requestData: {
            url: request.originalUrl(),
            method: request.method()
          }
        }
        await Mail.send('emails.error', data, message => {
          message
            .to(Env.get('ADMIN_EMAIL'))
            .from(`errorreporting@${Env.get('DOMAIN_NAME')}`)
            .subject(`Error - ${error.name}`)
        })
      }
      const path = `${Helpers.tmpPath()}/log.txt`
      const message = Buffer.from(`${error.message}\n`)
      if (await Drive.exists(path)) {
        await Drive.append(path, message)
      } else {
        await Drive.put(path, message)
      }
    }
  }
}

module.exports = ExceptionHandler
