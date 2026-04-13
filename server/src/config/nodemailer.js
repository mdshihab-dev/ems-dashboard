const {createTransport} = require('nodemailer')


let transporter = createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

const sendEmail = async ({to,subject,body})=>{
      const response =  await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to,
            subject,
            body
        })
    return response
}

module.exports = sendEmail