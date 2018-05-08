import http from 'http';
import App from './app';

// create server
const server: any = http.createServer(App);
const hostname: string = '127.0.0.1'; // localhost
const portNumber: number = App.get('port'); // retrieve port number from app.set port

// listen to port and console status
server.listen(portNumber, hostname, (err: Error) => {
	if (err) {
		console.log(err.message); // you can output err.stack
		return;
	}

	const getHostAddress = server.address().address;

	console.log('Web Server running at http://%s:%s', getHostAddress, portNumber);
	console.log('\npress Ctrl-C to terminate.');
	console.log('Views Dir:', App.get('views'));
	console.log('View Engine:', App.get('view engine'));
	console.log('Static Files Dir:', App.get('static files'));
});
