const http = require("http");
const someArray = [
	"The way to get started is to quit talking and begin doing. - Walt Disney",
	"When you reach the end of your rope, tie a knot in it and hang on - Franklin D. Roosevelt.",
	"Always remember that you are aboslutely unique. Just like everyon else - Margaret Mead",
	"You are not your job, you're not how much money you have in the bank. You are not the car you drive. You're not the contents of your wallet. You are not your fucking khakis. You are the all singing, all dancing crap of the world. - Tyler Durden",
	"Tell me and I forget. Teach me and I remember. Involve me and I learn - Benjamin Franklin",
	"Do not go where the path may lead, go instead where there is no path and leave a trail",
	"Do not let making a living prevent you from making a life - John Wooden",
	"You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose - Dr. Seuss",
	"The secret of success is to do the common thing uncommonly well - John D. Rockefeller Jr.",
	"I find that the harder I work, the more luck I seem to have - Thomas Jefferson"
];

const port = 3000;

const requestHandler = (request, response) => {
	console.log(request.url);
	response.end(someArray[Math.floor(Math.random() * 10)]);
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
	if (err) {
		return console.log("something bad happened", err);
	}

	console.log(`server is listening on ${port}`);
});
