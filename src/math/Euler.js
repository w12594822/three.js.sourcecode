
// File:src/math/Euler.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
/*
///Euler对象的构造函数.用来创建一个欧拉角的对象.Euler对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var euler = new Euler(5,3,2,'XYZ')
///	创建一个绕某轴旋转5度,绕y轴旋转某度,绕某轴旋转2度,旋转顺序为'XYZ'.有了旋转顺序才能确定每个x,y,z轴分别旋转多少度.
///	NOTE: 参数x,y,z代表3个轴的旋转角度,具体哪个轴旋转多少度,需要后面的参数(order)旋转顺序来确定.
///	NOTE: 参数(x,y,z,order)为可选参数,如果不指定参数(x,y,z,order),将创建一个坐标为(0,0,0,'XYZ')的Eular(欧拉角)对象.
/// NOTE: 参数order(旋转顺序) 默认顺序是'XYZ' 取值范围是['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]
///
/// 通俗的讲,欧拉角就是用来描述一个物体在三维空间中方向的一种常用的方法.举例来说,一个物体在三维空间中,绕x轴转了多少度,
///	y轴转了多少度,z轴转了多少度,来描述物体在三维空间中的方向.
/// 有点类似香港电影里飞虎队队员之间说,"飞鹰,飞鹰,在你的正前方,5点钟方向,发现目标,准备聚集目标."
///
*/
///<summary>Euler</summary>
///<param name ="x" type="number">绕某轴旋转x度</param>
///<param name ="y" type="number">绕某轴旋转y度</param>
///<param name ="z" type="number">绕某轴旋转z度</param>
///<param name ="order" type="String">order(旋转顺序) 默认顺序是'XYZ' 取值范围是['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]</param>

THREE.Euler = function ( x, y, z, order ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._order = order || THREE.Euler.DefaultOrder;

};

THREE.Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];	//(旋转顺序) 默认顺序是'XYZ' 取值范围是['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]

THREE.Euler.DefaultOrder = 'XYZ';	//默认的旋转顺序为'XYZ'

/****************************************
****下面是Euler对象提供的功能函数.
****************************************/

