import sendgrid from 'sendgrid'

import config from '@/infrastructure/config'

export default async (options) => {
  const { template, subject, receiver, locals } = options

  const mailer = sendgrid(config.sendgrid.apiKey)
  const helper = sendgrid.mail
  const email = new helper.Mail()
  const sender = new helper.Email(config.sendgrid.sender)

  email.setFrom(sender)
  email.setSubject(subject)

  const content = new helper.Content('text/html', 'Template')
  email.addContent(content)

  const personalization = new helper.Personalization()

  const to = new helper.Email(receiver)
  personalization.addTo(to)

  for (let key in locals) {
    const local = new helper.Substitution(`-${key}-`, locals[key])
    personalization.addSubstitution(local)
  }

  email.addPersonalization(personalization)
  email.setTemplateId(template)

  const request = mailer.emptyRequest({
    method: 'POST',
    path: `${config.sendgrid.version}/send`,
    body: email.toJSON(),
  })

  return mailer.API(request)
}
