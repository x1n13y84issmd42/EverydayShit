/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Math/float3.ts' />

/// <reference path='PolyShader.ts' />

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;

class EDS implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private shader: PolyShader;

	private W: number;
	private H: number;

	private center: Tsar.Math.float3;
	private light: Tsar.Math.float3;

	crossTest()
	{
		console.log((new Tsar.Math.float3(1, 0, 0)).cross(new Tsar.Math.float3(0, 0, 1)));
		console.log((new Tsar.Math.float3(1, 0, 0.5)).normalize().cross((new Tsar.Math.float3(0.3, 0, 1.5)).normalize()));
	}

	ready()
	{
		this.crossTest();

		var eds = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();
		this.center = new Tsar.Math.float3(W/2, H/2, 500);

		this.shader = new PolyShader();
		this.RT = new Tsar.Render.Target(this.W, this.H);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);

		var mouseFn = function(e){
			var v = new Tsar.Math.float3(
					Math.floor(e.x),
					Math.floor(e.y),
					500);

			eds.light = eds.center.sub(v).normalize();

		//	console.log(e.x + " " + e.y);
		//	console.log(eds.light);
		};

		rtproxy.mouse.onMove(mouseFn);

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "white";
		this.RT.context.fill();
	}

	update(dt:number, et:number, now:number)
	{
		this.shader.setLightVector(this.light);
	}

	render()
	{
		this.RT.context.globalCompositeOperation = "source-over";

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "rgba(255, 255, 255, 0.1)";
		this.RT.context.fill();
	
		this.shader.render(this.RT.context);
	}
}

var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'));
power.ride(flow);
power.empower(new EDS());