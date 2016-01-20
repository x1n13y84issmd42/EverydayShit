/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />

var jMath = Math;

class StarFieldShader extends Tsar.Render.Shader
{
	private W: number;	//	RT dimensions
	private H: number;
	
	private et: number = 0;
	private stars = [];

	constructor()
	{
		super();
	}

	shine(numStars:number)
	{
		this.stars = [];

		for (var i=0; i<numStars; i++)
		{
			this.stars.push({
				x: jMath.random() * this.W,
				y: jMath.random() * this.H,
				s: jMath.random(),
				b: jMath.random()
			});
		}
	}

	update(dt: number)
	{
		this.et += dt;
	}

	setC(C)
	{
		this.W = C.canvas.width;
		this.H = C.canvas.height;
	}

	render(C)
	{
		C.beginPath();
		
		for (var sI in this.stars)
		{
			this.renderStar(C, this.stars[sI]);
		}

		C.closePath();

		var color = new Tsar.Math.Color(255, 255, 255, 1);
		color.a = (jMath.sin(this.et / 100)  * 0.5 + 0.5) * 0.7 + 0.3;
		C.strokeStyle = color.rgba();
		C.stroke();
	}

	renderStar(C, star)
	{
		var size = star.s * 10;
		//	|
		C.moveTo(star.x, star.y - size/2);
		C.lineTo(star.x, star.y + size/2);
		//	—
		C.moveTo(star.x - size/2, star.y);
		C.lineTo(star.x + size/2, star.y);
	}
}