/**
 * @author alteredq / http://alteredqualia.com/
 */
 /*
///HemisphereLight类是在场景中创建半球光,就是天光效果,经常用在室外,将各个位置的物体都照亮,室内的光线大多是方向性的,
///无论是窗口还是灯槽,用平面光很方便,室外用平面光太麻烦了.HemisphereLight对象的功能函数采用定义构造的函数原型对象来实现.
/// TODO: HemisphereLight类型灯光在这个版本内还没有实现阴影.???
/// Example:
///			var light = new THREE.HemisphereLight(0x003388,0xcc0088,1);		//创建半球光
///			scene.add(light)	//添加到场景
///			light.position.set(0,300,0);
*/
///<summary>HemisphereLight</summary>
///<param name ="skyColor" type="THREE.Color">半球光的颜色(天光的颜色)</param>
///<param name ="groundColor" type="Number">半球光的地面颜色</param>
///<param name ="intensity" type="Number">灯光的强度,默认是1</param>
///<returns type="HemisphereLight">返回HemisphereLight,半球光.</returns>
THREE.HemisphereLight = function ( skyColor, groundColor, intensity ) {

	THREE.Light.call( this, skyColor );	//调用Light对象的call方法,将原本属于Light的方法交给当前对象HemisphereLight来使用.

	this.position.set( 0, 100, 0 );		//灯光的位置属性初始化为,0,100,0

	this.groundColor = new THREE.Color( groundColor );	//半球光的地面颜色
	this.intensity = ( intensity !== undefined ) ? intensity : 1;	//灯光的颜色属性,如果不指定,初始化为1.

};
/**************************************************************************************
****下面是HemisphereLight对象提供的功能函数定义,一部分通过prototype继承自Light方法
***************************************************************************************/
THREE.HemisphereLight.prototype = Object.create( THREE.Light.prototype );	//HemisphereLight对象从THREE.Light的原型继承所有属性方法

/*clone方法
///clone方法克隆PointLight对象
*/
///<summary>clone</summary>
///<returns type="HemiSphereLight">返回克隆的HemiSphereLight对象</returns>	
THREE.HemisphereLight.prototype.clone = function () {

	var light = new THREE.HemisphereLight();

	THREE.Light.prototype.clone.call( this, light );	//调用THREE.Light.clone方法,克隆扥光对象

	light.groundColor.copy( this.groundColor );	//复制灯光的地面颜色属性
	light.intensity = this.intensity;		//复制灯光的强度属性.

	return light;		//返回克隆的半球光的对象

};
