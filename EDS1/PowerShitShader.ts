/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

class PowerShitShader extends Tsar.Render.Shader
{
	private text : string;
	private depth : number;
	private pt : Tsar.Math.float2;
	private offset : Tsar.Math.float2 = new Tsar.Math.float2(0, 0);

	private dtPush = 100;
	private dt = 0;
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

	prepare(text: string, pt: Tsar.Math.float2, depth?: number)
	{
		this.text = text;
		this.depth = depth;
		this.pt = pt;
	}

	setParallaxOffset(offset: Tsar.Math.float2)
	{
		this.offset = offset;
	}

	update(dt:number, et:number)
	{
		this.dt += dt;
		this.lightness = gMath.min((gMath.sin(et / 200)) * 0.5 + 0.75, 0.9);
//		this.lightness = gMath.max()
	//	this.p = gMath.sin(et / 100);

		if (this.dt >= this.dtPush)
		{
			this.dt = 0;
			this.hue -= (1 / this.depth);
		//	console.log(this.hue);
			this.addLayer({
				hit:false,
				hue:this.hue,
				lightness:this.lightness
			});
		}
	}

	private addLayer(d)
	{
		this.layers.unshift(d);
		if (this.layers.length > this.depth)
		{
			this.layers.splice(this.depth);
		}
	}

	hit()
	{
		this.addLayer({
			hit:true,
			hue:this.hue,
			lightness: this.lightness
		});
	}

	render(C)
	{
		C.globalCompositeOperation = "lighten";

		var depth = 400;
		var tsize = this.H / 3;
		var size = tsize;
		var xO = this.W / 2;
		var yO = this.H / 2;
		var zO = 300;
		var offset = new Tsar.Math.float2(this.offset.x * (depth / 2000), this.offset.y * (depth / 2000));

		var origin = new Tsar.Math.float3(xO + offset.x, yO + offset.y, zO + depth);
		var end = new Tsar.Math.float3(xO - offset.x, yO - offset.y, zO);
		var zStep = depth / this.layers.length;
		var v = end.sub(origin).normalize().nmul(zStep);
		var p = origin;

		C.font = "bold " + size + "px Codystar";

		for (var dI in this.layers)
		{
			var pt = Tsar.Math.perspectiveProjection(p, this.W, this.H, 0);
			size = tsize / p.z * tsize;
			
			var c = new Tsar.Math.Color(64, 128, 255, (1 - dI/this.depth));
			var d = this.layers[dI];
			c.l = d.lightness;

			C.fillStyle = c.rgba();
			C.font = "bold " + (size * 2) + "px Codystar";
			var tW = C.measureText(this.text).width / 2;
			C.context.fillText(this.text, pt.x - (tW), pt.y + this.p * 100);

			p = p.add(v);
		}
	}
}