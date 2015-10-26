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

		var bsize = 96;
		var msize = 160;
		var sizeStep = (msize - bsize) / (this.depth / 2);
		var size = bsize - (sizeStep * (this.depth / 2));

		var pdv = new Tsar.Math.float2(-this.offset.x / 3, -this.offset.y / 3);
		var pdvs = pdv.ndiv(this.depth);
		
		C.font = "bold " + size + "px Monoton";
		var pt = (new Tsar.Math.float2(this.pt.x, this.pt.y)).sub(pdvs.nmul(this.depth/2));

		for (var dI in this.layers)
		{
			var c = new Tsar.Math.Color(64, 128, 255, (1 - dI/this.depth));
			var d = this.layers[dI];
			c.l = d.lightness;

			C.fillStyle = c.rgba();
			C.font = "bold " + (size * 2) + "px Monoton";
			var tW = C.measureText(this.text).width / 2;
			C.context.fillText(this.text, pt.x - (tW), pt.y + this.p * 100);

			pt = pt.add(pdvs);
			size += sizeStep;
		}
	}
}