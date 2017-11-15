
//初始化参数
var initOption = {
    col:4,
    row:4,
    score:0,
    defaultPadding:20,
    tileWidth:100,
    tileHeight:100,
    numtilestyle:{
        "position":"absolute",
        "text-align":"center",
        "line-height":"100px"
    },
    tiles:{ 
    "2":{"background-color": "rgb(238,228,218)", "color":"rgb(124,115,106)", "font-size": "58px"},
    "4":{"background-color": "rgb(236,224,200)", "color":"rgb(124,115,106)", "font-size": "58px"},
    "8":{"background-color": "rgb(242,177,121)", "color":"rgb(255,247,235)", "font-size": "58px"},
    "16":{"background-color": "rgb(245,149,99)", "color":"rgb(255,250,235)", "font-size": "50px"},
    "32":{"background-color": "rgb(244,123,94)", "color":"rgb(255,247,235)", "font-size": "50px"},
    "64":{"background-color": "rgb(247,93,59)", "color":"rgb(255,247,235)", "font-size": "50px"},
   "128":{"background-color": "rgb(236,205,112)", "color":"rgb(255,247,235)", "font-size": "42px"},
   "256":{"background-color": "rgb(237,204,97)", "color":"rgb(255,247,235)", "font-size": "42px"},
   "512":{"background-color": "rgb(236,200,80)", "color":"rgb(255,247,235)", "font-size": "42px"},
    "1024":{"background-color": "rgb(237,197,63)", "color":"rgb(255,247,235)", "font-size": "34px"},
    "2048":{"background-color": "rgb(238,194,46)", "color":"rgb(255,247,235)", "font-size": "34px"},
    "4096":{"background-color": "rgb(61,58,51)", "color":"rgb(255,247,235)", "font-size": "34px"}
    },
    animatespeed:200
}
var numBefore = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

var score = 0;
//扩展方法
var op = $.extend({},initOption,op);
var startGame = function(){
    for(var i = 0; i<op.col;i++){
        for(var j = 0;j<op.row;j++){
            var $tile = $("#tile-" + i + "-" + j);
            // $tile.css("left",getTilePos(i,j).left);
            // $tile.css("top",getTilePos(i,j).top);
            var pos = getTilePos(i,j);
            $tile.css("left",pos.left);
            $tile.css("top",pos.top);
        }
    }
}

//获得top-left值
function getTilePos(x,y){
    return{
        top : op.defaultPadding + (op.tileWidth + op.defaultPadding) * x,
        left : op.defaultPadding + (op.tileHeight + op.defaultPadding) * y
    }
}

//生成随机位置或随机数
function getRandomPos(){
    return{
        RandomX:Math.floor(Math.random() * 4),
        RandomY:Math.floor(Math.random() * 4)
    }
}


//判断存储数组是否存在0值
function isZero(arr){
    var numIndex = new Array;
    var temp = arr.reduce(function(a,b){return a.concat(b)});
    for(var i = 0;i < temp.length;i++){
        if(temp[i] == 0){
                numIndex.push(i);
        }
        //return true;
    } 
    return numIndex;
}

//生成初始 NumTile
var getNumTile = function(){
    var zeroSpace = isZero(numBefore)
    if(zeroSpace.length == 0){return false} 
    else{
        var randomVal = Math.random() > 0.5 ? 4: 2;
        var posindex = Math.floor(Math.random() * (zeroSpace.length-1))
        var posxy = zeroSpace[posindex];
        var Xindex = Math.floor(posxy/4);
        var Yindex = posxy%4;
        numBefore[Xindex][Yindex] = randomVal;
        $("#numTile-" + Xindex + "-" + Yindex).css(op.tiles[numBefore[Xindex][Yindex]]);
        $("#numTile-" + Xindex + "-" + Yindex).css(op.numtilestyle);
        $("#numTile-" + Xindex + "-" + Yindex).css("top",getTilePos(Xindex,Yindex).top+ 50);
        $("#numTile-" + Xindex + "-" + Yindex).css("left",getTilePos(Xindex,Yindex).left + 50);
        $("#numTile-" + Xindex + "-" + Yindex).animate({
            width:op.tileWidth,
            height:op.tileHeight,
            top:getTilePos(Xindex,Yindex).top,
            left:getTilePos(Xindex,Yindex).left
        },op.animatespeed)
        $("#numTile-" + Xindex + "-" + Yindex).html(numBefore[Xindex][Yindex]);
    }
    // var Xindex = getRandomPos.RandomX;
    // var Yindex = getRandomPos.RandomY;
    // var test = 0;
    // while()
}

