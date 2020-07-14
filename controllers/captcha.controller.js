const svgCaptcha = require('svg-captcha')

const generateCaptcha = (req, res) => {

    const captchaConfig = {
        size: 5,
        noise: 3,
        color: true
    }

    const captcha = svgCaptcha.create(captchaConfig)
    res.status(200).json(captcha)
}

module.exports = { generateCaptcha }