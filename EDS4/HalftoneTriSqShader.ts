/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float2.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/Color.ts" />

var jMath = Math;

class HalftoneTriSqShader extends Tsar.Render.Shader
{
	private W: number;	//	Window dimensions
	private H: number;
	
	private et: number = 0;

	private src: any;
	private radius:number = 150;
	private pressure:number = 1;
	private center:Tsar.Math.float2;
	private tridots = [];

	constructor()
	{
		super();

		//FIXME: perhaps this must be the current rendering context dimensions?
		//	Depends on shader logic, obviously.
		this.W = Tsar.UI.window.width();
		this.H = Tsar.UI.window.height();

		this.center = new Tsar.Math.float2(this.W/2, this.H/2);
	}

	update(dt: number)
	{
		this.et += dt;
	}

	setSource(src)
	{
		this.src = src;
	}

	setCenter(c:Tsar.Math.float2)
	{
		this.center = c;
	}

	setRadius(r:number)
	{
		this.radius = jMath.max(0.1, r);
	}

	setPressure(p:number)
	{
		this.pressure = jMath.min(1, jMath.max(0, p));
	}

	renderDots(C, color, offset)
	{
		C.fillStyle = color;
		C.beginPath();

		for (var tdI = 0; tdI < this.tridots.length; tdI++)
		{
			var td = this.tridots[tdI];

			var d = 1 - (1 - ((this.radius - td.d) / this.radius));
			var v = td.p.sub(this.center).normalize().nmul(d * offset * this.pressure);
			var px = td.p.x + v.x;
			var py = td.p.y + v.y;
			var r = td.r * (1 - d * this.pressure);
		//	r = td.r * (jMath.sin(this.et / 250 + d * 4) * 0.5 + 0.5);

			C.moveTo(px - r, py - r);
			C.lineTo(px + r, py - r);
			C.lineTo(px + r, py + r);
			C.lineTo(px - r, py + r);
		}

		C.closePath();
		C.fill();
	}

	addTriDot(p, r, d)
	{
		this.tridots.push({
			p: p,
			r: r,
			d: d
		});
	}

	render(C)
	{
		this.tridots = [];

		var data = this.src.getImageData(0, 0, this.src.canvas.width, this.src.canvas.height);
		var pixels = data.data
		var ratio = jMath.floor(this.W / this.src.canvas.width);
		var maxRadius = 10;

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

				var p = new Tsar.Math.float2(pX, pY);
				var pcD = this.center.dist(p);

				if (pcD <= this.radius)
				{
					this.addTriDot(p, r, pcD);
				}
				else
				{
					C.moveTo(pX - r, pY - r);
					C.lineTo(pX + r, pY - r);
					C.lineTo(pX + r, pY + r);
					C.lineTo(pX - r, pY + r);
				}

				pI += 4;
			}
		}

		C.closePath();
		C.fill();

		var gco = C.globalCompositeOperation;
		C.globalCompositeOperation = 'multiply';

		this.renderDots(C, '#F1C40F', 10);
		this.renderDots(C, '#3498DB', 18);
		this.renderDots(C, '#E74C3C', 14);

		C.globalCompositeOperation = gco;;
	}
}