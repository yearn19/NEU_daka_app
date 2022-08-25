
"ui";
// auto();
// auto.waitFor();
// auto.setMode();

const versionCode=0;
const versionName="0.0.0-En";

importClass(java.lang.Runnable);
importClass(android.widget.ListView);

importClass(android.graphics.Paint);
//主题色
const themeColor="#aaccaa";
//抽屉用到的颜色ip
const color = "#009688";

var version="1.0.0";
var newversion="1.0.0";

var shoot=0;//截屏权限，防止重复运行


//tabs 数据
var tabs_data = {
    //tabs 背景
    bg: "#ffffff",
    selectColor: {
        //当前页面选中颜色
        on: "#00ffff",
        //当前页面未选中颜色
        off: "#999999"
    },
    //图标大小
    srcSize: 24,
    //字体大小
    textSize: 12,
    //动画缩放比例 未加入动画效果
    zoom: 1.2,
    //是否显示指示器小横条
    tabs_h: true,
    //tabs 按钮数据
    data: [
        ["脚本", "@drawable/ic_assignment_black_48dp"],
        ["说明", "@drawable/ic_clear_black_48dp"],
        ["我的", "@drawable/ic_perm_identity_black_48dp"],        
        ["设置", "@drawable/ic_settings_black_48dp"],
    ],
}

//tabs按钮 布局视图信息
var tabs_view = []
//tabs按钮 当前选中按钮
var selectView = 0;

//自定义控件 tabs按钮
var Tabs_btn_layout = function () {
    //继承ui.Widget
    util.extend(Tabs_btn_layout, ui.Widget);
    function Tabs_btn_layout() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性data ,定义控件的每个参数 传入值为整数
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            //获取当前控件的参数值 tabs_data.data[value] 赋值到arr数组
            arr = tabs_data.data[value]
            //设定 _text控件文本
            view._text.setText(arr[0])
            //设定 _src控件图片
            view._src.attr("src", arr[1])
            //把当前控件信息集合到tabs_view数组里面
            tabs_view[tabs_view.length] = view
            //如果当前控件为初始值 则设定控件颜色为选中颜色 selectView==value==0 
            if (value == selectView) {
                view._src.attr("tint", tabs_data.selectColor.on)
                view._text.setTextColor(colors.parseColor(tabs_data.selectColor.on))
            }
        });
    }
    Tabs_btn_layout.prototype.render = function () {
        return (
            //1.0.0-1 修改 w="*" 参数 屏幕方向发生变化时 宽度自适配
            <vertical id="_bg" w="*" bg="{{tabs_data.bg}}" padding="0 10" gravity="center" >
                <img w="{{tabs_data.srcSize}}" id="_src" tint="{{tabs_data.selectColor.off}}" />
                <text w="auto" id="_text" textSize="{{tabs_data.textSize}}" textColor="{{tabs_data.selectColor.off}}" />
            </vertical>
        )
    }
    ui.registerWidget("tabs_btn-layout", Tabs_btn_layout);
    return Tabs_btn_layout;
}()

//自定义控件 tabs
var Tabs_layout = function () {
    util.extend(Tabs_layout, ui.Widget);
    function Tabs_layout() {
        ui.Widget.call(this);
        this.defineAttr("data", (view, attr, value, defineSetter) => {
            //遍历 tabs_data.data数组 
            for (var i = 0; i < tabs_data.data.length; i++) {
                time = i
                //1.0.0-1 增加 layout_weight="1"参数 屏幕方向发生变化时 宽度自适配
                ui.inflate(<tabs_btn-layout data="{{time}}" layout_weight="1" />, view._tabs, true)
            }
            //根据tabs_h值设置 _color颜色
            tabs_data.tabs_h ? _color = tabs_data.selectColor.on : _color = "#00000000";
            view.tabs.selectedTabIndicatorColor = colors.parseColor(_color);//设置tabs指示器颜色
        });
    }
    Tabs_layout.prototype.render = function () {
        return (
            <frame w="*" h="auto" >
                <horizontal id="_tabs" />
                <tabs id="tabs" />
            </frame>
        )
    }
    ui.registerWidget("tabs-layout", Tabs_layout);
    return Tabs_layout;
}()

