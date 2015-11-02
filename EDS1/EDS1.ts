/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Math/float3.ts' />

/// <reference path='PowerShitShader.ts' />
/// <reference path='DashFieldShader.ts' />

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;

class EDS1 implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private shader: PowerShitShader;
	private lines: DashFieldShader;

	private W: number;
	private H: number;

	proj()
	{
		var w = 1000, h = 750;
		var p13 = new Tsar.Math.float3(0, 375, 500);
		var p12_1 = Tsar.Math.perspectiveProjection(p13, w, h, 0);
		var p12_2 = Tsar.Math.perspectiveProjection(p13, w, h, 10);
		var p12_3 = Tsar.Math.perspectiveProjection(p13, w, h, 100);

		console.log(p12_1);
		console.log(p12_2);
		console.log(p12_3);
	}

	ready()
	{
		this.proj();

		var eds1 = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();

		this.shader = new PowerShitShader();
		this.lines = new DashFieldShader(80, 20, 100, 40, 60);
		this.RT = new Tsar.Render.Target(this.W, this.H);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);

		var mouseFn = function(e){
			eds1.shader.setParallaxOffset(
				new TMath.float2(
					Math.floor(e.x) - (eds1.W/2),
					Math.floor(e.y) - (eds1.H/2)
			));

			eds1.lines.setParallaxOffset(
				new TMath.float2(
					Math.floor(e.x) - (eds1.W/2),
					Math.floor(e.y) - (eds1.H/2)
			));
		};

		var clickFn = function(e)
		{
			eds1.shader.hit();
		}

		rtproxy.mouse.onMove(mouseFn);
		rtproxy.mouse.onClick(clickFn);
	}

	update(dt:number, et:number, now:number)
	{
		this.shader.update(dt, et);
		this.lines.update(dt);
	}

	render()
	{
		this.RT.context.globalCompositeOperation = "source-over";

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "black";
		this.RT.context.fill();
	//	this.RT.context.clearRect(0, 0, this.W, this.H);
	
		this.shader.prepare("S  H  I  T", new TMath.float2(this.W/2, this.H/2), 24);
		this.shader.render(this.RT.context);

		this.lines.render(this.RT.context);
	}
}

var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'));
power.ride(flow);
power.empower(new EDS1());