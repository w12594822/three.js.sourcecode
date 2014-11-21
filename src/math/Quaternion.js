
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
/*
///Quaternion对象的构造函数.用来创建一个四元数对象.Quaternion对象的功能函数采用
///定义构造的函数原型对象来实现.
///	NOTE:四元数通俗的讲,是一种数学方法,经常用来对3维向量进行平移,缩放,旋转等变换操作的方法.一种非常方便使用的数学方法.
///	NOTE: 齐次,是一种用来解决变换等操作的快捷方法.w称为齐次。三维空间的点(x,y,z)，用四维向量表示成(x,y,z,1)和(x,y,z,0)是不一样的，前者可以用变换矩阵实现平移等操作，后者不能。
/// NOTE: 在进行和向量计算中，为了不至于混淆点和向量，另外，在进行几何变换时，为了加快运算速度，简化计算，往往使用矩阵，而在使用矩阵运算时，矩阵的乘积只能表示旋转、比例和剪切等等变换，而不能表示平移变换。因此为统一计算（使用齐次在数学中的意义还要广），引入了第四个分量w，这使得原本二维变成三维，同理三维变为四维，而w称为比例因子，当w不为0时(一般设1)，表示一个，一个三维的三个分量x，y，z用齐次表示为变为x，y，z，w的四维空间，变换成三维是方式是x/w,y/w,z/w，当w为0时，在数学上代表无穷远点，即并非一个具体的位置，而是一个具有大小和方向的向量。从而，通过w我们就可以用同一系统表示两种不同的量
/// NOTE: Quaternion对象下面的方法大部分都支持回调函数.使用方法q.set(x,y,z,w).onchange(function callback(){ ...... })
/// NOTE: 维基百科http://zh.wikipedia.org/wiki/%E5%9B%9B%E5%85%83%E6%95%B8
///
///	用法: var p2d = new Quaternion(5,3,2,1)
///	创建一个x为5,y为3的向量,z为2的向量,w是其次.
///	NOTE: 参数(x,y,z,w)为可选参数,如果不指定参数(x,y,z,w),将创建一个为(0,0,0,1)的向量.
*/
///<summary>Quaternion</summary>
///<param name ="x" type="number">x</param>
///<param name ="y" type="number">y</param>
///<param name ="z" type="number">z</param>
///<param name ="w" type="number">w</param>
///<returns type="Quaternion">返回新的四元数</returns>
THREE.Quaternion = function ( x, y, z, w ) {

	this._x = x || 0;	//如果参数_x值没有定义初始化为0.
	this._y = y || 0;	//如果参数_y值没有定义初始化为0.
	this._z = z || 0;	//如果参数_z值没有定义初始化为0.
	this._w = ( w !== undefined ) ? w : 1;	//如果w没有设定值,这里将_w初始化1.

};

