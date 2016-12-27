var fs = require('fs');
var http = require('http');

/**
 * Creamos el servidor
 */

http.createServer(function(request, response){
  var newFile = fs.createWriteStream("readme_copy.png");
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;
  request.on('readable', function(){
    var chunk = null;
    while (null !== (chunk = request.read())){
      uploadedBytes += chunk.length;
      var progress = (uploadedBytes / fileBytes ) * 100;
      response.write("progress: " + parseInt(progress, 10) + "%\n");
      console.log("progress: " + parseInt(progress, 10));
    }
  });

  //se copia el contenido de request a newFile
  request.pipe(newFile);
  request.on('end', function(){
    console.log("Uploaded!!!!\n");
    response.end('uploaded!');
  });
}).listen(8080);
