console.log('loaded inventory');

function inventory(name, initItems, rows, columns){

	this.formatItems = formatItems;
	this.viewInv = viewInv;
	this.update = update;
	this.addItem  = addItem;
	this.removeItem = removeItem;

	this.isOpen = false;
	this.name = name;
	this.items = initItems;
	this.container = this.formatItems(this.items);
	this.rows = rows;
	this.columns = columns;
}

handleMessage = function(event){
	if(event.data[0] == 'displayState'){
		if(event.data[1] == false){
			LOCALPLAYER.inventory.isOpen = false;
			LOCALPLAYER.inventory.invWindow.close();
		} else {
			LOCALPLAYER.inventory.isOpen = true;
		}
	}
	return;
}


formatItems = function(items){

	console.log(this);
	if(items.length == 0){
		return;
	}

	var formattedItems = [];
	var row = 0;
	for (var c = 0; c < Math.ceil(items.length / this.columns); c++){
		formattedItems.push([])
	}

	for(var i = 0; i < items.length; i++){
		if(this.columns > formattedItems[row].length){
			formattedItems[row].push(items[i]);
		} else {
			row += 1;
			formattedItems[row].push(items[i]);
		}

	}

	return formattedItems;
}

addItem = function(item){
	this.items.push(item);
	this.update();
}

removeItem = function(item){
	var removed = []
	for(var i = this.items.length - 1; i > 0; i--){
		if(this.items[i] != item){
			removed.push(this.items.pop());
		} else {
			console.log(this.items);
			this.items.pop();
			break;
		}
	}
	console.log(removed);
	this.items = this.items.concat(removed);
	this.update()
}

viewInv = function(){

	this.invWindow = window.open("Inventory/Inventory.html", "", "width="+(this.columns+1)*50+"inner-height="+(this.rows+1)*50);
	this.isOpen = true;
	this.invWindow.addEventListener('message', handleMessage);
}

update = function(){

	if(!this.isOpen){
		this.viewInv();
	} else {
		this.container = this.formatItems(this.items);
		this.invWindow.postMessage(['container', this.container], '*');
	}
}
