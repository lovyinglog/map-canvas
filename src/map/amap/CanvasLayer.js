(function () {
    AMap.CanvasLayer = AMap.Class.extend({
        initialize: function () {},
        setMap: function () {}
    });
})();

function CanvasLayer(options) {
    this.options = options || {};

    this.zIndex = this.options.zIndex || 0;
    this._map = options.map;
    this.show();
}

CanvasLayer.prototype = new AMap.IndoorMap();

CanvasLayer.prototype.setMap = function (map) {
    this._map = map;
    var canvas = this.canvas = document.createElement('canvas');
    var ctx = this.ctx = this.canvas.getContext('2d');
    canvas.style.cssText = "position:absolute;" +
        "left:0;" +
        "top:0;" +
        "z-index:" + this.zIndex + ";";
    this.adjustSize();
    this.adjustRatio(ctx);
    map.getContainer().appendChild(canvas); //有问题
    return this.canvas;
}

CanvasLayer.prototype.adjustRatio = function (ctx) {
    var backingStore = ctx.backingStorePixelRatio ||
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    var pixelRatio = (window.devicePixelRatio || 1) / backingStore;
    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;
    ctx.canvas.width = canvasWidth * pixelRatio;
    ctx.canvas.height = canvasHeight * pixelRatio;
    ctx.canvas.style.width = canvasWidth + 'px';
    ctx.canvas.style.height = canvasHeight + 'px';
    console.log(ctx.canvas.height, canvasHeight);
    ctx.scale(pixelRatio, pixelRatio);
};

CanvasLayer.prototype.adjustSize = function () {
    var size = this._map.getSize();
    var canvas = this.canvas;
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
}

CanvasLayer.prototype.show = function () {
    if (!this.canvas) {
        this._map.add(this);
    }
    this.canvas.style.display = 'block';
}