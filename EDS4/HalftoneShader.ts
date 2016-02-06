/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

var jMath = Math;

class HalftoneShader extends Tsar.Render.Shader
{
	private W: number;	//	Window dimensions
	private H: number;
	
	private et: number = 0;

	private src: any;

	constructor()
	{
		super();

		//FIXME: perhaps this must be the current rendering context dimensions?
		//	Depends on shader logic, obviously.
		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();
	}

	update(dt: number)
	{
		this.et += dt;
	}

	setSource(src)
	{
		this.src = src;
	}

	render(C)
	{
		var data = this.src.getImageData(0, 0, this.src.canvas.width, this.src.canvas.height);
		var pixels = data.data
		var ratio = jMath.floor(this.W / this.src.canvas.width);
		var maxRadius = 15;

		C.fillStyle = "black";
		C.beginPath();
		var c = new Tsar.Math.Color(0, 0, 0, 1);

		var pI = 0;

		for (var yI = 0; yI < data.height; yI++)
		{
			for (var xI = 0; xI < data.width; xI++)
			{
				var l = pixels[pI] + pixels[pI + 1] + pixels[pI + 2] + pixels[pI + 3];
				l = (l / 4) / 255;
				var pX = xI * ratio;
				var pY = yI * ratio;
				var r = (1 - l) * maxRadius;

				C.moveTo(pX - r / 2, pY);
				C.arc(pX, pY, r, 0, jMath.PI*2);

				pI += 4;
			}
		}

		C.closePath();
		C.fill();
	}
}