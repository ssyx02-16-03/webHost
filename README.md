# webHost
Webserver using Node.js modules <br />

To get going you have to do the following:`<br />
1. Install nodeJS on your dev os. <br />
2. Get all modules inlcuded in <code>./packaged.json</code>, to achive that run: <code> npm install </code>in the webhost root folder <br />
3. Create the file <code>./pass.json</code> (see down below). <br />
4. Run the server from root by exectuing: node index <br />



To use the modules elasticTalk(elasticSearch communicator) and stompTalk(activeMQ communicator) put the credentials in the file: ./pass.json
If you need to connect to different ip:s, create to files and 
contents:
```
{
	"ip" : "x.x.x.x",
	"port" :  61613,
	"user" : "xx",
	"pass" : "xx"
}

```

# web-app
web-app built in Angular2 <br />

To see it: <br />
1. move to the web-app directory and run <code>npm install</code>
2. either run <code>npm start</code> in the web-app directory OR make sure <code>app.use(express.static('./web-app'));</code> is uncommented in SocketIOServer.js, then run <code>node index</code> from the webHost directory and go to localhost:3000 in a browser
