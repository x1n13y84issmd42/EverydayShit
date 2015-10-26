/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

class BlockyShitShader extends Tsar.Render.Shader
{
	private W: number;	//	Window dimensions
	private H: number;
	private field = [
		[1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
		[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
		[1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
		[0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
		[1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0]
	];

	private blockWidth: number = 100;
	private blockDepth: number = 400;

	constructor()
	{
		super();

		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();
	}

	update(dt: number)
	{

	}

	render(C)
	{
		var origin = new Tsar.Math.float2(this.W / 2, this.H / 6);
		origin.x -= this.field[0].length * this.blockWidth / 2;
		var pt = new Tsar.Math.float2(origin.x, origin.y);
		var aspect = this.W / this.H;

		C.beginPath();

		for(var frI in this.field)
		{
			var row = this.field[frI];

			for (var rI in row)
			{
				if (row[rI])
				{
					this.renderBlock(C, pt);
				}

				pt.x += this.blockWidth;
			}

			pt.y += this.blockWidth * aspect;
			pt.x = origin.x;
		}

		C.closePath();
		C.stroke();
	}

	renderBlock(C, pt)
	{
		var bZ = 1500;
		var fZ = bZ - this.blockDepth;
		var aspect = this.W / this.H;

		var btl = new Tsar.Math.float3(pt.x, pt.y, bZ);
		var btr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y, bZ);
		var bbl = new Tsar.Math.float3(pt.x, pt.y + this.blockWidth * aspect, bZ);
		var bbr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y + this.blockWidth * aspect, bZ);

		var ftl = new Tsar.Math.float3(pt.x, pt.y, fZ);
		var ftr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y, fZ);
		var fbl = new Tsar.Math.float3(pt.x, pt.y + this.blockWidth * aspect, fZ);
		var fbr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y + this.blockWidth * aspect, fZ);

		var btl2 = Tsar.Math.perspectiveProjection(btl, this.W, this.H, 0);
		var btr2 = Tsar.Math.perspectiveProjection(btr, this.W, this.H, 0);
		var bbl2 = Tsar.Math.perspectiveProjection(bbl, this.W, this.H, 0);
		var bbr2 = Tsar.Math.perspectiveProjection(bbr, this.W, this.H, 0);

		var ftl2 = Tsar.Math.perspectiveProjection(ftl, this.W, this.H, 0);
		var ftr2 = Tsar.Math.perspectiveProjection(ftr, this.W, this.H, 0);
		var fbl2 = Tsar.Math.perspectiveProjection(fbl, this.W, this.H, 0);
		var fbr2 = Tsar.Math.perspectiveProjection(fbr, this.W, this.H, 0);

		C.strokeStyle = "white";
		C.moveTo(btl2.x, btl2.y);
		C.lineTo(btr2.x, btr2.y);
		C.lineTo(bbr2.x, bbr2.y);
		C.lineTo(bbl2.x, bbl2.y);
		C.lineTo(btl2.x, btl2.y);

		C.moveTo(ftl2.x, ftl2.y);
		C.lineTo(ftr2.x, ftr2.y);
		C.lineTo(fbr2.x, fbr2.y);
		C.lineTo(fbl2.x, fbl2.y);
		C.lineTo(ftl2.x, ftl2.y);

		C.moveTo(btl2.x, btl2.y);
		C.lineTo(ftl2.x, ftl2.y);
		C.moveTo(btr2.x, btr2.y);
		C.lineTo(ftr2.x, ftr2.y);
		C.moveTo(bbl2.x, bbl2.y);
		C.lineTo(fbl2.x, fbl2.y);
		C.moveTo(bbr2.x, bbr2.y);
		C.lineTo(fbr2.x, fbr2.y);
	}
}