ui.layout(
    <frame>
    <drawer id="drawer">
        <relative>
        <vertical h="*">
            <appbar >
                <toolbar id="toolbar" title="NEU极速版" subtitle="student" >
                <Switch id="autoService" marginLeft="4" marginRight="6" checked="{{auto.service != null}}" layout_gravity="right"/>
                    <text layout_gravity="right" color="red">无障碍服务</text>
                    
                </toolbar>
                

            </appbar>
            
            <viewpager w="*" id="viewpager" layout_alignParentBottom="true" focusableInTouchMode="true" >
                <frame w="*">
                <vertical w="*">
                    
                <tabs bg={themeColor} id="tabs2"/>
                    <viewpager bg={themeColor} id="viewpager2" w="*" layout_alignParentBottom="true" focusableInTouchMode="true">
                        <frame >
                            <vertical focusable="true" focusableInTouchMode="true" >
                                
                                <list id="list" marginTop="4" marginLeft="16" marginRight="16" marginBottom="16" >
                                <horizontal w="*" focusable="true" focusableInTouchMode="true">
                                    <text id="title" text="{{this.displayName}}" textColor="{{this.displayColor}}" textSize="18sp" layout_weight="1" margin="5 0 5 10"/>
                                    <text text="{{this.displayName2}}" textColor="{{this.displayColor2}}" textSize="18sp"  layout_weight="1" margin="5 0 5 10"/>
                                    <Switch id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" layout_weight="1"/>
                                </horizontal>
                                </list>
                            </vertical>
                            
                        </frame>
                        <frame>
                            <vertical w="*" focusable="true" focusableInTouchMode="true">
                               
                                <list id="list2" layout_weight="1" h="0" marginTop="4" marginLeft="16" marginRight="16" marginBottom="16" >
                                    <vertical w="*">
                                        <input id="name" lines="1" text="{{this.name}}" focusable="false" focusableInTouchMode="false" textSize="18sp" margin="5 0 5 10"/>
                                        <input id="idk"  lines="1" hint="{{this.id}}"  textSize="18sp" margin="5 0 5 10"/>
                                        <input id="password" lines="1" intputType="{{this.type}}" hint="{{this.password}}"  textSize="18sp" margin="5 0 5 10"/>
                                        <button id="save">保存配置</button>
                                    </vertical>
                                </list>
                            </vertical>
                            
                        </frame>
                        <frame>
                            <vertical w="*" focusable="true" focusableInTouchMode="true">
                                <text marginTop="4" marginLeft="16" marginRight="16" marginBottom="16" textColor="#1E90FF">软件纯属个人练习，想了解更多请移步个人博客、网站</text>
                                <horizontal>
                                <input layout_weight="1" lines="1" id="search_market" marginTop="8" marginLeft="18" marginRight="18" bg="#eeeeee" paddingLeft="18" paddingRight="18" hint="搜索"/>
                                
                                <button  w="70" id="more_market" marginTop="8"  marginRight="18" >搜索</button>
                                </horizontal>
                            </vertical>
                            <progressbar w="64" h="64" id="pro_market" layout_gravity="center" marginBottom="64"/>
                        </frame>
                    </viewpager>
                </vertical>
                </frame>

                <frame>
                    <text  text="简易使用说明：在配置的neu账号下的两行输入学号与密码，再回到脚本中，点击健康信息上报右侧的开关即可，成功的话会在屏幕下方弹出“打卡成功”。初次使用建议在打卡完成后去智慧东大中确认是否真的打卡成功。一次配置后下次使用无需再配置，密码栏会统一显示8个*号，如与自己真实密码长度不符不必惊讶"  textColor="red" textSize="16sp" />
                </frame>
                <frame>
                    <text text="探索版-第三页内容" textColor="green" textSize="16sp" />
                </frame>
                <frame>
                    <text text="探索版-第四页内容" textColor="green" textSize="16sp" />
                </frame>
            </viewpager>
        </vertical>
        <tabs-layout data="" layout_alignParentBottom="true" focusableInTouchMode="true" />

        </relative>

        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>

        
        
        
        
    </drawer>
            
    </frame>
);

ui.tabs.setupWithViewPager(ui.viewpager);//绑定ViewPager到指示器

//页面更改侦听器
ui.viewpager.setOnPageChangeListener({
    //已选定页面发生改变时触发
    onPageSelected: function (index) {
        log("上次选中" + tabs_view[selectView]._text.text())
        //设置selectView上次页面 图案和字体颜色为未选中颜色 tabs_data.selectColor.off
        tabs_view[selectView]._src.attr("tint", tabs_data.selectColor.off)
        tabs_view[selectView]._text.setTextColor(colors.parseColor(tabs_data.selectColor.off))
        //设置当前页面 图案和字体颜色为选中颜色 tabs_data.selectColor.on
        tabs_view[index]._src.attr("tint", tabs_data.selectColor.on)
        tabs_view[index]._text.setTextColor(colors.parseColor(tabs_data.selectColor.on))
        //更改标题 title 内容
        //ui.toolbar.setTitle(tabs_view[index]._text.text())
        //设置当前页面为 index
        selectView = index
    }
})

