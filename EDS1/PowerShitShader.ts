/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

class PowerShitShader extends Tsar.Render.Shader
{
	private text : string;
	private depth : number;
	private numLayers : number;
	private pt : Tsar.Math.float2;
	private offset : Tsar.Math.float2 = new Tsar.Math.float2(0, 0);

	private dtPush = 100;
	private et = 0;
	private hue = 1;
	private lightness = 0.5;
	private p = 0;

	private layers = [];

	private W: number;	//	Window dimensions
	private H: number;

	constructor()
	{
		super();

	    this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();
	}

	prepare(text: string, pt: Tsar.Math.float2, depth: number, numLayers: number)
	{
		this.text = text;
		this.depth = depth;
		this.numLayers = numLayers;
		this.pt = pt;
	}

	setParallaxOffset(offset: Tsar.Math.float2)
	{
		this.offset = offset;
	}

	update(dt:number, et:number)
	{
		this.et = et;
	}

	render(C)
	{
		C.globalCompositeOperation = "lighten";

		var fontFace = "Codystar";

		var depth = 400;
		var tsize = 750;
		var units = '%';
		var size = tsize;
		var xO = this.W / 2;
		var yO = this.H / 2;
		var zO = 300;
		var offset = new Tsar.Math.float2(this.offset.x * (depth / 2000), this.offset.y * (depth / 2000));

		var origin = new Tsar.Math.float3(xO + offset.x, yO + offset.y, zO + depth);
		var end = new Tsar.Math.float3(xO - offset.x, yO - offset.y, zO);
		var zStep = this.depth / this.numLayers;
		var v = end.sub(origin).normalize().nmul(zStep);
		var p = origin;

		for (var dI = 0; dI < this.numLayers; dI++)
		{
			var pt = Tsar.Math.perspectiveProjection(p, this.W, this.H, 0);
			size = tsize / p.z * tsize;
			
			var c = new Tsar.Math.Color(64, 128, 255, (1 - dI/this.numLayers));
			var lightness = gMath.min((gMath.sin(this.et / 200 - dI/2)) * 0.5 + 0.75, 0.9);
			c.l = lightness;

			C.fillStyle = c.rgba();
			C.font = "bold " + size + units + " " + fontFace;
			var tW = C.measureText(this.text).width / 2;
			C.context.fillText(this.text, pt.x - (tW), pt.y + this.p * 100);

			p = p.add(v);
		}
	}
}