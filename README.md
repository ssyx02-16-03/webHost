# webHost
Webserver using Node.js modules

To get going you have to do the following:
1. Install nodeJS on your dev os.
2. Get all modules inlcuded in ```./packaged.json```, to achive that run npm install in the webhost root folder
3. Create the file ```./pass.json``` (see down below).
4. Run the server from root by exectuing: node index



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
