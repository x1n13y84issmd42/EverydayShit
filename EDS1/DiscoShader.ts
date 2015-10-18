/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />

class DiscoShader extends Tsar.Render.Shader
{
	private text : string;
	private depth : number;
	private pt : Tsar.Math.float2;
	private offset : Tsar.Math.float2 = new Tsar.Math.float2(0, 0);

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

	render(C)
	{
		var bsize = 72;
		var msize = 150;
		var sizeStep = (msize - bsize) / (this.depth / 2);
		var size = bsize;// - (sizeStep * (this.depth / 2));

		var pdv = new Tsar.Math.float2(-this.offset.x, -this.offset.y);
		var pdvs = pdv.ndiv(this.depth);
		var pt = new Tsar.Math.float2(this.pt.x, this.pt.y);
		
		C.font = "bold " + size + "px Monoton";
		var textW = C.measureText(this.text).width / 2;
		pt.x -= textW;

		C.fillStyle = "rgba(64, 128, 255, 0.1)";

		for (var i=0; i<this.depth/2; i++)
		{
			C.font = "bold " + size + "px Monoton";
			C.context.fillText(this.text, pt.x, pt.y);
			pt = pt.add(pdvs);
			size += sizeStep;
		}

		pt = (new Tsar.Math.float2(this.pt.x, this.pt.y)).sub(pdvs);
	//	pt.x -= C.measureText(this.text);
		pt.x -= textW;
		size = bsize - sizeStep;

		for (var i=0; i<this.depth/2; i++)
		{
			C.font = "bold " + size + "px Monoton";
			C.context.fillText(this.text, pt.x, pt.y);
			pt = pt.sub(pdvs);
			size -= sizeStep;
		}
	}
}