process.env.TTS_SERVER_PORT = 3001;
process.env.WEB_SERVER_PORT = 80;

var ttsServer = require('./tts-server/server');
var webServer = require('./web-server/server');