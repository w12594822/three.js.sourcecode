/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */

/*
///Triangle对象的构造函数.用来在三维空间内通过参数a,b,c创建一个二维三角形对象.Triangle对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var a = new Vector3(0,0,0),b = new Vector3(1,1,1),c = new Vector3(2,2,2); var triangle = new Triangle(a,b,c);
///创建一个a,b,c三点组成的三角形对象.
*/
///<summary>Triangle</summary>
///<param name ="a" type="Vector3">三角形角点a</param>
///<param name ="b" type="Vector3">三角形角点b</param>
///<param name ="c" type="Vector3">三角形角点c</param>
THREE.Triangle = function ( a, b, c ) {

	this.a = ( a !== undefined ) ? a : new THREE.Vector3();
	this.b = ( b !== undefined ) ? b : new THREE.Vector3();
	this.c = ( c !== undefined ) ? c : new THREE.Vector3();

};

/*
///normal方法通过计算返回三角形的法线向量.
*/
///<summary>normal</summary>
///<param name ="a" type="Vector3">三角形角点a</param>
///<param name ="b" type="Vector3">三角形角点b</param>
///<param name ="c" type="Vector3">三角形角点c</param>
///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果</param>
///<returns type="Vector3">返回三角形的法线向量</returns>
THREE.Triangle.normal = function () {

	var v0 = new THREE.Vector3();

	return function ( a, b, c, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		result.subVectors( c, b );
		v0.subVectors( a, b );
		result.cross( v0 );	//返回为同时垂直于两个参数向量的向量，方向可朝上也可朝下，由两向量夹角的方向决定。

		var resultLengthSq = result.lengthSq();	//Vecotr3.lengthSq()返回这个三维向量的长度的平方
		if ( resultLengthSq > 0 ) {		//如果大于0,三角形有效.

			return result.multiplyScalar( 1 / Math.sqrt( resultLengthSq ) );	//返回三角形的法线向量

		}

		return result.set( 0, 0, 0 );	//返回原点

	};

}();

/*
///barycoordFromPoint方法通过计算返回参数a,b,c所组成的三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值,这个权值就是重心坐标.
///	NOTE:重心坐标的定义
/// 	三角形所在平面的任意点都能表示为顶点的加权平均值，这个权就叫做重心坐标。从重心坐标到标准坐标的转换为（无论2D或3D，连4D、5D也是这样）：
/// 	(b1,b2,b3) b1v1+b2v2+b3v3
/// 	式中：b1,b2,b3——重心坐标的分量
/// 	v1,v2,v3——三角形的顶点坐标
/// 	注意b1+b2+b3=1，所以实际上只有两个自由度，空间仍是2D的。
/// 	实际上，重心坐标能表示三角形所在平面所有的点，但三角形外的点坐标至少有一个为负。
/// 	对三角形内的点，计算重心坐标的方法如图所示：（图上不太清楚，红绿蓝分别为T1,T2,T3,大三角面积为T）
/// 	b1=T1/T，b2=T2/T，b3=T3/T。
/// 	对三角形[1] 外的点这仍适用，不过点落在一条边外时，此边上三角形面积取负数。
/// NOTE:重心坐标uv相加必须为1,重心坐标能表示三角形所在平面所有的点，但三角形外的点坐标至少有一个为负。
/// NOTE:更多理论参考:http://zh.wikipedia.org/wiki/%E9%87%8D%E5%BF%83%E5%9D%90%E6%A0%87
///
///
*/
///<summary>barycoordFromPoint</summary>
///<param name ="point" type="Vector3">Vector3对象,任意点</param>
///<param name ="a" type="Vector3">三角形角点a</param>
///<param name ="b" type="Vector3">三角形角点b</param>
///<param name ="c" type="Vector3">三角形角点c</param>
///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果</param>
///<returns type="Vector3">返回三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值</returns>
// static/instance method to calculate barycoordinates
// 静态方法用来计算三角形重心坐标
// 下面有个非常形象的例子: http://www.blackpawn.com/texts/pointinpoly/default.html
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
THREE.Triangle.barycoordFromPoint = function () {

	var v0 = new THREE.Vector3();
	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();

	return function ( point, a, b, c, optionalTarget ) {

		v0.subVectors( c, a );
		v1.subVectors( b, a );
		v2.subVectors( point, a );

		var dot00 = v0.dot( v0 );
		var dot01 = v0.dot( v1 );
		var dot02 = v0.dot( v2 );
		var dot11 = v1.dot( v1 );
		var dot12 = v1.dot( v2 );

		var denom = ( dot00 * dot11 - dot01 * dot01 );

		var result = optionalTarget || new THREE.Vector3();

		// colinear or singular triangle
		// 共线三角形或者无效三角形
		if ( denom == 0 ) {
			// arbitrary location outside of triangle?
			// 三角形外的任意一点
			// not sure if this is the best idea, maybe should be returning undefined
			// 不确定这是最好的做法,也许应该返回undefined
			return result.set( - 2, - 1, - 1 );	//三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值
		}

		var invDenom = 1 / denom;
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycoordinates must always sum to 1
		// 重心坐标uv相加必须为1.
		return result.set( 1 - u - v, v, u );	//三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值

	};

}();

