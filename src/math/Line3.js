
// File:src/math/Line3.js

/**
 * @author bhouston / http://exocortex.com
 */
/*
///Line3对象的构造函数.用来创建一个三维线段对象.Line3对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var start = new Vector3(0,0,0),end = new Vector3(1,1,1); var line = new Line3(start,end);
///	创建一个起始点start为0,0,0,结束点end为1,1,1的线段.
*/
///<summary>Vector3</summary>
///<param name ="start" type="Vector3">起始点坐标</param>
///<param name ="end" type="Vector3">结束点坐标</param>
THREE.Line3 = function ( start, end ) {

	this.start = ( start !== undefined ) ? start : new THREE.Vector3();
	this.end = ( end !== undefined ) ? end : new THREE.Vector3();

};

/****************************************
****下面是Line3对象提供的功能函数.
****************************************/
THREE.Line3.prototype = {

	constructor: THREE.Line3,		//构造器,返回对创建此对象的Line3函数的引用

	/*
	///set方法用来重新设置三维线段的起始点,结束点,start,end坐标值.并返回新的坐标值的三维线段.
	*/
	///<summary>set</summary>
	///<param name ="start" type="Vector3">起始点坐标</param>
	///<param name ="end" type="Vector3">结束点坐标</param>
	///<returns type="Line3">返回新坐标值的三维线段</returns>
	set: function ( start, end ) {

		this.start.copy( start );
		this.end.copy( end );

		return this;		//返回新坐标值的三维线段

	},

	/*
	///copy方法用来复制三维线段的起始点,结束点,start,end坐标值.并返回新的坐标值的三维线段.
	*/
	///<summary>copy</summary>
	///<param name ="line" type="Line3">三维线段</param>
	///<returns type="Line3">返回新坐标值的三维线段</returns>
	copy: function ( line ) {

		this.start.copy( line.start );
		this.end.copy( line.end );

		return this;	//返回新坐标值的三维线段

	},

	/*
	///center方法用来获得线段的中点.
	/// NOTE:optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象
	*/
	///<summary>center</summary>
	///<param name ="optionalTarget" type="Vector3">optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象</param>
	///<returns type="Line3">返回三维线段中点坐标</returns>
	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();			//optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象
		return result.addVectors( this.start, this.end ).multiplyScalar( 0.5 );		//返回三维线段中点坐标

	},

	/*
	///delta方法用来获得线段的向量,然后在通过矩阵应用各种便变换,放大缩小,移动等.
	/// NOTE:optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象
	/// NOTE:向量就是有向线段这句是错的,因为有向线段是固定的，即不能平移,而向量是可以平移的
	*/
	///<summary>delta</summary>
	///<param name ="optionalTarget" type="Vector3">optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象</param>
	///<returns type="Line3">返回三维线段的向量</returns>
	delta: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();		//optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象
		return result.subVectors( this.end, this.start );		//返回三维线段的向量

	},

	/*
	///distanceSq方法用来获得当前三维线段起始点到端点的距离的平方
	*/
	///<summary>distanceSq</summary>
	///<returns type="Vector">返回当前三维线段起始点到端点的距离的平方</returns>
	distanceSq: function () {

		return this.start.distanceToSquared( this.end );	//返回当前三维线段起始点到端点的距离的平方

	},

	/*
	///distanceTo方法将返回当前三维线段起始点到端点的的距离(只读).
	*/
	///<summary>distanceTo</summary>
	///<returns type="Number">返回当前三维线段起始点到端点的距离(只读).</returns>
	distance: function () {

		return this.start.distanceTo( this.end );	//返回当前三维线段起始点到端点的距离(只读).

	},

	/*
	///at方法将返回沿当前三维线段方向的任意向量,当t=0,返回起点向量,当t=1返回结束点向量.
	/// NOTE:optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象
	*/
	///<summary>at</summary>
	///<param name ="t" type="Number">数值,取值范围0-1</param>
	///<param name ="optionalTarget" type="Vector3">optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象</param>
	///<returns type="Line3">返回沿当前三维线段方向的任意向量/returns>
	at: function ( t, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();	//optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象

		return this.delta( result ).multiplyScalar( t ).add( this.start );	//返回沿当前三维线段方向的任意向量

	},

	/*
	///closestPointToPointParameter方法将返回一个基于点投影到线段上点的参数(就是参数point投影到线段的位置,或者说成是垂)足。如果参数clampToLine为真，那么返回值将是0和1之间。
	*/
	///<summary>closestPointToPointParameter</summary>
	///<param name ="point" type="Vector3">数值,取值范围0-1</param>
	///<param name ="clampToLine" type="Boolean">如果参数clampToLine为真，那么返回值将是0和1之间。</param>
	///<returns type="Number">返回一个基于最近点投影到线段上点的参数/returns>
	closestPointToPointParameter: function () {

		var startP = new THREE.Vector3();
		var startEnd = new THREE.Vector3();

		return function ( point, clampToLine ) {

			startP.subVectors( point, this.start );
			startEnd.subVectors( this.end, this.start );

			var startEnd2 = startEnd.dot( startEnd );
			var startEnd_startP = startEnd.dot( startP );

			var t = startEnd_startP / startEnd2;

			if ( clampToLine ) {

				t = THREE.Math.clamp( t, 0, 1 ); 	//调用THREE.Math.clamp()方法保证t值在0-1之间.

			}

			return t;	//返回一个基于最近点投影到线段上点的参数(就是参数point投影到线段的位置)

		};

	}(),

	/*
	///closestPointToPoint方法将返回一个基于点投影到线段上的向量。如果参数clampToLine为真，那么返回的向量在线段起始点和结束点之间。
	/// NOTE:optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象
	*/
	///<summary>closestPointToPoint</summary>
	///<param name ="point" type="Vector3">数值,取值范围0-1</param>
	///<param name ="clampToLine" type="Boolean">如果参数clampToLine为真，那么返回的向量在线段起始点和结束点之间。</param>
	///<param name ="optionalTarget" type="Vector3">optionalTarget是可选参数,如果没有设置,系统自动创建一个临时Vector3对象</param>
	///<returns type="Number">返回一个基于最近点投影到线段上的向量/returns>
	closestPointToPoint: function ( point, clampToLine, optionalTarget ) {

		var t = this.closestPointToPointParameter( point, clampToLine );

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );	//返回一个基于最近点投影到线段上的向量

	},

	/*
	///applyMatrix4方法对线段的起始点,结束点应用矩阵变换.达到旋转,缩放,移动的目的.
	*/
	///<summary>applyMatrix4</summary>
	///<param name ="m" type="Matrix4">仿射矩阵</param>
	///<returns type="Line3">返回新坐标值的三维线段</returns>
	applyMatrix4: function ( matrix ) {

		this.start.applyMatrix4( matrix );
		this.end.applyMatrix4( matrix );

		return this;	//返回新坐标值的三维线段

	},

	/*
	///equals方法将当前线段和参数line做对比,线段对比,就是起始点和结束点对比. 判断线段是否相等,返回true或者false.
	*/
	///<summary>equals</summary>
	///<param name ="line" type="Line3">作对比的线段</param>
	///<returns type="Boolean">返回true或者false</returns>
	equals: function ( line ) {

		return line.start.equals( this.start ) && line.end.equals( this.end );	//返回true或者false

	},

	/*clone方法
	///clone方法克隆一个三维线段对象.
	*/
	///<summary>clone</summary>
	///<returns type="Line3">返回三维线段对象</returns>	
	clone: function () {

		return new THREE.Line3().copy( this );	//返回三维线段对象

	}

};
