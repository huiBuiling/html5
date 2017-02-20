var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;   //秋的半径
var MARGIN_TOP = 60;  //距离画布的上边缘
var MARGIN_LEFT = 30; //距离画布的左边缘

var endTime = new Date(2017,1,22,18,47,52);  //结束时间
var curShowTimeSeconds=0;   //相差的秒数

window.onload = function(){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function(){
    	render(context);
    	update();
    },50);
    
}

/**
 * 更改时间
 * @return {[type]} [description]
 */
function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60

    if( nextSeconds != curSeconds ){

        curShowTimeSeconds = nextShowTimeSeconds;
    }
}
/**
 * 得到当前的时间
 * @return {[type]} [description]
 */
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 )

    return ret >= 0 ? ret : 0;
}

function render( cxt ){

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); //擦除画布

    var hours = parseInt( curShowTimeSeconds / 3600);  //具体的小时
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 ); //具体的分钟数
    var seconds = curShowTimeSeconds % 60;  //具体的秒钟

    //第一个数字
    //renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    //之所以RADIUS+1是为了保持空隙，这里是15，是因为每个数字占7列，也就是7个球，那么下一个数字的
    //最左边就是7*2的距离，为了空隙就15了
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
}

/**
 * 绘制
 * @param   x   圆心的x坐标
 * @param   y   圆心的y坐标
 * @param   num 要绘制的数字
 * @param   cxt context
 * @return  void
 */
function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";
    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

