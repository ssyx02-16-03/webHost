# webHost
Webserver


To use the websocket put the activemq credentials in the file: ./WSClient/pass.json 
contents:
```
{
	"ip" : "x.x.x.x",
	"port" :  61614,
	"user" : "xx",
	"pass" : "xx"
}

```


<br />
<br />



To use the NodeJS service 
put your active mq credentials in the gitignored file: ./pass.js
<br />
pass.js contains: <br />
```
exports.ip = '0.0.0.0';  
exports.port = 61613;
exports.user = 'xxx';  
exports.pass = 'xxx';  
```

