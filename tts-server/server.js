var connect = require('connect');
var http = require('http');
var exec = require('child_process').exec;
var url = require('url');

var app = connect()
.use(function(req, res) {
      var queryData = url.parse(req.url, true).query;
    
      var callback = queryData.callback;
      var text = queryData.text;
      var lang = queryData.lang;
      var cmd;
      
      if(lang === 'jp') {
          cmd = "curl 'http://imtranslator.net/translate-and-speak/sockets/tts.asp?FA=1&dir=ja&speed=0&B=1&ID=719936066&chr=MiaHead&vc=VW%20Misaki' -H 'Pragma: no-cache' -H 'Origin: http://imtranslator.net' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Referer: http://imtranslator.net/translate-and-speak/sockets/tts.asp?FA=1&dir=ja&speed=0&B=1&ID=719936066&chr=MiaHead&vc=VW%20Misaki' -H 'Cookie: ASPSESSIONIDAQCTDACT=OJEAJOKCCPBDOLCAELKBMBPD; TTSid=719936066; __utma=87094784.1264872206.1399156538.1399156538.1399156538.1; __utmb=87094784.3.10.1399156538; __utmc=87094784; __utmz=87094784.1399156538.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)' -H 'Connection: keep-alive' --data 'text=" + text + "&chr=MiaHead&speed=0&voice=&dir=ja&B=1' --compressed";

      }
      else if(lang === 'en') {
          text = escape(queryData.text).replace(/%20/gi, '+');
          
          cmd = "curl 'http://imtranslator.net/translate-and-speak/sockets/tts.asp?FA=1&dir=enf&speed=0&B=1&ID=719936066&chr=AnnaHead&vc=VW%20Kate' -H 'Pragma: no-cache' -H 'Origin: http://imtranslator.net' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Referer: http://imtranslator.net/translate-and-speak/sockets/tts.asp?FA=1&dir=enf&speed=0&B=1&ID=719936066&chr=AnnaHead&vc=VW%20Kate' -H 'Cookie: ASPSESSIONIDAQCTDACT=OJEAJOKCCPBDOLCAELKBMBPD; TTSid=719936066; ASPSESSIONIDASRCABCT=EIPIJFNCMMMBGHGEDBDKMAMI; __utma=87094784.1264872206.1399156538.1399156538.1399176286.2; __utmb=87094784.14.10.1399176286; __utmc=87094784; __utmz=87094784.1399156538.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)' -H 'Connection: keep-alive' --data 'text=" + text + "&chr=AnnaHead&speed=0&voice=&dir=enf&B=1' --compressed";
      }
      
      console.log(cmd);
      
      exec(cmd, function (error, stdout, stderr) {
        if (error !== null) {
            console.error('exec error: ' + error);
        }

        var regex = /PARAM ID="MOVIE" NAME="MOVIE" VALUE="([^\"]+)"/gi;

        var stdres = regex.exec(stdout);
        
        if(stdres) {
            var ttsURL = stdres[1];
            
            var response = callback + '("' + ttsURL + '")';

            res.end(response);
        }
        else {
            res.end();
        }
    });
});

http.createServer(app).listen(3001);