/****************************************
****下面是Quaternion对象提供的功能函数.
****************************************/
THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,		//构造器,返回对创建此对象Quaternion函数的引用.

	_x: 0,_y: 0, _z: 0, _w: 0,	//将(_x,_y,_z,_w)初始化为0;

	/*
	///get x 方法用来获得四元数的x值
	///NOTE: get x()的用法是Quaternion.prototype.x,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get x</summary>
	///<returns type="number">返回四维向量_x值</returns>
	get x () {

		return this._x;	//返回四维向量_x值

	},

	/*
	///set x 方法用来重新设置四元数的x值.并返回新的值的四元数.
	///NOTE: set x()的用法是Quaternion.prototype.x,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set x</summary>
	///<param name ="value" type="number">x</param>
	set x ( value ) {

		this._x = value;
		this.onChangeCallback();	//调用回调函数.

	},

	/*
	///get y 方法用来获得四元数的y值
	///NOTE: get y()的用法是Quaternion.prototype.y,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get y</summary>
	///<returns type="number">返回四维向量_y值</returns>
	get y () {

		return this._y;	//返回四维向量_y值

	},

	/*
	///set y 方法用来重新设置四元数的x值.并返回新的值的四元数.
	///NOTE: set y()的用法是Quaternion.prototype.y,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set y</summary>
	///<param name ="value" type="number">y</param>
	set y ( value ) {

		this._y = value;
		this.onChangeCallback();	//调用回调函数.

	},

	/*
	///get z 方法用来获得四元数的z值.
	///NOTE: get z()的用法是Quaternion.prototype.z,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get z</summary>
	///<returns type="number">返回四维向量_z值</returns>
	get z () {

		return this._z;	//返回四维向量_z值

	},

	/*
	///set z 方法用来重新设置四元数的x值.并返回新的值的四元数.
	///NOTE: set z()的用法是Quaternion.prototype.z,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set z</summary>
	///<param name ="value" type="number">z</param>
	set z ( value ) {

		this._z = value;
		this.onChangeCallback();	//调用回调函数.

	},

	/*
	///get w 方法用来获得四元数的w值.
	///NOTE: get w()的用法是Quaternion.prototype.w,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get w</summary>
	///<returns type="number">返回四维向量_w值</returns>
	get w () {

		return this._w;	//返回四维向量_w值

	},

	/*
	///set w 方法用来重新设置四元数的x坐标值.并返回新的坐标值的四元数.
	///NOTE: set w()的用法是Quaternion.prototype.w,这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set w</summary>
	///<param name ="value" type="number">w</param>
	set w ( value ) {

		this._w = value;
		this.onChangeCallback();	//调用回调函数.

	},

	///TODO:这里缺少setX()方法.
	///TODO:这里缺少setY()方法.
	///TODO:这里缺少setZ()方法.
	///TODO:这里缺少setW()方法.
	///TODO:这里缺少setComponent()方法.
	///TODO:这里缺少getComponent()方法.

	/*
	///set方法用来重新设置四元数的x,y,z,w值.并返回新的坐标值的四元数.
	/// TODO:修改set方法,兼容x,y,z,w参数省略支持多态.
	*/
	///<summary>set</summary>
	///<param name ="x" type="number">x</param>
	///<param name ="y" type="number">y</param>
	///<param name ="z" type="number">y</param>
	///<param name ="w" type="number">w</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	set: function ( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的四元数

	},

	/*
	///copy方法用来复制四元数的(x,y,z,w)值.并返回新的四元数.
	*/
	///<summary>copy</summary>
	///<param name ="quaternion" type="Quaternion">四元数</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	copy: function ( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的四元数

	},

	/*
	///applyEuler方法通过一次欧拉旋转(参数euler)设置四元数旋转
	*/
	///<summary>applyEuler</summary>
	///<param name ="euler" type="THREE.Euler">THREE.Euler对象,欧拉对象</param>
	///<param name ="update" type="bool">true 或者 false,如果不等于false,Quaternion对象调用onChangeCallback函数</param>
	///<returns type="Vector3">返回变换后的四元数</returns>
	setFromEuler: function ( euler, update ) {

		if ( euler instanceof THREE.Euler === false ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );
		}

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos( euler._x / 2 );
		var c2 = Math.cos( euler._y / 2 );
		var c3 = Math.cos( euler._z / 2 );
		var s1 = Math.sin( euler._x / 2 );
		var s2 = Math.sin( euler._y / 2 );
		var s3 = Math.sin( euler._z / 2 );

		if ( euler.order === 'XYZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'YXZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'ZXY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'ZYX' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'YZX' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'XZY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		if ( update !== false ) this.onChangeCallback();	//调用回调函数.

		return this;	//返回变换后的四元数

	},

	/*
	///setFromAxisAngle方法绕任意轴设定旋转四元数
	/// NOTE:参数axis必须是单位向量,通过调用.normalize()得到单位向量.
	*/
	///<summary>setFromAxisAngle</summary>
	///<param name ="axis" type="Vector3">三维向量</param>
	///<param name ="angle" type="float">角度</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	setFromAxisAngle: function ( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized	
		// NOTE:参数axis必须是单位向量,通过调用.normalize()得到单位向量.

		var halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的四元数

	},

	/*
	///setFromRotationMatrix方法利用一个参数m(旋转矩阵),达到旋转变换的目的吧.和setFromAxisAngle()方法一样.建议使用setFromAxisAngle()方法.
	/// NOTE:m是一个旋转矩阵,更多公式:http://en.wikipedia.org/wiki/Transformation_matrix
	///	
	/// 样例:

		这个样例是z轴旋转30度.

					/----------------------------------------------------\
					|cos(heading) = 0.866	| sin(heading) = 0.5   | 0	 |
					|-----------------------|----------------------------|
		matrix =	|-sin(heading) = -0.5   |cos(heading) = 0.866  | 0   |
					|-----------------------|----------------------|-----|
					|     0                 |     0                | 1   |
					\----------------------------------------------------/

		angle = acos ( ( m00 + m11 + m22 - 1)/2)

		angle = acos ( ( 0.866 + 0.866 + 1 - 1)/2)

		angle = acos ( 0.866 )

		angle = 30 degrees

		x = (m21 - m12) = 0 - 0 =0
		y = (m02 - m20) = 0 - 0 =0
		z = (m10 - m01) = -0.5 - 0.5 = -1

	*/
	///<summary>setFromRotationMatrix</summary>
	///<param name ="m" type="Matrix3">3x3矩阵(旋转矩阵)</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
		// 确保参数m是一个3x3的旋转矩阵.

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的四元数

	},

	/*
	///setFromUnitVectors方法通过两个三维向量Vector3(vFrom,vTo)设置四元数.
	/// NOTE:参数(vFrom,vTo)必须是单位向量,通过调用.normalize()得到单位向量.
	*/
	///<summary>setFromUnitVectors</summary>
	///<param name ="vFrom" type="Vector3">三维向量</param>
	///<param name ="vTo" type="Vector3">三维向量</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	setFromUnitVectors: function () {

		// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

		// assumes direction vectors vFrom and vTo are normalized

		var v1, r;

		var EPS = 0.000001;

		return function ( vFrom, vTo ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			r = vFrom.dot( vTo ) + 1;	//dot()方法返回两个向量的点乘积

			if ( r < EPS ) {

				r = 0;

				if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

					v1.set( - vFrom.y, vFrom.x, 0 );

				} else {

					v1.set( 0, - vFrom.z, vFrom.y );

				}

			} else {

				v1.crossVectors( vFrom, vTo );

			}

			this._x = v1.x;
			this._y = v1.y;
			this._z = v1.z;
			this._w = r;

			this.normalize();	//通过调用.normalize()得到单位向量

			return this;	//返回新的四元数

		}

	}(),	//立即执行

	/*
	///inverse方法将返回自共轭的四元数的单位量.如果四元数为 (x, y, z, w)，那么经函数 conjugate 处理后，就会返回四元数(-x, -y, -z, w)。
	/// NOTE: 如果四元数为 (x, y, z, w)，那么经函数 conjugate 处理后，就会返回四元数(-x, -y, -z, w)。
	*/
	///<summary>inverse</summary>
	///<returns type="Quaternion">返回自共轭四元数单位量</returns>
	inverse: function () {

		this.conjugate().normalize();	//通过调用.normalize()得到单位量

		return this;	//返回自共轭四元数单位量

	},


	/*
	///conjugate方法将返回自共轭的四元数的.如果四元数为 (x, y, z, w)，那么经函数 conjugate 处理后，就会返回四元数(-x, -y, -z, w)。
	/// NOTE: 如果四元数为 (x, y, z, w)，那么经函数 conjugate 处理后，就会返回四元数(-x, -y, -z, w)。
	*/
	///<summary>conjugate</summary>
	///<returns type="Quaternion">返回自共轭四元数</returns>
	conjugate: function () {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回自共轭四元数

	},

	/*
	///dot方法将返回两个向量的点乘积(点乘,数量积).
	/// NOTE:1. 关于点积的介绍参考维基百科:http://zh.wikipedia.org/wiki/%E6%95%B0%E9%87%8F%E7%A7%AF, 常用来进行方向性判断，如两向量点积大于0，则它们的方向朝向相近；如果小于0，则方向相反。
	///	NOTE:2. Quaternion.Dot也叫点积，它返回1个-1.0～1.0之间的一个值。网上确实也这么说。但是这个值表示什么呢？恩，表示返回进行Dot计算的两个向量之间的夹角的余弦值(Cos弧度角).要注意的是能进行Dot计算的前提是两个向量首先要变成单位向量！
	*/
	///<summary>dot</summary>
	///<param name ="v" type="Quaternion">四元数</param>
	///<returns type="number">返回点乘积(点乘,数量积)</returns>
	dot: function ( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	},

	/*
	///lengthSq方法将返回这个四元数的长度的平方（只读）.
	/// NOTE：a^2 + b^2 +c^2 + d^2 = e^2,这里返回的是e^2.
	*/
	///<summary>lengthSq</summary>
	///<returns type="number">返回四元数的长度的平方（只读）</returns>
	lengthSq: function () {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	},

	/*
	///length方法将返回四元数的长度（只读）.
	/// NOTE：a^2 + b^2 + c^2 + d^2 =e^2,e=Math.sqrt(a^2 + b^2 + c^2 + d^2),这里返回的是e.
	*/
	///<summary>length</summary>
	///<returns type="number">返回四元数的长度（只读）</returns>
	length: function () {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	},
	
	/*
	///normalize方法将返回向量的长度为1（只读）.
	/// 复习一下初中的几何吧,三角恒等式,给你准备好了 :) ,见维基百科:
	/// http://zh.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0#.E4.B8.89.E8.A7.92.E6.81.92.E7.AD.89.E5.BC.8F
	*/
	///<summary>normalize</summary>
	///<returns type="number">返回四元数单位长度(只读）</returns>
	normalize: function () {

		var l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回四元数单位长度

	},

	/*
	///multiply方法用来将四元数的(x,y,z,w)坐标值与参数v的(x,y,z,w)相乘.并返回新的坐标值的四元数.
	///NOTE:判断是否有第二个参数p,如果有的话,调用.multiplyQuaternions()方法,与p相乘,否则将当前四元数与q相乘
	*/
	///<summary>multiply</summary>
	///<param name ="q" type="Quaternion">与当前对象(x,y,z,w)值相乘的四元数</param>
	///<param name ="p" type="Quaternion">判断是否有第二个参数p,如果有的话,调用.multiplyQuaternions()方法,与p相乘,否则将当前四元数与q相乘.</param>
	///<returns type="Vector3">返回新的四元数</returns>
	multiply: function ( q, p ) {

		if ( p !== undefined ) {

			//THREE.Quaternion: .multiply()方法现在只有一个参数,如果2个参数使用.multiplyQuaternions( a, b )方法来替代.
			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );	//返回新的四元数

	},

	/*
	///multiplyScalar方法用来将四元数的(x,y,z,w)坐标值直接与参数s相乘.并返回新的坐标值的四元数.
	/// NOTE:这里与multiply()方法不同的是,这里传递的参数scalar是一个标量,而multiply()方法的参数v是一个四元数.
	*/
	///<summary>multiplyScalar</summary>
	///<param name ="a" type="Quaternion">四元数</param>
	///<param name ="b" type="Quaternion">四元数</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	multiplyQuaternions: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的四元数

	},

	/*
	///multiplyVector3方法用来将四元数变换应用到参数vector.
	///
	*/
	///<summary>multiplyVector3</summary>
	///<param name ="a" type="Vector3">三维向量</param>
	///<returns type="Quaternion">返回新的四元数</returns>
	multiplyVector3: function ( vector ) {

		//这里实际上调用的是vector.applyQuaternion()方法,将四元数变换应用到三维向量vector.
		console.warn( 'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
		return vector.applyQuaternion( this );

	},


	/*slerp方法
	///slerp方法就是球形插值，通过t值从当前四元数到qb之间进行球形插值。 
	/// NOTE:注意，当前四元数(x,y,z,w) 和四元数对象参数qb(x,y,z,w)，权值 t 必须是标量,取值范围是0.0-1.0.
	*/
	///<summary>slerp</summary>
	///<param name ="qb" type="Quaternion">四元数</param>
	///<param name ="t" type="number">百分比权值(0.0-1.0)</param>
	///<returns type="Quaternion">四元数</returns>	
	slerp: function ( qb, t ) {

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var halfTheta = Math.acos( cosHalfTheta );
		var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

		if ( Math.abs( sinHalfTheta ) < 0.001 ) {

			this._w = 0.5 * ( w + this._w );
			this._x = 0.5 * ( x + this._x );
			this._y = 0.5 * ( y + this._y );
			this._z = 0.5 * ( z + this._z );

			return this;

		}

		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
		ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this.onChangeCallback();	//调用回调函数.

		return this;

	},

	/*equals方法
	///equals方法相当于比较运算符===,将当前四元数和参数v中的(x,y,z,w)值进行对比,返回bool型值.
	*/
	///<summary>equals</summary>
	///<param name ="v" type="Quaternion">四元数(x,y,z,w)</param>
	///<returns type="bool">返回true or false</returns	
	equals: function ( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );	//返回true or false

	},

	/*fromArray方法
	///fromArray方法将存储四元数(x,y,z,w)值的数组赋值给当前四元数对象
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">四元数(x,y,z,w)值数组array[x,y,z,w]</param>
	///<returns type="Quaternion">返回新的四元数</returns>	
	fromArray: function ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		this._w = array[ 3 ];

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的四元数

	},

	/*toArray方法
	///toArray方法将当前四元数对象的属性赋值给数组array[0.5,0.5,0.5,1].返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">四元数(_x,_y,_z,_w)值数组array[x,y,z,w]</returns>	
	toArray: function () {

		return [ this._x, this._y, this._z, this._w ];

	},

	/*onChange方法
	///onChange方法在将回调函数表达式作为callback参数传递给onChangeCallback()方法.
	*/
	///<summary>onChange</summary>
	///<param name ="callback" type="function">回调函数</param>
	///<returns type="Quaternion">四元数</returns>	
	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	/*onChangeCallback方法
	///onChangeCallback方法克隆一个四元数对象.
	///NOTE:onChangeCallback()方法在这里就是一个空的函数属性,在上面大部分的方法中都调用了onChangeCallback()方法,这是一种很方便的方法.
	*/
	///<summary>onChangeCallback</summary>
	onChangeCallback: function () {},

	/*clone方法
	///clone方法克隆一个四元数对象.
	*/
	///<summary>clone</summary>
	///<returns type="Quaternion">返回四元数对象</returns>	
	clone: function () {

		return new THREE.Quaternion( this._x, this._y, this._z, this._w );

	}

};

	/*slerp方法
	///slerp方法就是球形插值，通过t值向从qa到qb之间进行球形插值。 
	/// NOTE:注意，当前四元数(x,y,z,w) 和四元数对象参数qb(x,y,z,w)，权值 t 必须是标量,取值范围是0.0-1.0.
	*/
	///<summary>slerp</summary>
	///<param name ="qa" type="Quaternion">qa四元数from</param>
	///<param name ="qb" type="Quaternion">qb四元数to</param>
	///<param name ="qm" type="Quaternion">返回值qm四元数</param>
	///<param name ="t" type="number">百分比权值(0.0-1.0)</param>
	///<returns type="Quaternion">四元数</returns>	
THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	return qm.copy( qa ).slerp( qb, t );

}
