import {Server} from 'hapi';
import Inert from 'inert';
import Vision from 'Vision';
import Path from 'path';
import Crate from 'node-crate';
import FileSystem from 'fs';

var wordDictionary = JSON.parse(FileSystem.readFileSync('./easy-words.json', 'utf8'));
console.log(wordDictionary.length + " words loaded from file.");

const server = new Server();
server.connection( {port: 3000} );

const plugins = [
  { register: Inert },
  { register: Vision },
];

server.register(plugins, function(error) {
  if (error) {
    return console.error(error);
  }

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './dist/public'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/words/random',
    handler: function(request, response) {
      var randomWord = wordDictionary[Math.floor(Math.random() * wordDictionary.length)];
      return response(randomWord);
    }
  });

  server.start(() => console.log('Server running at:', server.info.uri));
});
