
// File:src/math/Vector3.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

/*
///Vector3对象的构造函数.用来创建一个三维向量的对象.Vector3对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var p2d = new Vector3(5,3,2)
///	创建一个x坐标为5,y坐标为3的向量,z坐标为2的向量.
///	NOTE: 参数(x,y,z)坐标为可选参数,如果不指定参数(x,y,z),将创建一个坐标为(0,0,0)的向量.
*/
///<summary>Vector3</summary>
///<param name ="x" type="number">x坐标</param>
///<param name ="y" type="number">y坐标</param>
///<param name ="z" type="number">z坐标</param>
THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};

/****************************************
****下面是Vector3对象提供的功能函数.
****************************************/

THREE.Vector3.prototype = {

	constructor: THREE.Vector3,	//构造器,返回对创建此对象的Vector3函数的引用

	/*
	///set方法用来重新设置三维向量的x,y,z坐标值.并返回新的坐标值的三维向量.
	*/
	///<summary>set</summary>
	///<param name ="x" type="number">x坐标</param>
	///<param name ="y" type="number">y坐标</param>
	///<param name ="z" type="number">y坐标</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///setX方法用来重新设置三维向量的x坐标值.并返回新的坐标值的三维向量.
	*/
	///<summary>setX</summary>
	///<param name ="x" type="number">x坐标</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	setX: function ( x ) {

		this.x = x;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///setY方法用来重新设置三维向量的y坐标值.并返回新的坐标值的三维向量.
	*/
	///<summary>setY</summary>
	///<param name ="y" type="number">y坐标</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	setY: function ( y ) {

		this.y = y;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///setZ方法用来重新设置三维向量的z坐标值.并返回新的坐标值的三维向量.
	*/
	///<summary>setZ</summary>
	///<param name ="z" type="number">z坐标</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	setZ: function ( z ) {

		this.z = z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///setComponent方法用来重新设置三维向量的(x,y)坐标值.并返回新的坐标值的三维向量.
	///参数index取值为0,1 或者 2,取值为0,参数value设置x的坐标值,取值为1,参数value设置y的坐标,
	///取值为2,参数value设置z的坐标.
	*/
	///<summary>setComponent</summary>
	///<param name ="index" type="number">0,1或2</param>
	///<param name ="value" type="number">x, y 或 z坐标</param>
	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/*
	///getComponent方法用获得三维向量的(x,y,z)坐标值.
	///参数index取值为0,1 或者 2,取值为0,获得x的坐标值,取值为1,获得y的坐标,
	///取值为2,获得z的坐标.
	*/
	///<summary>getComponent</summary>
	///<param name ="index" type="number">0,1或2</param>
	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	/*
	///copy方法用来复制三维向量的(x,y,z)坐标值.并返回新的坐标值的三维向量.
	*/
	///<summary>copy</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///add方法用来将三维向量的(x,y,z)坐标值与参数v的(x,y,z)相加.并返回新的坐标值的三维向量.
	/// NOTE:add()方法虽然有两个参数,但实际上只对参数v做运算,这里的参数w,如果设置的话,调用.addVectors()方法.
	*/
	///<summary>add</summary>
	///<param name ="v" type="Vector3">与当前对象(x,y,z)坐标值增加的向量</param>
	///<param name ="w" type="Vector3">判断是否有第二个参数w,如果有的话,调用.addVectors()方法</param>
	///<returns type="Vector3">返回新坐标值的二维向量</returns>
	add: function ( v, w ) {

		if ( w !== undefined ) {	//判断是否有第二个参数w,如果有的话,调用.addVectors()方法.

			//THREE.Vector3: .add()方法现在只有一个参数,如果2个参数使用.addVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///addScalar方法用来将三维向量的(x,y,z)坐标值直接与参数s相加.并返回新的坐标值的三维向量.
	/// NOTE:这里与add()方法不同的是,这里传递的参数s是一个标量,而add()方法的参数v是一个三维向量.
	*/
	///<summary>addScalar</summary>
	///<param name ="s" type="number">(x,y,z)要增加的数值</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///addVectors方法用来将三维向量的(x,y,z)坐标值等于参数(a,b)的(x,y,z)相加.并返回新的坐标值的三维向量.
	/// NOTE:两个矢量组件对应相加。
	*/
	///<summary>addVectors</summary>
	///<param name ="a" type="Vector3">三维向量</param>
	///<param name ="b" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///sub方法用来将三维向量的(x,y,z)坐标值与参数v的(x,y,z)相减.并返回新的坐标值的三维向量.
	/// NOTE:sub()方法虽然有两个参数,但实际上只对参数v做运算,这里的参数w,如果设置的话,调用.subVectors()方法.
	*/
	///<summary>sub</summary>
	///<param name ="v" type="Vector3">与当前对象(x,y,z)坐标值增加的三维向量</param>
	///<param name ="w" type="Vector3">判断是否有第二个参数w,如果有的话,调用.subVectors()方法</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	sub: function ( v, w ) {

		if ( w !== undefined ) {	//判断是否有第二个参数w,如果有的话,调用.subVectors()方法.

			//THREE.Vector3: .sub()方法现在只有一个参数,如果2个参数使用.subVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///subVectors方法用来将三维向量的(x,y,z)坐标值分别于参数(a,b)的(x,y,z)相减.并返回新的坐标值的三维向量.
	*/
	///<summary>subVectors</summary>
	///<param name ="a" type="Vector3">三维向量</param>
	///<param name ="b" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///multiply方法用来将三维向量的(x,y,z)坐标值与参数v的(x,y,z)相乘.并返回新的坐标值的三维向量.
	*/
	///<summary>multiply</summary>
	///<param name ="v" type="Vector3">与当前对象(x,y,z)值相乘的三维向量</param>
	///<param name ="w" type="Vector3">判断是否有第二个参数w,如果有的话,调用.multiplyVectors()方法</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			//THREE.Vector3: .multiply()方法现在只有一个参数,如果2个参数使用.multiplyVectors( a, b )方法来替代.
			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///multiplyScalar方法用来将三维向量的(x,y,z)坐标值直接与参数s相乘.并返回新的坐标值的三维向量.
	/// NOTE:这里与multiply()方法不同的是,这里传递的参数scalar是一个标量,而multiply()方法的参数v是一个三维向量.
	*/
	///<summary>multiplyScalar</summary>
	///<param name ="scalar" type="number">与当前对象(x,y,z)值相乘的标量,数值</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///multiplyVectors方法用来将三维向量的(x,y,z)坐标值等于参数(a,b)的(x,y,z)相乘.并返回新的坐标值的三维向量.
	/// NOTE:两个矢量组件对应相乘。
	*/
	///<summary>multiplyVectors</summary>
	///<param name ="a" type="Vector3">三维向量</param>
	///<param name ="b" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	multiplyVectors: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///applyEuler方法将当前向量通过参数euler(THREE.Euler对象,欧拉对象)转换成四元数,应用四元数变换.
	/// 实际上就是调用四元数下的.setFromEuler()方法.
	*/
	///<summary>applyEuler</summary>
	///<param name ="euler" type="THREE.Euler">THREE.Euler对象,欧拉对象</param>
	///<returns type="Vector3">返回变换后的三维向量</returns>
	applyEuler: function () {

		var quaternion;

		return function ( euler ) {

			if ( euler instanceof THREE.Euler === false ) {

				console.error( 'THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.' );

			}

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromEuler( euler ) );

			return this;	//返回变换后的三维向量

		};

	}(),

	/*
	///applyMatrix3方法将当前向量根据指定的轴(一个标准单位的向量),和角度旋转.或者说根据指定的轴和角度应用旋转.
	*/
	///<summary>applyMatrix3</summary>
	///<param name ="axis" type="Vector3">三维向量</param>
	///<param name ="angle" type="Matrix3">3x3矩阵</param>
	///<returns type="Vector3">返回变换后的三维向量</returns>
	applyAxisAngle: function () {

		var quaternion;

		return function ( axis, angle ) {

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );	//实际调用的四元数下面的方法.setFromAxisAngle()

			return this;	//返回变换后的三维向量

		};

	}(),

	/*
	///applyMatrix3方法将当前向量乘以一个3x3的矩阵,参数m(一个Matrix3的矩阵)
	*/
	///<summary>applyMatrix3</summary>
	///<param name ="m" type="Matrix3">3x3矩阵</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	applyMatrix3: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///applyMatrix4方法乘以该向量和参数m(一个Matrix4投影矩阵)的4x4的子集
	/// NOTE:applyToVector3Array方法经常用来对三维向量应用某种变换.	
	*/
	///<summary>applyMatrix4</summary>
	///<param name ="m" type="Matrix4">仿射矩阵</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	applyMatrix4: function ( m ) {

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;	//返回新坐标值的三维向量

	},

	/*
	///applyProjection方法乘以该向量和参数m(一个Matrix4投影矩阵),然后除以视角.
	*/
	///<summary>applyProjection</summary>
	///<param name ="m" type="Matrix4">投影矩阵</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	applyProjection: function ( m ) {

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	},

	/*
	///applyQuaternion方法应用一个四元数变换到当前三维向量.
	*/
	///<summary>applyQuaternion</summary>
	///<param name ="q" type="Quaternion">四元数</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	applyQuaternion: function ( q ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///transformDirection方法通过参数m(一个Matrix4投射矩阵的3x3子集)转换这个向量的方向
	*/
	///<summary>transformDirection</summary>
	///<param name ="m" type="Matrix4">仿射矩阵</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
		transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();	//返回单位量

		return this;	//返回新的三维向量

	},

	/*
	///divide方法用来将三维向量的(x,y,z)坐标值与参数v的(x,y,z)相除.并返回新的坐标值的三维向量.
	*/
	///<summary>divide</summary>
	///<param name ="v" type="Vector3">与当前对象(x,y,z)值相除的三维向量</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;	//返回新坐标值的三维向量

	},

	/*
	///divideScalar方法用来将三维向量的(x,y,z)坐标值直接与参数scalar相除.并返回新的坐标值的三维向量.
	/// NOTE:1. 参数scalar如果为0,当前对象(x,y,z)值直接设置为0!!
	/// NOTE:2. 这里与divide()方法不同的是,这里传递的参数scalar是一个标量,而divide()方法的参数v是一个三维向量.
	*/
	///<summary>divideScalar</summary>
	///<param name ="scalar" type="number">与当前对象(x,y,z)值相除的标量,数值</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;		//将被除数换算成小数

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			//参数scalar如果为0,当前对象(x,y,z)值直接设置为0!!
			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;	//返回新坐标值的三维向量

	},
	/*
	///min方法用来将三维向量的(x,y,z)坐标值直接与参数v的(x,y,z)比较,如果当前三维向量的值大于参数v的(x,y,z),
	///将参数v的(x,y,z)赋值给当前向量,并返回(x,y,z)值最小的三维向量.
	*/
	///<summary>min</summary>
	///<param name ="v" type="Vector3">与当前对象(x,y,z)值参数v的(x,y,z)比较,并返回(x,y,z)值最小的三维向量.</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	min: function ( v ) {

		if ( this.x > v.x ) {		//如果当前三维向量的x值大于参数v.x

			this.x = v.x;	//将参数v的x值赋值给当前向量

		}

		if ( this.y > v.y ) {		//如果当前三维向量的y值大于参数v.y

			this.y = v.y;	//将参数v的y值赋值给当前向量

		}

		if ( this.z > v.z ) {		//如果当前三维向量的z值大于参数v.z

			this.z = v.z;	//将参数v的z值赋值给当前向量

		}

		return this;	//返回新坐标值的三维向量

	},

	/*
	///max方法用来将三维向量的(x,y,z)坐标值直接与参数v的(x,y,z)比较,如果当前三维向量的值小于参数v的(x,y,z),
	///将参数v的(x,y,z)赋值给当前向量,并返回(x,y,z)值最大的三维向量.
	*/
	///<summary>min</summary>
	///<param name ="v" type="Vector3">与当前对象(x,y,z)值参数v的(x,y,z)比较,并返回(x,y,z)值最大的三维向量.</param>
	///<returns type="Vector3">返回新坐标值的三维向量</returns>
	max: function ( v ) {

		if ( this.x < v.x ) {		//如果当前三维向量的x值小于参数v.x

			this.x = v.x;	//将参数v的x值赋值给当前向量

		}

		if ( this.y < v.y ) {		//如果当前三维向量的y值小于参数v.y

			this.y = v.y;	//将参数v的y值赋值给当前向量

		}

		if ( this.z < v.z ) {		//如果当前三维向量的z值小于参数v.z

			this.z = v.z;	//将参数v的z值赋值给当前向量

		}

		return this;	//返回新坐标值的三维向量

	},
	/*
	///clamp方法用来将三维向量的(x,y,z)坐标值直接与参数min,参数max的(x,y,z)比较,如果当前三维向量的值小于参数min的(x,y,z)
	///或者大于参数max的(x,y,z),对应的将参数min或max的(x,y,z)赋值给当前三维向量,
	/// NOTE:保持当前三维向量在min,max所组成的三维空间的之内,最大不超过max的(x,y,z)值,最小不小于min的(x,y,z)值.
	*/
	///<summary>clamp</summary>
	///<param name ="min" type="Vector3">三维向量.</param>
	///<param name ="max" type="Vector3">三维向量.</param>
	///<returns type="Vector3">返回指定界限内的三维向量</returns>
	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly
		// 这个方法用来获得三维向量的最小值于最大值,如果没有获取到,说明函数运行错误.

		if ( this.x < min.x ) {				//如果当前三维向量的x值小于参数min的x值

			this.x = min.x;				//将参数min的x值赋值给当前向量

		} else if ( this.x > max.x ) {			//如果当前三维向量的x值大于参数max的x值

			this.x = max.x;				//将参数max的x值赋值给当前向量

		}

		if ( this.y < min.y ) {				//如果当前三维向量的y值小于参数min的y值

			this.y = min.y;				//将参数min的y值赋值给当前向量

		} else if ( this.y > max.y ) {			//如果当前三维向量的y值大于参数max的y值

			this.y = max.y;				//将参数max的y值赋值给当前向量

		}

		if ( this.z < min.z ) {				//如果当前三维向量的z值小于参数min的z值

			this.z = min.z;				//将参数min的z值赋值给当前向量

		} else if ( this.z > max.z ) {			//如果当前三维向量的z值大于参数max的z值

			this.z = max.z;				//将参数max的z值赋值给当前向量

		}

		return this;	//返回指定界限内的三维向量

	},
	/*
	///clampScalar方法用来将三维向量的(x,y,z)坐标值直接与参数minVal,参数maxVal比较,如果当前三维向量的值小于参数minVal
	///或者大于参数maxVal,将参数minVal或maxVal赋值给当前三维向量,
	/// NOTE: 1. 保持当前三维向量在minVal,maxVal所组成的三维空间的之内,最大不超过maxVal值,最小不小于minVal值.
	/// NOTE: 2. 这里与clamp()方法不同的是,这里传递的参数minVal,maxVal是一个标量,而clamp()方法的参数min,参数max是两个三维向量.
	*/
	///<summary>clampScalar</summary>
	///<param name ="minVal" type="number">下限.</param>
	///<param name ="maxVal" type="number">上限.</param>
	///<returns type="Vector3">返回指定界限内的三维向量</returns>
	clampScalar: ( function () {	//外侧括号是一种特殊的用法,似乎代表立即执行.小白,请见谅!

		var min, max;

		return function ( minVal, maxVal ) {	//创建匿名函数

			if ( min === undefined ) {

				min = new THREE.Vector3();
				max = new THREE.Vector3();

			}

			min.set( minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal );

			return this.clamp( min, max );	//调用clamp()方法,返回指定界限内的三维向量

		};

	} )(),

	/*
	///floor方法用来返回小于或等于三维向量的(x,y,z)坐标值的最大整数
	/// NOTE:去掉小数部分
	*/
	///<summary>floor</summary>
	///<returns type="Vector3">返回圆整后的三维向量</returns>
	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;	//返回圆整后的三维向量

	},

	/*
	///ceil方法用来返回大于或等于三维向量的(x,y,z)坐标值的最小整数
	/// NOTE:将小数部分去掉加1.
	*/
	///<summary>ceil</summary>
	///<returns type="Vector3">返回圆整后的三维向量</returns>
	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;	//返回圆整后的三维向量

	},

	/*
	///round方法用来返回最接近三维向量的(x,y,z)坐标值的整数
	/// NOTE:也就是四舍五入
	*/
	///<summary>round</summary>
	///<returns type="Vector3">返回圆整后的三维向量</returns>
	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;	//返回圆整后的三维向量

	},

	/*
	///roundToZero方法将当前三维向量的(x,y,z)坐标值若为负数时,返回大于或等于三维向量的(x,y,z)坐标值的最小整数
	///	而当前三维向量的(x,y,z)坐标值若为正数时,返回小于或等于三维向量的(x,y,z)坐标值的最大整数
	*/
	///<summary>roundToZero</summary>
	///<returns type="Vector3">返回圆整后的三维向量</returns>
	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;	//返回圆整后的三维向量

	},

	/*
	///negate方法将当前三维向量的(x,y,z)坐标值若为负数时,返回正数.
	///	而当前三维向量的(x,y,z)坐标值若为正数时,返回负数.
	/// NOTE:取当前三维向量的(x,y,z)坐标值相反数,经常用来翻转法线
	*/
	///<summary>negate</summary>
	///<returns type="Vector3">返回取相反数后的三维向量</returns>
	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;	//返回取相反数后的三维向量

	},

	/*
	///dot方法将返回两个向量的点乘积(点乘,数量积).
	/// NOTE:1. 关于点积的介绍参考维基百科:http://zh.wikipedia.org/wiki/%E6%95%B0%E9%87%8F%E7%A7%AF, 常用来进行方向性判断，如两向量点积大于0，则它们的方向朝向相近；如果小于0，则方向相反。
	///	NOTE:2. Vector3.Dot也叫点积，它返回1个-1.0～1.0之间的一个值。网上确实也这么说。但是这个值表示什么呢？恩，表示返回进行Dot计算的两个向量之间的夹角的余弦值(Cos弧度角).要注意的是能进行Dot计算的前提是两个向量首先要变成单位向量！
	*/
	///<summary>dot</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<returns type="number">返回点乘积(点乘,数量积)</returns>
	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;	//返回点乘积(点乘,数量积)

	},

	/*
	///lengthSq方法将返回这个三维向量的长度的平方（只读）.
	/// NOTE：勾股定理a^2 + b^2 +c^2= d^2,这里返回的是d^2.
	*/
	///<summary>lengthSq</summary>
	///<returns type="number">返回三维向量的长度的平方（只读）</returns>
	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;	//返回三维向量的长度的平方（只读）

	},

	/*
	///length方法将返回三维向量的长度（只读）.
	/// NOTE：勾股定理a^2 + b^2 + c^2=d^2,d=Math.sqrt(a^2 + b^2+c^2),这里返回的是d.
	*/
	///<summary>length</summary>
	///<returns type="number">返回三维向量的长度（只读）</returns>
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );		//返回三维向量的长度（只读）

	},

	/*
	///lengthManhattan方法将返回三维向量(x,y,z)值的和（只读）.
	///曼哈顿距离——两点在南北方向上的距离加上在东西方向上的距离，即d（i，j）=|xi-xj|+|yi-yj|。对于一个具有
	///正南正北、正东正西方向规则布局的城镇街道，从一点到达另一点的距离正是在南北方向上旅行的距离加上在东西方向
	///上旅行的距离，因此曼哈顿距离又称为出租车距离，曼哈顿距离不是距离不变量，当坐标轴变动时，点间的距离就会不同。
	///维基百科上的内容:http://zh.wikipedia.org/zh/%E6%9B%BC%E5%93%88%E9%A0%93%E8%B7%9D%E9%9B%A2
	/// NOTE：曼哈顿距离,this.x + this.y + this.z.
	/// TODO:曼哈顿距离,这个功能应该二维向量中增加这个方法呀?计算路径的时候很常用呀.
	*/
	///<summary>lengthManhattan</summary>
	///<returns type="number">返回三维向量的长度（只读）</returns>
	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	/*
	///normalize方法将返回向量的长度为1（只读）.
	/// 复习一下初中的几何吧,三角恒等式,给你准备好了 :) ,见维基百科:
	/// http://zh.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0#.E4.B8.89.E8.A7.92.E6.81.92.E7.AD.89.E5.BC.8F
	*/
	///<summary>normalize</summary>
	///<returns type="number">返回三维向量(x,y,z)值的和（只读）</returns>
	normalize: function () {

		return this.divideScalar( this.length() );	//返回三维向量(x,y,z)值的和（只读）

	},

	/*
	///setLength方法用来按照参数l(长度)设置新的三维向量(x,y,z)值.
	/// NOTE:将以原点到当前向量的线段等比例缩放到参数l所指定的长度.
	*/
	///<summary>setLength</summary>
	///<param name ="l" type="number">指定的长度</param>
	///<returns type="Vector3">返回按照参数l(长度)设置新的三维向量(x,y,z)值.</returns>
	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {		//做个判断,如果原长度与新长度不相等,并且原长度不为0.

			this.multiplyScalar( l / oldLength );		//调用.multiplyScalar()方法,传递新长度与原长度的比.
		}

		return this;		//返回按照参数l(长度)设置新的三维向量(x,y,z)值.

	},

	/*lerp方法
	///lerp方法在将当前三维向量(x,y,z)设置为下限和参数v(x,y,z)设为上限 之间进行线性插值，
	/// alpha 表示权值。从下限当前三维向量(x,y,z)到上限参数v(x,y,z)乘以百分比alpha(0.0-1.0),加上当前三维向量(x,y,z)
	///当前二维向量(x,y,z)的和赋值给当前三维向量(x,y,z),返回当前三维向量(x,y,z).
	/// NOTE:注意，如果 当前三维向量(x,y,z) 和 参数v(x,y,z)是向量，则权值 alpha 必须是标量,取值范围是0.0-1.0.
	*/
	///<summary>lerp</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<param name ="alpha" type="number">百分比权值(0.0-1.0)</param>
	///<returns type="Vector3">三维向量</returns>	
	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;	//返回三维向量

	},

	/*cross方法
	///cross方法将返回两个交叉乘积,调用者本身与v的叉乘。叉乘是一个向量，垂直于参与叉乘的两个向量并呈右手螺旋法则。
	/// 返回为同时垂直于两个参数向量的向量，方向可朝上也可朝下，由两向量夹角的方向决定。
	/// NOTE:借助右手定则辅助判断方向。
	/// 叉乘是一种在向量空间中向量的二元运算。与点乘不同，它的运算结果是一个伪向量而不是一个标量。
	/// 叉乘的运算结果叫叉积（即交叉乘积）、外积或向量积。叉积与原来的两个向量都垂直。
		 1、理论知识
		   数学上的定义：c=axb【注：粗体小写字母表示向量】其中a,b,c均为向量。即两个向量的叉积得到的还是向量！
		   性质1：c⊥a，c⊥b，即向量c垂直与向量a,b所在的平面。
		   性质2：模长|c|=|a||b|sin<a,b>
		   性质3：满足右手法则。从这点我们有axb ≠ bxa，而axb = - bxa。所以我们可以使用叉积的正负值来判断向量a，b的相对
		   		  位置，即向量b是处于向量a的顺时针方向还是逆时针方向。
	*/
	///<summary>cross</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<param name ="w" type="Vector3">三维向量</param>
	///<returns type="Vector3">三维向量</returns>	
	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );	//如果存在第二个参数,将调用.crossVectors()方法.

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;	//返回三维向量

	},

	/*crossVectors方法
	///crossVectors方法将返回两个交叉乘积,调用者变为a，b的叉乘。叉乘是一个向量，垂直于参与叉乘的两个向量并呈右手螺旋法则。
	/// 返回为同时垂直于两个参数向量的向量，方向可朝上也可朝下，由两向量夹角的方向决定。
	/// NOTE:借助右手定则辅助判断方向。参考:http://zh.wikipedia.org/zh/%E5%90%91%E9%87%8F%E7%A7%AF
	/// 叉乘是一种在向量空间中向量的二元运算。与点乘不同，它的运算结果是一个伪向量而不是一个标量。
	/// 叉乘的运算结果叫叉积（即交叉乘积）、外积或向量积。叉积与原来的两个向量都垂直。
		 1、理论知识
		   数学上的定义：c=axb【注：粗体小写字母表示向量】其中a,b,c均为向量。即两个向量的叉积得到的还是向量！
		   性质1：c⊥a，c⊥b，即向量c垂直与向量a,b所在的平面。
		   性质2：模长|c|=|a||b|sin<a,b>
		   性质3：满足右手法则。从这点我们有axb ≠ bxa，而axb = - bxa。所以我们可以使用叉积的正负值来判断向量a，b的相对位置，
		   		  即向量b是处于向量a的顺时针方向还是逆时针方向。
	*/
	///<summary>crossVectors</summary>
	///<param name ="a" type="Vector3">三维向量</param>
	///<param name ="b" type="Vector3">三维向量</param>
	///<returns type="Vector3">三维向量</returns>	
	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;	//返回三维向量

	},

	/*projectOnVector方法
	///projectOnVector方法在将当前三维向量(x,y,z)投影一个向量到另一个向量,参数vector(x,y,z).
	/// NOTE:进行Dot计算的前提是两个向量首先要变成单位向量,这里通过调用.normalize()得到单位向量.
	*/
	///<summary>projectOnVector</summary>
	///<param name ="vector" type="Vector3">三维向量</param>
	///<returns type="Vector3">三维向量</returns>	
	projectOnVector: function () {

		var v1, dot;

		return function ( vector ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( vector ).normalize();		//NOTE:进行Dot计算的前提是两个向量首先要变成单位向量,这里通过调用.normalize()得到单位向量.

			dot = this.dot( v1 );	//dot常用来进行方向性判断，如两向量点积大于0，则它们的方向朝向相近；如果小于0，则方向相反。

			return this.copy( v1 ).multiplyScalar( dot );	//投影一个向量到另一个向量。



		};

	}(),

	/*projectOnPlane方法
	///projectOnPlane方法在将当前三维向量(x,y,z)投影一个向量到一个平面(用一个向量表示,参数planeNormal(x,y,z)),然后当前向量减去
	///从这个向量到这个向量到平面法线的投影.
	*/
	///<summary>projectOnPlane</summary>
	///<param name ="planeNormal" type="Vector3">三维向量</param>
	///<returns type="Vector3">三维向量</returns>	
	projectOnPlane: function () {

		var v1;

		return function ( planeNormal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( this ).projectOnVector( planeNormal );		//调用.projectVector方法.

			return this.sub( v1 );	

		}

	}(),

	/*reflect方法
	///reflect方法沿着法线(参数normal)反射向量.
	/// NOTE:reflect方法其实就是对一个向量进行镜像.
	*/
	///<summary>reflect</summary>
	///<param name ="normal" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回一个反射过后的向量.</returns>	
	reflect: function () {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1;

		return function ( normal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );	//返回一个反射过后的向量.

		}

	}(),

	/*angleTo方法
	///angleTo方法返回当前向量与另一个向量的夹角.
	*/
	///<summary>angleTo</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<returns type="number">返回当前向量与另一个向量的夹角</returns>	
	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, - 1, 1 ) );	//返回当前向量与另一个向量的

	},

	/*
	///distanceTo方法将返回当前三维向量到参数v的距离(只读).
	*/
	///<summary>distanceTo</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回当前三维向量到参数v的距离(只读).</returns>
	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );	//返回当前三维向量到参数v的距离(只读).

	},

	/*
	///distanceToSquared方法将返回当前三维向量到参数v的距离的平方
	*/
	///<summary>distanceToSquared</summary>
	///<param name ="v" type="Vector3">三维向量</param>
	///<returns type="Vector3">返回当前三维向量到参数v的距离的平方(只读)</returns>
	distanceToSquared: function ( v ) {

		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;			//当前三维向量到参数v的距离的平方(只读).

	},

	
	/// NOTE:setEulerFromRotationMatrix()方法已经删除,使用Euler.setFromRotationMatrix()替换,此处保留函数为了向下兼容.
	setEulerFromRotationMatrix: function ( m, order ) {

		console.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );

	},

	/// NOTE:setEulerFromQuaternion()方法已经删除,使用Euler.setFromQuaternion()替换,此处保留函数为了向下兼容.
	setEulerFromQuaternion: function ( q, order ) {

		console.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );

	},

	/*
	///getPositionFromMatrix方法将返回从矩阵中的元素得到的新的向量值的向量.
	/// NOTE:getPositionFromMatrix()方法已经删除,使用.setFromMatrixPosition()替换,此处保留函数为了向下兼容.
	*/
	///<summary>getPositionFromMatrix</summary>
	///<param name ="m" type="Matrix">矩阵</param>
	///<returns type="Vector3">返回三维向量</returns>
	getPositionFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );

		return this.setFromMatrixPosition( m );		//返回三维向量

	},

	/*
	///getScaleFromMatrix方法将返回从矩阵中的元素的长度赋值给当前向量.
	/// NOTE:getScaleFromMatrix()方法已经删除,使用.setFromMatrixScale()替换,此处保留函数为了向下兼容.
	*/
	///<summary>getScaleFromMatrix</summary>
	///<param name ="m" type="Matrix">矩阵</param>
	///<returns type="Vector3">返回三维向量</returns>
	getScaleFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );

		return this.setFromMatrixScale( m );	//返回三维向量
	},

	/*
	///getColumnFromMatrix方法将矩阵指定的列中的元素的向量值赋值给给当前的向量.
	/// NOTE:getColumnFromMatrix()方法已经删除,使用.setFromMatrixColumn()替换,此处保留函数为了向下兼容.
	*/
	///<summary>getColumnFromMatrix</summary>
	///<param name ="index" type="number">列数,列的下标.</param>
	///<param name ="matrix" type="Matrix">矩阵</param>
	///<returns type="Vector3">返回三维向量</returns>
	getColumnFromMatrix: function ( index, matrix ) {

		console.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );

		return this.setFromMatrixColumn( index, matrix );	//返回三维向量

	},

	/*
	///setFromMatrixPosition方法将返回从矩阵中的元素得到的新的向量值的向量.
	*/
	///<summary>setFromMatrixPosition</summary>
	///<param name ="m" type="Matrix">矩阵</param>
	///<returns type="Vector3">返回三维向量</returns>
	setFromMatrixPosition: function ( m ) {

		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;	//返回三维向量

	},

	/*
	///setFromMatrixScale方法将返回从矩阵中的元素的长度赋值给当前向量.
	*/
	///<summary>setFromMatrixScale</summary>
	///<param name ="m" type="Matrix">矩阵</param>
	///<returns type="Vector3">返回三维向量</returns>
	setFromMatrixScale: function ( m ) {

		var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
		var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
		var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;	//返回三维向量
	},

	/*
	///setFromMatrixColumn方法将矩阵指定的列中的元素的向量值赋值给给当前的向量.
	*/
	///<summary>setFromMatrixColumn</summary>
	///<param name ="index" type="number">列数,列的下标.</param>
	///<param name ="matrix" type="Matrix">矩阵</param>
	///<returns type="Vector3">返回三维向量</returns>
	setFromMatrixColumn: function ( index, matrix ) {

		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;	//返回三维向量

	},

	/*equals方法
	///equals方法相当于比较运算符===,将当前三维向量和参数v中的(x,y,z)值进行对比,返回bool型值.
	*/
	///<summary>equals</summary>
	///<param name ="v" type="Vector3">三维向量(x,y,z)</param>
	///<returns type="bool">返回true or false</returns
	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );	//返回true or false

	},

	/*fromArray方法
	///fromArray方法将存储三维向量(x,y,z)值的数组赋值给当前三维向量对象
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">三维向量(x,y,z)值数组array[x,y,z]</param>
	///<returns type="Vector3">返回新的三维向量</returns>	
	fromArray: function ( array ) {

		this.x = array[ 0 ];
		this.y = array[ 1 ];
		this.z = array[ 2 ];

		return this;	//返回新的三维向量

	},

	/*toArray方法
	///toArray方法将当前三维向量对象的属性赋值给数组array[0.5,0.5,0.5].返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">三维向量(x,y,z)值数组array[x,y,z]</returns>	
	toArray: function () {

		return [ this.x, this.y, this.z ];	//三维向量(x,y)值数组array[x,y]

	},

	/*clone方法
	///clone方法克隆一个三维向量对象.
	*/
	///<summary>clone</summary>
	///<returns type="Vector3">返回三维向量对象</returns>	
	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );		//返回三维向量

	}

};
