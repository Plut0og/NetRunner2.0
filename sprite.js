function Sprite(img, x, y, size, rot){
  this.x = x;
  this.y = y;
  this.size = size;
  this.rotation = rot;
  this.imgList = img;
  this.imgStep = 0;
  this.img = img[0];

  this.scale = scale;
  this.translate = translate;
  this.rotate = rotate;
  this.updateStyle = updateStyle;
  this.stepFrame = stepFrame;

  this.element = document.createElement('sprite');
  this.element.style.position = "absolute";
  document.getElementsByTagName('body')[0].appendChild(this.element);
  this.updateStyle();
}

scale = function(amount){
  this.size *= amount;
  this.updateStyle();
}

translate = function(x, y){
  this.x += x;
  this.y += y;
  this.updateStyle();
}

rotate = function(deg){
  this.rotation = (this.rotation + deg) % 360;
  this.updateStyle();
}

stepFrame = function(){
  console.log((this.imgStep+1)%this.imgList.length);
  this.img = this.imgList[(this.imgStep+1)%this.imgList.length];
  this.updateStyle();
}

updateStyle = function(){
  this.element.style.fontSize = this.size+"px";
  this.element.style.transform = "rotate("+this.rotation+"deg)";
  this.element.style.top = this.y+"px";
  this.element.style.left = this.x+"px";
  this.element.innerHTML = this.img;
}
