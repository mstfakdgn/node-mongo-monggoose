const sgmail = require('@sendgrid/mail')


sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (email, name) => {
    sgmail.send({
        to:email,
        from:'mustafa.akiler@gmail.com',
        subject: `Welcome${name}`,
        text:`Emaik Body${name}`,
        html:'<strong>HTML example</strong>'
    })
}

const sendCancelationEmail = (email, name) => {
    sgmail.send({
        to:email,
        from:'mustafa.akiler@gmail.com',
        subject: `By ${name}`,
        text:`By ${name}`,
        html:'<strong>HTML example</strong>'
    })
}

module.exports = {
    sendEmail,
    sendCancelationEmail
}