main();

function main(){

    //无障碍功能
    ui.autoService.on("check", function (checked) {

        if(checked && auto.service == null) {
            app.startActivity({
                action: "android.settings.ACCESSIBILITY_SETTINGS"
            });
        }
        if(!checked && auto.service != null){
            auto.service.disableSelf();
        }



    });

    // 当用户回到本界面时，resume事件会被触发
    ui.emitter.on("resume", function() {
        // 此时根据无障碍服务的开启情况，同步开关的状态
        ui.autoService.checked = auto.service != null;
    });

    uiInit();
}
/**
 * 初始化逻辑代码
 */
function uiInit(){
    ui.statusBarColor(themeColor);
    activity.setSupportActionBar(ui.toolbar);
    //设置滑动页面的标题
    ui.viewpager2.setTitles(["脚本", "配置","启动"]);
    //让滑动页面和标签栏联动
    ui.tabs2.setupWithViewPager(ui.viewpager2);
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);

    //搜索按钮
    //ui.more_market.setImageDrawable("@drawable/ic_menu_search");

    ui.emitter.on("create_options_menu", menu => {
        menu.add("声明");
        menu.add("反馈");
        menu.add("必看");
        menu.add("鸣谢");   
    });
    ui.emitter.on("options_item_selected", (e, item) => {
        switch (item.getTitle()) {
            case "声明":
                //直接跳网址吧
                alert("声明", "禁止不正当使用，禁止随意传播");
                break;
            case "反馈":
                //直接跳网址吧
                alert("邮箱", "2766285306@qq.com");
                break;
            case "必看":
                // alert("联系我","添加QQ：404").then(()=>{
                //     setClip("404");
                //     toast("已复制到剪切板");
                // });
                app.openUrl("https://blog.csdn.net/weixin_51659963/article/details/126516653?spm=1001.2014.3001.5501");
                break;
            case "鸣谢":
                alert("鸣谢", "github user Bmaili、csdn博主造雾者以及各社区学习博客的博主等");
                break;

        }
        e.consumed = true;
    });

    ui.menu.setDataSource([
        {
            title: "开发者",
            icon: "@drawable/ic_android_black_48dp"
        },
        {
            title: "设置",
            icon: "@drawable/ic_settings_black_48dp"
        },
        {
            title: "ROOT",
            icon: "@drawable/ic_favorite_black_48dp"
        },
        {
            title: "强制退出",
            icon: "@drawable/ic_exit_to_app_black_48dp"
        }
    ]);
    ui.menu.on("item_click", item => {
          switch(item.title){
              case "强制退出":
                  ui.finish();
                  break;
          }
    })

    var storage = storages.create("list");
    //从storage获取todo列表
    var list = storage.get("items",[
        {

            displayName:"健康信息上报",
            displayColor:"blue",
            displayName2:"可用",
            displayColor2:"green",
            //displayName3:"开启",
            //displayColor3:"green",
            done: false
        },
        {

            displayName:"健康信息上报2",
            displayColor:"blue",
            displayName2:"可用",
            displayColor2:"green",
            //displayName3:"开启",
            //displayColor3:"green",
            done: false
        },
        {

            displayName:"早午晚体温打卡",
            displayColor:"blue",
            displayName2:"不可用",
            displayColor2:"red",
            //displayName3:"开启",
            //displayColor3:"green",
            done: false
        }
    ]);
    ui.list.setDataSource(list);



    ui.list.on("item_click", function (item, i, itemView, listView) {
        itemView.done.checked = !itemView.done.checked;
    });


    // ui.list.on("item_long_click",(event,dataItem,i,itemView,listView)=>{
    //     confirm("确定要删除" + item.title + "吗？")
    //     .then(ok => {
    //         if (ok) {
    //             list.splice(i, 1);
    //         }
    //     });
    //     e.consumed = true;

    // });

    //变一次就改一次吧
    //当离开本界面时保存todoList
// ui.emitter.on("pause", () => {
//     storage.put("items", todoList);
// });
var storage2 = storages.create("list2");


