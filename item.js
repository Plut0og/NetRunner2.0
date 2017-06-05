function Item(name, img, x, y, size, rot, onUse){
  this.name = name;
  this.sprite = new Sprite(img, x, y, size, rot);
  this.visible = true;
  this.owner = false
  this.uuid = generateUUID();

  this.toggleVisibility = toggleVisibility;
  this.onUse = onUse;
  this.pickUp = pickUp;
  this.drop = drop;
}

toggleVisibility = function(){
  if (this.visible){
    this.sprite.img = "";
    this.visible = false;
  }else{
    this.sprite.img = this.sprite.imgList[this.sprite.imgStep];
    this.visible = true;
  }
}

pickUp = function(sender){
  this.toggleVisibility();
  this.owner = sender;
}

drop = function(x,y){
  this.owner = false;
  this.toggleVisibility();
}

function swordItem(x,y){
  return new Item("sword", ["/|<br>||<br>||<br>--<br>|"], x, y, 10, 0, swordOnUse);
}

swordOnUse = function(dirVec){
  console.log("sword used");
}
