var isStartMove = false, prevAngle, knob, pos, center, pin, radius = 140;

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return {X: curleft, Y: curtop};
}

function onKnobTouchStart(e){
	//console.log('start');
	if (!e) var e = window.event;
	isStartMove = true;
}

function onKnobTouchMove(e){
	if (!e) var e = window.event;
	if(isStartMove){
		var a = Math.atan2((e.pageY - center.Y), (e.pageX - center.X)) * 180 / Math.PI;
		var b = (a >= 90 ? a - 90 : 270 + a) - 30;
		displayProgress(b);		
	}
}

function onKnobTouchEnd(e){
	if (!e) var e = window.event;
	isStartMove = false;
}

function displayProgress(a){	
	if(a >= 0 && a <= 180){
		progressBar.style.clip ="rect(0px, 140px, 280px, 0px)";
		progressBar.style.webkitTransform ="rotate(30deg)";
		lBar.style.webkitTransform = "rotate(" + -1 * (180 - a)	 + "deg)";		
		rBar.style.display = "none";		
		pin.style.webkitTransform = "rotate(" + a + "deg)";
	}
	else if(a >= 0 && a < 300){
		progressBar.style.clip ="rect(0px, 280px, 280px, 0px)";
		rBar.style.display = "block";
		lBar.style.webkitTransform = "rotate(0deg)";
		rBar.style.webkitTransform = "rotate(" + a + "deg)";
		pin.style.webkitTransform = "rotate(" + a + "deg)";
	}
}

window.onload = function(){
	knob = document.getElementById('volume-knob');
	progressBar = document.getElementById('progress-bar');
	lBar = document.getElementById('l-bar');
	rBar = document.getElementById('r-bar');
	pin = document.getElementById('pin');
	knob.addEventListener('touchstart', onKnobTouchStart, false);
	knob.addEventListener('touchmove', onKnobTouchMove, false);
	knob.addEventListener('touchend', onKnobTouchEnd, false);
	knob.addEventListener('mousedown', onKnobTouchStart, false);
	knob.addEventListener('mousemove', onKnobTouchMove, false);
	knob.addEventListener('mouseup', onKnobTouchEnd, false);
	pos = findPos(knob);
	center = {X: pos.X + knob.offsetWidth / 2, Y: pos.Y + knob.offsetHeight / 2};
	displayProgress(0)
	setPinPosition(0);
	
	document.body.addEventListener('touchmove', function(e) {
	  // This prevents native scrolling from happening.
	  e.preventDefault();
	}, false);
};