/*
///containsPoint方法判断任意点(参数point)是否在a,b,c所组成的三角形内.
*/
///<summary>containsPoint</summary>
///<param name ="point" type="Vector3">Vector3对象,任意点</param>
///<param name ="a" type="Vector3">三角形角点a</param>
///<param name ="b" type="Vector3">三角形角点b</param>
///<param name ="c" type="Vector3">三角形角点c</param>
///<returns type="Vector3">返回true或者false</returns>
THREE.Triangle.containsPoint = function () {

	var v1 = new THREE.Vector3();

	return function ( point, a, b, c ) {

		var result = THREE.Triangle.barycoordFromPoint( point, a, b, c, v1 );	//barycoordFromPoint()方法返回三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值,这个权值就是重心坐标.

		return ( result.x >= 0 ) && ( result.y >= 0 ) && ( ( result.x + result.y ) <= 1 );	//返回true或者false

	};

}();

/****************************************
****下面是Triangle对象提供的功能函数.
****************************************/
THREE.Triangle.prototype = {

	constructor: THREE.Triangle,	//构造器,返回对创建此对象的Triangle函数的引用

	/*
	///set方法用来重新设置三角形的顶点坐标(a,b,c),返回新的三角形.
	*/
	///<summary>set</summary>
	///<param name ="a" type="Vector3">三角形角点a</param>
	///<param name ="b" type="Vector3">三角形角点b</param>
	///<param name ="c" type="Vector3">三角形角点c</param>
	///<returns type="Triangle">返回新的三角形</returns>
	set: function ( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;	//返回新的三角形

	},

	/*
	///set方法用来坐标点数组,以及索引值,重新设置三角形的顶点坐标(a,b,c),返回新的三角形.
	*/
	///<summary>set</summary>
	///<param name ="points" type="Vector3Array">坐标点数组</param>
	///<param name ="i0" type="int">三角形角点a在数组中的索引</param>
	///<param name ="i1" type="int">三角形角点b在数组中的索引</param>
	///<param name ="i2" type="int">三角形角点c在数组中的索引</param>
	///<returns type="Triangle">返回新的三角形</returns>
	setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;	//返回新的三角形

	},

	/*
	///copy方法用来复制三角形的顶点a,b,c坐标值.返回新的二维平面
	///TODO: copy方法和clone方法有什么不同?
	*/
	///<summary>copy</summary>
	///<param name ="triangle" type="Triangle">三角形</param>
	///<returns type="Triangle">返回新的三角形</returns>
	copy: function ( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;	//返回新的三角形

	},

	/*
	///area方法用来返回当前三角形的面积
	*/
	///<summary>area</summary>
	///<returns type="Triangle">返回当前三角形的面积</returns>
	area: function () {

		var v0 = new THREE.Vector3();
		var v1 = new THREE.Vector3();

		return function () {

			v0.subVectors( this.c, this.b );
			v1.subVectors( this.a, this.b );

			return v0.cross( v1 ).length() * 0.5;	//返回当前三角形的面积

		};

	}(),

	/*
	///midpoint方法用来返回当前三角形的中点
	*/
	///<summary>midpoint</summary>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果</param>
	///<returns type="Triangle">返回当前三角形的中点</returns>
	midpoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );	//返回当前三角形的中点

	},

	/*
	///normal方法通过计算返回当前三角形的法线向量
	*/
	///<summary>midpoint</summary>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果</param>
	///<returns type="Triangle">返回当前三角形的法线向量</returns>
	normal: function ( optionalTarget ) {

		return THREE.Triangle.normal( this.a, this.b, this.c, optionalTarget );		//调用THREE.Triangle.normal()方法,返回当前三角形的法线向量

	},

	/*
	///plane方法创建与当前三角形共面的平面Plane对象.
	*/
	///<summary>plane</summary>
	///<param name ="optionalTarget" type="Plane">可选参数,接收返回结果</param>
	///<returns type="Triangle">返回与当前三角形共面的平面Plane对象.</returns>
	plane: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Plane();

		return result.setFromCoplanarPoints( this.a, this.b, this.c );	//返回与当前三角形共面的平面Plane对象

	},

	/*
	///barycoordFromPoint方法通过计算返回当前三角形所在的平面上任意点(参数point)所表示当前三角形顶点的加权平均值,这个权值就是重心坐标.
	///	NOTE:重心坐标的定义
	/// 	三角形所在平面的任意点都能表示为顶点的加权平均值，这个权就叫做重心坐标。从重心坐标到标准坐标的转换为（无论2D或3D，连4D、5D也是这样）：
	/// 	(b1,b2,b3) b1v1+b2v2+b3v3
	/// 	式中：b1,b2,b3——重心坐标的分量
	/// 	v1,v2,v3——三角形的顶点坐标
	/// 	注意b1+b2+b3=1，所以实际上只有两个自由度，空间仍是2D的。
	/// 	实际上，重心坐标能表示三角形所在平面所有的点，但三角形外的点坐标至少有一个为负。
	/// 	对三角形内的点，计算重心坐标的方法如图所示：（图上不太清楚，红绿蓝分别为T1,T2,T3,大三角面积为T）
	/// 	b1=T1/T，b2=T2/T，b3=T3/T。
	/// 	对三角形[1] 外的点这仍适用，不过点落在一条边外时，此边上三角形面积取负数。
	/// NOTE:重心坐标uv相加必须为1,重心坐标能表示三角形所在平面所有的点，但三角形外的点坐标至少有一个为负。
	/// NOTE:更多理论参考:http://zh.wikipedia.org/wiki/%E9%87%8D%E5%BF%83%E5%9D%90%E6%A0%87
	///
	///
	*/
	///<summary>barycoordFromPoint</summary>
	///<param name ="point" type="Vector3">Vector3对象,任意点</param>
	///<param name ="a" type="Vector3">三角形角点a</param>
	///<param name ="b" type="Vector3">三角形角点b</param>
	///<param name ="c" type="Vector3">三角形角点c</param>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果</param>
	///<returns type="Vector3">返回当前三角形所在的平面上任意点(参数point)所表示当前三角形顶点的加权平均值</returns>
	// static/instance method to calculate barycoordinates
	// 静态方法用来计算三角形重心坐标
	// 下面有个非常形象的例子: http://www.blackpawn.com/texts/pointinpoly/default.html
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	barycoordFromPoint: function ( point, optionalTarget ) {
		//调用THREE.Triangle.barycoordFromPoint()方法
		return THREE.Triangle.barycoordFromPoint( point, this.a, this.b, this.c, optionalTarget );		//返回当前三角形所在的平面上任意点(参数point)所表示当前三角形顶点的加权平均值

	},

	/*
	///containsPoint方法判断任意点(参数point)是否在当前三角形内.
	*/
	///<summary>containsPoint</summary>
	///<param name ="point" type="Vector3">Vector3对象,任意点</param>
	///<param name ="a" type="Vector3">三角形角点a</param>
	///<param name ="b" type="Vector3">三角形角点b</param>
	///<param name ="c" type="Vector3">三角形角点c</param>
	///<returns type="Vector3">返回true或者false</returns>
	containsPoint: function ( point ) {
		//调用THREE.Triangle.containsPoint()方法.
		return THREE.Triangle.containsPoint( point, this.a, this.b, this.c );	//返回true或者false

	},

	/*
	///equals方法用来获得参数triangle(三角形对象)是否与当前三角形完全相等,即三角形的顶点a,b,c相等.
	*/
	///<summary>equals</summary>
	///<param name ="triangle" type="Triangle">一个Triangle的三角形对象</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	equals: function ( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );	//返回true 或者 false

	},

	/*clone方法
	///clone方法克隆一个三角形对象.
	*/
	///<summary>clone</summary>
	///<returns type="Plane">返回三角形对象</returns>	
	clone: function () {

		return new THREE.Triangle().copy( this );	//返回三角形对象

	}

};
