/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

/*
///Fog对象的构造函数.用来在场景内创建线性雾效,线性雾效就是从雾效的起始点参数near,到结束点参数far,雾效强度线性递增,Fog对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var fog = new THREE.Fog(THREE.colorKeywords.cyan,2,500);
///	从相机的起始处长度为2开始,500结束的区域在场景中添加雾效,雾效的颜色是cyan,
*/
///<summary>Fog</summary>
///<param name ="color" type="THREE.Color">雾效的颜色属性,如果雾效颜色设置成黑色,远处的对象将被渲染成黑色</param>
///<param name ="near" type="number">应用雾效的起始点,雾效的near属性大于当前相机的near属性,当前相机才不会受相机影响,可选参数,默认是1</param>
///<param name ="far" type="number">应用雾效的结束点,雾效的far属性小于当前相机的far属性,当前相机才不会受相机影响,可选参数,默认是1000</param>
///<returns type="Fog">返回新的雾效对象</returns>
THREE.Fog = function ( color, near, far ) {

	this.name = '';		//雾效对象属性名,可有可无

	this.color = new THREE.Color( color );	//雾效的颜色属性

	this.near = ( near !== undefined ) ? near : 1;	//应用雾效的起始点,雾效的near属性大于当前相机的near属性,当前相机才不会受相机影响,可选参数,默认是1
	this.far = ( far !== undefined ) ? far : 1000;	//应用雾效的结束点,雾效的far属性小于当前相机的far属性,当前相机才不会受相机影响,可选参数,默认是1000

};

/****************************************
****下面是Fog对象提供的功能函数.
****************************************/

/*clone方法
///clone方法克隆一个雾效对象.
*/
///<summary>clone</summary>
///<returns type="Fog">返回克隆的线性雾效对象.</returns>	
THREE.Fog.prototype.clone = function () {

	return new THREE.Fog( this.color.getHex(), this.near, this.far );	//返回克隆的线性雾效对象

};