let fieldMapping = {
    "id": "int",
    "id2": "String",//账号，按数字串处理
    "pass":"String"//密码
}
// 表名
let table = "record";
// 建表
let SQL = "CREATE TABLE IF NOT EXISTS " + table+" ("
    + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
    + "id2 VARCHAR(1024),"
    + "pass VARCHAR(1024)"
    + ")";
    //id是主键
    //id2是账号
    //id3区分是否有记录插入，其实麻烦了，不用了

// 数据库名
let db = "neu2xx";//简介
let dbUtils = new DbUtils(db, SQL, fieldMapping);
// 创建数据库和表
dbUtils.updateDatabase();

//数据增加
dbUtils.addRow(table, {id:0 ,id2: "",pass: ""  });
dbUtils.addRow(table, {id:1 ,id2: "",pass: ""  });


//从storage获取todo列表
log("412");
var id1="";//id1
var password1="";//密码1
var id2="";//id1
var password2="";//密码2
var password3="********"

log("419");
//遵从微信在前，QQ在后
//微信看备注

//这一步是为了显示已有数据，
if(dbUtils.isExistRow("SELECT * FROM  " + table + "  WHERE id = ? ", [ 0 ]))
{
    log("111");
    id1=String(dbUtils.findRows("SELECT * FROM record WHERE id = ?", [0],{"id": "int","id2": "String","pass":"String"})[0]["id2"]); 
    log(id1);
    password1=String(dbUtils.findRows("SELECT * FROM record WHERE id = ?", [0],{"id": "int","id2": "String","pass":"String"})[0]["pass"]); 
    log(password1);
    log("427");
}
if(dbUtils.isExistRow("SELECT * FROM  " + table + "  WHERE id = ? ", [ 1 ]))
{
    id2=String(dbUtils.findRows("SELECT * FROM record WHERE id = ?", [1],{"id": "int","id2": "String","pass":"String"})[0]["id2"]); 
    log(id1);
    password2=String(dbUtils.findRows("SELECT * FROM record WHERE id = ?", [1],{"id": "int","id2": "String","pass":"String"})[0]["pass"]); 
    log(password2);
}
log("436");

//解决配置不显示问题
var list2;
if(id1==""&&id2==""){
    list2 = storage2.get("items",[
    {

        name:"neu账号",
        id:"请输入学号",
        type:Number,
        password:"请输入密码",

    },
    {

        name:"他人账号",
        id:"请输入学号",
        type:Number,
        password:"请输入密码",

    }

]);
}
else if(id1!=""&&id2==""){
    list2 = storage2.get("items",[
        {
    
            name:"neu账号",
            id:id1,
            type:Number,
            password:password3,
    
        },
        {
    
            name:"他人账号",
            id:"请输入学号",
            type:Number,
            password:"请输入密码",
    
        }
    ]);
}
else if(id1!=""&&id2!=""){
    list2 = storage2.get("items",[
        {
    
            name:"neu账号",
            id:id1,
            type:Number,
            password:password3,
    
        },
        {
    
            name:"他人账号",
            id:id2,
            type:Number,
            password:password3,
    
        }
    ]);
}
else if(id1==""&&id2!=""){
    list2 = storage2.get("items",[
        {
    
            name:"neu账号",
            id:"请输入学号",
            type:Number,
            password:"请输入密码",
    
        },
        {
    
            name:"他人账号",
            id:id2,
            type:Number,
            password:password3,
    
        }
    ]);
}
ui.list2.setDataSource(list2);
ui.list2.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    //简单写
    var word00=itemView.name.text();
    if(word00=="neu账号"&&id1!="")//给第一次用，防止显示undefined
    {
        log("neu账号");
        //这里有一个id冲突问题
        itemView.id.setText(id1);
        itemView.password.setText(password3);

    }
    if(word00=="他人账号"&&id2!="")
    {
        itemView.id.setText(id2);
        itemView.password.setText(password3);

    }
    itemView.save.click(function () {

        log("发生1");
        var word0=itemView.name.getText();
        log(word0);
        log("发生2");
        var word1=itemView.idk.getText();
        log(word1);
        log("发生3");
        var word2=itemView.password.getText();
        log(word2);

        log("保存键被按下");

        if(word0=="neu账号")
        {
        //id没有改，通过id查，个人理解
        dbUtils.modifyRow("record", { id2: word1, id : 0 }, "id"); 
        var textt=String(dbUtils.findRows("SELECT * FROM record WHERE id = ?", [0],{"id": "int","id2": "String","pass":"String"})[0]["id2"]); 
        log(textt);
        dbUtils.modifyRow("record", { pass : word2, id : 0 }, "id"); 
        var textt2=String(dbUtils.findRows("SELECT * FROM record WHERE id = ?", [0],{"id": "int","id2": "String","pass":"String"})[0]["pass"]); 
        log(textt2);

        log("neu账号数据已更新");
        id1=word1;
        password1=word2;
        //这个赋值有用

        }

        if(word0=="他人账号")
        {
        //id没有改，通过id查，个人理解
        dbUtils.modifyRow("record", { id2: word1, id : 1 }, "id"); 
        dbUtils.modifyRow("record", { pass: word2, id : 1 }, "id"); 
        

        id2=word1;
        password2=word2;
        }




        
        toast("保存成功");
      });
});



