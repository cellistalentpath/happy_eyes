const querystring = require("querystring");
const http = require("http");

let timeItTookSame1 = 0;
let timeItTookSame2 = 0;
let timeItTookSame3 = 0;
let timeItTookSame4 = 0;

let timeItTookSeq1 = 0;
let timeItTookSeq2 = 0;
let timeItTookSeq3 = 0;
let timeItTookSeq4 = 0;

// 50% chance for each sequential data pack to work
let didItWork1 = Math.floor(Math.random() * 2);
let didItWork2 = Math.floor(Math.random() * 2);
let didItWork3 = Math.floor(Math.random() * 2);
let didItWork4 = Math.floor(Math.random() * 2);

let totalSeqTime = 0;
let shortestSameTime = 0;

const postData = querystring.stringify({
	msg: "Hello World!"
});

const options = {
	hostname: "127.0.0.1",
	port: 3000,
	path: "/upload",
	method: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Content-Length": Buffer.byteLength(postData)
	}
};

const requestArray = [];
for (i = 0; i < 1; i++) {
	requestArray[i] = http.request(options, res => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding("utf8");
		res.on("data", chunk => {
			console.log(`BODY: ${chunk}`);
		});
		res.on("end", () => {
			console.log("No more data in response.");
		});
	});

	requestArray[i].on("error", e => {
		console.error(`problem with request: ${e.message}`);
	});
}

// Only take the fastest request/response
function requestSameTime(time) {
	requestArray[0].write(postData);
	switch (time) {
		case "time1":
			shortestSameTime = timeItTookSame1;
			clearTimeout(timeSame2);
			clearTimeout(timeSame3);
			clearTimeout(timeSame4);
			break;
		case "time2":
			shortestSameTime = timeItTookSame2;
			clearTimeout(timeSame1);
			clearTimeout(timeSame3);
			clearTimeout(timeSame4);
			break;
		case "time3":
			shortestSameTime = timeItTookSame3;
			clearTimeout(timeSame1);
			clearTimeout(timeSame2);
			clearTimeout(timeSame4);
			break;
		case "time4":
			shortestSameTime = timeItTookSame4;
			clearTimeout(timeSame1);
			clearTimeout(timeSame2);
			clearTimeout(timeSame3);
			break;
	}
	requestArray[0].end();
	// After same time is done, run sequential
	setTimeout(function() {
		happySequential();
	}, 3000);
}

function requestSequential(time) {
	switch (time) {
		case "time1":
			requestArray[1].write(postData);
			requestArray[1].end();
			break;
		case "time2":
			requestArray[2].write(postData);
			requestArray[2].end();
			break;
		case "time3":
			requestArray[3].write(postData);
			requestArray[3].end();
			break;
		case "time4":
			requestArray[4].write(postData);
			requestArray[4].end();
			break;
	}
}

function happyEyes() {
	console.log("**********Sending requests at the same time...**********");
	timeSame1 = setTimeout(function() {
		requestSameTime("time1");
	}, (timeItTookSame1 = Math.floor(Math.random() * 3000)));

	timeSame2 = setTimeout(function() {
		requestSameTime("time2");
	}, (timeItTookSame2 = Math.floor(Math.random() * 3000)));

	timeSame3 = setTimeout(function() {
		requestSameTime("time3");
	}, (timeItTookSame3 = Math.floor(Math.random() * 3000)));

	timeSame4 = setTimeout(function() {
		requestSameTime("time4");
	}, (timeItTookSame4 = Math.floor(Math.random() * 3000)));
}

function happySequential() {
	console.log("**********Sending requests sequentially...**********");
	setTimeout(function() {
		totalSeqTime += timeItTookSeq1;
		if (didItWork1) {
			requestArray[1] = http.request(options, res => {
				console.log(`STATUS: ${res.statusCode}`);
				console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
				res.setEncoding("utf8");
				res.on("data", chunk => {
					console.log(`BODY: ${chunk}`);
				});
				res.on("end", () => {
					console.log("No more data in response.");
				});
			});
			requestArray[1].on("error", e => {
				console.error(`problem with request: ${e.message}`);
			});
			requestSequential("time1");
			calculations();
		} else {
			setTimeout(function() {
				totalSeqTime += timeItTookSeq2;
				if (didItWork2) {
					requestArray[2] = http.request(options, res => {
						console.log(`STATUS: ${res.statusCode}`);
						console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
						res.setEncoding("utf8");
						res.on("data", chunk => {
							console.log(`BODY: ${chunk}`);
						});
						res.on("end", () => {
							console.log("No more data in response.");
						});
					});
					requestArray[2].on("error", e => {
						console.error(`problem with request: ${e.message}`);
					});
					requestSequential("time2");
					calculations();
				} else {
					setTimeout(function() {
						totalSeqTime += timeItTookSeq3;
						if (didItWork3) {
							requestArray[3] = http.request(options, res => {
								console.log(`STATUS: ${res.statusCode}`);
								console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
								res.setEncoding("utf8");
								res.on("data", chunk => {
									console.log(`BODY: ${chunk}`);
								});
								res.on("end", () => {
									console.log("No more data in response.");
								});
							});
							requestArray[3].on("error", e => {
								console.error(`problem with request: ${e.message}`);
							});
							requestSequential("time3");
							calculations();
						} else {
							setTimeout(function() {
								totalSeqTime += timeItTookSeq4;
								if (didItWork4) {
									requestArray[4] = http.request(options, res => {
										console.log(`STATUS: ${res.statusCode}`);
										console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
										res.setEncoding("utf8");
										res.on("data", chunk => {
											console.log(`BODY: ${chunk}`);
										});
										res.on("end", () => {
											console.log("No more data in response.");
										});
									});
									requestArray[4].on("error", e => {
										console.error(`problem with request: ${e.message}`);
									});
									requestSequential("time4");
									calculations();
								} else {
									console.log("No Sequential requests could get through.");
								}
							}, (timeItTookSeq4 = Math.floor(Math.random() * 3000)));
						}
					}, (timeItTookSeq3 = Math.floor(Math.random() * 3000)));
				}
			}, (timeItTookSeq2 = Math.floor(Math.random() * 3000)));
		}
	}, (timeItTookSeq1 = Math.floor(Math.random() * 3000)));
}

function calculations() {
	setTimeout(function() {
		console.log(
			"shortest same time is: " +
				(shortestSameTime / 1000).toFixed(2) +
				" seconds."
		);
		console.log(
			"sequential time: " + (totalSeqTime / 1000).toFixed(2) + " seconds."
		);
		console.log(
			"Starting the connections at the same time is: " +
				(100 - (shortestSameTime / totalSeqTime) * 100).toFixed(2) +
				"% faster."
		);
	}, 100);
}

happyEyes();
