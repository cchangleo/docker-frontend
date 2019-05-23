
var yoloResult = {
    set text(val) {
        console.log(val);
        $("#yolo-result").append(val.OcrResult.text);

        return x._text = val;
    }
};

function runYolo() {

    var fd = new FormData();
    fd.append('fileYolo', $('#fileYolo')[0].files[0]);

   /* $.ajax({
        url: 'python/api/yolo',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            yoloResult.text = data;
        }
    });
*/
    $.ajax({
        url: 'yolo/api/yolo',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        type: 'POST',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            console.log("img done");
            var img = document.getElementById('yolo-img');
            var url = window.URL || window.webkitURL;
            img.src = url.createObjectURL(data);
        },
    });


}


$(document).ready(function () {

    $("#btn-yolo").on('click', function () {
        $("#yolo-result").html('<h4 id="yolo-header" class="mdl-cell mdl-cell--12-col">Page Segmentation(yolo) Result</h4><img id="yolo-img">');
        runYolo();
    });

});