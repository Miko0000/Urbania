const init = [

];

window.addEventListener("load", function(){
	while(init[0]) (init.pop())();
});

init.push(function sload(){
	const elements = document.querySelectorAll(".sload-1");

	for(const element of elements){
		const fps = Number(element.classList[1]);

		let i = 3;
		slowType[1](element, element.textContent, fps, 3, " #");
	}
});

init.push(window.UIFileReader = function UIFileReader(){
	const elements = document.querySelectorAll(".file-reader");

	for(const element of elements){
		const input = document.querySelector(".chooser");
		const list = document.querySelector(".list");
		const list_item_t = document.querySelector(".list "
			+ ".list-item.template");
		const pr = document.querySelector(".process");

		input.addEventListener("change", function(){
			list.textContent = '';

			for(const file of input.files){
				const listItem = list_item_t.cloneNode(1);

				listItem.textContent = `${file.name}`;
				listItem.classList.remove("template");
				file.listItem = listItem;

				list.appendChild(listItem);
			}
		});

		pr.addEventListener("click", function({ target }){
			const f = UIFileReader.handler[target.classList[1]]

			if(f)
				f(input, list);
		});
	}
});

UIFileReader.handler = {};