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

	private et: number = 0;

	constructor()
	{
		super();

		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();
	}

	update(dt: number)
	{
		this.et += dt;
	}

	renderTest(C)
	{
		var pt = new Tsar.Math.float2(this.W / 2, this.H / 6);
		this.renderBlock(C, pt);
	}

	render(C)
	{

		var origin = new Tsar.Math.float2(this.W / 2, this.H / 6);
		origin.x -= this.field[0].length * this.blockWidth / 2;
		origin.y -= this.field.length * this.blockWidth / 2;
		var pt = new Tsar.Math.float2(origin.x, origin.y);
		var aspect = this.W / this.H;

	//	C.strokeStyle = "rgb(12, 25, 50)";
		C.strokeStyle = "rgb(163, 203, 255)";
		C.fillStyle = "rgb(163, 203, 255)";
		C.globalCompositeOperation = "screen";
	//	C.beginPath();

	//	return this.renderTest(C);

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

	//	C.closePath();
	//	C.stroke();
	}

	renderBlock(C, pt)
	{
		var bZ = 1500;
		var fZ = bZ - this.blockDepth;
		var aspect = this.W / this.H;
		var amplitude = 100;

		var btl = new Tsar.Math.float3(pt.x, pt.y, bZ);
		var btr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y, bZ);
		var bbl = new Tsar.Math.float3(pt.x, pt.y + this.blockWidth * aspect, bZ);
		var bbr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y + this.blockWidth * aspect, bZ);

		var ftl = new Tsar.Math.float3(pt.x, pt.y, fZ);
		var ftr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y, fZ);
		var fbl = new Tsar.Math.float3(pt.x, pt.y + this.blockWidth * aspect, fZ);
		var fbr = new Tsar.Math.float3(pt.x + this.blockWidth, pt.y + this.blockWidth * aspect, fZ);

		btl.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		btr.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		bbl.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		bbr.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		ftl.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		ftr.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		fbl.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);
		fbr.z += amplitude * Math.sin((this.et + btl.x + btl.y) / 500);

		var btl2 = Tsar.Math.perspectiveProjection(btl, this.W, this.H, 0);
		var btr2 = Tsar.Math.perspectiveProjection(btr, this.W, this.H, 0);
		var bbl2 = Tsar.Math.perspectiveProjection(bbl, this.W, this.H, 0);
		var bbr2 = Tsar.Math.perspectiveProjection(bbr, this.W, this.H, 0);

		var ftl2 = Tsar.Math.perspectiveProjection(ftl, this.W, this.H, 0);
		var ftr2 = Tsar.Math.perspectiveProjection(ftr, this.W, this.H, 0);
		var fbl2 = Tsar.Math.perspectiveProjection(fbl, this.W, this.H, 0);
		var fbr2 = Tsar.Math.perspectiveProjection(fbr, this.W, this.H, 0);

		var sin = 0.5 + 0.5 * Math.sin((this.et + btl.x + btl.y) / 500);
		var color = new Tsar.Math.Color(255, 0, 0);
		color.h = sin * 0.5;
		color.s = 0.5;
		color.l = 0.75;

		/*
		var c1 = new Tsar.Math.Color(191, 0, 111);
		var c2 = new Tsar.Math.Color(255, 153, 94);
		*/

		var c1 = new Tsar.Math.Color(0, 86, 119);
		var c2 = new Tsar.Math.Color(177, 250, 255);

		color = c1.lerp(sin, c2);

		this.renderFace(C, [ftl2, ftr2, fbr2, fbl2], color, ftl2, fbl2);	//F
		this.renderFace(C, [btl2, btr2, bbr2, bbl2], color, btl2, bbl2);	//B
		
		this.renderFace(C, [ftr2, btr2, bbr2, fbr2], color, ftr2, btr2);	//R
		this.renderFace(C, [ftl2, btl2, bbl2, fbl2], color, ftl2, bbl2);	//L

		this.renderFace(C, [ftl2, btl2, btr2, ftr2], color, ftl2, btr2);	//T
		this.renderFace(C, [fbl2, bbl2, bbr2, fbr2], color, fbl2, bbr2);	//B
	}

	renderFace(C, verts, color, gp1, gp2)
	{
		if (verts.length < 2)
		{
			throw "Not enough verts in BlockyShitShader::renderFace";
		}

		C.beginPath();
		C.moveTo(verts[0].x, verts[0].y);

		for (var vI = 1; vI < verts.length; vI++)
		{
			C.lineTo(verts[vI].x, verts[vI].y);
		}
		C.closePath();

		var l = color.l;
		color.l = 0.85;
		C.strokeStyle = color.rgb();
		color.l = l;
	//	C.fillStyle = "rgb(163, 203, 255)";
		C.fillStyle = this.setupGradient(C, gp1, gp2, color);

		C.stroke();
		C.fill();
	}

	setupGradient(C, p1, p2, color)
	{
		var gradient = C.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
		gradient.addColorStop(0, 'black');

		var l = color.l;
		color.l = 0.075;
		gradient.addColorStop(0.3, color.rgb());
		color.l= l;
		gradient.addColorStop(1, color.rgb());
		return gradient;
	}
}