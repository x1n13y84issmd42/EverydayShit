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
/// <reference path='StarFieldShader.ts' />
/// 

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;
var jMath = Math;

class Shit implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private blocky: BlockyShitShader;
	private starField: StarFieldShader;

	private W: number;
	private H: number;

	private et = 0;

	ready()
	{
		var shit = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();

		this.blocky = new BlockyShitShader();
		this.starField = new StarFieldShader();
		this.RT = new Tsar.Render.Target(this.W, this.H);
		this.starField.setC(this.RT.context);
		this.starField.shine(500);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);

		var mouseFn = function(e){
			/*
			shit.blocky.setParallaxOffset(
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
		this.blocky.update(dt);
		this.starField.update(dt);
		this.et = et;
	}

	render()
	{
		this.RT.context.globalCompositeOperation = "source-over";

		this.RT.context.beginPath();
		this.RT.context.rect(0, 0, this.W, this.H);
		this.RT.context.closePath();
		this.RT.context.fillStyle = "rgba(0, 0, 0, 1)";
		this.RT.context.fill();

		var gridColor = new Tsar.Math.Color(45, 162, 255, 1);
		gridColor.a = 0.5 + 0.5 * jMath.sin(this.et / 7);

		/*
		DD.grid(this.RT.context, [
			{
				style: DD.GridStyle.Dashed,
				axiality: DD.GridStyle.X,
				width: 1,
				stroke: gridColor.rgba(),
				offset: 200,
				numbers: true
			},
			{
				style: DD.GridStyle.Dashed,
				axiality: DD.GridStyle.Y,
				width: 1,
				stroke: gridColor.rgba(),
				offset: 200,
				numbers: true
			}
		]);
		*/
	
		this.starField.render(this.RT.context);
		this.blocky.render(this.RT.context);
	}
}

var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'));
power.ride(flow);
power.empower(new Shit());
