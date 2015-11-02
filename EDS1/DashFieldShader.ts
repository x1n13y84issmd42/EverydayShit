/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

class DashFieldShader extends Tsar.Render.Shader
{
	private offset : Tsar.Math.float2 = new Tsar.Math.float2(0, 0);
	private nX: number;	//	Number of dashes X
	private nZ: number;	//	Number of dashes Z
	private sX: number;	//	X step
	private sZ: number;	//	Z step
	private dashLength: number;
	private W: number;	//	Window dimensions
	private H: number;

	private lightZIndex: number = 0;
	private et: number = 0;
	private dtLight: number = 100;

	constructor(nX: number, nZ: number, sX: number, sZ: number, dashLength: number)
	{
		super();

		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();

		this.nX = nX;
		this.nZ = nZ;
		this.sX = sX;
		this.sZ = sZ;
		this.dashLength = dashLength;

		this.lightZIndex = this.nZ - 1;
	}

	setParallaxOffset(offset: Tsar.Math.float2)
	{
		this.offset = offset;
		this.offset.x /= 5;
		this.offset.y /= 5;
	}

	update(dt: number)
	{
		this.et += dt;

		if (this.et >= this.dtLight)
		{
			this.lightZIndex--;

			if (this.lightZIndex < 0)
			{
				this.lightZIndex = this.nZ - 1;
			}

			this.et = 0;
		}
	}

	render(C)
	{
		var color = "rgb(127, 50, 255)";

		var lX = this.nX;
		var lZ = this.nZ;
		var sX = this.sX;
		var sZ = this.sZ;
		var xO = this.W / 2 - (lX * sX / 2);
		var zDepth = lZ * sZ;

		var origin = new Tsar.Math.float3(xO - this.offset.x, 700 - this.offset.y, 300);
		var end = new Tsar.Math.float3(xO + this.offset.x, 600 + this.offset.y, lZ * (this.dashLength + sZ));
		var v = end.sub(origin).normalize();
		var p = new Tsar.Math.float3(origin.x, origin.y, origin.z);


		for (var i=0; i<lZ; i++)
		{
			C.beginPath();
			for (var j=0; j<lX; j++)
			{
				var p1 = Tsar.Math.perspectiveProjection(p, this.W, this.H, 0);
				var p2 = Tsar.Math.perspectiveProjection(p.add(v.nmul(this.dashLength)), this.W, this.H, 0);
				C.moveTo(p1.x, p1.y);
				C.lineTo(p2.x, p2.y);
				p.x += sX;
			}

			C.closePath();

			var lZI = 1 - (i * sZ) / zDepth;;

			if (i == this.lightZIndex)
			{
				C.strokeStyle = color;
				C.lineWidth = 8 * lZI;
				C.lineCap = "round";
				C.stroke();

				C.strokeStyle = "rgb(255, 255, 255)";
				C.lineWidth = 2 * lZI;
				C.lineCap = "round";
				C.stroke();
			}
			else
			{
				C.strokeStyle = color;
				C.lineWidth = 1 * lZI;
				C.stroke();
			}

			p = p.add(v.nmul(this.dashLength + sZ));
			origin.x += v.nmul(this.dashLength + sZ).x;
			p.x = origin.x;
		}

	}
}