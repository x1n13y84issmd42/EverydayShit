/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />

class DiscoShader extends Tsar.Render.Shader
{
	private text : string;
	private depth : number;
	private pt : Tsar.Math.float2;

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
		var msize = 100;
		var sizeStep = (msize - bsize) / (this.depth / 2);
		var size = bsize - (sizeStep * (this.depth / 2));
		var pdv = new Tsar.Math.float2(200, 200);
		var pdvs = pdv.ndiv(this.depth);
		var pt = this.pt.sub(pdv.ndiv(2));

		C.fillStyle = "rgba(64, 128, 255, 0.1)";

		for (var i=0; i<this.depth; i++)
		{
			C.font = "bold " + size + "px Monoton";
			C.context.fillText(this.text, this.pt.x, this.pt.y);
			pt = pt.add(pdvs);
			size += sizeStep;
		}

	}
}