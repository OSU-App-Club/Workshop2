var http = require('http');

main();

async function main() {
	const response = await request();
	console.log(response);
	console.log(response[0].name);
}

function request() {
	return new Promise((resolve) => {
		var options = {
			method: 'GET',
			hostname: 'localhost',
			port: 5000,
			path: '/tasks',
			headers: {},
			maxRedirects: 20
		};

		var req = http.request(options, function (res) {
			var chunks = [];

			res.on('data', function (chunk) {
				chunks.push(chunk);
			});

			res.on('end', function (chunk) {
				var body = Buffer.concat(chunks);
				resolve(JSON.parse(body.toString()));
			});

			res.on('error', function (error) {
				console.error(error);
			});
		});

		req.end();
	});
}
