const {ChatModel}=require('../db/models')
module.exports=function (server) {
    const io=require('socket.io')(server)
    
    io.on('connection',function (socket) {
        console.log('一个客户已上线。。。')
        socket.on('sendMsg',function ({from,to,content}) {
            console.log('接收到一个聊天消息: ', from, to, content)
            const chat={
                from,
                to,
                content,
                // chat_id: from + '_' + to,
                chat_id: [from,to].sort().join('_'),
                create_time: Date.now()
            }
            new ChatModel(chat).save(function (error,chatMsg) {
                io.emit('receiveMsg',chatMsg)
                console.log('向浏览器端分发保存的聊天消息', chatMsg)
            })
        })
    })
}
