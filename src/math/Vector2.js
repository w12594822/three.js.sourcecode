
// File:src/math/Vector2.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

/*
///Vector2对象的构造函数.用来创建一个二维向量的对象.Vector2对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var p2d = new Vector2(5,3)
///	创建一个x坐标为5,y坐标为3的向量.
///	NOTE: 参数(x,y)坐标为可选参数,如果不指定参数(x,y),将创建一个坐标为(0,0)的向量.
*/
///<summary>Vector2</summary>
///<param name ="x" type="number">x坐标</param>
///<param name ="y" type="number">y坐标</param>
THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

/****************************************
****下面是Vector2对象提供的功能函数.
****************************************/

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,	//构造器,返回对创建此对象的Vector2函数的引用

	/*
	///set方法用来重新设置二维向量的x,y坐标值.并返回新的坐标值的二维向量.
	*/
	///<summary>set</summary>
	///<param name ="x" type="number">x坐标</param>
	///<param name ="y" type="number">y坐标</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///setX方法用来重新设置二维向量的x坐标值.并返回新的坐标值的二维向量.
	*/
	///<summary>setX</summary>
	///<param name ="x" type="number">x坐标</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	setX: function ( x ) {

		this.x = x;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///setY方法用来重新设置二维向量的x坐标值.并返回新的坐标值的二维向量.
	*/
	///<summary>setY</summary>
	///<param name ="y" type="number">y坐标</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	setY: function ( y ) {

		this.y = y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///setComponent方法用来重新设置二维向量的(x,y)坐标值.并返回新的坐标值的二维向量.
	///参数index取值为0 或者 1,取值为0,参数value设置x的坐标值,取值为1,参数value设置y的坐标.
	*/
	///<summary>setComponent</summary>
	///<param name ="index" type="number">0或1</param>
	///<param name ="value" type="number">x 或 y坐标</param>
	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/*
	///getComponent方法用获得二维向量的(x,y)坐标值.
	///参数index取值为0 或者 1,取值为0,获得x的坐标值,取值为1,获得y的坐标.
	*/
	///<summary>setComponent</summary>
	///<param name ="index" type="number">0或1</param>
	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/*
	///copy方法用来复制二维向量的(x,y)坐标值.并返回新的坐标值的二维向量.
	*/
	///<summary>copy</summary>
	///<param name ="v" type="Vector2">二维向量</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;	//返回新坐标值的二维向量

	},


	/*
	///add方法用来将二维向量的(x,y)坐标值与参数v的(x,y)相加.并返回新的坐标值的二维向量.
	/// NOTE:add()方法虽然有两个参数,但实际上只对参数v做运算,这里的参数w,如果设置的话,调用.addVectors()方法.
	*/
	///<summary>add</summary>
	///<param name ="v" type="Vector2">与当前对象(x,y)坐标值增加的向量</param>
	///<param name ="w" type="Vector2">判断是否有第二个参数w,如果有的话,调用.addVectors()方法</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	add: function ( v, w ) {

		if ( w !== undefined ) {	//判断是否有第二个参数w,如果有的话,调用.addVectors()方法.

			//THREE.Vector2: .add()方法现在只有一个参数,如果2个参数使用.addVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );	
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///addVectors方法用来将二维向量的(x,y)坐标值等于参数(a,b)的(x,y)相加.并返回新的坐标值的二维向量.
	/// NOTE:两个矢量组件对应相加。
	*/
	///<summary>addVectors</summary>
	///<param name ="a" type="Vector2">二维向量</param>
	///<param name ="b" type="Vector2">二维向量</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///addScalar方法用来将二维向量的(x,y)坐标值直接与参数s相加.并返回新的坐标值的二维向量.
	/// NOTE:这里与add()方法不同的是,这里传递的参数s是一个标量,而add()方法的参数v是一个二维向量.
	*/
	///<summary>addScalar</summary>
	///<param name ="s" type="number">(x,y)要增加的数值</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	addScalar: function ( s ) {

		this.x += s;
		this.y += s;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///sub方法用来将二维向量的(x,y)坐标值与参数v的(x,y)相减.并返回新的坐标值的二维向量.
	/// NOTE:sub()方法虽然有两个参数,但实际上只对参数v做运算,这里的参数w,如果设置的话,调用.subVectors()方法.
	*/
	///<summary>sub</summary>
	///<param name ="v" type="Vector2">与当前对象(x,y)坐标值增加的二维向量</param>
	///<param name ="w" type="Vector2">判断是否有第二个参数w,如果有的话,调用.subVectors()方法</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	sub: function ( v, w ) {

		if ( w !== undefined ) {	//判断是否有第二个参数w,如果有的话,调用.subVectors()方法.

			//THREE.Vector2: .sub()方法现在只有一个参数,如果2个参数使用.subVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///subVectors方法用来将二维向量的(x,y)坐标值分别于参数(a,b)的(x,y)相减.并返回新的坐标值的二维向量.
	*/
	///<summary>subVectors</summary>
	///<param name ="a" type="Vector2">二维向量</param>
	///<param name ="b" type="Vector2">二维向量</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///multiply方法用来将二维向量的(x,y)坐标值与参数v的(x,y)相乘.并返回新的坐标值的二维向量.
	*/
	///<summary>multiply</summary>
	///<param name ="v" type="Vector2">与当前对象(x,y)值相乘的二维向量</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	multiply: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///multiplyScalar方法用来将二维向量的(x,y)坐标值直接与参数s相乘.并返回新的坐标值的二维向量.
	/// NOTE:这里与multiply()方法不同的是,这里传递的参数s是一个标量,而multiply()方法的参数v是一个二维向量.
	*/
	///<summary>multiplyScalar</summary>
	///<param name ="s" type="number">与当前对象(x,y)值相乘的标量,数值</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///divide方法用来将二维向量的(x,y)坐标值与参数v的(x,y)相除.并返回新的坐标值的二维向量.
	*/
	///<summary>divide</summary>
	///<param name ="v" type="Vector2">与当前对象(x,y)值相除的二维向量</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///divideScalar方法用来将二维向量的(x,y)坐标值直接与参数scalar相除.并返回新的坐标值的二维向量.
	/// NOTE:1. 参数scalar如果为0,当前对象(x,y)值直接设置为0!!
	/// NOTE:2. 这里与divide()方法不同的是,这里传递的参数scalar是一个标量,而divide()方法的参数v是一个二维向量.
	*/
	///<summary>divideScalar</summary>
	///<param name ="scalar" type="number">与当前对象(x,y)值相除的标量,数值</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;		//将被除数换算成小数

			this.x *= invScalar;
			this.y *= invScalar;

		} else {

			//参数scalar如果为0,当前对象(x,y)值直接设置为0!!
			this.x = 0;		
			this.y = 0;

		}

		return this;	//返回新坐标值的二维向量

	},
	/*
	///min方法用来将二维向量的(x,y)坐标值直接与参数v的(x,y)比较,如果当前二维向量的值大于参数v的(x,y),
	///将参数v的(x,y)赋值给当前向量,并返回(x,y)值最小的二维向量.
	*/
	///<summary>min</summary>
	///<param name ="v" type="Vector2">与当前对象(x,y)值参数v的(x,y)比较,并返回(x,y)值最小的二维向量.</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	min: function ( v ) {

		if ( this.x > v.x ) {		//如果当前二维向量的x值大于参数v.x

			this.x = v.x;			//将参数v的x值赋值给当前向量

		}

		if ( this.y > v.y ) {		//如果当前二维向量的y值大于参数v.y

			this.y = v.y;			//将参数v的y值赋值给当前向量

		}

		return this;	//返回新坐标值的二维向量

	},

	/*
	///max方法用来将二维向量的(x,y)坐标值直接与参数v的(x,y)比较,如果当前二维向量的值小于参数v的(x,y),
	///将参数v的(x,y)赋值给当前向量,并返回(x,y)值最大的二维向量.
	*/
	///<summary>min</summary>
	///<param name ="v" type="Vector2">与当前对象(x,y)值参数v的(x,y)比较,并返回(x,y)值最大的二维向量.</param>
	///<returns type="Vector2">返回新坐标值的二维向量</returns>
	max: function ( v ) {

		if ( this.x < v.x ) {		//如果当前二维向量的x值小于参数v.x

			this.x = v.x;			//将参数v的x值赋值给当前向量

		}

		if ( this.y < v.y ) {		//如果当前二维向量的y值小于参数v.y

			this.y = v.y;			//将参数v的y值赋值给当前向量

		}

		return this;	//返回新坐标值的二维向量

	},
	/*
	///clamp方法用来将二维向量的(x,y)坐标值直接与参数min,参数max的(x,y)比较,如果当前二维向量的值小于参数min的(x,y)
	///或者大于参数max的(x,y),对应的将参数min或max的(x,y)赋值给当前二维向量,
	/// NOTE:保持当前二维向量在min,max所组成的二维空间的之内,最大不超过max的(x,y)值,最小不小于min的(x,y)值.
	*/
	///<summary>clamp</summary>
	///<param name ="min" type="Vector2">二维向量.</param>
	///<param name ="max" type="Vector2">二维向量.</param>
	///<returns type="Vector2">返回指定界限内的二维向量</returns>
	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly
		// 这个方法用来获得二维向量的最小值于最大值,如果没有获取到,说明函数运行错误.


		if ( this.x < min.x ) {				//如果当前二维向量的x值小于参数min的x值

			this.x = min.x;					//将参数min的x值赋值给当前向量

		} else if ( this.x > max.x ) {		//如果当前二维向量的x值大于参数max的x值

			this.x = max.x;					//将参数max的x值赋值给当前向量

		}

		if ( this.y < min.y ) {				//如果当前二维向量的y值小于参数min的x值

			this.y = min.y;					//将参数min的y值赋值给当前向量

		} else if ( this.y > max.y ) {		//如果当前二维向量的y值小于参数max的y值

			this.y = max.y;					//将参数max的y值赋值给当前向量

		}

		return this;	//返回指定界限内的二维向量
	},
	/*
	///clampScalar方法用来将二维向量的(x,y)坐标值直接与参数minVal,参数maxVal比较,如果当前二维向量的值小于参数minVal
	///或者大于参数maxVal,将参数minVal或maxVal赋值给当前二维向量,
	/// NOTE:1. 保持当前二维向量在minVal,maxVal所组成的二维空间的之内,最大不超过maxVal值,最小不小于minVal值.
	/// NOTE:2. 这里与clamp()方法不同的是,这里传递的参数minVal,maxVal是一个标量,而clamp()方法的参数min,参数max是两个二维向量.
	*/
	///<summary>clampScalar</summary>
	///<param name ="minVal" type="number">下限.</param>
	///<param name ="maxVal" type="number">上限.</param>
	///<returns type="Vector2">返回指定界限内的二维向量</returns>
	clampScalar: ( function () {	//外侧括号是一种特殊的用法,似乎代表立即执行.小白,请见谅!

		var min, max;

		return function ( minVal, maxVal ) {	//创建匿名函数

			if ( min === undefined ) {

				min = new THREE.Vector2();
				max = new THREE.Vector2();

			}

			min.set( minVal, minVal );
			max.set( maxVal, maxVal );

			return this.clamp( min, max );	//调用clamp()方法,返回指定界限内的二维向量

		};

	} )(),

	/*
	///floor方法用来返回小于或等于二维向量的(x,y)坐标值的最大整数
	/// NOTE:去掉小数部分
	*/
	///<summary>floor</summary>
	///<returns type="Vector2">返回圆整后的二维向量</returns>
	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;	//返回圆整后的二维向量

	},

	/*
	///ceil方法用来返回大于或等于二维向量的(x,y)坐标值的最小整数
	/// NOTE:将小数部分去掉加1.
	*/
	///<summary>ceil</summary>
	///<returns type="Vector2">返回圆整后的二维向量</returns>
	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;	//返回圆整后的二维向量

	},

	/*
	///round方法用来返回最接近二维向量的(x,y)坐标值的整数
	/// NOTE:也就是四舍五入
	*/
	///<summary>round</summary>
	///<returns type="Vector2">返回圆整后的二维向量</returns>
	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;	//返回圆整后的二维向量

	},

	/*
	///roundToZero方法将当前二维向量的(x,y)坐标值若为负数时,返回大于或等于二维向量的(x,y)坐标值的最小整数
	///	而当前二维向量的(x,y)坐标值若为正数时,返回小于或等于二维向量的(x,y)坐标值的最大整数
	*/
	///<summary>roundToZero</summary>
	///<returns type="Vector2">返回圆整后的二维向量</returns>
	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;	//返回新坐标值的二维向量

	},

	/*
	///negate方法将当前二维向量的(x,y)坐标值若为负数时,返回正数.
	///	而当前二维向量的(x,y)坐标值若为正数时,返回负数.
	/// NOTE:取当前二维向量的(x,y)坐标值相反数,经常用来翻转法线
	*/
	///<summary>negate</summary>
	///<returns type="Vector2">返回取相反数后的二维向量</returns>
	negate: function () {

		this.x = - this.x;
		this.y = - this.y;

		return this;	//返回新坐标值的二维向量

	},

	/*
	///dot方法将返回两个向量的点乘积(点乘,数量积).
	/// NOTE:1. 关于点积的介绍参考维基百科:http://zh.wikipedia.org/wiki/%E6%95%B0%E9%87%8F%E7%A7%AF, 常用来进行方向性判断，如两向量点积大于0，则它们的方向朝向相近；如果小于0，则方向相反。
	///	NOTE:2. Vector3.Dot也叫点积，它返回1个-1.0～1.0之间的一个值。网上确实也这么说。但是这个值表示什么呢？恩，表示返回进行Dot计算的两个向量之间的夹角的余弦值(Cos弧度角).要注意的是能进行Dot计算的前提是两个向量首先要变成单位向量！
	*/
	///<summary>dot</summary>
	///<param name ="v" type="Vector2">二维向量</param>
	///<returns type="number">返回点乘积(点乘,数量积)</returns>
	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	/*
	///lengthSq方法将返回这个向量的长度的平方（只读）.
	/// NOTE：勾股定理a^2 + b^2 = c^2,这里返回的是c^2.
	*/
	///<summary>lengthSq</summary>
	///<returns type="number">返回向量的长度的平方（只读）</returns>
	lengthSq: function () {

		return this.x * this.x + this.y * this.y;	//返回向量的长度的平方（只读）

	},

	/*
	///length方法将返回向量的长度（只读）.
	/// NOTE：勾股定理a^2 + b^2 = c^2,c=Math.sqrt(a^2 + b^2),这里返回的是c.
	*/
	///<summary>length</summary>
	///<returns type="number">返回向量的长度（只读）</returns>
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );	//返回向量的长度（只读）

	},

	/*
	///normalize方法将返回向量的长度为1（只读）.
	/// 复习一下初中的几何吧,三角恒等式,给你准备好了 :) ,见维基百科:
	/// http://zh.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0#.E4.B8.89.E8.A7.92.E6.81.92.E7.AD.89.E5.BC.8F
	*/
	///<summary>normalize</summary>
	///<returns type="number">返回向量的长度为1（只读）</returns>
	normalize: function () {

		return this.divideScalar( this.length() );		//返回向量的长度为1（只读）

	},

	/*
	///distanceTo方法将返回当前二维向量到参数v的距离(只读).
	*/
	///<summary>distanceTo</summary>
	///<param name ="v" type="Vector2">二维向量</param>
	///<returns type="Vector2">返回当前二维向量到参数v的距离(只读).</returns>
	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );	//返回当前二维向量到参数v的距离(只读).

	},

	/*
	///distanceToSquared方法将返回当前二维向量到参数v的距离的平方.
	*/
	///<summary>distanceToSquared</summary>
	///<param name ="v" type="Vector2">二维向量</param>
	///<returns type="Vector2">返回当前二维向量到参数v的距离的平方</returns>
	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;					//当前二维向量到参数v的距离的平方.

	},

	/*
	///setLength方法用来按照参数l(长度)设置新的二维向量(x,y)值.
	/// NOTE:将以原点到当前向量的线段等比例缩放到参数l所指定的长度.
	*/
	///<summary>setLength</summary>
	///<param name ="l" type="number">指定的长度</param>
	///<returns type="Vector2">返回按照参数l(长度)设置新的二维向量(x,y)值.</returns>
	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {		//做个判断,如果原长度与新长度不相等,并且原长度不为0.

			this.multiplyScalar( l / oldLength );		//调用.multiplyScalar()方法,传递新长度与原长度的比.
		}

		return this;		//返回按照参数l(长度)设置新的二维向量(x,y)值.

	},

	/*lerp方法
	///lerp方法在将当前二维向量(x,y)设置为下限和参数v(x,y)设为上限 之间进行线性插值，
	/// alpha 表示权值。从下限当前二维向量(x,y)到上限参数v(x,y)乘以百分比alpha(0.0-1.0),加上当前二维向量(x,y)
	///当前二维向量(x,y)的和赋值给当前二维向量(x,y),返回当前二维向量(x,y).
	/// NOTE:注意，如果 当前二维向量(x,y) 和 参数v(x,y)是向量，则权值 alpha 必须是标量,取值范围是0.0-1.0.
	*/
	///<summary>lerp</summary>
	///<param name ="v" type="Vector2">二维向量</param>
	///<param name ="alpha" type="number">百分比权值(0.0-1.0)</param>
	///<returns type="Vector2">二维向量</returns>	
	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;	//返回二维向量

	},

	/*equals方法
	///equals方法相当于比较运算符===,将当前二维向量和参数v中的(x,y)值进行对比,返回bool型值.
	*/
	///<summary>equals</summary>
	///<param name ="v" type="Vector2">二维向量(x,y)</param>
	///<returns type="bool">返回true or false</returns
	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );	//返回true or false

	},

	/*fromArray方法
	///fromArray方法将存储二维向量(x,y)值的数组赋值给当前二维向量对象
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">二维向量(x,y)值数组array[x,y]</param>
	///<returns type="Vector2">返回新的二维向量</returns>	
	fromArray: function ( array ) {

		this.x = array[ 0 ];
		this.y = array[ 1 ];

		return this;	//返回新的二维向量

	},

	/*toArray方法
	///toArray方法将当前二维向量对象的属性赋值给数组array[0.5,0.5].返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">二维向量(x,y)值数组array[x,y]</returns>	
	toArray: function () {

		return [ this.x, this.y ];	//二维向量(x,y)值数组array[x,y]

	},

	/*clone方法
	///clone方法克隆一个二维向量对象.
	*/
	///<summary>clone</summary>
	///<returns type="Vector2">返回二维向量对象</returns>	
	clone: function () {

		return new THREE.Vector2( this.x, this.y );		//返回二维向量

	}

};
