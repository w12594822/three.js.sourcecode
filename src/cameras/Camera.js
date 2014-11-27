/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/
/*
///Camera是相机对象的抽象基类,当创建相机时都从这个类继承.Camera对象的功能函数采用定义构造的函数原型对象来实现.
*/
///<summary>Camera</summary>
THREE.Camera = function () {

	THREE.Object3D.call( this );	//调用Object3D对象的call方法,将原本属于Object3D的方法交给当前对象Camera来使用.

	this.matrixWorldInverse = new THREE.Matrix4();	//为相机设置属性matrixWorldInverse,这是matrixWorld的逆矩阵,matrixWorld包含相机在世界坐标系的变换矩阵
	this.projectionMatrix = new THREE.Matrix4();	//为相机设置属性projectionMatrix,包含相机的投影矩阵

};

/*************************************************
****下面是Camera对象的方法属性定义,继承自Object3D
**************************************************/
THREE.Camera.prototype = Object.create( THREE.Object3D.prototype );	//Camrea对象从THREE.Objec3D的原型继承所有属性方法

/*
///lookAt方法用来旋转相机对象,并将对象面对空间中的点(参数vector)
*/
///<summary>lookAt</summary>
///<param name ="vector" type="Vector">Vector3对象</param>
///<returns type="Camera">返回新的Camera对象</returns>
THREE.Camera.prototype.lookAt = function () {

	// This routine does not support cameras with rotated and/or translated parent(s)
	//TODO: 这个程序不支持Camera摄像机的旋转和变换??英语不好,啥意思?

	var m1 = new THREE.Matrix4();

	return function ( vector ) {

		m1.lookAt( this.position, vector, this.up );	//调用THREE.Matrix4.lookAt()方法

		this.quaternion.setFromRotationMatrix( m1 );	//应用旋转矩阵

	};

}();

/*clone方法
///clone方法克隆Camera对象,
*/
///<summary>clone</summary>
///<param name ="camera" type="Camera">Camera对象</param>
///<returns type="Camera">返回克隆的Camera对象</returns>	
THREE.Camera.prototype.clone = function ( camera ) {

	if ( camera === undefined ) camera = new THREE.Camera();

	THREE.Object3D.prototype.clone.call( this, camera );	//调用THREE.Object3D.Clone(camera)方法,克隆相机对象

	camera.matrixWorldInverse.copy( this.matrixWorldInverse );	//将相机的matrixWorldInverse属性值复制
	camera.projectionMatrix.copy( this.projectionMatrix );	//将相机的projectionMatrix属性值复制

	return camera;	//返回克隆的Camera对象
};
