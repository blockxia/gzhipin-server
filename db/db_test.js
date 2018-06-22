const md5=require('blueimp-md5')
// 1. 连接数据库
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/gzhipin_test')
mongoose.connection.on('connected',function () {
    console.log('数据库链接成功');
})
// 2. 得到对应特定集合的Model
// 2.1. 字义Schema(描述文档结构)
const userSchema=mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel=mongoose.model('user',userSchema)
// 3.1. 通过Model实例的save()添加数据
function testSave() {
    const user={
        username:'fnagfang',
        password:md5('345'),
        type:'dashen'
    }
    const userModel=new UserModel(user)
    userModel.save(function (err,user) {
        console.log('save',err,user);
    })
}
testSave()
// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
    //查找多个
    UserModel.find(function (err,users) {
        console.log('find()',err,users);
    })
    // 查找一个
    UserModel.findOne({username:'Bob'},function (err,user) {
        console.log('findOne()',err,user);
    })
}
// testFind()

// 3.3. 通过Model的findByIdAndUpdate()更新某个数据

function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5b2c7c6c2d3e6c48208478d2'},{username:'lili'},function (err,user) {
        console.log('testUpdate()',err,user);
    })
}
// testUpdate()

function testRemove() {
    UserModel.remove({ _id: '5b2c7c6c2d3e6c48208478d2'},function (err,doc) {
        console.log('remove()',err,doc);
    })
}
// testRemove()