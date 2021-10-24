const {
     Telegraf,
     Markup 
} = require('telegraf')// requie orqali telegram kutubxonsai ochilmoqda
require('dotenv').config()
const text = require('./const')


const bot = new Telegraf(process.env.BOT_TOKEN)// bu yerda const ozgaruvchis unga telegraf modul
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}`))
bot.help((ctx) => ctx.reply (text.commands))

bot.command('course', async (ctx)=> {
    try{
        await ctx.replyWithHTML('<b>Мои сайты</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Youtube', 'btn_1'),
                Markup.button.callback('Instagram', 'btn_2'),
                Markup.button.callback('VK', 'btn_3'),
                Markup.button.callback('TikTok', 'btn_4')]
            ]
        ))
    }catch(e){
        console.error(e)
    }
})

function addActionBot(name, src, text){
    bot.action(name, async (ctx) => {
        try{
        await ctx.answerCbQuery()
        if(src !== false){
            await ctx.replyWithPhoto({
                source: src
            })
        }
        await ctx.replyWithHTML(text,{
            disable_web_page_preview:true
    })
        }catch(e){
            console.error(e)
        }
    })
    
}


addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', './img/3.jpg', text.text3)
addActionBot('btn_4', './img/4.jpg', text.text4)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))