//生成随机方格
var generateNumTile = function(){
    $(".numTile").remove();
    for(var i = 0;i<numBefore.length;i++){
        for(var j = 0;j<numBefore[i].length;j++){
            var $basicTile = $("#container");
            $basicTile.append('<div class="numTile" id = "numTile-'+i+'-'+j+'"></div>');
            if(numBefore[i][j] == 0){
                $("#numTile-" + i + "-" + j).css("width","0px");
                $("#numTile-" + i + "-" + j).css("height","0px");
                $("#numTile-" + i + "-" + j).css(op.numtilestyle);
                $("#numTile-" + i + "-" + j).css("top",getTilePos(i,j).top);
                $("#numTile-" + i + "-" + j).css("left",getTilePos(i,j).left);
                $("#numTile-" + i + "-" + j).html(" ");
            }else{
                $("#numTile-" + i + "-" + j).css(op.numtilestyle);
                $("#numTile-" + i + "-" + j).css("width",op.tileWidth);
                $("#numTile-" + i + "-" + j).css("height",op.tileHeight);
                $("#numTile-" + i + "-" + j).css("top",getTilePos(i,j).top);
                $("#numTile-" + i + "-" + j).css("left",getTilePos(i,j).left);
                $("#numTile-" +i + "-" + j).css(op.tiles[numBefore[i][j]]);
                $("#numTile-" + i + "-" + j).html(numBefore[i][j]);
                
            //     $("#numTile-" + i + "-" + j).animate({
            //         width:op.tileWidth ,
            //         height:op.tileHeight,
            //         top:getTilePos(i,j).top,
            //         left:getTilePos(i,j).left
            // },op.animatespeed);
                
            }
        }
    }

}

//移动格子操作
//首先判断格子能否移动
//是否能够向左移动
function moveLeftOk(arr){
    for(var i =0;i<op.col;i++){
        for(var j=1;j<op.row;j++){
            if(arr[i][j] != 0){
                if(arr[i][j-1] == 0 || arr[i][j-1] == arr[i][j]){
                    return true;
                }        
            }
        }
    }
    return false;
}

function moveRightOk(arr){
    for(var i =0;i<op.col;i++){
        for(var j=0;j<op.row-1;j++){
            if(arr[i][j] != 0){
                if(arr[i][j+1] == 0 || arr[i][j+1] == arr[i][j]){
                    return true;
                }
                    
                
            }
        }
    }
    return false;
}

function moveUpOk(arr){
    for(var i = 1;i<op.col;i++){
        for(var j=0;j<op.row;j++){
            if(arr[i][j] != 0){
                if(arr[i-1][j] == 0 || arr[i-1][j] == arr[i][j]){
                    return true;
                } 
            }
        }
    }
    return false;
}


function moveDownOk(arr){
    for(var i = 0;i<op.col-1;i++){
        for(var j=0;j<op.row;j++){
            if(arr[i][j] != 0){
                if(arr[i+1][j] == 0 || arr[i+1][j] == arr[i][j]){
                    return true;                            
                }
            }
        }
    }
    return false;
}

//移动格子后数字样式变化
function changeMoveNum(beginX,beginY,endX,endY){
    var $moveTile = $("#numTile-" + beginX + "-" + beginY);
    $moveTile.css("left",0);
    $moveTile.css("top",0);
    // $moveTile.css("left",getTilePos(beginX,beginY).left);
    // $moveTile.css("top",getTilePos(beginX,beginY).top);
    // $($moveTile).css("width","0px");
    // $($moveTile).css("height","0px");
    $moveTile.animate({
        left:getTilePos(endX,endY).left,
        top:getTilePos(endX,endY).top,
    },op.animatespeed);
}

