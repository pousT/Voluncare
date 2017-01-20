//登录
module.exports.login = function(req, res) {
    res.render('login', { title: '登录' });
}
//注销
module.exports.logout = function(req,res){  
    req.session.user = null;
    req.session.error = null;
    res.redirect("/login");
}
//新建活动
module.exports.newAct = function(req,res){
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    if(req.session.user.status<0){
        req.session.error = "没有权限"
        res.redirect("/home");
    }
    res.render('newAct', { title: '新建活动'});
}
//活动列表
module.exports.actList = function(req,res){
    var Activity = global.dbHandel.getModel('activity');
    Activity.find({},{title:1, image:1, start:1},function(err,docs) {
        if(err) {
            res.sendStatus(500);
            console.log(err);
        }else if(!docs) {
            req.session.error = '活动列表为空';
            res.locals.error = '活动列表为空'; 
            res.sendStatus(404);                            //    状态码返回404
        }else {
            res.render('actList', { title: '活动列表', activities: docs});
            console.log(docs);            
        }
    });
}
//个人主页
module.exports.home = function(req, res) {
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    else{
        res.render("home",{title:'个人主页'});         //已登录则渲染home页面
    }
};
//上传头像
module.exports.avatar = function(req, res) {
    res.render("avatar", {title: '上传头像'});
};
//上传封面图
module.exports.actImage = function(req, res) {
    res.render("actImage", {title: '上传活动封面图'});
};
//活动详情
module.exports.actDetail = function(req, res, next) {
  var id = req.params.id;

    var Activity = global.dbHandel.getModel('activity');
    Activity.findOne({_id: id},function(err,doc) {
        if(err){ 
            res.sendStatus(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            res.cookie('activity', doc); 
            res.render('activity', {title: '活动详情', activity: doc});
        }else {
            req.session.error =  '活动不存在！';
            res.redirect("/actList");
        }
});
}
