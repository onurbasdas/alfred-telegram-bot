const { fetchWeather } = require('../helpers/weather.js')
const { fetchNews, randomNews } = require('../helpers/news')
const { fetchExchange } = require('../helpers/exchange')
exports.weather = async ctx => {
  cityName = ctx.message.text.replace('/havadurumu ', '')

  const weather = await fetchWeather(cityName)

  ctx.reply(
    ` Efendi ${ctx.from.first_name} ${cityName} şehrinde hava durumu şöyle:
        Sıcaklık: ${weather.data.main.temp}
        Hissedilen Sıcaklık: ${weather.data.main.feels_like}
        Nem: ${weather.data.main.humidity} 
        Açıklama: ${weather.data.weather[0].description} 
  (öhöm pardon bazen İngilizceye kaçabiliyorum)`
  )
}
exports.news = async ctx => {
  const news = await fetchNews()
  const newsArray = news.data.articles
  const selectedNew = newsArray[randomNews(0, newsArray.length - 1)]

  ctx.reply(
    ` Efendi ${ctx.from.first_name} gazeteyle uğraşmanızı istemem size güncel haberlerden rastgele birini gösteriyorum:
      Site: ${selectedNew.url} 
      `
  )
}
exports.exchange = async ctx => {
  const exchanges = await fetchExchange()
  console.log(exchanges)
  ctx.reply(
    ` Efendi ${ctx.from.first_name} gazeteyle uğraşmanızı istemem size güncel haberlerden rastgele birini gösteriyorum:
      Site: ${exchanges.rates} 
      `
  )
}
