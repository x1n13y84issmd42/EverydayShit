/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

class ParallaxLineShader extends Tsar.Render.Shader
{
	private offset : Tsar.Math.float2 = new Tsar.Math.float2(0, 0);
	public depth: number;
	public pt: Tsar.Math.float2;
	private W: number;
	private H: number;

	constructor()
	{
		super();

		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();
	}

	/*
	constructor(pt: Tsar.Math.float2, depth:number, width:number)
	{
		this.pt = pt;
		this.depth = depth;
		this.width = width;
	}
	*/

	setParallaxOffset(offset: Tsar.Math.float2)
	{
		this.offset = offset;
	}

	render(C)
	{
		var lX = 20, lZ = 20;
		var lL = 20;
		var sX = 60;
		var sZ = 60;
		var origin = new Tsar.Math.float3(0, 600, 500);
		var p = new Tsar.Math.float3(origin.x, origin.y, origin.z);

		C.strokeStyle = "rgb(255, 127, 0)";
		C.beginPath();

		for (var i=0; i<lX; i++)
		{
			for (var j=0; j<lZ; j++)
			{
				var p1 = Tsar.Math.perspectiveProjection(p, this.W, this.H, 0);
				var p2 = Tsar.Math.perspectiveProjection(new Tsar.Math.float3(p.x, p.y, p.z + lL), this.W, this.H, 0);
				C.moveTo(p1.x, p1.y);
				C.lineTo(p2.x, p2.y);
				p.x += sX;
			}

			p.z += sZ + lL;
			p.x = origin.x;
		}

		C.closePath();
		C.stroke();
	}
}