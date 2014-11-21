
// File:src/math/Vector4.js

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
/*
///Vector4对象的构造函数.用来创建一个四维向量的对象.Vector4对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var p4d = new Vector4(5,3,2,1)
///	创建一个x坐标为5,y坐标为3,z坐标为2,齐次坐标w为1的向量
///	NOTE: 参数(x,y,z,w)坐标为可选参数,如果不指定参数(x,y,z,w),将创建一个坐标为(0,0,0,1)的向量.
///	NOTE: 齐次坐标,是一种用来解决坐标变换等操作的快捷方法.w称为齐次坐标。三维空间的点(x,y,z)，用四维向量表示成(x,y,z,1)和(x,y,z,0)是不一样的，前者可以用变换矩阵实现平移等操作，后者不能。
/// NOTE: 在进行坐标和向量计算中，为了不至于混淆点和向量，另外，在进行几何变换时，为了加快运算速度，简化计算，往往使用矩阵，而在使用矩阵运算时，矩阵的乘积只能表示旋转、比例和剪切等等变换，而不能表示平移变换。因此为统一计算（使用齐次坐标在数学中的意义还要广），引入了第四个分量w，这使得原本二维坐标变成三维坐标，同理三维坐标变为四维坐标，而w称为比例因子，当w不为0时(一般设1)，表示一个坐标，一个三维坐标的三个分量x，y，z用齐次坐标表示为变为x，y，z，w的四维空间，变换成三维坐标是方式是x/w,y/w,z/w，当w为0时，在数学上代表无穷远点，即并非一个具体的坐标位置，而是一个具有大小和方向的向量。从而，通过w我们就可以用同一系统表示两种不同的量
*/
///<summary>Vector4</summary>
///<param name ="x" type="number">x坐标</param>
///<param name ="y" type="number">y坐标</param>
///<param name ="z" type="number">z坐标</param>
///<param name ="w" type="number">w齐次坐标</param>
THREE.Vector4 = function ( x, y, z, w ) {

	this.x = x || 0;	//如果参数x值没有定义初始化为0.
	this.y = y || 0;	//如果参数y值没有定义初始化为0.
	this.z = z || 0;	//如果参数z值没有定义初始化为0.
	this.w = ( w !== undefined ) ? w : 1;	//如果参数w值没有定义初始化为1.

};

/****************************************
****下面是Vector4对象提供的功能函数.
****************************************/

