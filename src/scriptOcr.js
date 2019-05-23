
var ocrResult = {    
    set text(val) {
      console.log(val);
      $("#ocr-result").append(val.OcrResult.text);
      
      return x._text = val;
    }
  };

function runOcr() {
    var request = {
        content: $("#text-area-input").val()
    };

    var data = new FormData();
    jQuery.each(jQuery('#file')[0].files, function (i, file) {
        data.append('file-' + i, file);
    });

    var fd = new FormData();
    fd.append('file', $( '#file' )[0].files[0]);

    $.ajax({
        url: 'python/api/ocr',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ocrResult.text = data;
        }
    });



}


$(document).ready(function () {

    $("#btn-ocr").on('click', function () {
        $("#ocr-result").html('<h4 id="ocr-header" class="mdl-cell mdl-cell--12-col">OCR Result</h4>');
        runOcr();
    });

});