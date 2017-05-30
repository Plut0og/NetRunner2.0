console.log('loaded inventory');

function inventory(name, initItems, rows, columns){

	this.formatItems = formatItems;
	this.viewInv = viewInv;
	this.update = update;
	this.addItem  = addItem;
	this.removeItem = removeItem;

	this.name = name;
	this.items = initItems;
	this.container = this.formatItems();
	this.rows = rows;
	this.columns = columns;

	this.invWindow = window.open("Inventory.html", "", "width="+(this.columns+1)*50+"height="+(this.rows+1)*50);
	this.invDocument = this.invWindow.document;
	this.invWindow.close()

}

formatItems = function(){

	var formattedItems = [];
	var row = 0;
	for (var c = 0; c < Math.ceil(this.items.length / this.columns); c++){
		formattedItems.push([])
	}

	for(var i = 0; i < this.items.length; i++){
		if(this.columns > formattedItems[row].length){
			formattedItems[row].push(this.items[i]);
		} else {
			row += 1;
			formattedItems[row].push(this.items[i]);
		}

	}

	return formattedItems;
}

addItem = function(item){
	this.items.push(item);
}

removeItem = function(item){
	var removed = []
	for(var i = 0; i < this.items.length; i++){
		if(this.items[i] != item){
			removed.push(this.items.shift);
		} else {
			this.items.shift;
			break;
		}
	}
	for(var r = 0; r < removed.length; r++){
		this.items.unshift(removed[i]);
	}
}

viewInv = function(){

	this.invWindow = window.open("Inventory.html", "", "width="+(this.columns+1)*50+"height="+(this.rows+1)*50);
}

update = function(){

	this.container = this.formatItems();
	console.log(this.invDocument);

	this.invDocument.getElementsByTagName('head')[0].innerHTML += "<title>"+this.name+"</title>";
	for(var r = 0; r < this.container.length; r++){
		this.invDocument.getElementById('items').innerHTMl += "<tr id='itemRow+"+r+"+'></tr>";
		for(var c = 0; c < this.container[r].length; c++){
			this.invDocument.getElementById('itemRow'+r).innerHTMl += "<td style='text-align:center; padding: 4px; ''>"+container[r][c]+"</td>"
		}
	}

	this.viewInv()

}