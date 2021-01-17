const { Composer, Telegraf } = require('micro-bot')

require('dotenv').config()
const { NODE_ENV, TELEGRAM_BOT_TOKEN_LOCAL } = process.env
const commands = require('./controllers/commands')
const hears = require('./controllers/hears')
const use = require('./controllers/use')

const bot =
  NODE_ENV === 'local' ? new Telegraf(TELEGRAM_BOT_TOKEN_LOCAL) : new Composer()
bot.start(ctx => {
  ctx.reply(
    'Merhaba Ben Alfred /alfred komutunu kullanarak benden yardım isteyebilirsiniz o zamana kadar mutfakta olacağım'
  )
})
bot.on('photo', ctx => ctx.reply('Fena değil'))

bot.hears('merhaba alfred', hears.hello)
bot.hears('!alfred', hears.alfred)

bot.command('havadurumu', commands.weather)
bot.command('haberler', commands.news)

bot.use(use.upperCaseControl)

bot.catch((err, ctx) => {
  ctx.reply(
    `Efendi ${ctx.from.first_name}, bazı insanlar dünyanın yanışını izlemek ister. Bu komutu yanlış kullanarak bana o insanları hatırlatıyorsunuz..`
  )
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

if (NODE_ENV === 'local') {
  bot.launch()
} else {
  module.exports = bot
}
