/**
 * @author mrdoob / http://mrdoob.com/
 */
/*
///Face3对象的构造函数.用来在四维空间内通过参数a,b,c,d, normal, color, materialIndex创建一个四角面对象.Face4对象的功能函数采用
///定义构造的函数原型对象来实现.
///
/// NOTE:Face4方法已经删除,使用Face3替代,这里保留为了向下兼容.
///
///	用法: var a=0,b=1,c=2,d=3;var normal = new THREE.Vector3( 0, 1, 0 ); var color = new THREE.Color( 0xffaa00 ); var face = new THREE.Face3( a, b, c,d, normal, color, 0 );
///	创建一个a,b,c,d四点组成的颜色0xffaa00,法线指向normal,材质索引为0的四角面对象.
///
///	用法: var a=0,b=1,c=2,d=3;
		  var normal1 = new THREE.Vector3( 0, 1, 0 ), normal2 = new THREE.Vector3( 0, 1, 0 ), normal3 = new THREE.Vector3( 0, 1, 0 );
		  normal = new Array(normal1,normal2,normal3);
		  var color1 = new THREE.Color( 0xffaa00 ), color2 = new THREE.Color( 0x00aaff ), color3 = new THREE.Color( 0x00ffaa );
		  var color = new Array(color1,color2,color3);
		  var face = new THREE.Face3( a, b, c, d, normal, color, 0 );
///	创建一个颜色为0xffaa00,0x00aaff,0x00ffaa的a,b,c四点组成的,法线指向normal,材质索引为0的四角面对象.
*/
///<summary>Face4</summary>
///<param name ="a" type="Number">四角面角点a的索引</param>
///<param name ="b" type="Number">四角面角点b的索引</param>
///<param name ="c" type="Number">四角面角点c的索引</param>
///<param name ="d" type="Number">四角面角点d的索引</param>
///<param name ="normal" type="Vector3Array">四角面法线向量,或顶点法线向量数组</param>
///<param name ="color" type="Vector3Array">四角面颜色值,或顶点颜色值数组</param>
///<param name ="materialIndex" type="Vector3Array">材质索引</param>
THREE.Face4 = function ( a, b, c, d, normal, color, materialIndex ) {
	//提示用户,Face4方法已经删除,使用Face3替代,这里保留为了向下兼容
	console.warn( 'THREE.Face4 has been removed. A THREE.Face3 will be created instead.' )
	return new THREE.Face3( a, b, c, normal, color, materialIndex );	//调用Face3方法,忽略点d,返回创建的三角面.

};