//判断移动方向中间是否有数字阻挡
function directIsOk(contVal,minVal,maxVal,arr,type){
    switch(type){
        case "hoz" :
            for(var i = minVal+1;i < maxVal;i++){
                if(arr[contVal][i] != 0) return false;
            }
            return true;
            break;
        case "vet":
            for(var i = minVal + 1;i<maxVal;i++){
                if(arr[i][contVal] != 0) return false;
            }
            return true;
            break;
    }
}

//左移动格子
moveLeft = function(){
    var numAfter = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    if(!moveLeftOk(numBefore)){return false};
    
    for(var i = 0;i<op.row;i++){
        for(var j = 1;j<op.col;j++){
            if(numBefore[i][j] != 0){
                for(var m = 0;m < j;m++){
                    //移动位置为空情况
                    if(numBefore[i][m] == 0 && directIsOk(i,m,j,numBefore,"hoz")){
                        changeMoveNum(i,j,i,m);
                        numBefore[i][m] = numBefore[i][j];
                        numBefore[i][j] = 0;
                        continue;
                    }
                    //移动位置值相同情况
                    else if(numBefore[i][m] == numBefore[i][j] && directIsOk(i,m,j,numBefore,"hoz")){
                        changeMoveNum(i,j,i,m);                        
                        if(numAfter[i][m] != 0){
                            numBefore[i][m+1] = numBefore[i][j];
                            numBefore[i][j] = 0
                        }else{
                            numBefore[i][m] += numBefore[i][j];
                            numBefore[i][j] = 0;
                            numAfter[i][m] = 1;
                            score += numBefore[i][m];
                        }
                    continue;   
                    }
                }
            }
        }
    }
   
    generateNumTile();
}

//右移动格子
moveRight = function(){
    if(!moveRightOk(numBefore)){return false};
    var numAfter = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i = 0;i<op.row;i++){
        for(var j = op.col-2;j >= 0;j--){
            if(numBefore[i][j] != 0){
                for(var m = op.col -1;m > j;m--){
                    //移动位置为空情况
                    if(numBefore[i][m] == 0 && directIsOk(i,j,m,numBefore,"hoz")){
                        changeMoveNum(i,j,i,m);
                        numBefore[i][m] = numBefore[i][j];
                        numBefore[i][j] = 0;
                        continue;
                    }
                    //移动位置值相同情况
                    else if(numBefore[i][m] == numBefore[i][j] && directIsOk(i,j,m,numBefore,"hoz")){
                        changeMoveNum(i,j,i,m);                        
                        if(numAfter[i][m] != 0){
                            numBefore[i][m-1] = numBefore[i][j];
                            numBefore[i][j] = 0;
                        }else{
                            numBefore[i][m] += numBefore[i][j];
                            numBefore[i][j] = 0;
                            numAfter[i][m] = 1;
                            score += numBefore[i][m];
                        }
                        continue;
                    }
                }
            }
        }
    }
    
    generateNumTile();
}

//上移动格子
moveUp = function(){
    var numAfter = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    if(!moveUpOk(numBefore)){return false};

    for(var j = 0;j<op.col;j++){
        for(var i = 1;i<op.row;i++){
            if(numBefore[i][j] != 0){
                for(var m = 0;m < i;m++){
                    //移动位置为空情况
                    if(numBefore[m][j] == 0 && directIsOk(j,m,i,numBefore,"vet")){
                        changeMoveNum(i,j,m,j);
                        numBefore[m][j] = numBefore[i][j];
                        numBefore[i][j] = 0;
                        continue;
                    }
                    //移动位置值相同情况
                    else if(numBefore[m][j] == numBefore[i][j] && directIsOk(j,m,i,numBefore,"vet")){
                        changeMoveNum(i,j,m,j);                        
                        if(numAfter[m][j] != 0){
                            numBefore[m +1][j] = numBefore[i][j];
                            numBefore[i][j] = 0;
                        }else{
                            numBefore[m][j] += numBefore[i][j];
                            numBefore[i][j] = 0;
                            numAfter[m][j] = 1;
                            score += numBefore[m][j];
                        }
                        continue;
                    }
                }
            }
        }
    }
    generateNumTile();
}

