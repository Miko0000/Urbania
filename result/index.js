function main(){
	const param = new URLSearchParams(window.location.search);
	const skipIntro = param.get("si");

	skipIntro && main.skipIntro();

	lload("data");
	rload("data_welcome");
}

main.skipIntro = function(){
	const content = document.querySelector(".content");

	content.style.animationDelay = "0s";
}

async function lload(path){
	if(lload.running)
		return ;

	lload.running = 1;
	let abort;
	const l = document.querySelector(".content > .l");
	const list = await fetch(`${path.replaceAll('_', '/')}.json`)
		.then(r => r.json())
		.catch(r => abort = 1);

	if(list[0] === "hold" || abort)
		return lload.running = 0;

	l.textContent = '';

	for(const el of list){
		const div = document.createElement("div");
		div.classList.add(`${path}_${el._class}`);
		div.textContent = el.content;

		l.appendChild(div);
	}

	const div = document.createElement("div");
	div.classList.add(`${path.split('_').slice(0, -1).join('_') || "data"}`);
	div.textContent = "<-- Back";

	l.prepend(div);
	lload.running = 0;
}

async function rload(path){
	const r = document.querySelector(".content > .r");

	r.src = `${path.replaceAll('_', '/')}.html`;
}

window.addEventListener("load", main);
/*
window.addEventListener("click", async function(ev){
	const { target } = ev;

	if(!target.matches(".content > .l > *")){
		return ;
	}

	const l = document.querySelector(".content > .l");
	const r = document.querySelector(".content > .r");
	let data = await fetch(`raw/${target.classList[0]}`).then(r => r.text());

	if(data.startsWith("list ")){
		data = JSON.parse(data.slice("list ".length));
		data.unshift({ _class: l.classList[1] || "root", content: "<- Back" });

		l.classList[1] = target.classList[0];
		l.textContent = '';

		for(const el of data){
			const div = document.createElement("div");
			div.classList.add(el._class);
			div.textContent = el.content;

			l.appendChild(div);
		}

		return ;
	}

	const pre = document.createElement("pre");
	pre.textContent = data;

	r.textContent = '';
	r.appendChild(pre);
});*/

function textLoadAnim(el, text, fps){
	let i = 0;
	let nf = Date.now();
	let random = () => 33 + Math.round(Math.random()*126-33);

	function frame(){
		//console.count();
		if(i > text.length){
			return ;
		}

		//console.log(i, text.length);

		if(nf > Date.now()){
			console.log(nf, Date.now());
			return requestAnimationFrame(frame);
		}

		nf = Date.now() + Math.floor((1000/fps))

		let c = '';
		while(c.length < text.length - i){
			c += String.fromCharCode(random());
		}

		el.textContent = text.substr(0, i) + c;

		i++;
		requestAnimationFrame(frame);
	}

	frame();
}

window.addEventListener("click", async function(ev){
	const { target } = ev;

	if(!target.matches(".content > .l > *")){
		return ;
	}

	lload(target.classList[0]);
	rload(target.classList[0]);

	textLoadAnim(
		document.querySelector(".content > .r-t"),
		target.classList[0],
		24
	);
});