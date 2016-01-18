/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Math/float3.ts' />

/// <reference path='HalftoneShader.ts' />
/// <reference path='StarShader.ts' />
/// 

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;
var jMath = Math;

class Shit implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private RTSmall: Tsar.Render.Target;
	private shader: HalftoneShader;
	private shaderStar: StarShader;
	private shaderStar2: StarShader;
	private halftoneWidth = 100;
	private halftoneHeight = 100;
	private halftoneRatio = 0;

	private W: number;
	private H: number;

	private animage: any;
	private mouse: Tsar.Math.float2;

	ready()
	{
		var shit = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();
		this.halftoneRatio = jMath.floor(W / this.halftoneWidth);
		this.halftoneHeight = jMath.floor(H / this.halftoneRatio);

		this.RT = new Tsar.Render.Target(this.W, this.H);
		this.RTSmall = new Tsar.Render.Target(this.halftoneWidth, this.halftoneHeight);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);
	//	Tsar.UI.exposeRenderTarget(this.RTSmall);

		this.shader = new HalftoneShader();
		this.shaderStar = new StarShader();
		this.shaderStar2 = new StarShader();

		this.shaderStar.setColors(['#DDDDDD', '#EEEEEE', '#AAAAAA', '#CCCCCC', '#FFFFFF', '#AAAAAA', '#DDDDDD', '#EEEEEE', '#AAAAAA', '#CCCCCC', '#FFFFFF', '#AAAAAA']);
		this.shaderStar.setPattern([10, 20, 5, 11,  35]);

		this.shaderStar2.setColors(['#DDDDDD', '#EEEEEE', '#AAAAAA', '#CCCCCC', '#FFFFFF', '#AAAAAA', '#DDDDDD', '#EEEEEE', '#AAAAAA', '#CCCCCC', '#FFFFFF', '#AAAAAA']);
		this.shaderStar2.setPattern([3, 4, 1, 7,  2]);
		this.shaderStar2.setVelocity(0.033);
		
		var mouseFn = function(e){
			shit.mouse = new Tsar.Math.float2(e.x, e.y);
			shit.shaderStar.setCenter(shit.mouse);
			shit.shaderStar2.setCenter(shit.mouse);
			/*
			shit.shader.setParallaxOffset(
				new TMath.float2(
					Math.floor(e.x) - (shit.W/2),
					Math.floor(e.y) - (shit.H/2)
			));
			*/
		};

		rtproxy.mouse.onMove(mouseFn);

		this.animage = document.getElementById('animage');

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "white";
		this.RT.context.fill();
	}

	update(dt:number, et:number, now:number)
	{
		this.shaderStar.update(dt);
		this.shaderStar2.update(dt);
	}

	prerenderImage()
	{
		this.RTSmall.context.drawImage(this.animage, 0, 0, this.animage.width, this.animage.height, 0, 0, this.halftoneWidth, this.halftoneHeight);
	}

	render()
	{
	//	this.prerenderImage();

		var txtRT = this.RTSmall;

		txtRT.context.beginPath();
		txtRT.context.rect(0, 0, this.W, this.H);
		txtRT.context.closePath();
		txtRT.context.fillStyle = "white";
		txtRT.context.fill();

		txtRT.context.globalCompositeOperation = "source-over";

		var mSmall = Tsar.Math.scale2D(this.mouse.x, this.mouse.y, 0, 0, this.RT.width(), this.RT.height(), 0, 0, this.RTSmall.width(), this.RTSmall.height());
		this.shaderStar.setCenter(mSmall);
		this.shaderStar.render(this.RTSmall.context);
		txtRT.context.globalCompositeOperation = "overlay";
		this.shaderStar2.setCenter(mSmall);
		this.shaderStar2.render(this.RTSmall.context);
		
		txtRT.context.globalCompositeOperation = "source-over";
		
		var C = txtRT.context;
		var pt = new Tsar.Math.float2(this.halftoneWidth / 2, this.halftoneHeight / 1.5);

		var text = "S H I T";
		var fontSize = this.halftoneHeight / 2;
		C.fillStyle = "rgba(0, 0, 0, 1)";
		C.font = "normal " + fontSize + "px Arial";
		var tW = C.measureText(text).width / 2;

		C.shadowColor = '#333';
		C.shadowOffsetX = 0;
		C.shadowOffsetY = 0;

		C.shadowBlur = 5;
		C.context.fillText(text, pt.x - (tW), pt.y);
		C.context.fillText(text, pt.x - (tW), pt.y);
		C.shadowBlur = 10;
		C.context.fillText(text, pt.x - (tW), pt.y);
	//	C.context.fillText(text, pt.x - (tW), pt.y);
		C.shadowBlur = 15;
	//	C.context.fillText(text, pt.x - (tW), pt.y);
		C.shadowBlur = 20;
	//	C.context.fillText(text, pt.x - (tW), pt.y);
	//	C.shadowBlur = 25;
	//	C.context.fillText(text, pt.x - (tW), pt.y);
	//	C.shadowBlur = 30;
	//	C.context.fillText(text, pt.x - (tW), pt.y);

		C.beginPath();
		C.arc(mSmall.x, mSmall.y, 4, 0, jMath.PI*2);
		C.closePath();
		C.fill();
		C.fill();
		C.fill();
		C.fill();
		C.fill();
		C.fill();
		C.fill();

	//	this.RT.context.drawImage(this.RTSmall.getDOMNode(), 0, 0, this.halftoneWidth, this.halftoneHeight, 0, 0, this.halftoneWidth * 4, this.halftoneHeight * 4);

	//	C.shadowColor = '#333';
		C.shadowOffsetX = 0;
		C.shadowOffsetY = 0;
		C.shadowBlur = 0;

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "white";
		this.RT.context.fill();

		this.shader.setSource(this.RTSmall.context);
		this.shader.render(this.RT.context);
		

	//	this.shader.render(this.RT.context);
	}
}

var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'), document.getElementById('tsarShadow'));
power.ride(flow);
power.empower(new Shit());