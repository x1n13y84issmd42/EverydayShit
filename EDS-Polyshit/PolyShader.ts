/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float3.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

var gMath = Math;

class PolyShader extends Tsar.Render.Shader
{
	private light = new Tsar.Math.float3(1, 0, 0);

	public setLightVector(v: Tsar.Math.float3)
	{
		this.light = v;
	}

	public render(C)
	{
		var W = Tsar.UI.window.width();
		var H = Tsar.UI.window.height();

		var center = new Tsar.Math.float3(W/2, H/2, 100);

		var points = [
			new Tsar.Math.float3(700, 500, 700),
			new Tsar.Math.float3(1000, 150, 700),
			new Tsar.Math.float3(1400, 500, 700),
			new Tsar.Math.float3(1000, 800, 700)
		];

		var mesh = [
			[points[0], points[1], center],
			[points[1], points[2], center],
			[points[2], points[3], center],
			[points[3], points[0], center]
		];

		C.strokeStyle = "rgb(33, 33, 33)";

		for (var mI in mesh)
		{
			this.renderTriangle(C, mesh[mI]);
		}
	}

	renderTriangle(C, tri)
	{

		var v1 = tri[2].sub(tri[1]);
		var v2 = tri[2].sub(tri[0]);
		var n = v2.cross(v1);
	//	console.log(tri);
	//	console.log(n);
	//	console.log(n.normalize());

		var lightness = n.normalize().dot(this.light) * 0.5 + 0.5;
		lightness = gMath.round(lightness * 255);
	//	var color = this.genColor(tri, lightness);
		C.fillStyle = (new Tsar.Math.Color(lightness, lightness, lightness)).rgb();
	//	C.fillStyle = color.rgb();

		C.beginPath();
		C.moveTo(tri[0].xy.x, tri[0].xy.y);
		C.lineTo(tri[1].xy.x, tri[1].xy.y);
		C.lineTo(tri[2].xy.x, tri[2].xy.y);
		C.lineTo(tri[0].xy.x, tri[0].xy.y);
		C.closePath();
		C.stroke();
		C.fill();
	}

	public genColor(points, lightness)
	{
		var max = gMath.max(points[0].x, points[1].x, points[2].x);
		return new Tsar.Math.Color(
			gMath.round(points[0].x / max * 255 * lightness),
			gMath.round(points[2].x / max * 255 * lightness),
			gMath.round(points[2].x / max * 255 * lightness)
		);
	}
}