ui.list.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    itemView.done.on("check", function (checked) {
        let item = itemHolder.item;
        //item.done = checked;
        let paint = itemView.title.paint;
        threads.start(function() {
            //网络相关内容

            // newversion = http.get("https://docs.qq.com/doc/DTkdvZ2pzbG1vdkJV").body.string().split("版本")[1];
            // log("version");
            // log(String(newversion));
            //检查是否有网络，检查版本，当初用的腾讯文档


        if(checked) {
            //很卡
            //toastLog("开")
            //运行子脚本记得开线程
            paint.flags &= ~Paint.STRIKE_THRU_TEXT_FLAG;
            
            if(itemView.title.getText()=="健康信息上报")
            {
            threads.start(function() {
                log(id1);
                log(password1);
                myPHP(id1,password1);
                
                
            });

            }
            else if(itemView.title.getText()=="健康信息上报2")
            {
            threads.start(function() {
                log(id2);
                log(password2);
                myPHP(id2,password2);
                
                
            });

            }
            else if(itemView.title.getText()=="早午晚体温打卡")
            {
            threads.start(function() {
                log("早午晚体温打卡");
                
                toast("无效");
                
                
            });

            }
            
            //toast("开");
        }else{
            //toastLog("关")
            paint.flags |= Paint.STRIKE_THRU_TEXT_FLAG;
            
            toast("关");
        }



        });//网络线程结尾

        itemView.title.invalidate();
        
    });
});
}


//任务，保存五个数据
//一行就够
//添0视为无效
function data(){
    let fieldMapping = {
        "id": "int",
        "id2": "String",//id
        "pass":"String"//标识位，修没修改过,正常全0，有1代表微信改了，有2代表QQ改了

    }
    // 表名
    let table = "record";
    // 建表
    let SQL = "CREATE TABLE IF NOT EXISTS " + table+" ("
        + "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        + "id2 VARCHAR(1024)"
        + "pass VARCHAR(1024)"
        + ")";
    // 数据库名
    let db = "neu";//简介

    // 创建数据库和表
    dbUtils.updateDatabase();

    //数据增加
    dbUtils.addRow(table, {id:0 ,id2: "",pass: ""  });
    dbUtils.addRow(table, {id:1 ,id2: "",pass: ""  });

    

    // //数据查询
    // let existStatus = dbUtils.isExistRow("SELECT * FROM  " + table + "  WHERE desc = ?", [text]);

    

    // "record", { desc: "124", id : 1 }, "id"
}







