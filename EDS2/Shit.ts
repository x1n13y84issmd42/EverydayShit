/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Math/float3.ts' />

/// <reference path='BlockyShitShader.ts' />
/// 

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;

class Shit implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private shader: BlockyShitShader;

	private W: number;
	private H: number;

	ready()
	{
		var shit = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();

		this.shader = new BlockyShitShader();
		this.RT = new Tsar.Render.Target(this.W, this.H);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);

		var mouseFn = function(e){
			/*
			shit.shader.setParallaxOffset(
				new TMath.float2(
					Math.floor(e.x) - (shit.W/2),
					Math.floor(e.y) - (shit.H/2)
			));
			*/
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
		this.shader.update(dt);
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
power.empower(new Shit());