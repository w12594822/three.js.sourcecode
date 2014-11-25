/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/*
///Face3对象的构造函数.用来在三维空间内通过参数a,b,c, normal, color, materialIndex创建一个三角面对象.Face3对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var a=0,b=1,c=2; var normal = new THREE.Vector3( 0, 1, 0 ); var color = new THREE.Color( 0xffaa00 ); var face = new THREE.Face3( a, b, c, normal, color, 0 );
///	创建一个a,b,c三点组成的颜色0xffaa00,法线指向normal,材质索引为0的三角面对象.
///
///	用法: var a=0,b=1,c=2;
		  var normal1 = new THREE.Vector3( 0, 1, 0 ), normal2 = new THREE.Vector3( 0, 1, 0 ), normal3 = new THREE.Vector3( 0, 1, 0 );
		  normal = new Array(normal1,normal2,normal3);
		  var color1 = new THREE.Color( 0xffaa00 ), color2 = new THREE.Color( 0x00aaff ), color3 = new THREE.Color( 0x00ffaa );
		  var color = new Array(color1,color2,color3);
		  var face = new THREE.Face3( a, b, c, normal, color, 0 );
///	创建一个颜色为0xffaa00,0x00aaff,0x00ffaa的a,b,c三点组成的,法线指向normal,材质索引为0的三角面对象.
*/
///<summary>Face3</summary>
///<param name ="a" type="Number">三角面角点a的索引</param>
///<param name ="b" type="Number">三角面角点b的索引</param>
///<param name ="c" type="Number">三角面角点c的索引</param>
///<param name ="normal" type="Vector3Array">三角面法线向量,或顶点法线向量数组</param>
///<param name ="color" type="Vector3Array">三角面颜色值,或顶点颜色值数组</param>
///<param name ="materialIndex" type="Vector3Array">材质索引</param>
THREE.Face3 = function ( a, b, c, normal, color, materialIndex ) {

	this.a = a;	//三角面顶点a的索引
	this.b = b;	//三角面顶点b的索引
	this.c = c;	//三角面顶点c的索引

	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();	//三角面的法线向量
	this.vertexNormals = normal instanceof Array ? normal : [];	//三角面顶点法线向量数组

	this.color = color instanceof THREE.Color ? color : new THREE.Color();	//三角面的颜色值
	this.vertexColors = color instanceof Array ? color : [];	//三角面的顶点颜色值数组

	this.vertexTangents = [];	//三角面的顶点正切数组

	this.materialIndex = materialIndex !== undefined ? materialIndex : 0;	//三角面的材质索引

};

/****************************************
****下面是Face3对象提供的功能函数.
****************************************/
THREE.Face3.prototype = {

	constructor: THREE.Face3,	//构造器,返回对创建此对象的Face3函数的引用

	/*clone方法
	///clone方法克隆一个三角面对象.
	*/
	///<summary>clone</summary>
	///<returns type="Vector4">返回三角面对象</returns>	
	clone: function () {

		var face = new THREE.Face3( this.a, this.b, this.c );

		face.normal.copy( this.normal );
		face.color.copy( this.color );

		face.materialIndex = this.materialIndex;

		for ( var i = 0, il = this.vertexNormals.length; i < il; i ++ ) {

			face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();

		}

		for ( var i = 0, il = this.vertexColors.length; i < il; i ++ ) {

			face.vertexColors[ i ] = this.vertexColors[ i ].clone();

		}

		for ( var i = 0, il = this.vertexTangents.length; i < il; i ++ ) {

			face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		}

		return face;	//返回克隆的三角面对象.

	}

};