function DbUtils(dbName, createSQL, fieldMapping) {
    importClass(android.database.sqlite.SQLiteDatabase);
    importClass(android.content.ContentValues);
    importClass(android.database.Cursor);

    let dbName = dbName;
    let createSQL = createSQL;
    let fieldMapping = fieldMapping;

    /**
     * 打开数据库连接，例子：直接调用
     */
    this.open = function () {

        // let base_path = files.cwd();
        // log(base_path);
        // files.ensureDir(base_path + "/data/");
        // return SQLiteDatabase.openOrCreateDatabase(base_path + this.dbName, null);

        let base_path = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
        log(base_path);
        files.ensureDir(base_path + "/data/");
        return SQLiteDatabase.openOrCreateDatabase(base_path +"/"+ this.dbName, null);

        
    }

    /**
     * 关闭数据库连接，例子：直接调用
     */
    this.close = function (db) {
        if (db && db.isOpen()) {
            db.close();
        }
    }

    /**
     * 查询结果集转对象
     * @param {Object} cursor
     * @returns {Object}
     */
    this.cursorToObject = function (cursor, fieldMapping) {
        let object = {};
        for (let i = cursor.getColumnCount() - 1; i >= 0; i--) {
            let column_name = cursor.getColumnName(i);
            switch (fieldMapping[column_name]) {
                case "String":
                    object[column_name] = cursor.getString(i);
                    break;
                case "boolean":
                    object[column_name] = cursor.getString(i) == "true";
                    break;
                case "int":
                    object[column_name] = cursor.getInt(i);
                    break;
            }
        }
        return object;
    }

    /**
     * 新增一行记录，例子："record", { desc: "124" }
     * @param {String} table_name 
     * @param {Object} object 
     * @returns {boolean}
     */
    this.addRow = function (tableName, object) {
        let db = this.open();
        let values = new ContentValues();
        for (let key in object) {
            values.put(key, String(object[key]));
        }
        let result = db.insert(tableName, null, values);
        this.close(db);
        console.log("数据插入：" + values);
        return result > 0;
    }

    /**
     * 删除记录 例子："record",null,null 
     * @param {String} table_name 
     * @param {String} where_clause 
     * @param {Array<String>} where_args 
     * @returns {boolean}
     */
    this.deleteRows = function (tableName, whereClause, whereArgs) {
        let db = this.open();
        let result = db.delete(tableName, whereClause, whereArgs);
        this.close(db);
        console.log("清空记录条数：" + result)
        return result > 0;
    }

    /**
     * 修改记录，例子："record", { desc: "124", id : 1 }, "id"
     * @param {String} tableName
     * @param {Object} object 
     * @param {String} where_key 
     * @returns {boolean}
     */
    this.modifyRow = function (tableName, object, whereKey) {
        let db = this.open();
        let values = new ContentValues();
        for (let key in object) {
            if (key == whereKey) {
                continue;
            }
            values.put(key, String(object[key]));
        }
        let result = whereKey != null ? db.update(tableName, values, whereKey + " = ?", [object[whereKey]]) : db.update(tableName, values, null, null);
        this.close(db);
        return result > 0;
    }

    /**
     * 查询记录，例子："SELECT * FROM xianyu WHERE desc = ?", ["125"], { "id": "int", "desc": "String" }
     * @param {String} sql 
     * @param {Array<String>} selectionArgs
     * @param {Object} property_mapping_type 
     * @returns {Array<Object>}
     */
    this.findRows = function (sql, selectionArgs, fieldMapping) {
        let db = this.open();
        let list = [];
        let cursor = db.rawQuery(sql, selectionArgs);
        while (cursor.moveToNext()) {
            list.push(this.cursorToObject(cursor, fieldMapping));
        }
        cursor.close();
        this.close(db);
        return list;
    }

    /**
     * 存在记录，例子："SELECT * FROM xianyu WHERE desc = ?", ["125"]
     * @param {String} sql 
     * @param {Array<String>} selectionArgs
     * @returns {boolean}
     */
    this.isExistRow = function (sql, selectionArgs) {
        let db = this.open();
        let cursor = db.rawQuery(sql, selectionArgs);
        let result = cursor.getCount();
        cursor.close();
        this.close(db);
        return result > 0;
    }

    /**
     * 执行sql建表， 例子：直接调用
     */
    this.updateDatabase = function () {
        let db = this.open();
        db.execSQL(createSQL);
        this.close(db);
    }
}

function myPHP(idk,passwordk)
{
    var url = "http://177.77.77.77/my_sql.php";
    log("线程中");
    log(idk);
    log(password);
    var r = http.post(url, {
            "TPL_username": idk,
            "TPL_password": passwordk
        });

    var data=r.body.json();
    //toast(data.a);
    log("返回的数据");
    log(data.temp1);
    log(data.temp2);

    if(data.sql==200)
    {
        //数据库插入成功
        log("登数据库插入成功");
    }
    else if(data.sql==201){
        //数据库修改成功
        log("数据库修改成功");
    }
    else if(data.sql==500){
        //数据库操作失败
        log("数据库操作失败");
    }

    if(data.python_login==1200)
    {
        //登陆成功
        log("登陆成功");
    }
    else if(data.python_login==1500){
        //登陆失败
        log("登陆失败");
    }

    if(data.python_daka==2200)
    {
        //打卡成功
        log("打卡成功");
    }
    else if(data.python_daka==2500){
        //打卡失败
        log("打卡失败");
    }



    if(data.python_login==1200 && data.python_daka==2200)
    {
        toast("打卡成功");
    }
    else
    {
        toast("打卡失败");
    }

// if(data.a=1)
// {
//     toast("快乐");
// }
}

