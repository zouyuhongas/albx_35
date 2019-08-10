
var kenghuo = {
    // 获取路由名称
    getRouterName:(str)=>{
        let index = str.indexOf('?');  //查询参数标记
        let routerName = '';
        if(index == -1){ //这样说明没有参数
            routerName =str.substring(str.lastIndexOf('/')+1)
        }else{
            routerName = str.substring(str.lastIndexOf('/')+1,str.indexOf('?'))
        }
        return routerName
    },
    // 获取url?后面的参数
    getParameter: (str)=>{
        // 获取参数 
        let obj = {};
        //区出id号码后面的问号,因为?号是第一个所以选第一个
        str = str.substring(1);
        // 然后用&号开始分割
        let temp = str.split('&');
        // 遍历数组
        for(var i =0 ; i < temp.length; i++){
            // 利用等号来分割每个数组,然后得到对象
            let arr = temp[i].split('=');
            obj[arr[0]] = arr[1];
            return obj;
        }
        // return 
    }
} 