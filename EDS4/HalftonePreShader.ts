/// <reference path="../shared/TSAR/src/Tsar/Render/Target.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />

var jMath = Math;

class HalftoneShader extends Tsar.Render.Shader
{
	private W: number;	//	Window dimensions
	private H: number;
	
	private et: number = 0;

	private src: any;

	private dotRT: Tsar.Render.Target;
	private dotW = 0;
	private dotH = 0;
	private r = 10;

	constructor()
	{
		super();

		//FIXME: perhaps this must be the current rendering context dimensions?
		//	Depends on shader logic, obviously.
		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();

		this.setMaxRadius(35);
	}

	update(dt: number)
	{
		this.et += dt;
	}

	setSource(src)
	{
		this.src = src;
	}

	setMaxRadius(r)
	{
		this.r = r;
		this.prerenderTheDot();
	}

	prerenderTheDot()
	{
		this.allocateCanvas(this.r * 2, this.r * 2);

		var C = this.dotRT.context;

	//	C.mozImageSmoothingEnabled = false;
	//	C.webkitImageSmoothingEnabled = false;
	//	C.imageSmoothingEnabled = false;

		C.fillStyle = "black";

		C.beginPath();
		C.moveTo(this.r, this.r);
		C.arc(this.r, this.r, this.r - 5, 0, jMath.PI * 2);
		C.closePath();
		C.shadowColor = 'black';
		C.shadowBlur = 5;
		C.shadowOffsetX = 0;
		C.shadowOffsetY = 0;
		C.fill();
		C.fill();
	}

	renderDot(C, x, y, r)
	{
		C.mozImageSmoothingEnabled = true;
		C.webkitImageSmoothingEnabled = true;
		C.imageSmoothingEnabled = true;

		C.context.drawImage(this.dotRT.context.canvas, x, y, jMath.floor(r), jMath.floor(r));
		/*
		C.fillStyle = "black";
		C.beginPath();
		C.arc(x, y, r, 0, jMath.PI * 2);
		C.closePath();
		C.fill();
		*/
	}

	allocateCanvas(w, h)
	{
		if (! this.dotRT)
		{
			this.dotRT = new Tsar.Render.Target(w, h);
			Tsar.UI.exposeRenderTarget(this.dotRT)
		}

		if (w * h > this.dotW * this.dotH)
		{
			this.dotRT.node.width = this.dotW = w;
			this.dotRT.node.height = this.dotH = h;
		}
	}

	render(C)
	{
		var data = this.src.getImageData(0, 0, this.src.canvas.width, this.src.canvas.height);
		var pixels = data.data
		var ratio = jMath.floor(this.W / this.src.canvas.width);
		var maxRadius = this.r;

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
				pX += (maxRadius - r) / 2;
				pY += (maxRadius - r) / 2;

				this.renderDot(C, pX, pY, r);

				pI += 4;
			}
		}
	}
}