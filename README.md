# webHost
Webserver using Node.js modules <br />

To get going you have to do the following:`<br />
1. Install nodeJS on your dev os. <br />
2. Get all modules inlcuded in <code>./packaged.json<code/>, to achive that run: <code> npm install </code>in the webhost root folder <br />
3. Create the file <code>./pass.json</code> (see down below). <br />
4. Run the server from root by exectuing: node index <br />



To use Node.js with activemq and elasticsearch put the credentials in the file: ./pass.json 
contents:
```
{
	"ip" : "x.x.x.x",
	"port" :  61613,
	"user" : "xx",
	"pass" : "xx"
}

```
