
// File:src/math/Math.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
/*
///Math对象的构造函数.包含了一些常用的数学方法.
*/
///<summary>Math</summary>
THREE.Math = {

	/****************************************
	****下面是Math对象提供的功能函数.
	****************************************/
	/*
	///generateUUID方法用来生成一个36位的uuid通用唯一识别码 (Universally Unique Identifier).
	*/
	///<summary>generateUUID</summary>
	///<returns type="Array( 36 )">返回uuid,一个36位的数组对象</returns>
	generateUUID: function () {

		// http://www.broofa.com/Tools/Math.uuid.htm

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
		var uuid = new Array( 36 );
		var rnd = 0, r;

		return function () {

			for ( var i = 0; i < 36; i ++ ) {

				if ( i == 8 || i == 13 || i == 18 || i == 23 ) {

					uuid[ i ] = '-';

				} else if ( i == 14 ) {

					uuid[ i ] = '4';

				} else {

					if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
					r = rnd & 0xf;
					rnd = rnd >> 4;
					uuid[ i ] = chars[ ( i == 19 ) ? ( r & 0x3 ) | 0x8 : r ];

				}
			}

			return uuid.join( '' );	//返回36位的uuid通用唯一识别码 (Universally Unique Identifier).

		};

	}(),

	// Clamp value to range <a, b>
	// 限制值x在a,b之间.

	/*
	///clamp方法用来限制x的值在a和b之间， 如果x小于a，返回a。 如果x大于b，返回b，否则返回x
	*/
	///<summary>clamp</summary>
	///<param name ="x" type="Number">数值x</param>
	///<param name ="a" type="Number">数值a</param>
	///<param name ="b" type="Number">数值b</param>
	///<returns type="Number">如果x小于a，返回a。 如果x大于b，返回b，否则返回x</returns>
	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );	//	///<param name ="x" type="Number">数值x</param>

	},

	// Clamp value to range <a, inf)
	// 限制值x<a

	/*
	///clampBottom方法用来限制x的值在a和b之间， 如果x小于a，返回a，否则返回x
	*/
	///<summary>clampBottom</summary>
	///<param name ="x" type="Number">数值x</param>
	///<param name ="a" type="Number">数值a</param>
	///<returns type="Number">如果x小于a，返回a，否则返回x</returns>
	clampBottom: function ( x, a ) {

		return x < a ? a : x;	//如果x小于a，返回a，否则返回x

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>
	// 参数x在range<a1,a2>到range<b1,b2>的线性映射
	// TOTO:关于线性映射没有弄清楚,有时间在说吧.

	/*
	///mapLinear方法用来返回参数x在range<a1,a2>到range<b1,b2>的线性映射
	*/
	///<summary>mapLinear</summary>
	///<param name ="x" type="Number">数值x</param>
	///<param name ="a1" type="Number">数值a1</param>
	///<param name ="a2" type="Number">数值a2</param>
	///<param name ="b1" type="Number">数值b1</param>
	///<param name ="b2" type="Number">数值b2</param>
	///<returns type="Number">返回线性映射x range<a1,a2>到range<b1,b2></returns>
	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );		//返回参数x在range<a1,a2>到range<b1,b2>的线性映射 

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	/*
	///smoothstep方法和lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。三次平滑插值
	*/
	///<summary>smoothstep</summary>
	///<param name ="x" type="Number">数值x</param>
	///<param name ="min" type="Number">最小值</param>
	///<param name ="max" type="Number">最大值</param>
	///<returns type="Number">和lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。</returns>
	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );	//和lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。

	},

	/*
	///smoothstep方法和lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。五次平滑插值
	*/
	///<summary>smoothstep</summary>
	///<param name ="x" type="Number">数值x</param>
	///<param name ="min" type="Number">最小值</param>
	///<param name ="max" type="Number">最大值</param>
	///<returns type="Number">和lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。</returns>
	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );	//和lerp类似，在最小和最大值之间的插值，并在限制处渐入渐出。

	},

	// Random float from <0, 1> with 16 bits of randomness
	// 生成0,到1的随机浮点数,有16位大小选择范围
	// (standard Math.random() creates repetitive patterns when applied over larger space)
	// 使标准的Math.random()方法有更大的取值范围.
	/*
	///random16方法生成0,到1的随机浮点数,有16位大小选择范围
	*/
	///<summary>random16</summary>
	///<returns type="Number">返回随机浮点数</returns>
	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;	//返回随机浮点数

	},

	// Random integer from <low, high> interval
	// 通过参数low,high定义的取值范围生成随机整数.
	/*
	///randInt方法通过参数low,high定义的取值范围生成随机整数.
	*/
	///<summary>randInt</summary>
	///<returns type="Int">返回随机整数.</returns>
	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );	//返回随机整数

	},

	// Random float from <low, high> interval
	// 通过参数low,high定义的取值范围生成随机浮点数
	/*
	///randInt方法通过参数low,high定义的取值范围生成随机浮点数.
	*/
	///<summary>randInt</summary>
	///<returns type="float">返回随机浮点数.</returns>
	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );	//返回随机浮点数

	},

	// Random float from <-range/2, range/2> interval
	// 生成[-range/2,range/2]区间随机浮点数。
	/*
	///randFloatSpread方法生成[-range/2,range/2]区间随机浮点数。
	*/
	///<summary>randFloatSpread</summary>
	///<returns type="float">返回随机浮点数.</returns>
	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );		//返回随机浮点数

	},

	/*
	///sign方法返回参数x的符号,如果大于0返回1,如果小于0返回-1,否则返回0.
	*/
	///<summary>sign</summary>
	///<returns type="Int">返回符号.</returns>
	sign: function ( x ) {

		return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : 0;	//返回参数x的符号,如果大于0返回1,如果小于0返回-1,否则返回0.

	},

	/*
	///degToRad方法返回与参数degrees所表示的角度相等的弧度值.
	*/
	///<summary>degToRad</summary>
	///<returns type="Number">返回与参数degrees所表示的角度相等的弧度值.</returns>
	degToRad: function () {

		var degreeToRadiansFactor = Math.PI / 180;

		return function ( degrees ) {

			return degrees * degreeToRadiansFactor;	//返回与参数degrees所表示的角度相等的弧度值.

		};

	}(),

	/*
	///radToDeg方法返回与参数radians所表示的弧度相等的角度值.
	*/
	///<summary>radToDeg</summary>
	///<returns type="Number">返回与参数radians所表示的弧度相等的角度值.</returns>
	radToDeg: function () {

		var radianToDegreesFactor = 180 / Math.PI;

		return function ( radians ) {

			return radians * radianToDegreesFactor;		//返回与参数radians所表示的弧度相等的角度值

		};

	}(),

	/*
	///isPowerOfTwo方法是否2的幂,如果该值是2的幂，返回true。
	*/
	///<summary>isPowerOfTwo</summary>
	///<returns type="Number">如果该值是2的幂，返回true。</returns>
	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;	//如果该值是2的幂，返回true。

	}

};