THREE.Euler.prototype = {

	constructor: THREE.Euler, //构造器,返回对创建此对象的Euler函数的引用

	_x: 0, _y: 0, _z: 0, _order: THREE.Euler.DefaultOrder,	//将(_x,_y,_z,_order)初始化x,y,z为0,旋转顺序为默认旋转顺序'XYZ';

	/*
	///get x 方法用来获取euler角x值.
	///NOTE: get x()的用法是Euler.prototype.x(Euler.x),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get x</summary>
	///<returns type="number">返回euler角_x值</returns>
	get x () {

		return this._x;	//返回euler角_x值

	},

	/*
	///set x 方法用来重新设置Euler角的x值.并返回新的值的Euler角.
	///NOTE: set x()的用法是Euler.prototype.x=value(Euler.x = value),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set x</summary>
	///<param name ="value" type="number">绕x轴旋转的角度值</param>
	set x ( value ) {

		this._x = value;	//设置Euler角的_x值
		this.onChangeCallback(); //调用回调函数.

	},

	/*
	///get y 方法用来从获取euler角y值.
	///NOTE: get y()的用法是Euler.prototype.y(Euler.y),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get y</summary>
	///<returns type="number">返回euler角_y值</returns>
	get y () {

		return this._y;	//返回euler角_y值

	},

	/*
	///set y 方法用来重新设置Euler角的y值.并返回新的值的Euler角.
	///NOTE: set y()的用法是Euler.prototype.y=value(Euler.y = value),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set y</summary>
	///<param name ="value" type="number">绕y轴旋转的角度值</param>
	set y ( value ) {

		this._y = value;	//设置Euler角的_y值
		this.onChangeCallback(); //调用回调函数.

	},

	/*
	///get z 方法用来获取euler角z值.
	///NOTE: get z()的用法是Euler.prototype.z(Euler.z),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get z</summary>
	///<returns type="number">返回euler角_z值</returns>
	get z () {

		return this._z;	//返回euler角_z值

	},

	/*
	///set z 方法用来重新设置Euler角的z值.并返回新的值的Euler角.
	///NOTE: set z()的用法是Euler.prototype.z=value(Euler.z = value),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>set z</summary>
	///<param name ="value" type="number">绕z轴旋转的角度值</param>
	set z ( value ) {

		this._z = value;	//设置Euler角的_z值
		this.onChangeCallback(); //调用回调函数.

	},

	/*
	///get order 方法用来获取euler角order值.
	///NOTE: get order()的用法是Euler.prototype.order(Euler.order),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get order</summary>
	///<returns type="number">返回euler角_z值</returns>
	get order () {

		return this._order;	//返回euler角_order值

	},

	/*
	///set order 方法用来重新设置Euler角的order值.并返回新的值的Euler角.
	///NOTE: set order()的用法是Euler.prototype.order=value(Euler.order = value),这种用法在除ie浏览器以外的浏览器上可以使用.
	///	NOTE: 参数(x,y,z,order)为可选参数,如果不指定参数(x,y,z,order),将创建一个坐标为(0,0,0,'XYZ')的Eular(欧拉角)对象.
	/// NOTE: 参数order(旋转顺序) 默认顺序是'XYZ' 取值范围是['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]
	*/
	///<summary>set order</summary>
	///<param name ="value" type="number">绕z轴旋转的角度值</param>
	set order ( value ) {

		this._order = value;	  	//设置Euler角的_order值
		this.onChangeCallback();	 //调用回调函数.

	},

	///TODO:这里缺少setX()方法.
	///TODO:这里缺少setY()方法.
	///TODO:这里缺少setZ()方法.
	///TODO:这里缺少setW()方法.
	///TODO:这里缺少setComponent()方法.
	///TODO:这里缺少getComponent()方法.

	/*
	///set方法用来重新设置Euler(欧拉角)的x,y,z,order值.并返回新的坐标值的Euler(欧拉角).
	/// TODO:修改set方法,兼容x,y,z,order参数省略支持多态.
	*/
	///<summary>set</summary>
	///<param name ="x" type="number">绕某轴旋转x度</param>
	///<param name ="y" type="number">绕某轴旋转y度</param>
	///<param name ="z" type="number">绕某轴旋转z度</param>
	///<param name ="order" type="number">order(旋转顺序) 默认顺序是'XYZ' 取值范围是['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]</param>
	///<returns type="Euler(欧拉角)">返回新的Euler(欧拉角)</returns>
	set: function ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的Euler(欧拉角)

	},

	/*
	///copy方法用来复制Euler(欧拉角)的(x,y,z,order)值.并返回新的Euler(欧拉角).
	*/
	///<summary>copy</summary>
	///<param name ="euler(欧拉角)" type="Euler(欧拉角)">Euler(欧拉角)</param>
	///<returns type="Euler(欧拉角)">返回新的Euler(欧拉角)</returns>	
	copy: function ( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的Euler(欧拉角)

	},

	/*
	///setFromRotationMatrix方法利用一个参数m(旋转矩阵),达到旋转变换的目的吧.
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
	///<param name ="order" type="String">order(旋转顺序) 默认顺序是'XYZ' 取值范围是['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]</param>
	///<returns type="Euler(欧拉角)">返回新的Euler(欧拉角)</returns>
	setFromRotationMatrix: function ( m, order ) {

		var clamp = THREE.Math.clamp;	//clamp用来设置数值的取值范围

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
		// 确保参数m是一个3x3的旋转矩阵.

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {

				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {

				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {

				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {

				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {

				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}

		} else {

			console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order )	//通过按照以上几种旋转顺序设置欧拉角对象失败报错

		}

		this._order = order;	//重新设置旋转顺序

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的Euler(欧拉角)

	},

	/*
	///setFromQuaternion方法通过四元数设置Euler(欧拉角).
	/// NOTE:参数(q)必须是单位向量,通过调用.normalize()得到单位向量.
	/// NOTE:参数update是一个可选参数.如果不设置默认为true.
	*/
	///<summary>setFromQuaternion</summary>
	///<param name ="q" type="Quaternion">四元数</param>
	///<param name ="order" type="String">旋转顺序</param>
	///<param name ="update" type="bool">update表示是否调用回调函数bool型标记值</param>
	///<returns type="Euler(欧拉角)">返回新的Euler(欧拉角)</returns>
	setFromQuaternion: function ( q, order, update ) {

		var clamp = THREE.Math.clamp;	//clamp用来设置数值的取值范围

		// q is assumed to be normalized
		// 确保q是一个单位向量

		// 下面网址是对四元数转换成欧拉角的一个详细的介绍.里面有好多的数学算法.
		// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var sqw = q.w * q.w;

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
			this._y = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ), - 1, 1 ) );
			this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order ===  'YXZ' ) {

			this._x = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ), - 1, 1 ) );
			this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
			this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ), - 1, 1 ) );
			this._y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
			this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZYX' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
			this._y = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ), - 1, 1 ) );
			this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order === 'YZX' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
			this._y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
			this._z = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ), - 1, 1 ) );

		} else if ( order === 'XZY' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
			this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
			this._z = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ), - 1, 1 ) );

		} else {

			console.warn( 'THREE.Euler: .setFromQuaternion() given unsupported order: ' + order )	//通过按照以上几种旋转顺序设置欧拉角对象失败报错

		}

		this._order = order;		//重新设置旋转顺序

		if ( update !== false ) this.onChangeCallback();	//通过update参数判断是否调用回调函数.

		return this;	//返回新的Euler(欧拉角)

	},

	/*
	///reorder方法通过四元数设置Euler(欧拉角)的旋转顺序.
	/// NOTE:参数(q)必须是单位向量,通过调用.normalize()得到单位向量.
	/// WARNING: reorder 方法将丢弃Euler(欧拉角)的旋转顺序信息.
	*/
	///<summary>reorder</summary>
	///<param name ="order" type="String">旋转顺序</param>
	///<returns type="Euler(欧拉角)">返回新的Euler(欧拉角)</returns>
	reorder: function () {
		// WARNING: reorder 方法将丢弃Euler(欧拉角)的旋转顺序信息.
		// WARNING: this discards revolution information -bhouston

		var q = new THREE.Quaternion();

		return function ( newOrder ) {

			q.setFromEuler( this );
			this.setFromQuaternion( q, newOrder );	//调用setFromQuaternion()方法,返回新旋转顺序的Euler(欧拉角)

		};


	}(),

	/*equals方法
	///equals方法相当于比较运算符===,将当前Euler(欧拉角)和参数euler中的(x,y,z,order)值进行对比,返回bool型值.
	*/
	///<summary>equals</summary>
	///<param name ="v" type="Euler(欧拉角)">Euler(欧拉角)(x,y,z,order)</param>
	///<returns type="bool">返回true or false</returns>	
	equals: function ( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	},

	/*fromArray方法
	///fromArray方法将存储Euler(欧拉角)(x,y,z,order)值的数组赋值给当前Euler(欧拉角)对象
	/// NOTE:参数order是一个可选参数.如果不设置使用默认的旋转顺序.
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">Euler(欧拉角)(x,y,z,order)值数组array[x,y,z,order]</param>
	///<returns type="Euler(欧拉角)">返回新的Euler(欧拉角)</returns>	
	fromArray: function ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this.onChangeCallback();	//调用回调函数.

		return this;	//返回新的Euler(欧拉角)

	},

	/*toArray方法
	///toArray方法将当前Euler(欧拉角)对象的属性赋值给数组array[5,3,2,'XYZ'].返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">Euler(欧拉角)(_x,_y,_z,_order)值数组array[x,y,z,order]</returns>	
	toArray: function () {

		return [ this._x, this._y, this._z, this._order ];	//返回一个包含x,y,z,order数值的数组,

	},

	/*onChange方法
	///onChange方法在将回调函数表达式作为callback参数传递给onChangeCallback()方法.
	*/
	///<summary>onChange</summary>
	///<param name ="callback" type="function">回调函数</param>
	///<returns type="Euler(欧拉角)">Euler(欧拉角)</returns>	
	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	/*onChangeCallback方法
	///onChangeCallback方法克隆一个Euler(欧拉角)对象.
	///NOTE:onChangeCallback()方法在这里就是一个空的函数属性,在上面大部分的方法中都调用了onChangeCallback()方法,这是一种很方便的方法.
	*/
	///<summary>onChangeCallback</summary>
	onChangeCallback: function () {},

	/*clone方法
	///clone方法克隆一个Euler(欧拉角)对象.
	*/
	///<summary>clone</summary>
	///<returns type="Euler(欧拉角)">返回Euler(欧拉角)对象</returns>	
	clone: function () {

		return new THREE.Euler( this._x, this._y, this._z, this._order );

	}

};
