var linkArray = [];
var ytApiKey = "AIzaSyBPNmqdABOq45XYfUIeS70P5w7gRqlOq3g";
$(document).ready(videos());

function videos() {
  $.ajax({
    method: "POST",
    url: "tutorials.txt",
    dataType: "text",
    success: function(data) {
      linkArray = processData(data);
      for (var i = 0; i < linkArray.length; i++) {
        var node = document.getElementById('node-id');
        var videoId = matchYoutubeUrl(linkArray[i]);
        $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoId + "&key=" + ytApiKey, function(data_yt) {
          var videoName = data_yt.items[0].snippet.title;
          videoId = data_yt.items[0].id;
          node.innerHTML += '<h5>' + videoName + '</h5><iframe class="tut-vid" width = "560" height = "500" src = https://www.youtube.com/embed/' + videoId + ' frameborder = "0" allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><br></br>';
        });
        }
    }
  });
}

function processData(allText) {
  return allText.match(/\S+/g);
}

function matchYoutubeUrl(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false;
}
