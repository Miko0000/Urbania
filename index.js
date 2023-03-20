function main(){
	const param = new URLSearchParams(window.location.search);
	const skipIntro = param.get("si");

	skipIntro && main.skipIntro();
}

main.skipIntro = function(){
	const content = document.querySelector(".content");

	content.style.animationDelay = "0s";
}

window.addEventListener("load", main);