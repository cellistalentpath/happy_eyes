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
for (i = 0; i < 5; i++) {
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
	happySequential();
}

function requestSequential(time) {
	switch (time) {
		case "time1":
			requestArray[1].write(postData);
			totalSeqTime += timeItTookSeq1;
			break;
		case "time2":
			requestArray[2].write(postData);
			totalSeqTime += timeItTookSeq2;
			break;
		case "time3":
			requestArray[3].write(postData);
			totalSeqTime += timeItTookSeq3;
			break;
		case "time4":
			requestArray[4].write(postData);
			totalSeqTime += timeItTookSeq4;
			requestArray[1].end();
			requestArray[2].end();
			requestArray[3].end();
			requestArray[4].end();
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
	timeSeq1 = setTimeout(function() {
		requestSequential("time1");
		console.log("**********Sending requests sequentially...**********");
		timeSeq2 = setTimeout(function() {
			requestSequential("time2");
			timeSeq3 = setTimeout(function() {
				requestSequential("time3");
				timeSeq4 = setTimeout(function() {
					requestSequential("time4");
				}, (timeItTookSeq4 = Math.floor(Math.random() * 3000)));
			}, (timeItTookSeq3 = Math.floor(Math.random() * 3000)));
		}, (timeItTookSeq2 = Math.floor(Math.random() * 3000)));
	}, (timeItTookSeq1 = Math.floor(Math.random() * 3000)));
}

function benchMark() {
	// Console the times and percentages
	happyEyes();
}

benchMark();
