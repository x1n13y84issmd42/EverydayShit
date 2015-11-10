/// <reference path='../shared/TSAR/src/Tsar/Power.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Core/IApp.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Window.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Flow/RAF.ts' />
/// <reference path='../shared/TSAR/src/Tsar/DOM/Main.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Debug.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Render/Plotter.ts' />
/// <reference path='../shared/TSAR/src/Tsar/Math/float3.ts' />

/// <reference path='../shared/TSAR/src/Tsar/UI/Layout.ts' />
/// <reference path='../shared/TSAR/src/Tsar/UI/Label.ts' />

/// <reference path='PowerShitShader.ts' />
/// <reference path='DashFieldShader.ts' />

import DD = Tsar.Render.Debug;
import TMath = Tsar.Math;

class Shit implements Tsar.Core.IApp
{
	private RT: Tsar.Render.Target;
	private shader: PowerShitShader;
	private lines: DashFieldShader;

	private W: number;
	private H: number;

	private plotX = new Tsar.Render.Debug.Plot(50, -1, 1, {color:'red', axesColor:'white'});
	private plotY = new Tsar.Render.Debug.Plot(50, -1, 1, {color:'green', axesColor:'white'});
	private plotZ = new Tsar.Render.Debug.Plot(50, -1, 1, {color:'blue', axesColor:'white'});

	private label = new Tsar.UI.Label();

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

	setupUI()
	{
		Tsar.UI.layout.place(this.label);
		this.label.text = "Coding shit every day";
	}

	ready()
	{
		this.proj();
		this.setupUI();

		this.plotX.setPosition(new Tsar.Math.float2(140, 220));
		this.plotY.setPosition(new Tsar.Math.float2(20, 100));
		this.plotZ.setPosition(new Tsar.Math.float2(20, 220));

		var shit = this;

		var W = this.W = Tsar.UI.window.width();
		var H = this.H = Tsar.UI.window.height();

		this.shader = new PowerShitShader();
		this.lines = new DashFieldShader(80, 20, 100, 40, 60);
		this.RT = new Tsar.Render.Target(this.W, this.H);
		var rtproxy = Tsar.UI.exposeRenderTarget(this.RT);

		var px = 0;
		var py = 0;

		var mouseFn = function(e){
			var po = new TMath.float2(Math.floor(e.x) - (shit.W/2), Math.floor(e.y) - (shit.H/2));

			shit.shader.setParallaxOffset(po);
			shit.lines.setParallaxOffset(po);

			shit.plotX.addValue((e.x / shit.W) * 2 - 1);
			shit.plotY.addValue((e.y / shit.H) * 2 - 1);
		};

		var clickFn = function(e)
		{
			/*
			if (shit.RT.isFullscreen())
			{
				shit.RT.cancelFullscreen();
			}
			else
			{
				shit.RT.requestFullscreen();
			}
			*/
		}

		var motionFn = function(e)
		{
			shit.plotX.addValue(e.acceleration.x);
			shit.plotY.addValue(e.acceleration.y);
			shit.plotZ.addValue(e.acceleration.z);

			px += e.rotationRate.alpha * 9;
			py += e.rotationRate.beta * 9;

			if (px > 0) px = Math.min(px, 750);
			else if (px < 0) px = Math.max(px, -750);

			if (py > 0) py = Math.min(py, 450);
			else if (py < 0) py = Math.max(py, -450);

			shit.shader.setParallaxOffset(new Tsar.Math.float2(px, py));
			shit.lines.setParallaxOffset(new Tsar.Math.float2(px, py));
		}

		rtproxy.mouse.onMove(mouseFn);
		rtproxy.mouse.onClick(clickFn);
		rtproxy.motion.onMotion(motionFn);

		Tsar.UI.window.onResize(evt => {
			shit.W = Tsar.UI.window.width();
			shit.H = Tsar.UI.window.height();
			shit.RT.resize(shit.W, shit.H);
		});
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
	
		this.shader.prepare("S H I T", new TMath.float2(this.W/2, this.H/2), 24);
		this.shader.render(this.RT.context);

		this.lines.render(this.RT.context);
		
		this.plotX.render(this.RT.context);
		this.plotY.render(this.RT.context);
		this.plotZ.render(this.RT.context);
	}
}

var flow = new Tsar.Flow.RAF();
var power = new Tsar.Power();
Tsar.DOM.root(document.getElementById('tsar'));
power.ride(flow);
power.empower(new Shit());