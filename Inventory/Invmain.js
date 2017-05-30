var invInstance;
var container;

console.log('loaded main');

main = function(){

	document.addEventListener('keydown', function(event){
		if(event.keyCode == 73){
			console.log('closing');
			parent.postMessage(['displayState', false], '*');

		}
	})
	parent.addEventListener('message', ihandleMessage);
}

ihandleMessage = function(event){

	if(event.data[0] == 'invIstance'){
		invInstance = event.data[1];
	} else if(event.data[0] == 'container'){
		container = event.data[1];
		updateDisplay();
	}
}

updateDisplay = function(){
	var items = document.getElementById('items');
	items.innerHTML = ''; 
	for(var r = 0; r < container.length; r++){
		items.innerHTML += '<tr id='+r+'></tr>';
		for(var e = 0; e < container[r].length; e++){
			var row = document.getElementById(''+r);
			row.innerHTML += '<td style="width:33%; padding:4px;">'+container[r][e]+'</td>';
		}
	}
}

main();