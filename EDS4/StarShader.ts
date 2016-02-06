/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />

var jMath = Math;

class StarShader extends Tsar.Render.Shader
{
	private W: number;	//	RT dimensions
	private H: number;
	
	private et: number = 0;
	private center: Tsar.Math.float2;
	private a:number = 0;
	private velocity = 0.019;
	private pattern: number[];
	private colors: string[];

	constructor()
	{
		super();

		//FIXME: perhaps this must be the current rendering context dimensions?
		//	Depends on shader logic, obviously.
	}

	update(dt: number)
	{
		this.et += dt;
		this.a += dt * this.velocity;
	}

	setCenter(c: Tsar.Math.float2)
	{
		this.center = c;
	}

	setPattern(pattern)
	{
		this.pattern = pattern;
	}

	setColors(colors)
	{
		this.colors = colors;
	}

	setVelocity(v)
	{
		this.velocity = v;
	}

	render(C)
	{
		this.W = C.canvas.width;
		this.H = C.canvas.height;

		var pattern = this.pattern;
		var colors = this.colors;
		pattern = this.normalizePattern(pattern);
		var a = this.a;
		C.strokeStyle = "red";
		
		for (var pI in pattern)
		{
			C.fillStyle = this.pickColor(colors, pI);

			C.beginPath();

			C.moveTo(this.center.x, this.center.y);
			var pt = this.getPoint(a, this.W * 3, this.center);
			C.lineTo(pt.x, pt.y);
			a += pattern[pI] * 360;
			pt = this.getPoint(a, this.W * 3, this.center);
			C.lineTo(pt.x, pt.y);

			C.closePath();
			C.fill();
		//	C.stroke();
		}
		
	}

	pickColor(colors, index)
	{
		if (colors.length < index)
		{
			index = index - jMath.floor(index / colors.length) * colors.length;
		}

		return colors[index];
	}

	getPoint(angle, radius, origin?:Tsar.Math.float2)
	{
		var v = new Tsar.Math.float2(jMath.sin(Tsar.Math.deg2rad(angle)), jMath.cos(Tsar.Math.deg2rad(angle)));
		v.x = v.x * radius;
		v.y = v.y * radius;

		if (origin)
		{
			v.x += origin.x;
			v.y += origin.y;
		}

		return v;
	}

	normalizePattern(pattern: number[])
	{
		var sum = 0;

		pattern = pattern.concat(pattern);

		for (var pI in pattern)
		{
			sum += pattern[pI];
		}

		for (var pI in pattern)
		{
			pattern[pI] /= sum;
		}

		return pattern;
	}
}