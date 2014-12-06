/**
 * @author alteredq / http://alteredqualia.com/
 */
 /*
///SpotLight方法根据设置灯光的颜属性color, 强度属性intensity,距离属性 distance,灯光的照射角度 angle,衰减速度 exponent 创建聚光灯光源(射灯).
///SpotLight对象的功能函数采用定义构造的函数原型对象来实现.
/// NOTE: SpotLight类型灯光实现了阴影,但是需要在场景中使用MeshLambertMaterial或者MeshPhongMaterial
/// 下面一些注释直接摘抄自:http://www.cnblogs.com/yiyezhai/archive/2012/12/24/2829991.html
/// Example:
/// 		var light = new THREE.SpotLight(0xff0000,1,100,Math.PI /2,5);	//创建灯光对象
/// 		light.position.set(50,50,30);	//设置位置
///			light.castShadow = true;	//开启阴影
///			light.shadowMapWidth = 1024; //阴影贴图宽度设置为1024像素
///			light.shadowMapHeight = 1024; //阴影贴图高度设置为1024像素
///			light.shadowCameraNear = 500;	//阴影的平截头体区域near属性
///			light.shadowCameraFar = 4000;	//阴影的平截头体区域far属性
///			light.shadowCameraFov = 30;	//阴影的平截头体区域fov属性
///			scene.add(lignt);	//加入场景
*/
///<summary>SpotLight</summary>
///<param name ="color" type="THREE.Color">灯光的颜色属性</param>
///<param name ="intensity" type="Number">灯光的强度,默认是1</param>
///<param name ="distance" type="Number">灯光的长度属性,从灯光的position位置,开始衰减,衰减到distance的长度,默认是0</param>
///<param name ="angle" type="Number">聚光灯的灯光照射角度属性,单位是弧度,默认是60度角的弧度</param>
///<param name ="exponent" type="Number">聚光灯的从照射点的衰减速度属性,默认是10</param>
///<returns type="SpotLight">返回SpotLight,聚光灯光源.</returns>
THREE.SpotLight = function ( color, intensity, distance, angle, exponent ) {

	THREE.Light.call( this, color );	//调用Light对象的call方法,将原本属于Light的方法交给当前对象SpotLight来使用.

	this.position.set( 0, 1, 0 );		//灯光的位置属性初始化为,0,1,0
	this.target = new THREE.Object3D();	//创建一个目标点对象,目标点对象是一个Object3D对象.

	this.intensity = ( intensity !== undefined ) ? intensity : 1;	//灯光的颜色属性,如果不指定,初始化为1.(光线的密度，默认为1。因为RGB的三个值均在0~255之间，不能反映出光照的强度变化，光照越强，物体表面就更明亮。)
	this.distance = ( distance !== undefined ) ? distance : 0;		//灯光的长度属性,如果不指定,初始化为0.(衰减距离，默认值为0，光照无衰减；如果是非0值，光照会从position位置（实际上是position所处的那个平面）开始衰减，衰减到distance距离之后，光照强度intensity为0)
	this.angle = ( angle !== undefined ) ? angle : Math.PI / 3;		//聚光灯的灯光照射角度属性,单位是弧度,默认是60度角的弧度
	this.exponent = ( exponent !== undefined ) ? exponent : 10;		//聚光灯的从照射点的衰减速度指数,默认是10

	this.castShadow = false;	//布尔值,默认为false,如果设置为true,对于所有表面都会逐像元地计算其在光照方向上是否被遮挡，这会消耗大量的计算。
	this.onlyShadow = false;	//布尔值，控制是否只产生阴影而不“照亮”物体，默认为false。这种模式也许有什么特殊应用吧。

	//

	this.shadowCameraNear = 50;	//shadowCameraNear,shadowCameraFar,shadowCameraFov属性,平截头体近端,定义一个范围(平截头体),不计算在范围之外的物体的阴影,near默认是50
	this.shadowCameraFar = 5000;	//shadowCameraNear,shadowCameraFar,shadowCameraFov属性,平截头体远端,定义一个范围(平截头体),不计算在范围之外的物体的阴影,far默认是5000
	this.shadowCameraFov = 50;	//shadowCameraNear,shadowCameraFar,shadowCameraFov属性,平截头体视野,定义一个范围(平截头体),不计算在范围之外的物体的阴影,fov默认是50,

	this.shadowCameraVisible = false;	//shadowCameraVisible设置为true,会在场景中显示灯光的框架,方便调试

	this.shadowBias = 0;	//阴影贴图的偏移,
	this.shadowDarkness = 0.5;	//阴影对物体亮度的影响,默认是0.5

	this.shadowMapWidth = 512; //阴影贴图宽度,单位像素,默认512
	this.shadowMapHeight = 512; //阴影贴图高度,单位像素,默认512

	//TODO: 下面这些完全没弄明白,以后补上详细的注释

	this.shadowMap = null;		//指定阴影贴图,WebGLRenderTarget对象,这里好像很复杂,完全没弄明白,以后补上详细的注释.
	this.shadowMapSize = null;	//阴影图的大小,注意,这里应符合OpenGL中对纹理的要求(2的n次方+2n)  
	this.shadowCamera = null;	//阴影贴图相机,THREE.PerspectiveCamera对象,
	this.shadowMatrix = null;	//阴影贴图矩阵

};

/**************************************************************************************
****下面是SpotLight对象提供的功能函数定义,一部分通过prototype继承自Light方法
***************************************************************************************/
THREE.SpotLight.prototype = Object.create( THREE.Light.prototype );	//SpotLight对象从THREE.Light的原型继承所有属性方法

/*clone方法
///clone方法克隆SpotLight对象
*/
///<summary>clone</summary>
///<returns type="SpotLight">返回克隆的SpotLight对象</returns>	
THREE.SpotLight.prototype.clone = function () {

	var light = new THREE.SpotLight();

	THREE.Light.prototype.clone.call( this, light );	//调用THREE.Light.clone方法,克隆聚光灯对象
	//复制当前灯光对象的属性
	light.target = this.target.clone();

	light.intensity = this.intensity;
	light.distance = this.distance;
	light.angle = this.angle;
	light.exponent = this.exponent;

	light.castShadow = this.castShadow;
	light.onlyShadow = this.onlyShadow;

	//

	light.shadowCameraNear = this.shadowCameraNear;
	light.shadowCameraFar = this.shadowCameraFar;
	light.shadowCameraFov = this.shadowCameraFov;

	light.shadowCameraVisible = this.shadowCameraVisible;

	light.shadowBias = this.shadowBias;
	light.shadowDarkness = this.shadowDarkness;

	light.shadowMapWidth = this.shadowMapWidth;
	light.shadowMapHeight = this.shadowMapHeight;

	return light;	//返回克隆的聚光灯光源的对象

};
