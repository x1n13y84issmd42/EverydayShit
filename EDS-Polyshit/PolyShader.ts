/// <reference path="../shared/TSAR/src/Tsar/Render/Shader.ts" />
/// <reference path="../shared/TSAR/src/Tsar/Math/float3.ts" />

class PolyShader extends Tsar.Render.Shader
{
	private light: new Tsar.Math.float2(1, 0);

	public setLightVector(v: Tsar.Math.float2)
	{
		this.light = v;
	}

	public render(C)
	{
		var W = Tsar.UI.window.width();
		var H = Tsar.UI.window.height();

		var center = new Tsar.Math.float2(W/2, H/2);

		var points = [
			new Tsar.Math.float3(400, 200, 0),
			new Tsar.Math.float3(400, 200, 0),
			new Tsar.Math.float3(400, 200, 0)
		];
	}
}