// File:src/math/Box2.js

/**
 * @author bhouston / http://exocortex.com
 */
/*
///Box2对象的构造函数.用来在二维空间内创建一个二维矩形边界边界对象.Box2对象的功能函数采用
///定义构造的函数原型对象来实现.
/// NOTE:如果没有参数min,max将二维矩形边界初始化为Infinity,无穷大
///
///	用法: var min = new Vector2(0,0),max = new Vector2(1,1); var box = new Box2(min,max);
///通过两个Vector2(二维向量)min,max创建一个二维矩形边界对象.
*/
///<summary>Box2</summary>
///<param name ="min" type="Vector2">边界的最小坐标值</param>
///<param name ="max" type="Vector2">边界的最大坐标值</param>
THREE.Box2 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector2( Infinity, Infinity );	//Infinity 正无穷大 
	this.max = ( max !== undefined ) ? max : new THREE.Vector2( - Infinity, - Infinity );	//- Infinity负无穷大

};


/****************************************
****下面是Box2对象提供的功能函数.
****************************************/
THREE.Box2.prototype = {

	constructor: THREE.Box2,	//构造器,返回对创建此对象的Box2函数的引用


	/*
	///set方法用来重新设置二维矩形边界的起始点,结束点,min,max坐标值.并返回新的坐标值的二维矩形边界.
	*/
	///<summary>set</summary>
	///<param name ="min" type="Vector2">边界的最小坐标值</param>
	///<param name ="max" type="Vector2">边界的最大坐标值</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;		//返回新坐标值的二维矩形边界


	},

	/*
	///setFromPoints方法通过Vector2对象组成的points数组重新设置二维矩形边界的最小值,最大值,min,max坐标值.并返回新的坐标值的二维矩形边界.
	*/
	///<summary>setFromPoints</summary>
	///<param name ="points" type="Vector2Array">Vector2对象组成的points数组</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	setFromPoints: function ( points ) {

		this.makeEmpty();	//调用.makeEmpty()方法将二维矩形边界min,max的x,y坐标初始化为Infinity,无穷大

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] )	//调用.expandByPoint()方法,获得points数组中的最小,最大坐标,然后扩展边界.

		}

		return this;	//返回新坐标值的二维矩形边界

	},

	/*
	///setFromCenterAndSize方法通过中心点,边界尺寸方式重新设置二维矩形边界的最小值,最大值,min,max坐标值.并返回新的坐标值的二维矩形边界.
	*/
	///<summary>setFromCenterAndSize</summary>
	///<param name ="center" type="Vector2">Vector2对象,中心点坐标</param>
	///<param name ="size" type="Number">边界尺寸</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector2();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );
			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;	//返回新坐标值的二维矩形边界

		};

	}(),

	/*
	///copy方法用来复制二维矩形边界的最小值,最大值,min,max坐标值.并返回新的坐标值的二维矩形边界.
	*/
	///<summary>copy</summary>
	///<param name ="box" type="Box2">二维矩形边界</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;	//返回新坐标值的二维矩形边界

	},

	/*
	///makeEmpty方法用来将二维矩形边界初始化为Infinity,无穷大
	*/
	///<summary>makeEmpty</summary>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	makeEmpty: function () {

		this.min.x = this.min.y = Infinity;		//将二维矩形边界初始化为Infinity,无穷大
		this.max.x = this.max.y = - Infinity;	//将二维矩形边界初始化为Infinity,无穷大

		return this;	//返回新坐标值的二维矩形边界

	},

	/*
	///empty方法用来判断二维矩形边界的最大值的x,y是否小于最小值的x,y.
	/// NOTE:如果此框包括零点在其边界返回true。
	/// NOTE:一个box有最大,最小边界,最大最小边界分别用一个点表示,这个点被两个边界共享.
	/// TODO:empty方法没有弄明白.什么时候用.
	*/
	///<summary>empty</summary>
	///<returns type="Boolean">返回true 或者 false</returns>
	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );		//返回true 或者 false

	},

	/*
	///center方法用来返回二维矩形边界的中点
	*/
	///<summary>center</summary>
	///<param name ="optionalTarget" type="Vector2">可选参数,接收返回结果,边界的中点</param>
	///<returns type="Vector2">返回二维矩形边界的中点</returns>
	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );	//返回二维矩形边界的中点

	},

	/*
	///size方法用来返回二维矩形边界尺寸的向量
	*/
	///<summary>size</summary>
	///<param name ="optionalTarget" type="Vector2">可选参数,接收返回结果,边界尺寸的向量</param>
	///<returns type="Vector2">返回二维矩形边界尺寸的向量</returns>
	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.subVectors( this.max, this.min );		//返回二维矩形边界尺寸的向量

	},

	/*
	///expandByPoint方法通过Vector2对象(point参数)扩展二维矩形边界的最小值,最大值,min,max坐标值.并返回新的坐标值的二维矩形边界.
	/// NOTE:expandByPoint方法与expandByVector方法都传递一个Vector2对象,expandByPoint方法将当前边界的最大值,最小值的x,y坐标对比,获得新的边界,但是expandByVector方法将二维矩形边界的最大值加上参数vector,最小值减去参数vector,
	*/
	///<summary>expandByPoint</summary>
	///<param name ="points" type="Vector2">Vector2对象</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;	//返回新坐标值的二维矩形边界
	},

	/*
	///expandByVector方法通过Vector2对象(vector参数)扩展二维矩形边界的最小值,最大值,min,max坐标值.并返回新的坐标值的二维矩形边界.
	/// NOTE:expandByVector方法与expandByPoint方法都传递一个Vector2对象,expandByPoint方法将当前边界的最大值,最小值的x,y坐标对比,获得新的边界,但是expandByVector方法将二维矩形边界的最大值加上参数vector,最小值减去参数vector,
	/// NOTE:expandByVector方法与expandByScalar方法不同的是expandByVector()接收一个向量,expandByScalar()方法接收一个标量.
	*/
	///<summary>expandByVector</summary>
	///<param name ="vector" type="Vector2">Vector2对象</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;	//返回新坐标值的二维矩形边界
	},

	/*
	///expandByScalar方法通过scalar扩展二维矩形边界的最小值,最大值,min,max坐标值.并返回新的坐标值的二维矩形边界.
	/// NOTE:expandByScalar方法与expandByVector方法不同的是expandByVector()接收一个向量,expandByScalar()方法接收一个标量.
	*/
	///<summary>expandByVector</summary>
	///<param name ="scalar" type="Number">数值对象</param>
	///<returns type="Box2">返回新坐标值的二维矩形边界</returns>
	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;	//返回新坐标值的二维矩形边界
	},

	/*
	///containsPoint方法用来获得参数point(一个Vector2的二维点坐标)是否在当前二维矩形边界内.
	*/
	///<summary>containsPoint</summary>
	///<param name ="point" type="Vector2">一个Vector2的二维点坐标</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ) {

			return false;	//不在边界内,返回false

		}

		return true;		//在边界内,返回true

	},

	/*
	///containsBox方法用来获得参数box(一个Box2的二维矩形边界)是否在当前二维矩形边界内.
	*/
	///<summary>containsBox</summary>
	///<param name ="box" type="Box2">一个Box2的二维矩形边界</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
		     ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) ) {

			return true;		//在边界内,返回true

		}

		return false;			//不在边界内,返回false

	},

	/*
	///getParameter方法用来获得参数point(一个Vector2的二维点坐标)在当前二维矩形边界的高宽比.
	///示例: var point = new Vector2(3,2);
	///		 var min= new Vector2(1,1),max = new Vector2(5,5);
	///		 var box = new Box2(min,max); //一个4x4的边界
	///		 var ot = new Vector2();
	///		 box.getParameter(point,ot);
	///		 ot= 3/4,1/2
	*/
	///<summary>containsBox</summary>
	///<param name ="box" type="Box2">一个Box2的二维矩形边界</param>
	///<param name ="optionalTarget" type="Vector2">可选参数,接收返回结果,含高宽比的二维向量</param>
	///<returns type="Vector2">返回包含高宽比的二维向量.</returns>
	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.
		// NOTE:这里可能会出现除数0.

		var result = optionalTarget || new THREE.Vector2();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);		//返回包含高宽比的二维向量

	},

	/*
	///isIntersectionBox方法用来获得参数box(一个Box2的二维矩形边界)是否与当前二维矩形边界相交.
	*/
	///<summary>isIntersectionBox</summary>
	///<param name ="box" type="Box2">一个Box2的二维矩形边界</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ) {

			return false;	//如果不相交,返回false

		}

		return true;		//如果相交,返回true.

	},

	/*
	///clampPoint方法用来限制参数point在二维矩形边界内.如果point小于min,返回min,如果大于max返回max,否则返回point
	*/
	///<summary>clampPoint</summary>
	///<param name ="point" type="Vector2">一个Vector2的二维点坐标</param>
	///<param name ="optionalTarget" type="Vector2">可选参数,接收返回结果,返回剪裁过的边界点</param>
	///<returns type="Vector2">返回剪裁过的边界点.</returns>
	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.copy( point ).clamp( this.min, this.max );	//返回剪裁过的边界点

	},

	/*
	///distanceToPoint方法用来获得边界内一点到最小边界,最大边界的长度(box的四条边的长度).
	*/
	///<summary>distanceToPoint</summary>
	///<param name ="point" type="Vector2">一个边界内的Vector2的二维点坐标</param>
	///<returns type="Number">返回边界内一点到最小边界,最大边界的长度(box的四条边的长度).</returns>
	distanceToPoint: function () {

		var v1 = new THREE.Vector2();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();	//返回边界内一点到最小边界,最大边界的长度(box的四条边的长度).

		};

	}(),

	/*
	///intersect方法用来通过收缩当前二维矩形边界,求当前二维矩形边界和参数box的交集.
	*/
	///<summary>intersect</summary>
	///<param name ="box" type="Box2">一个Box2的二维矩形边界</param>
	///<returns type="Boolean">返回当前二维矩形边界和参数box的交集</returns>
	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;	//返回当前二维矩形边界和参数box的交集

	},

	/*
	///intersect方法用来通过扩展当前二维矩形边界,将参数box包围进当前的二维矩形边界内.就是取两个边界的并集
	*/
	///<summary>intersect</summary>
	///<param name ="box" type="Box2">一个Box2的二维矩形边界</param>
	///<returns type="Boolean">返回两个边界的并集</returns>
	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;	//返回两个边界的并集

	},

	/*
	///translate方法用来通过参数offset,移动当前二维矩形边界的位置.
	*/
	///<summary>translate</summary>
	///<param name ="offset" type="Vector2">偏移量</param>
	///<returns type="Boolean">返回新坐标值的二维矩形边界</returns>
	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;	//返回新坐标值的二维矩形边界

	},

	/*
	///equals方法用来获得参数box(一个Box2的二维矩形边界)是否与当前二维矩形边界完全相等.
	*/
	///<summary>equals</summary>
	///<param name ="box" type="Box2">一个Box2的二维矩形边界</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );	//返回true 或者 false

	},

	/*clone方法
	///clone方法克隆一个二维矩形边界对象.
	*/
	///<summary>clone</summary>
	///<returns type="Box2">返回二维矩形边界对象</returns>	
	clone: function () {

		return new THREE.Box2().copy( this );	//返回二维矩形边界对象

	}

};
