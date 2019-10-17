# Tech Stack
- NodeJS
- ECT Template Engine
- SASS
- React
- Webpack

# How to run
Install docker & docker-compose. Ubuntu or MacOS preferred.

Create `.env` file in root directory:
```
NODE_ENV=development
PORT=4000
ASSET_ENDPOINT=http://localhost:4001
MONGODB=mongodb://mongo:27017

SENDGRID_API_KEY=sendgridApiKey
SENDGRID_SENDER=noreply@camperahotel.com
SENDGRID_VERSION=/v3/mail
SENDGRID_REQUEST_BOOKING_TEMPLATE=sendgridTemplateId
```

```
$ docker-compose up -d
$ docker exec -it joshua.booking bash
$ npm install
$ npm start
```

`http://localhost:4001` for client side.
`http://localhost:4001/admin` for administrator side.

*Sending email function requires SendGrid API Key. If you do not have SendGrid account, create one.
