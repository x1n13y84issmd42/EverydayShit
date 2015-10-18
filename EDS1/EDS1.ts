/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />

/// <reference path='DiscoShader.ts' />

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;

class EDS1 implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private disco: DiscoShader;

	private W: number;
	private H: number;

	ready()
	{
		var eds1 = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();

		this.disco = new DiscoShader();
		this.RT = new Tsar.Render.Target(this.W, this.H);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);

		var mouseFn = function(e){
			eds1.disco.setParallaxOffset(
				new TMath.float2(
					Math.floor(e.x) - (eds1.W/2),
					Math.floor(e.y) - (eds1.H/2)
			));
		};

		var clickFn = function(e)
		{
			eds1.disco.hit();
		}

		rtproxy.mouse.onMove(mouseFn);
		rtproxy.mouse.onClick(clickFn);
	}

	update(dt:number, et:number, now:number)
	{
		this.disco.update(dt, et);
	}

	render()
	{
		this.RT.context.globalCompositeOperation = "source-over";

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "#374D5C";
		this.RT.context.fill();
	//	this.RT.context.clearRect(0, 0, this.W, this.H);
	
		this.disco.prepare("S  H  I  T", new TMath.float2(this.W/2, this.H/2), 24);
		this.disco.render(this.RT.context);
	}
}

var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'));
power.ride(flow);
power.empower(new EDS1());