//下移动格子
moveDown = function(){
    var numAfter = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    if(!moveDownOk(numBefore)){return false};

    for(var j = 0 ;j < op.col;j++){
        for(var i = op.row - 2;i >= 0;i--){
            if(numBefore[i][j] != 0){
                for(var m = op.row - 1 ;m > i;m--){
                    //移动位置为空情况
                    if(numBefore[m][j] == 0 && directIsOk(j,i,m,numBefore,"vet")){
                        changeMoveNum(i,j,m,j);
                        numBefore[m][j] = numBefore[i][j];
                        numBefore[i][j] = 0;
                        continue;
                    }
                    //移动位置值相同情况
                    else if(numBefore[m][j] == numBefore[i][j] && directIsOk(j,i,m,numBefore,"vet")){
                        changeMoveNum(i,j,m,j);                        
                        if(numAfter[m][j] != 0){
                            numBefore[m-1][j] = numBefore[i][j];
                            numBefore[i][j] = 0;
                        }else{
                            numBefore[m][j] += numBefore[i][j];
                            numBefore[i][j] = 0;
                            numAfter[m][j] = 1;
                            score += numBefore[m][j];
                        }
                        continue;
                    }
                }
            }
        }
    }
    generateNumTile();
}

//键盘操作事件
var keyBoardEvent = function(e){
    switch(e.which){
        case 37:
        moveLeft();
        refreshScore();
        getNumTile();
        gameover();
        break;

        case 38:
        moveUp();
        refreshScore();
        getNumTile();
        gameover();
        break;

        case 39:
        moveRight();
        refreshScore();
        getNumTile();
        gameover();
        break;

        case 40:
        moveDown();
        refreshScore();
        getNumTile();
        gameover();
        break;
    }
}
$(document).on("keydown",keyBoardEvent);

//鼠标事件
var mousedownevent = {};
$(function(){
    $(document).on("mousedown",function(e){
        mousedownevent ={
            X:e.pageX,Y:e.pageY
        }
    });

    $(document).on("mouseup",function(evt){
        var upX = evt.pageX;
        var upY = evt.pageY;
        var dis = Math.sqrt(Math.pow((mousedownevent.X-upX),2) + Math.pow((mousedownevent.Y-upY),2));
        if(dis > 5){
            if(Math.abs(mousedownevent.X-upX) > Math.abs(mousedownevent.Y-upY)){
                if((mousedownevent.X - upX) < 0){
                    moveRight();
                    refreshScore();
                    getNumTile();
                    gameover();
                }else{
                    moveLeft();
                    refreshScore();
                    getNumTile();
                    gameover();
                }
            }else{
                if((mousedownevent.Y-upY) < 0){
                    moveDown();
                    refreshScore();
                    getNumTile();
                    gameover();
                }else{
                    moveUp();
                    refreshScore();
                    getNumTile();
                    gameover();
                }
            }
            
        }
    });

   
});


//更新分数
function refreshScore(){
    $("#currentScore").html(score);
}

//判断游戏是否结束
function gameover(){
    if(moveUpOk(numBefore) || moveDownOk(numBefore) || moveLeftOk(numBefore) || moveRightOk(numBefore) || getNumTile()){
        return false;
    }else{
        $("#gameover").css("display","block");
    }
}

//初始化状态
startGame();
generateNumTile();
getNumTile();
getNumTile();


//开始新游戏
$("#startNewgame").on("click",function(){
    $("#gameover").css("display","none");
    numBefore = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    generateNumTile();
    getNumTile();
    getNumTile();
})