THREE.Vector4.prototype = {

	constructor: THREE.Vector4,	//构造器,返回对创建此对象的Vector4函数的引用

	/*
	///set方法用来重新设置四维向量的x,y,z,w坐标值.并返回新的坐标值的四维向量.
	*/
	///<summary>set</summary>
	///<param name ="x" type="number">x坐标</param>
	///<param name ="y" type="number">y坐标</param>
	///<param name ="z" type="number">y坐标</param>
	///<param name ="w" type="number">w齐次坐标</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setX方法用来重新设置四维向量的x坐标值.并返回新的坐标值的四维向量.
	*/
	///<summary>setX</summary>
	///<param name ="x" type="number">x坐标</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	setX: function ( x ) {

		this.x = x;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setY方法用来重新设置四维向量的y坐标值.并返回新的坐标值的四维向量.
	*/
	///<summary>setY</summary>
	///<param name ="y" type="number">y坐标</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	setY: function ( y ) {

		this.y = y;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setZ方法用来重新设置四维向量的z坐标值.并返回新的坐标值的四维向量.
	*/
	///<summary>setZ</summary>
	///<param name ="z" type="number">z坐标</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	setZ: function ( z ) {

		this.z = z;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setW方法用来重新设置四维向量的w坐标值.并返回新的坐标值的四维向量.
	///	NOTE: 齐次坐标,是一种用来解决坐标变换等操作的快捷方法.
	*/
	///<summary>setW</summary>
	///<param name ="w" type="number">w齐次坐标</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	setW: function ( w ) {

		this.w = w;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setComponent方法用来重新设置四维向量的(x,y,z,w)坐标值.并返回新的坐标值的四维向量.
	///参数index取值为0,1,2 或者 3,取值为0,参数value设置x的坐标值,取值为1,参数value设置y的坐标,
	///取值为2,参数value设置z的坐标,取值为3,参数value设置w的坐标.
	*/
	///<summary>setComponent</summary>
	///<param name ="index" type="number">0,1,2或3</param>
	///<param name ="value" type="number">x, y,z 或 w坐标</param>
	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/*
	///getComponent方法用获得四维向量的(x,y,z,w)坐标值.
	///参数index取值为0,1,2或者 3,取值为0,获得x的坐标值,取值为1,获得y的坐标,
	///取值为2,获得z的坐标,取值为3,获得w的坐标.
	*/
	///<summary>getComponent</summary>
	///<param name ="index" type="number">0,1,2或3</param>
	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );	//TODO: 添加message,合理的range范围.

		}

	},

	/*
	///copy方法用来复制四维向量的(x,y,z,w)坐标值.并返回新的坐标值的四维向量.
	///NOTE:Vector4对象的copy方法,可以直接传递一个Vector3对象,如果传递的是一个vector3对象,返回的四维向量w值设置为1.
	*/
	///<summary>copy</summary>
	///<param name ="v" type="Vector4">四维向量</param> ||<param name ="v" type="Vector3">三维向量</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;	//如果传递的参数v是一个vector3对象,程序将w初始化为1.

		return this;

	},

	/*
	///add方法用来将四维向量的(x,y,z,w)坐标值与参数v的(x,y,z,w)相加.并返回新的坐标值的四维向量.
	/// NOTE:add()方法虽然有两个参数,但实际上只对参数v做运算,这里的参数w,如果设置的话,调用.addVectors()方法.
	*/
	///<summary>add</summary>
	///<param name ="v" type="Vector4">与当前对象(x,y,z,w)坐标值增加的向量</param>
	///<param name ="w" type="Vector4">判断是否有第二个参数w,如果有的话,调用.addVectors()方法</param>
	///<returns type="Vector4">返回新坐标值的二维向量</returns>
	add: function ( v, w ) {

		if ( w !== undefined ) {	//判断是否有第二个参数w,如果有的话,调用.addVectors()方法.

			//THREE.Vector4: .add()方法现在只有一个参数,如果2个参数使用.addVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///addScalar方法用来将四维向量的(x,y,z,w)坐标值直接与参数s相加.并返回新的坐标值的四维向量.
	/// NOTE:这里与add()方法不同的是,这里传递的参数s是一个标量,而add()方法的参数v是一个四维向量.
	*/
	///<summary>addScalar</summary>
	///<param name ="s" type="number">(x,y,z,w)要增加的数值</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///addVectors方法用来将四维向量的(x,y,z,w)坐标值等于参数(a,b)的(x,y,z,w)相加.并返回新的坐标值的四维向量.
	/// NOTE:两个矢量组件对应相加。
	*/
	///<summary>addVectors</summary>
	///<param name ="a" type="Vector4">四维向量</param>
	///<param name ="b" type="Vector4">四维向量</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///sub方法用来将四维向量的(x,y,z,w)坐标值与参数v的(x,y,z,w)相减.并返回新的坐标值的四维向量.
	/// NOTE:sub()方法虽然有两个参数,但实际上只对参数v做运算,这里的参数w,如果设置的话,调用.subVectors()方法.
	*/
	///<summary>sub</summary>
	///<param name ="v" type="Vector4">与当前对象(x,y,z,w)坐标值增加的四维向量</param>
	///<param name ="w" type="Vector4">判断是否有第二个参数w,如果有的话,调用.subVectors()方法</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	sub: function ( v, w ) {

		if ( w !== undefined ) {	//判断是否有第二个参数w,如果有的话,调用.subVectors()方法.

			//THREE.Vector4: .sub()方法现在只有一个参数,如果2个参数使用.subVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;	//返回新坐标值的四维向量

	},

	/*
	///subVectors方法用来将四维向量的(x,y,z,w)坐标值分别于参数(a,b)的(x,y,z,w)相减.并返回新的坐标值的四维向量.
	*/
	///<summary>subVectors</summary>
	///<param name ="a" type="Vector4">四维向量</param>
	///<param name ="b" type="Vector4">四维向量</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;	//返回新坐标值的四维向量

	},
	/// TODO:这里没有multiply()方法.

	/*
	///multiplyScalar方法用来将四维向量的(x,y,z,w)坐标值直接与参数s相乘.并返回新的坐标值的四维向量.
	/// NOTE:这里与multiply()方法不同的是,这里传递的参数scalar是一个标量,而multiply()方法的参数v是一个四维向量.
	*/
	///<summary>multiplyScalar</summary>
	///<param name ="scalar" type="number">与当前对象(x,y,z,w)值相乘的标量,数值</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;	//返回新坐标值的四维向量

	},

	/// TODO:这里没有multiplyVectors()方法.
	/// TODO:这里没有applyEuler()方法.
	/// TODO:这里没有applyAxisAngle()方法.
	/// TODO:这里没有applyMatrix3()方法.
	
	/*
	///applyMatrix4方法将当前向量乘以一个4x4的矩阵,参数m(一个Matrix4的矩阵)
	/// NOTE:applyToVector3Array方法经常用来对四维向量应用某种变换.	
	*/
	///<summary>applyMatrix4</summary>
	///<param name ="m" type="Matrix4">4x4矩阵</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	applyMatrix4: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;	//返回新坐标值的四维向量

	},

	/// TODO:这里没有applyProjection()方法.
	/// TODO:这里没有applyQuaternion()方法.
	/// TODO:这里没有transformDirection()方法.
	/// TODO:这里没有divide()方法.

	/*
	///divideScalar方法用来将四维向量的(x,y,z,w)坐标值直接与参数scalar相除.并返回新的坐标值的四维向量.
	/// NOTE:1. 参数scalar如果为0,当前对象(x,y,z,w)值直接设置为0!!
	/// NOTE:2. 这里与divide()方法不同的是,这里传递的参数scalar是一个标量,而divide()方法的参数v是一个四维向量.
	*/
	///<summary>divideScalar</summary>
	///<param name ="scalar" type="number">与当前对象(x,y,z,w)值相除的标量,数值</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;		//将被除数换算成小数

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;
			this.w *= invScalar;

		} else {

			//NOTE:参数scalar如果为0,当前对象(x,y,z)值直接设置为0,齐次坐标w的值设置为1!!
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		}

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setAxisAngleFromQuaternion方法利用四元数设置轴角,达到坐标旋转变换的目的吧.
	/// NOTE:参数q必须是单位向量,通过调用.normalize()得到单位向量.
	*/
	///<summary>setAxisAngleFromQuaternion</summary>
	///<param name ="q" type="Quaternion">四元数</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	setAxisAngleFromQuaternion: function ( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized	
		// NOTE:进行Dot计算的前提是两个向量首先要变成单位向量,这里通过调用.normalize()得到单位向量.

		this.w = 2 * Math.acos( q.w );

		var s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			 this.x = 1;
			 this.y = 0;
			 this.z = 0;

		} else {

			 this.x = q.x / s;
			 this.y = q.y / s;
			 this.z = q.z / s;

		}

		return this;	//返回新坐标值的四维向量

	},

	/*
	///setAxisAngleFromRotationMatrix方法利用一个参数m(旋转矩阵),达到坐标旋转变换的目的吧.和setAxisAngleFromQuaternion()方法一样.建议使用setAxisAngleFromQuaternion()方法.
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
	///<summary>setAxisAngleFromRotationMatrix</summary>
	///<param name ="m" type="Matrix3">3x3矩阵(旋转矩阵)</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	setAxisAngleFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
		// 确保参数m是一个3x3的旋转矩阵.

		var angle, x, y, z,		// variables for result
			epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon )
		   && ( Math.abs( m13 - m31 ) < epsilon )
		   && ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 )
			   && ( Math.abs( m13 + m31 ) < epsilon2 )
			   && ( Math.abs( m23 + m32 ) < epsilon2 )
			   && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) { // m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else { // m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )
						  + ( m13 - m31 ) * ( m13 - m31 )
						  + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	},

	/*
	///min方法用来将四维向量的(x,y,z,w)坐标值直接与参数v的(x,y,z,w)比较,如果当前四维向量的值大于参数v的(x,y,z,w),
	///将参数v的(x,y,z,w)赋值给当前向量,并返回(x,y,z,w)值最小的四维向量.
	*/
	///<summary>min</summary>
	///<param name ="v" type="Vector4">与当前对象(x,y,z,w)值参数v的(x,y,z,w)比较,并返回(x,y,z,w)值最小的四维向量.</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	min: function ( v ) {

		if ( this.x > v.x ) {		//如果当前四维向量的x值大于参数v.x

			this.x = v.x;	//将参数v的x值赋值给当前向量

		}

		if ( this.y > v.y ) {		//如果当前四维向量的y值大于参数v.y

			this.y = v.y;	//将参数v的y值赋值给当前向量

		}

		if ( this.z > v.z ) {		//如果当前四维向量的z值大于参数v.z

			this.z = v.z;	//将参数v的z值赋值给当前向量

		}

		if ( this.w > v.w ) {		//如果当前四维向量的w值大于参数v.w

			this.w = v.w;	//将参数v的w值赋值给当前向量

		}

		return this;	//返回新坐标值的四维向量

	},

	/*
	///max方法用来将四维向量的(x,y,z,w)坐标值直接与参数v的(x,y,z,w)比较,如果当前四维向量的值小于参数v的(x,y,z,w),
	///将参数v的(x,y,z,w)赋值给当前向量,并返回(x,y,z,w)值最大的四维向量.
	*/
	///<summary>min</summary>
	///<param name ="v" type="Vector4">与当前对象(x,y,z,w)值参数v的(x,y,z,w)比较,并返回(x,y,z,w)值最大的四维向量.</param>
	///<returns type="Vector4">返回新坐标值的四维向量</returns>
	max: function ( v ) {

		if ( this.x < v.x ) {		//如果当前四维向量的x值小于参数v.x

			this.x = v.x;	//将参数v的x值赋值给当前向量

		}

		if ( this.y < v.y ) {		//如果当前四维向量的y值小于参数v.y

			this.y = v.y;	//将参数v的y值赋值给当前向量

		}

		if ( this.z < v.z ) {		//如果当前四维向量的z值小于参数v.z

			this.z = v.z;	//将参数v的z值赋值给当前向量

		}

		if ( this.w < v.w ) {		//如果当前四维向量的w值小于参数v.w

			this.w = v.w;	//将参数v的w值赋值给当前向量

		}

		return this;	//返回新坐标值的四维向量

	},

	/*
	///clamp方法用来将四维向量的(x,y,z,w)坐标值直接与参数min,参数max的(x,y,z,w)比较,如果当前四维向量的值小于参数min的(x,y,z,w)
	///或者大于参数max的(x,y,z,w),对应的将参数min或max的(x,y,z,w)赋值给当前四维向量,
	/// NOTE:保持当前四维向量在min,max所组成的四维空间的之内,最大不超过max的(x,y,z,w)值,最小不小于min的(x,y,z,w)值.
	*/
	///<summary>clamp</summary>
	///<param name ="min" type="Vector4">四维向量.</param>
	///<param name ="max" type="Vector4">四维向量.</param>
	///<returns type="Vector4">返回指定界限内的四维向量</returns>
	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly
		// 这个方法用来获得四维向量的最小值于最大值,如果没有获取到,说明函数运行错误.
		
		if ( this.x < min.x ) {				//如果当前四维向量的x值小于参数min的x值

			this.x = min.x;				//将参数min的x值赋值给当前向量

		} else if ( this.x > max.x ) {			//如果当前四维向量的x值大于参数max的x值

			this.x = max.x;				//将参数max的x值赋值给当前向量

		}

		if ( this.y < min.y ) {				//如果当前四维向量的y值小于参数min的y值

			this.y = min.y;				//将参数min的y值赋值给当前向量

		} else if ( this.y > max.y ) {			//如果当前四维向量的y值大于参数max的y值

			this.y = max.y;				//将参数max的y值赋值给当前向量

		}

		if ( this.z < min.z ) {				//如果当前四维向量的z值小于参数min的z值

			this.z = min.z;				//将参数min的z值赋值给当前向量

		} else if ( this.z > max.z ) {			//如果当前四维向量的z值大于参数max的z值

			this.z = max.z;				//将参数max的z值赋值给当前向量

		}

		if ( this.w < min.w ) {				//如果当前四维向量的w值小于参数min的w值

			this.w = min.w;				//将参数min的w值赋值给当前向量

		} else if ( this.w > max.w ) {			//如果当前四维向量的w值大于参数max的w值

			this.w = max.w;				//将参数max的w值赋值给当前向量

		}

		return this;	//返回指定界限内的四维向量

	},

	/*
	///clampScalar方法用来将四维向量的(x,y,z,w)坐标值直接与参数minVal,参数maxVal比较,如果当前四维向量的值小于参数minVal
	///或者大于参数maxVal,将参数minVal或maxVal赋值给当前四维向量,
	/// NOTE: 1. 保持当前四维向量在minVal,maxVal所组成的四维空间的之内,最大不超过maxVal值,最小不小于minVal值.
	/// NOTE: 2. 这里与clamp()方法不同的是,这里传递的参数minVal,maxVal是一个标量,而clamp()方法的参数min,参数max是两个四维向量.
	*/
	///<summary>clampScalar</summary>
	///<param name ="minVal" type="number">下限.</param>
	///<param name ="maxVal" type="number">上限.</param>
	///<returns type="Vector4">返回指定界限内的四维向量</returns>
	clampScalar: ( function () {	//外侧括号是一种特殊的用法,似乎代表立即执行.小白,请见谅!

		var min, max;

		return function ( minVal, maxVal ) {	//创建匿名函数

			if ( min === undefined ) {

				min = new THREE.Vector4();
				max = new THREE.Vector4();

			}

			min.set( minVal, minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal, maxVal );

			return this.clamp( min, max );	//调用clamp()方法,返回指定界限内的四维向量

		};

	} )(),

	/*
	///floor方法用来返回小于或等于四维向量的(x,y,z,w)坐标值的最大整数
	/// NOTE:去掉小数部分
	*/
	///<summary>floor</summary>
	///<returns type="Vector4">返回圆整后的四维向量</returns>
    floor: function () {

        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );
        this.z = Math.floor( this.z );
        this.w = Math.floor( this.w );

        return this;	//返回圆整后的四维向量

    },

	/*
	///ceil方法用来返回大于或等于四维向量的(x,y,z,w)坐标值的最小整数
	/// NOTE:将小数部分去掉加1.
	*/
	///<summary>ceil</summary>
	///<returns type="Vector4">返回圆整后的四维向量</returns>
    ceil: function () {

        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );
        this.z = Math.ceil( this.z );
        this.w = Math.ceil( this.w );

        return this;	//返回圆整后的四维向量

    },

	/*
	///round方法用来返回最接近四维向量的(x,y,z,w)坐标值的整数
	/// NOTE:也就是四舍五入
	*/
	///<summary>round</summary>
	///<returns type="Vector4">返回圆整后的四维向量</returns>
    round: function () {

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        this.z = Math.round( this.z );
        this.w = Math.round( this.w );

        return this;	//返回圆整后的四维向量

    },

	/*
	///roundToZero方法将当前四维向量的(x,y,z,w)坐标值若为负数时,返回大于或等于四维向量的(x,y,z,w)坐标值的最小整数
	///	而当前四维向量的(x,y,z,w)坐标值若为正数时,返回小于或等于四维向量的(x,y,z,w)坐标值的最大整数
	*/
	///<summary>roundToZero</summary>
	///<returns type="Vector4">返回圆整后的四维向量</returns>
    roundToZero: function () {

        this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
        this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
        this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
        this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

        return this;	//返回圆整后的四维向量

    },

	/*
	///negate方法将当前四维向量的(x,y,z,w)坐标值若为负数时,返回正数.
	///	而当前四维向量的(x,y,z,w)坐标值若为正数时,返回负数.
	/// NOTE:取当前四维向量的(x,y,z,w)坐标值相反数,经常用来翻转法线
	*/
	///<summary>negate</summary>
	///<returns type="Vector4">返回取相反数后的四维向量</returns>
	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;	//返回取相反数后的四维向量

	},

	/*
	///dot方法将返回两个向量的点乘积(点乘,数量积).
	/// NOTE:1. 关于点积的介绍参考维基百科:http://zh.wikipedia.org/wiki/%E6%95%B0%E9%87%8F%E7%A7%AF, 常用来进行方向性判断，如两向量点积大于0，则它们的方向朝向相近；如果小于0，则方向相反。
	///	NOTE:2. Vector4.Dot也叫点积，它返回1个-1.0～1.0之间的一个值。网上确实也这么说。但是这个值表示什么呢？恩，表示返回进行Dot计算的两个向量之间的夹角的余弦值(Cos弧度角).要注意的是能进行Dot计算的前提是两个向量首先要变成单位向量！
	*/
	///<summary>dot</summary>
	///<param name ="v" type="Vector4">四维向量</param>
	///<returns type="number">返回点乘积(点乘,数量积)</returns>
	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;	//返回点乘积(点乘,数量积)

	},

	/*
	///lengthSq方法将返回这个四维向量的长度的平方（只读）.
	/// NOTE：a^2 + b^2 +c^2 + d^2 = e^2,这里返回的是e^2.
	*/
	///<summary>lengthSq</summary>
	///<returns type="number">返回四维向量的长度的平方（只读）</returns>
	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;	//返回四维向量的长度的平方（只读）

	},

	/*
	///length方法将返回四维向量的长度（只读）.
	/// NOTE：a^2 + b^2 + c^2 + d^2 =e^2,e=Math.sqrt(a^2 + b^2 + c^2 + d^2),这里返回的是e.
	*/
	///<summary>length</summary>
	///<returns type="number">返回四维向量的长度（只读）</returns>
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );		//返回四维向量的长度（只读）

	},

	/*
	///lengthManhattan方法将返回四维向量(x,y,z,w)值的和（只读）.
	///曼哈顿距离——两点在南北方向上的距离加上在东西方向上的距离，即d（i，j）=|xi-xj|+|yi-yj|。对于一个具有
	///正南正北、正东正西方向规则布局的城镇街道，从一点到达另一点的距离正是在南北方向上旅行的距离加上在东西方向
	///上旅行的距离，因此曼哈顿距离又称为出租车距离，曼哈顿距离不是距离不变量，当坐标轴变动时，点间的距离就会不同。
	///维基百科上的内容:http://zh.wikipedia.org/zh/%E6%9B%BC%E5%93%88%E9%A0%93%E8%B7%9D%E9%9B%A2
	/// NOTE：曼哈顿距离,this.x + this.y + this.z.
	/// TODO:曼哈顿距离,这个功能应该二维向量中增加这个方法呀?计算路径的时候很常用呀.
	*/
	///<summary>lengthManhattan</summary>
	///<returns type="number">返回四维向量的长度（只读）</returns>
	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );	//返回四维向量的长度（只读）

	},

	
	/*
	///normalize方法将返回向量的长度为1（只读）.
	/// 复习一下初中的几何吧,三角恒等式,给你准备好了 :) ,见维基百科:
	/// http://zh.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0#.E4.B8.89.E8.A7.92.E6.81.92.E7.AD.89.E5.BC.8F
	*/
	///<summary>normalize</summary>
	///<returns type="number">返回四维向量单位长度(只读）</returns>
	normalize: function () {

		return this.divideScalar( this.length() );	//返回四维向量单位长度（只读）

	},

	/*
	///setLength方法用来按照参数l(长度)设置新的四维向量(x,y,z,w)值.
	/// NOTE:将以原点到当前向量的线段等比例缩放到参数l所指定的长度.
	*/
	///<summary>setLength</summary>
	///<param name ="l" type="number">指定的长度</param>
	///<returns type="Vector4">返回按照参数l(长度)设置新的四维向量(x,y,z,w)值.</returns>
	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {		//做个判断,如果原长度与新长度不相等,并且原长度不为0.

			this.multiplyScalar( l / oldLength );		//调用.multiplyScalar()方法,传递新长度与原长度的比.

		}

		return this;		//返回按照参数l(长度)设置新的四维向量(x,y,z,w)值.

	},

	/*lerp方法
	///lerp方法在将当前四维向量(x,y,z,w)设置为下限和参数v(x,y,z,w)设为上限 之间进行线性插值，
	/// alpha 表示权值。从下限当前四维向量(x,y,z,w)到上限参数v(x,y,z,w)乘以百分比alpha(0.0-1.0),加上当前四维向量(x,y,z,w)
	///当前二维向量(x,y,z,w)的和赋值给当前四维向量(x,y,z,w),返回当前四维向量(x,y,z,w).
	/// NOTE:注意，如果 当前四维向量(x,y,z,w) 和 参数v(x,y,z,w)是向量，则权值 alpha 必须是标量,取值范围是0.0-1.0.
	*/
	///<summary>lerp</summary>
	///<param name ="v" type="Vector4">四维向量</param>
	///<param name ="alpha" type="number">百分比权值(0.0-1.0)</param>
	///<returns type="Vector4">四维向量</returns>	
	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;	//返回四维向量

	},

	/// TODO:这里没有across()方法.
	/// TODO:这里没有crossVectors()方法.
	/// TODO:这里没有projectOnVector()方法.
	/// TODO:这里没有projectOnPlane()方法.
	/// TODO:这里没有reflect()方法.
	/// TODO:这里没有angleTo()方法.
	/// TODO:这里没有distanceTo()方法.
	/// TODO:这里没有distanceToSquared()方法.
	/// TODO:这里没有setEulerFromRotationMatrix()方法.
	/// TODO:这里没有setEulerFromQuaternion()方法.		
	/// TODO:这里没有getPositionFromMatrix()方法.
	/// TODO:这里没有getScaleFromMatrix()方法.
	/// TODO:这里没有getColumnFromMatrix()方法.
	/// TODO:这里没有setFromMatrixPosition()方法.
	/// TODO:这里没有setFromMatrixScale()方法.		
	/// TODO:这里没有setFromMatrixColumn()方法.		

	/*equals方法
	///equals方法相当于比较运算符===,将当前四维向量和参数v中的(x,y,z,w)值进行对比,返回bool型值.
	*/
	///<summary>equals</summary>
	///<param name ="v" type="Vector4">四维向量(x,y,z,w)</param>
	///<returns type="bool">返回true or false</returns		
	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	},

	/*fromArray方法
	///fromArray方法将存储四维向量(x,y,z,w)值的数组赋值给当前四维向量对象
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">四维向量(x,y,z,w)值数组array[x,y,z,w]</param>
	///<returns type="Vector4">返回新的四维向量</returns>	
	fromArray: function ( array ) {

		this.x = array[ 0 ];
		this.y = array[ 1 ];
		this.z = array[ 2 ];
		this.w = array[ 3 ];

		return this;	//返回四维向量

	},

	/*toArray方法
	///toArray方法将当前四维向量对象的属性赋值给数组array[0.5,0.5,0.5,1].返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">四维向量(x,y,z,w)值数组array[x,y,z,w]</returns>	
	toArray: function () {

		return [ this.x, this.y, this.z, this.w ];

	},

	/*clone方法
	///clone方法克隆一个四维向量对象.
	*/
	///<summary>clone</summary>
	///<returns type="Vector4">返回四维向量对象</returns>	
	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	}

};
