const canvas = document.querySelector('canvas');	
const ctx = canvas.getContext('2d');
const centerX = innerWidth/2;
const centerY = innerHeight/2;
canvas.width = innerWidth;
canvas.height = innerHeight;

function update() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, innerWidth, innerHeight);
	getTime();
	getHandAngle();
	ctx.strokeStyle = '#1919A6'
	drawFaceCircle();
	ctx.fillStyle = '#FFFF00'
	drawHands();
	pacManPointer();
	drawFoods();
	drawGhosts();

}

function getTime() {
	let date = new Date();
	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = date.getHours();
}

function getHandAngle() {
	//Seconds
	let secondsRAD = Math.PI/(30/(seconds-15));
	secondsHandX = Math.cos(secondsRAD).toFixed(4);
	secondsHandY = Math.sin(secondsRAD).toFixed(4);

	//Minutes
	let minutesRAD = Math.PI/(30/(minutes+(seconds/60)-15));
	minutesHandX = Math.cos(minutesRAD).toFixed(4);
	minutesHandY = Math.sin(minutesRAD).toFixed(4);

	//Hours
	let hoursRAD = Math.PI/(6/(hours+(minutes/60)-3));
	hoursHandX = Math.cos(hoursRAD).toFixed(4);
	hoursHandY = Math.sin(hoursRAD).toFixed(4);
}

function drawFaceCircle() {
	// ctx.lineWidth = '2';
	ctx.beginPath();
	ctx.arc(centerX, centerY, 280, 0, 2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(centerX, centerY, 320, 0, 2*Math.PI);
	ctx.stroke();
}



function drawHands() {
	for (let i = 0; i < 20; i++) {
		secondsArcPostionX = centerX + secondsHandX * i*12;
		secondsArcPositionY = centerY + secondsHandY * i*12;
		ctx.beginPath();
		ctx.arc(secondsArcPostionX, secondsArcPositionY, 5, 0, 2*Math.PI);
		ctx.fill();
	}

	for (let i = 0; i < 15; i++) {
		minutesArcPostionX = centerX + minutesHandX * i*12;
		minutesArcPositionY = centerY + minutesHandY * i*12;
		ctx.beginPath();
		ctx.arc(minutesArcPostionX, minutesArcPositionY, 5, 0, 2*Math.PI);
		ctx.fill();
	}

	for (let i = 0; i < 10; i++) {
		hoursArcPostionX = centerX + hoursHandX * i*12;
		hoursArcPositionY = centerY + hoursHandY * i*12;
		ctx.beginPath();
		ctx.arc(hoursArcPostionX, hoursArcPositionY, 5, 0, 2*Math.PI);
		ctx.fill();
	}
}

function pacManPointer() {
	// Draw Pac-Man__Seconds Pointer
	let secondsHandTopDistanceX = secondsHandX * 244;
	let secondsHandTopDistanceY = secondsHandY * 244;
	let secondsOpenMouthAngle = degreeToRadians((seconds - 15) * 6 - 330);
	let secondsCloseMouthAngle = degreeToRadians((seconds - 15) * 6 - 30);
	ctx.beginPath();
	ctx.arc(centerX + secondsHandTopDistanceX, centerY + secondsHandTopDistanceY, 9, secondsOpenMouthAngle, secondsCloseMouthAngle);
	ctx.lineTo(centerX + secondsHandTopDistanceX, centerY + secondsHandTopDistanceY);
	ctx.fill();

	// Draw Pac-Man__Minutes Pointer
	let minutesHandTopDistanceX = minutesHandX * 184;
	let minutesHandTopDistanceY = minutesHandY * 184;
	let minutesOpenMouthAngle = degreeToRadians((minutes - 15) * 6 - 330);
	let minutesCloseMouthAngle = degreeToRadians((minutes - 15) * 6 - 30);
	ctx.beginPath();
	ctx.arc(centerX + minutesHandTopDistanceX, centerY + minutesHandTopDistanceY, 9, minutesOpenMouthAngle, minutesCloseMouthAngle);
	ctx.lineTo(centerX + minutesHandTopDistanceX, centerY + minutesHandTopDistanceY);
	ctx.fill();

	// Draw Pac-Man__Hours Pointer
	let hoursHandTopDistanceX = hoursHandX * 124;
	let hoursHandTopDistanceY = hoursHandY * 124;
	let hoursOpenMouthAngle = degreeToRadians((hours + (minutes/60) - 3) * 30 - 330);
	let hoursCloseMouthAngle = degreeToRadians((hours + (minutes/60) - 3) * 30 - 30);
	ctx.beginPath();
	ctx.arc(centerX + hoursHandTopDistanceX, centerY + hoursHandTopDistanceY, 9, hoursOpenMouthAngle, hoursCloseMouthAngle);
	ctx.lineTo(centerX + hoursHandTopDistanceX, centerY + hoursHandTopDistanceY);
	ctx.fill();
}

function drawFoods() {
	for (let i = 1; i <= 12; i++){
		let foodPositionX = Math.cos(Math.PI/(6/i)).toFixed(4) * 300 + centerX;
		let foodPositionY = Math.sin(Math.PI/(6/i)).toFixed(4) * 300 + centerY;

		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(foodPositionX, foodPositionY, 10, 0, 2*Math.PI);
		ctx.fill();
	}
}

function drawGhosts() {
	ctx.strokeStyle = 'red';
	for (let i = 1; i <= 4; i++) {
		let ghostPositionX = Math.cos(Math.PI/(2/i)).toFixed(4) * 300 + centerX;
		let ghostPositionY = Math.sin(Math.PI/(2/i)).toFixed(4) * 300 + centerY;
		colors = ['#00FF00', '#FD0000', '#DEA185', '#2121DE'];
		ctx.fillStyle = colors[i-1];

		ctx.beginPath();
		ctx.moveTo(ghostPositionX + 14, ghostPositionY);
		ctx.lineTo(ghostPositionX + 14, ghostPositionY + 16);
		ctx.lineTo(ghostPositionX + 8, ghostPositionY + 12);
		ctx.lineTo(ghostPositionX + 5, ghostPositionY + 16);
		ctx.lineTo(ghostPositionX, ghostPositionY + 12);
		ctx.lineTo(ghostPositionX - 5, ghostPositionY + 16);
		ctx.lineTo(ghostPositionX - 7, ghostPositionY + 12);
		ctx.lineTo(ghostPositionX - 13, ghostPositionY + 16);
		ctx.lineTo(ghostPositionX - 13, ghostPositionY);
		ctx.bezierCurveTo(ghostPositionX-13, ghostPositionY-18, ghostPositionX-3, ghostPositionY-14, ghostPositionX, ghostPositionY-16);
		ctx.bezierCurveTo(ghostPositionX, ghostPositionY-15, ghostPositionX+15, ghostPositionY-18, ghostPositionX + 14, ghostPositionY);
		ctx.fill();	

		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(ghostPositionX - 6, ghostPositionY - 2, 4, 0, 2*Math.PI);
		ctx.arc(ghostPositionX + 7, ghostPositionY - 2, 4, 0, 2*Math.PI);
		ctx.fill();


		ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.arc(ghostPositionX - 7, ghostPositionY - 3, 2, 0, 2*Math.PI);
		ctx.arc(ghostPositionX + 6, ghostPositionY - 3, 2, 0, 2*Math.PI);
		ctx.fill();
	}
}

function degreeToRadians(degree) {
	return degree * Math.PI/180;
}


setInterval(update, 1000);

