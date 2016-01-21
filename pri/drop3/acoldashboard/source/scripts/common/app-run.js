app.run(function ($rootScope) {
    $rootScope.productCollection = [
        {"id":1100,"prodCode":"WEBSELLA2","name":"WebSella2","version":"0.1.ALPHA","descr":"","favorite":0,"numSteps":4,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":"6"},
        {"id":1101,"prodCode":"WEBSELLA1","name":"WebSella1","version":"0.1.ALPHA","descr":"","favorite":2,"numSteps":5,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1102,"prodCode":"WEBSELLA3","name":"WebSella3","version":"0.1.ALPHA","descr":"","favorite":3,"numSteps":6,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""},
        {"id":1103,"prodCode":"WEBSELLA4","name":"WebSella4","version":"0.1.ALPHA","descr":"","favorite":5,"numSteps":3,"templateCode":null,"createUser":"User","createDate":1451562186556,"updateDate":1451562186556,"updateUser":"User","properties":[{"id":50,"value":"TestValue1","code":"TestCode1","prod":"WEBSELLA"}],"releases":[],"steps":""}];
$rootScope.currentStep=0;
$rootScope.selectedData ={};
$rootScope.models = {
        selected: null,
        product_allowed_types: ["widget"],
        product_steps: [],
        lists: {},
        wlist:[],
       
         
};
$rootScope.categories=["A","B"]
$rootScope.widgetImages=[
                        {name:"Nome e Cognome",img:"nome_cognome",catId:"A"},
                        {name:"Codice fiscale ",img:"cod_fiscale",catId:"B"}
                ];
$rootScope.createWidgetData = function(){
    var widgetImg = $rootScope.widgetImages;
    var widgetCat= $rootScope.categories;
    for(var j=0;j<widgetCat.length;j++){
         var wCat = widgetCat[j];
        $rootScope.models.lists[wCat]=[];
        for (var i = 0; i < widgetImg.length; i++) {
            var widgetId = widgetImg[i].img;
            var categoryId = widgetCat[j]+"_"+widgetId;
            var imgUrl = "source/images/"+widgetId+".JPG"
           if(widgetImg[i].catId==wCat){
            $rootScope.models.lists[wCat].push({id:widgetId, type:"widget", catId:categoryId + i, 
                                                    label: widgetImg[i].name,url:imgUrl});
           }
          
        }
    }
};
    $rootScope.createWidgetData();
$rootScope.createDataJson = function(obj){
        var dataObj={};
        dataObj.id =obj.id || '';
        dataObj.prodCode = obj.prodCode || '';
        dataObj.name=obj.name||'';
        dataObj.version=obj.version||'';
        dataObj.descr = obj.descr ||'';
        dataObj.favorite = obj.favorite ||'';
        dataObj.numSteps = obj.numSteps ||'';
        dataObj.templateCode =obj.templateCode ||'';
        dataObj.createUser =obj.createUser||'';
        dataObj.createDate =obj.createDate ||'';
        dataObj.updateDate = obj.updateDate ||'';
        dataObj.updateUser =obj.updateUser ||'';
        dataObj.properties = obj.properties||[];
        dataObj.releases =obj.releases||[];
        dataObj.steps = obj.steps ||'';
        return dataObj;
        
    };
   
        /*$rootScope.models.images.push({name:"name_cogname",url:"source/images/nome_cognome.JPG"});
        $rootScope.models.images.push({name:"cod_fiscale",url:"source/images/cod_fiscale.JPG"});*/
   
    $rootScope.getSelectedData = function(isNew){
        var prevSelect= angular.element(document.getElementsByClassName("stSelected"));
          if(prevSelect.length == 0 && !isNew &&  $rootScope.selectedData){
              return  $rootScope.selectedData;
          }
        var index = prevSelect.attr("idx");
        var obj = {};
          if(isNew){
              index = $rootScope.productCollection.length-1;
              
          }
          obj={'idx':index,'data':$rootScope.productCollection[index]}
        if (index && index !== -1) {
            $rootScope.selectedData =obj;
        return obj;}else{return false;}
    }
    $rootScope.go = function(path){
       location.href="#"+path;
    }
    $rootScope.setCurrentStep = function(step){
        $rootScope.currentStep = step;
    }
     $rootScope.getCurrentStep = function(){
        return($rootScope.currentStep);
    }
    $rootScope.proceedStep = function(id,srcpath,isView) {
        $rootScope.isView = location.hash.indexOf("viewWidgets")!=-1 || isView;
        var selectData = $rootScope.getSelectedData() && $rootScope.getSelectedData().data || null;
        var id = id || selectData && selectData.id ||'';
        var path = '';
        if(srcpath){
        path = id && srcpath && srcpath+id ||srcpath
        }else{
        path = id && (location.hash.indexOf("viewWidgets")!=-1  && "/viewWidgets/"+id || location.hash.indexOf("editWidgets")!=-1 &&                      "/editWidgets/"+id )||"/addWidgets" ||'';
        path = isView && "/viewWidgets/"+id||path;}
       $rootScope.go(path +'/step:'+$rootScope.getCurrentStep());
    }
    
 
});
