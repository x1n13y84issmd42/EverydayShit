/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

class DiscoShader extends Tsar.Render.Shader
{
	private text : string;
	private depth : number;
	private pt : Tsar.Math.float2;
	private offset : Tsar.Math.float2 = new Tsar.Math.float2(0, 0);

	private dtPush = 100;
	private dt = 0;
	private hue = 1;

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

		if (this.dt >= this.dtPush)
		{
			this.dt = 0;
			this.hue -= (1 / this.depth);
			console.log(this.hue);
		//	this.layers.push({color:"rgba"})
		}
	}

	render(C)
	{
		C.globalCompositeOperation = "lighten";

		var bsize = 96;
		var msize = 160;
		var sizeStep = (msize - bsize) / (this.depth / 2);
		var size = bsize - (sizeStep * (this.depth / 2));

		var pdv = new Tsar.Math.float2(-this.offset.x, -this.offset.y);
		var pdvs = pdv.ndiv(this.depth);
		
		C.font = "bold " + size + "px Monoton";
		var textW = C.measureText(this.text).width / 2;
		var pt = (new Tsar.Math.float2(this.pt.x - textW, this.pt.y)).sub(pdvs.nmul(this.depth/2));

		var c = new Tsar.Math.Color(64, 128, 255, 1);

		var h = c.h = this.hue;
		c.l = 0.01;
		var lStep = 1 / this.depth;

		for (var i=0; i<this.depth; i++)
		{
			c.h += 0.1;
			c.l += lStep;
			C.fillStyle = c.rgba();
			C.font = "bold " + size + "px Monoton";
			C.context.fillText(this.text, pt.x, pt.y);
			pt = pt.add(pdvs);
			size += sizeStep;
		}
	}
}