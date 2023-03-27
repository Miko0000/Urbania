if(!window.slowType)
	window.slowType = [];

function slowType1(el, text, fps, lap = 0, pof = ''){
	let i = 0;
	let nf = Date.now();
	let random = () => 33 + Math.round(Math.random()*126-33);
	let abort;
	let clap = lap;

	function frame(){
		//console.count();
		if(i > text.length || abort){
			return ;
		}

		//console.log(i, text.length);

		if(nf > Date.now()){
			//console.log(nf, Date.now());
			return requestAnimationFrame(frame);
		}

		nf = Date.now() + Math.floor((1000/fps))

		let c = '';
		while(c.length < text.length - i){
			c += String.fromCharCode(random());
		}

		if(clap < 1){
			clap = lap;

			i++;
		} else
			clap--;

		el.textContent = text.substr(0, i) + pof + ' ' + c;

		requestAnimationFrame(frame);
	}

	frame();

	return function(){
		abort = 1;
	}
}

slowType[1] = slowType1;