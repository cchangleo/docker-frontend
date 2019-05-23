
var response;
    var classificationResponse;
    var summary;
    var classification;
    var x;

    var summaryFeedback = [];
    var labelFeedback = [];

    function handleClick(cb, feeedbackId) {
      console.log("Clicked " + feeedbackId + ", new value = " + cb.checked);

      summaryFeedback.find(x => x.id === feeedbackId).value = cb.checked;
    }

    function handleClickLabelFeedback(cb, feeedbackId) {
      console.log("Clicked " + feeedbackId + ", new value = " + cb.checked);

      labelFeedback.find(x => x.id === feeedbackId).value = cb.checked;
    }

    var article;
    function downloadArticle() {

      $.ajax({
        url: 'v1/news/random', // url where to submit the request
        headers: {
          'Content-Type': 'application/json'
        },
        type: "GET", // type of action POST || GET              
        success: function (result) {
          // you can see the result from the console
          // tab of the developer tools
          console.log(result);
          article = result;
          x.bar = result;

          componentHandler.upgradeDom();
        },
        error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
        }
      })
    }

    var x = {
      article: null,
      set bar(val) {
        console.log(val);
        $("#text-area-input").val(val.text);
        return x._bar = val;
      }
    };

    $(document).ready(function () {
      // click on button submit

      $("#btn-summarize-load-article").on('click', function () {
        downloadArticle();        
      });


      $("#btn-summarize").on('click', function () {
        console.log('Click btn-summarize');
        // send ajax

        $("#sum-result").html('<h4 id="sum-header" class="mdl-cell mdl-cell--12-col">Summary</h4>');

        var request = {
          content: $("#text-area-input").val()
        };



        $.ajax({
          url: 'v1/articles', // url where to submit the request
          headers: {
            'Content-Type': 'application/json'
          },
          type: "POST", // type of action POST || GET
          dataType: 'json', // data type
          data: JSON.stringify(request), // post data || get data
          success: function (result) {
            // you can see the result from the console
            // tab of the developer tools
            console.log(result);
            response = result;

            $.ajax({
              url: 'v1/articles/' + response.id + '/summaries', // url where to submit the request
              headers: {
                'Content-Type': 'application/json'
              },
              type: "POST", // type of action POST || GET
              dataType: 'json', // data type
              data: JSON.stringify({}), // post data || get data
              success: function (result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
                summary = result[0];



                var index, len;
                len = result.sentences.length;
                summaryFeedback = [];

                for (index = 0; index < len; ++index) {

                  var s = result.sentences[index];

                  summaryFeedback.push({ id: s.id, value: true });

                  var inText = '<div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">' +
                    ' <label class="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" for="icon-toggle-' + s.id + '">' +
                    ' <input type="checkbox" id="icon-toggle-' + s.id + '" class="mdl-icon-toggle__input" onclick="handleClick(this, ' + s.id + ');" checked>' +
                    '<i class="mdl-icon-toggle__label material-icons">thumb_up</i>' +
                    '</label> ' +
                    ' </div>' +
                    '  <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">' + s.value + '  </div>';
                  $("#sum-result").append(inText);
                }

                componentHandler.upgradeDom();
              },
              error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
              }
            })
          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
          }
        });


      });

      $("#btn-submit-feedback").on('click', function () {
        // send ajax
        console.log('Click btn-submit-feedback');

        summaryFeedback.forEach(function (item) {
          console.log(JSON.stringify(item));

          $.ajax({
            url: 'v1/articles/' + response.id + '/summaries/' + summary.id + '/sentences/' + item.id + '/sentenceFeedbacks', // url where to submit the request
            headers: {
              'Content-Type': 'application/json'
            },
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            data: JSON.stringify({ id: item.id, user: 'test', feedbackValue: 'V' + item.value }), // post data || get data
            success: function (result) {
              console.log(result);

            },
            error: function (xhr, resp, text) {
              console.log(xhr, resp, text);
            }
          })

        });


        componentHandler.upgradeDom();
      });


      $("#btn-submit-feedback-classification").on('click', function () {
        // send ajax
        console.log('Click btn-submit-feedback-classification');



        labelFeedback.forEach(function (item) {
          console.log(JSON.stringify(item));

          $.ajax({
            url: 'v1/articles/' + classificationResponse.id + '/classifications/' + classificationResponse.id + '/labels/' + item.id + '/labelFeedbacks', // url where to submit the request
            headers: {
              'Content-Type': 'application/json'
            },
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            data: JSON.stringify({ id: item.id, user: 'test', feedbackValue: 'V' + item.value }), // post data || get data
            success: function (result) {
              console.log(result);

            },
            error: function (xhr, resp, text) {
              console.log(xhr, resp, text);
            }
          })

        });
      });




      $("#btn-classify").on('click', function () {
        // send ajax
        console.log('Click btn-classify');

        $("#classify-result").html('<h4 id="classify-header" class="mdl-cell mdl-cell--12-col">Classification</h4>');

        var requestClassify = {
          content: $("#text-area-input-classify").val()
        };

        $.ajax({
          url: 'v1/articles', // url where to submit the request
          headers: {
            'Content-Type': 'application/json'
          },
          type: "POST", // type of action POST || GET
          dataType: 'json', // data type
          data: JSON.stringify(requestClassify), // post data || get data
          success: function (result) {
            // you can see the result from the console
            // tab of the developer tools
            console.log(result);
            response = result;


            labelFeedback = [];


            $.ajax({
              url: 'v1/articles/' + response.id + '/classifications', // url where to submit the request
              headers: {
                'Content-Type': 'application/json'
              },
              type: "POST", // type of action POST || GET
              dataType: 'json', // data type
              data: JSON.stringify({}), // post data || get data
              success: function (result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
                classificationResponse = result;

                labelFeedback = [];


                var index, len;
                len = result.labels.length;

                for (index = 0; index < len; ++index) {

                  var s = result.labels[index];
                  labelFeedback.push({ id: s.id, value: true });

                  var inText = '<div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">' +
                    ' <label class="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" for="icon-toggle-' + s.id + '">' +
                    ' <input type="checkbox" id="icon-toggle-' + s.id + '" class="mdl-icon-toggle__input" onclick="handleClickLabelFeedback(this, ' + s.id + ');" checked>' +
                    '<i class="mdl-icon-toggle__label material-icons">thumb_up</i>' +
                    '</label> ' +
                    ' </div>' +
                    '  <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">' + s.value + '  </div>';
                  $("#classify-result").append(inText);
                }

                componentHandler.upgradeDom();
              },
              error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
              }
            })

          },
          error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
          }
        });
      });
    });