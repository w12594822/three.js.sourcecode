
// File:src/math/Box3.js

/**
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */
/*
///Box3对象的构造函数.用来在三维空间内创建一个立方体边界对象.Box3对象的功能函数采用
///定义构造的函数原型对象来实现.
/// NOTE:如果没有参数min,max将立方体边界初始化为Infinity,无穷大
///
///	用法: var min = new Vector3(0,0,0),max = new Vector3(1,1,1); var box = new Box3(min,max);
///通过两个Vector3(三维向量)min,max创建一个立方体边界对象.
*/
///<summary>Box3</summary>
///<param name ="min" type="Vector3">边界的最小坐标值</param>
///<param name ="max" type="Vector3">边界的最大坐标值</param>
THREE.Box3 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector3( Infinity, Infinity, Infinity );			//Infinity 正无穷大 
	this.max = ( max !== undefined ) ? max : new THREE.Vector3( - Infinity, - Infinity, - Infinity );	//- Infinity负无穷大

};

/****************************************
****下面是Box3对象提供的功能函数.
****************************************/
THREE.Box3.prototype = {

	constructor: THREE.Box3,	//构造器,返回对创建此对象的Box3函数的引用

	/*
	///set方法用来重新设置立方体边界的起始点,结束点,min,max坐标值.并返回新的坐标值的立方体边界.
	*/
	///<summary>set</summary>
	///<param name ="min" type="Vector3">边界的最小坐标值</param>
	///<param name ="max" type="Vector3">边界的最大坐标值</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;		//返回新坐标值的立方体边界

	},

	/*
	///setFromPoints方法通过Vector3对象组成的points数组重新设置立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	*/
	///<summary>setFromPoints</summary>
	///<param name ="points" type="Vector3Array">Vector3对象组成的points数组</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] )	//调用.expandByPoint()方法,获得points数组中的最小,最大坐标,然后扩展边界.

		}

		return this;	//返回新坐标值的立方体边界

	},

	/*
	///setFromCenterAndSize方法通过中心点,边界尺寸方式重新设置立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	*/
	///<summary>setFromCenterAndSize</summary>
	///<param name ="center" type="Vector3">Vector3对象,中心点坐标</param>
	///<param name ="size" type="Number">边界尺寸</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector3();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;	//返回新坐标值的立方体边界

		};

	}(),

	/*
	///setFromObject方法通过获得参数object的端点重新设置立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	*/
	///<summary>setFromObject</summary>
	///<param name ="object" type="Object3D">Object3D对象</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	setFromObject: function () {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and childrens', world transforms
		//变换世界坐标系,通过获取Object3D对象(包括子对象)的端点设置立方体边界

		var v1 = new THREE.Vector3();

		return function ( object ) {

			var scope = this;

			object.updateMatrixWorld( true );	//设置全局变换,object以及子对象都应用变换.
												//TODO: updateMatrixWorld()方法还没细看,

			this.makeEmpty();	//调用Box3.makeEmpty()方法,将立方体边界设置成无穷大.

			object.traverse( function ( node ) {

				if ( node.geometry !== undefined && node.geometry.vertices !== undefined ) {

					var vertices = node.geometry.vertices;

					for ( var i = 0, il = vertices.length; i < il; i ++ ) {

						v1.copy( vertices[ i ] );

						v1.applyMatrix4( node.matrixWorld );

						scope.expandByPoint( v1 );	//调用expandByPoint()方法重新设置立方体边界

					}

				}

			} );

			return this;	//返回新坐标值的立方体边界

		};

	}(),

	/*
	///copy方法用来复制立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	*/
	///<summary>copy</summary>
	///<param name ="box" type="Box3">立方体边界</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;	//返回新坐标值的立方体边界

	},

	/*
	///makeEmpty方法用来将立方体边界初始化为Infinity,无穷大
	*/
	///<summary>makeEmpty</summary>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	makeEmpty: function () {

		this.min.x = this.min.y = this.min.z = Infinity;	//将立方体边界初始化为Infinity,无穷大
		this.max.x = this.max.y = this.max.z = - Infinity;	//将立方体边界初始化为Infinity,无穷大

		return this;	//返回新坐标值的立方体边界

	},

	/*
	///empty方法用来判断立方体边界的最大值的x,y,z是否小于最小值的x,y,z.用来判断空间中最大值小于最小值的球体.
	/// NOTE:如果此框包括零点在其边界返回true。
	/// NOTE:一个box有最大,最小边界,最大最小边界分别用一个点表示,这个点被两个边界共享.
	*/
	///<summary>empty</summary>
	///<returns type="Boolean">返回true 或者 false</returns>
	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
		// 使程序更加稳健,让避免立方体的最大边界小于最小边界.

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );	//返回true 或者 false

	},

	/*
	///center方法用来返回立方体边界的中点
	*/
	///<summary>center</summary>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果,边界的中点</param>
	///<returns type="Vector3">返回立方体边界的中点</returns>
	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );	//返回立方体边界的中点

	},

	/*
	///size方法用来返回立方体边界尺寸的向量
	*/
	///<summary>size</summary>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果,边界尺寸的向量</param>
	///<returns type="Vector3">返回立方体边界尺寸的向量</returns>
	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.max, this.min );		//返回立方体边界尺寸的向量

	},

	/*
	///expandByPoint方法通过Vector3对象(point参数)扩展立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	/// NOTE:expandByPoint方法与expandByVector方法都传递一个Vector3对象,expandByPoint方法将当前边界的最大值,最小值的x,y坐标对比,获得新的边界,但是expandByVector方法将立方体边界的最大值加上参数vector,最小值减去参数vector,
	*/
	///<summary>expandByPoint</summary>
	///<param name ="points" type="Vector3">Vector3对象</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;	//返回新坐标值的立方体边界

	},

	/*
	///expandByVector方法通过Vector3对象(vector参数)扩展立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	/// NOTE:expandByVector方法与expandByScalar方法不同的是expandByVector()接收一个向量,expandByScalar()方法接收一个标量.
	*/
	///<summary>expandByVector</summary>
	///<param name ="scalar" type="Number">数值对象</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;	//返回新坐标值的立方体边界

	},
	
	/*
	///expandByScalar方法通过Vector3对象(Scalar参数)扩展立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	/// NOTE:expandByScalar方法与expandByVector方法不同的是expandByVector()接收一个向量,expandByScalar()方法接收一个标量.
	*/
	///<summary>expandByScalar</summary>
	///<param name ="scalar" type="Number">数值对象</param>
	///<returns type="Box3">返回新坐标值的立方体边界</returns>
	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	},

	/*
	///containsPoint方法用来获得参数point(一个Vector3的三维点坐标)是否在当前立方体边界内.
	*/
	///<summary>containsPoint</summary>
	///<param name ="point" type="Vector3">一个Vector3的三维点坐标</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ||
		     point.z < this.min.z || point.z > this.max.z ) {

			return false;	//不在边界内,返回false

		}

		return true;		//在边界内,返回true

	},

	/*
	///containsBox方法用来获得参数box(一个Box3的立方体边界)是否在当前立方体边界内.
	*/
	///<summary>containsBox</summary>
	///<param name ="box" type="Box3">一个Box3的立方体边界</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
			 ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) &&
			 ( this.min.z <= box.min.z ) && ( box.max.z <= this.max.z ) ) {

			return true;		//在边界内,返回true

		}

		return false;			//不在边界内,返回false

	},

	/*
	///getParameter方法用来获得参数point(一个Vector3的三维点坐标)在当前立方体边界的长高宽比.
	///示例: var point = new Vector3(3,2,3);
	///		 var min= new Vector3(1,1,1),max = new Vector3(5,5,5);
	///		 var box = new Box3(min,max); //一个4x4的边界
	///		 var ot = new Vector3();
	///		 box.getParameter(point,ot);
	///		 ot= 3/4,1/2,3/4
	*/
	///<summary>containsBox</summary>
	///<param name ="box" type="Box3">一个Box3的立方体边界</param>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果,含长高宽比的三维向量</param>
	///<returns type="Vector3">返回包含高宽比的三维向量.</returns>
	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.
		// NOTE:这里可能会出现除数0.

		var result = optionalTarget || new THREE.Vector3();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);		//返回包含长高宽比的三维向量

	},

	/*
	///isIntersectionBox方法用来获得参数box(一个Box3的立方体边界)是否与当前立方体边界相交.
	*/
	///<summary>isIntersectionBox</summary>
	///<param name ="box" type="Box3">一个Box3的立方体边界</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ||
		     box.max.z < this.min.z || box.min.z > this.max.z ) {

			return false;	//如果不相交,返回false

		}

		return true;		//如果相交,返回true.

	},

	/*
	///clampPoint方法用来限制参数point在立方体边界内.如果point小于min,返回min,如果大于max返回max,否则返回point
	*/
	///<summary>clampPoint</summary>
	///<param name ="point" type="Vector3">一个Vector3的三维点坐标</param>
	///<param name ="optionalTarget" type="Vector3">可选参数,接收返回结果,返回剪裁过的边界点</param>
	///<returns type="Vector3">返回剪裁过的边界点.</returns>
	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( point ).clamp( this.min, this.max );	//返回剪裁过的边界点

	},

	/*
	///distanceToPoint方法用来获得三维空间内一点point到立方体边界的最小长度.
	*/
	///<summary>distanceToPoint</summary>
	///<param name ="point" type="Vector3">一个三维空间内的Vector3的三维点坐标</param>
	///<returns type="Number">三维空间内一点point到立方体边界的最小长</returns>
	distanceToPoint: function () {

		var v1 = new THREE.Vector3();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();	//返回三维空间内一点point到立方体边界的最小长.

		};

	}(),

	/*
	///getBoundingSphere方法返回当前立方体边界的球形边界(这里应该内切于立方体边界的一个球体)
	*/
	///<summary>getBoundingSphere</summary>
	///<param name ="optionalTarget" type="THREE.Sphere()">可选参数,THREE.Sphere()球体对象,用来接收返回值</param>
	///<returns type="THREE.Sphere()">返回当前立方体边界的球形边界(这里应该内切于立方体边界的一个球体)</returns>
	getBoundingSphere: function () {

		var v1 = new THREE.Vector3();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Sphere();

			result.center = this.center();	//将球体边界中心设置为当前立方体中心
			result.radius = this.size( v1 ).length() * 0.5;		//设置球体边界的半径

			return result;		//返回当前立方体边界的球形边界(这里应该内切于立方体边界的一个球体)

		};

	}(),

	/*
	///intersect方法用来通过收缩当前立方体边界,求当前立方体边界和参数box的交集.
	*/
	///<summary>intersect</summary>
	///<param name ="box" type="Box3">一个Box3的立方体边界</param>
	///<returns type="Box3">返回当前立方体边界和参数box的交集</returns>
	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;	//返回当前立方体边界和参数box的交集

	},

	/*
	///intersect方法用来通过扩展当前立方体边界,将参数box包围进当前的立方体边界内.就是取两个边界的并集
	*/
	///<summary>intersect</summary>
	///<param name ="box" type="Box3">一个Box3的立方体边界</param>
	///<returns type="Boolean">返回两个边界的并集</returns>
	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;	//返回两个边界的并集

	},


	/*
	///applyMatrix4方法通过传递matrix(旋转,缩放,移动等变换矩阵)对当前立方体对象的8个角点,应用变换.
	*/
	///<summary>applyMatrix4</summary>
	///<param name ="matrix" type="Matrix4">(旋转,缩放,移动等变换矩阵</param>
	///<returns type="Boolean">返回变换后的立方体边界.</returns>
	applyMatrix4: function () {

		var points = [
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3()
		];

		return function ( matrix ) {

			// NOTE: I am using a binary pattern to specify all 2^3 combinations below
			// NOTE: 作者通过3个二进制位表示8个角点.
			points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
			points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
			points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
			points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
			points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
			points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
			points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
			points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix );  // 111

			this.makeEmpty();
			this.setFromPoints( points );	//调用setFromPoints()方法,重新设置立方体边界.

			return this;		//返回变换后的立方体边界.

		};

	}(),

	/*
	///translate方法用来通过参数offset,移动当前立方体边界的位置.
	*/
	///<summary>translate</summary>
	///<param name ="offset" type="Vector3">偏移量</param>
	///<returns type="Boolean">返回新坐标值的立方体边界</returns>
	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;	//返回新坐标值的立方体边界

	},

	/*
	///equals方法用来获得参数box(一个Box3的立方体边界)是否与当前立方体边界完全相等.
	*/
	///<summary>equals</summary>
	///<param name ="box" type="Box3">一个Box3的立方体边界</param>
	///<returns type="Boolean">返回true 或者 false</returns>
	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );	//返回true 或者 false

	},

	/*clone方法
	///clone方法克隆一个立方体边界对象.
	*/
	///<summary>clone</summary>
	///<returns type="Box3">返回立方体边界对象</returns>	
	clone: function () {

		return new THREE.Box3().copy( this );	//返回立方体边界对象

	}

};