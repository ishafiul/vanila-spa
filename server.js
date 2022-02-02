import * as http from 'http';
import * as fs from 'fs';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(res => {
	let htmlFile = 'app/index.html';
    render(res, htmlFile);
});

function render(res, htmlFile) {
  	fs.stat(`./${htmlFile}`,  stats=> {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
  		if(stats) {
		  	fs.createReadStream(htmlFile).pipe(res);
  		} else {
  			res.statusCode = 404;
  		}
  	});
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});