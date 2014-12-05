/**
 * @author MPanknin / http://www.redplant.de/
 * @author alteredq / http://alteredqualia.com/
 */
 /*
///AreaLight方法根据设置灯光的颜属性color, 强度属性intensity 创建平面光(面光,区域光).AreaLight对象的功能函数采用
/// 定义构造的函数原型对象来实现,区域光和其他光源不同,是一种二维面积光源,他的亮度不仅和强度有关,而且还和他的面积大小有关.
/// 通过变换灯光的width,height,normal属性,区域光可以模拟窗户射入光线.\
/// TODO: AreaLight类型灯光在这个版本内还没有实现阴影.???
/// Example:
/// 		var light = new THREE.AreaLight(0xff0000,1);	//创建平面灯光对象
/// 		light.position.set(50,50,30);	//设置位置
///			light.rotation.set(-0.3,0.3,0.002);	//设置角度
///			light.width = 10;	//设置宽度
///			light.height = 1;	//设置高度
///			scene.add(lignt);	//加入场景
*/
///<summary>AreaLight</summary>
///<param name ="color" type="THREE.Color">灯光的颜色属性</param>
///<param name ="intensity" type="Number">灯光的强度,默认是1</param>
///<returns type="AreaLight">返回AreaLight,区域光.</returns>
THREE.AreaLight = function ( color, intensity ) {

	THREE.Light.call( this, color );	//调用Light对象的call方法,将原本属于Light的方法交给当前对象AreaLight来使用.

	this.normal = new THREE.Vector3( 0, - 1, 0 );	//面光的法线.可以设置或者获得面光的单位向量,确认灯光照射面正确.这是在局部空间计算.
	this.right = new THREE.Vector3( 1, 0, 0 );		//

	this.intensity = ( intensity !== undefined ) ? intensity : 1;	//灯光的颜色属性,如果不指定,初始化为1.

	this.width = 1.0;	//区域光的宽度,初始化为1.0
	this.height = 1.0;	//区域光的高度,初始化为1.0\

	//WebGL是通过光强乘以衰减系数来计算衰减光照的,
	//attenuation (衰减系数) = 1`/ (this.constantAttenuation + this.distance * this.linearAttenuation + this.quadraticAttenuation * this.distance * this.distance )
	this.constantAttenuation = 1.5;	//常量衰减系数,系数值越大，衰变越快。
	this.linearAttenuation = 0.5;	//线性衰减系数,系数值越大，衰变越快。
	this.quadraticAttenuation = 0.1;	//衰减平方系数,系数值越大，衰变越快。

};

/**************************************************************************************
****下面是AreaLight对象提供的功能函数定义,一部分通过prototype继承自Light方法
***************************************************************************************/
THREE.AreaLight.prototype = Object.create( THREE.Light.prototype );	//AreaLight对象从THREE.Light的原型继承所有属性方法

