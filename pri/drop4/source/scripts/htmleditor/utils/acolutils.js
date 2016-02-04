function createCKEditor(element){
    var editor = CKEDITOR.instances[element];
    if(editor){
        CKEDITOR.instances[element].destroy()
    }
    CKEDITOR.replace(element);
    CKEDITOR.config.width = "95%";
    CKEDITOR.config.height = "450px";

}

function readCKEditor(element){
    return CKEDITOR.instances[element].getData();
}

function createTinyMceEditor(element){
    tinyMCE.remove()
    tinymce.init({
        selector: '#'+element,
        color_picker_callback: function(callback, value) {
            callback('#FF00FF');
        },
        width : '95%',
        height : 450,
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools responsivefilemanager' //responsivefilemanager to upload a file
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | responsivefilemanager |',
        toolbar2: 'print preview media | forecolor backcolor emoticons',
        image_advtab: false,
        file_browser_callback : 'myFileBrowser',
        file_browser_callback_types: 'file image media',
        external_filemanager_path:"http://localhost:1001/",
        filemanager_title:"Responsive Filemanager" ,
        /*external_plugins: {
            "filemanager": "/libs/tinymce/js/tinymce/plugins/responsivefilemanager/plugin.min.js"
        }*/

    });
}

function readTinyMceEditor(element){
    return tinymce.get(element).getContent();
}

function httpPost(data){
    data.$http.post(data.url, data.postParam,data.onSucess,data.onError);
}
