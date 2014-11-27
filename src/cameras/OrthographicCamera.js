/**
 * @author alteredq / http://alteredqualia.com/
 */

/*
///OrthographicCamera方法根据  left, right, top, bottom, near, far 生成正交投影相机.OrthographicCamera对象的功能函数采用
/// 定义构造的函数原型对象来实现.
*/
///<summary>OrthographicCamera</summary>
///<param name ="left" type="Number">指明相对于垂直平面的左侧坐标位置</param>
///<param name ="right" type="Number">指明相对于垂直平面的右侧坐标位置</param>
///<param name ="top" type="Number">指明相对于垂直平面的顶部坐标位置</param>
///<param name ="bottom" type="Number">指明相对于垂直平面的底部坐标位置</param>
///<param name ="near" type="Number">指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1</param>
///<param name ="far" type="Number">指明相对于深度剪切面的远的距离，必须为正数,可选参数,如果未指定,初始化为2000</param>
///<returns type="OrthographicCamera">返回OrthographicCamera,正交投影相机.</returns>
THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {

	THREE.Camera.call( this );	//调用Camera对象的call方法,将原本属于Camera的方法交给当前对象OrthographicCamera来使用.

	this.left = left;	//指明相对于垂直平面的相机的左侧坐标位置
	this.right = right;	//指明相对于垂直平面的相机的右侧坐标位置
	this.top = top;		//指明相对于垂直平面的相机的顶部坐标位置
	this.bottom = bottom;	//指明相对于垂直平面的相机的底部坐标位置

	this.near = ( near !== undefined ) ? near : 0.1;	//指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1
	this.far = ( far !== undefined ) ? far : 2000;	//指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为2000

	this.updateProjectionMatrix();	//调用updateProjectionMatrix方法,更新相机的投影矩阵.

};
/**************************************************************************************
****下面是OrthographicCamera对象提供的功能函数定义,一部分通过prototype继承自Camera方法
***************************************************************************************/
THREE.OrthographicCamera.prototype = Object.create( THREE.Camera.prototype );

/*
///updateProjectionMatrix方法返回正交投影相机的可视边界的矩阵.
*/
///<summary>updateProjectionMatrix</summary>
///<returns type="OrthographicCamera">返回新的OrthographicCamera对象</returns>
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {

	this.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );	//调用THREE.Matrix4.makeOrthographic生成正交矩阵

};

/*clone方法
///clone方法克隆OrthographicCamera对象
*/
///<summary>clone</summary>
///<returns type="OrthographicCamera">返回克隆的OrthographicCamera对象</returns>	
THREE.OrthographicCamera.prototype.clone = function () {

	var camera = new THREE.OrthographicCamera();

	THREE.Camera.prototype.clone.call( this, camera );	//调用THREE.Camera.Clone(camera)方法,克隆相机对象

	camera.left = this.left;	//将正交投影相机的 left 属性值复制
	camera.right = this.right;	//将正交投影相机的 right 属性值复制
	camera.top = this.top;	//将正交投影相机的 top 属性值复制
	camera.bottom = this.bottom;	//将正交投影相机的 bottom 属性值复制

	camera.near = this.near;	//将正交投影相机的 near 属性值复制
	camera.far = this.far;	//将正交投影相机的 far 属性值复制

	return camera;	//返回克隆的OrthographicCamera对象
};
