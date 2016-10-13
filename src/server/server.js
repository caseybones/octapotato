import { Server } from 'hapi';
import Inert from 'inert';
import Vision from 'Vision';
import Path from 'path';
import FileSystem from 'fs';
import BellAuthentication from 'bell';

function googleAuthHandler(request, response, tokens, profile) {
  console.log("Handling google authentication");
}

var wordDictionary = JSON.parse(FileSystem.readFileSync('./easy-words.json', 'utf8'));
console.log(wordDictionary.length + " words loaded from file.");

const server = new Server();
server.connection({ port: process.env.PORT });

const plugins = [
  { register: Inert },
  { register: Vision },
  { register: BellAuthentication }
];

server.register(plugins, function (error) {
  if (error) {
    return console.error(error);
  }

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password_secure', //TODO: fix
    isSecure: false, //TODO: implement HTTPS and fix this
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    location: "http://SYDLT5CG5431W4F.corp.sita.aero:3000"
  });

  server.route({
    method: '*',
    path: '/googleauth',
    config: {
      auth: {
        strategy: 'google',
        mode: 'try'
      },
      handler: function (request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }
        reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
      }
    }
  });

  /*server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './dist/public'
      }
    }
  });*/

  server.route({
    method: 'GET',
    path: '/words/random',
    handler: function (request, response) {
      var randomWord = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
      return response(randomWord);
    }
  });

  server.start(() => console.log('Server running at:', server.info.uri));
});
