
// File:src/math/Matrix3.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
///Matrix3对象的构造函数.用来创建一个3x3矩阵.Matrix3对象的功能函数采用
///定义构造的函数原型对象来实现,实际就是一个数组.
///
///	用法: var m = new Matrix3(11, 12, 13, 21, 22, 23, 31, 32, 33)
///	创建一个3x3的矩阵,其实就是一个长度为9的数组,将参数(11, 12, 13, 21, 22, 23, 31, 32, 33)传递给数组用来初始化.
///	NOTE: 参数 n11, n12, n13, n21, n22, n23, n31, n32, n33 代表3x3矩阵中的元素的值,n11表示矩阵的第一行,第一列的元素值
///
///<summary>Matrix3</summary>
///<param name ="n11" type="number">n11第 1 行,第 1 列的元素值</param>
///<param name ="n12" type="number">n12第 1 行,第 2 列的元素值</param>
///<param name ="n13" type="number">n13第 1 行,第 3 列的元素值</param>
///<param name ="n21" type="number">n21第 2 行,第 1 列的元素值</param>
///<param name ="n22" type="number">n22第 2 行,第 2 列的元素值</param>
///<param name ="n23" type="number">n23第 2 行,第 3 列的元素值</param>
///<param name ="n31" type="number">n31第 3 行,第 1 列的元素值</param>
///<param name ="n32" type="number">n32第 3 行,第 2 列的元素值</param>
///<param name ="n33" type="number">n33第 3 行,第 3 列的元素值</param>
///<returns type="Matrix3">返回新的3x3矩阵</returns>
THREE.Matrix3 = function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

	this.elements = new Float32Array( 9 );	//创建一个长度为9的数组

	var te = this.elements;	

	//将参数 n11, n12, n13, n21, n22, n23, n31, n32, n33复制给数组中的元素,如果参数没有定义,将矩阵的11,22,33元素初始化为1,其他元素初始化为0.
	te[ 0 ] = ( n11 !== undefined ) ? n11 : 1; te[ 3 ] = n12 || 0; te[ 6 ] = n13 || 0;
	te[ 1 ] = n21 || 0; te[ 4 ] = ( n22 !== undefined ) ? n22 : 1; te[ 7 ] = n23 || 0;
	te[ 2 ] = n31 || 0; te[ 5 ] = n32 || 0; te[ 8 ] = ( n33 !== undefined ) ? n33 : 1;

};

/****************************************
****下面是Euler对象提供的功能函数.
****************************************/
THREE.Matrix3.prototype = {

	constructor: THREE.Matrix3,	//构造器,返回对创建此对象的Matrix3函数的引用

	/*
	///set方法用来重新设置Matrix3(3x3矩阵)的元素值.并返回新的坐标值的Matrix3(3x3矩阵).
	/// TODO:修改set方法,兼容n11, n12, n13, n21, n22, n23, n31, n32, n33参数省略支持多态.
	*/
	///<summary>set</summary>
	///<param name ="n11" type="number">n11第 1 行,第 1 列的元素值</param>
	///<param name ="n12" type="number">n12第 1 行,第 2 列的元素值</param>
	///<param name ="n13" type="number">n13第 1 行,第 3 列的元素值</param>
	///<param name ="n21" type="number">n21第 2 行,第 1 列的元素值</param>
	///<param name ="n22" type="number">n22第 2 行,第 2 列的元素值</param>
	///<param name ="n23" type="number">n23第 2 行,第 3 列的元素值</param>
	///<param name ="n31" type="number">n31第 3 行,第 1 列的元素值</param>
	///<param name ="n32" type="number">n32第 3 行,第 2 列的元素值</param>
	///<param name ="n33" type="number">n33第 3 行,第 3 列的元素值</param>
	///<returns type="Matrix3">返回新的3x3矩阵</returns>
	set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 3 ] = n12; te[ 6 ] = n13;
		te[ 1 ] = n21; te[ 4 ] = n22; te[ 7 ] = n23;
		te[ 2 ] = n31; te[ 5 ] = n32; te[ 8 ] = n33;

		return this;	//返回新的3x3矩阵

	},

	/*
	///identity方法用来获得一个3x3矩阵的单位矩阵
	///
	/// NOTE:在矩阵的乘法中，有一种矩阵起着特殊的作用，如同数的乘法中的1,我们称这种矩阵为单位矩阵
	/// 	 它是个方阵，从左上角到右下角的对角线（称为主对角线）上的元素均为1以外全都为0。
	/// 	 对于单位矩阵，有AE=EA=A
	*/
	///<summary>identity</summary>
	///<returns type="Matrix3(3x3矩阵)">返回3x3矩阵的一个单位矩阵</returns>	
	identity: function () {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;	//返回3x3矩阵的一个单位矩阵

	},

	/*
	///copy方法用来复制3x3矩阵的元素值.并返回新的Matrix3(3x3矩阵).
	*/
	///<summary>copy</summary>
	///<param name ="m" type="Matrix3(3x3矩阵)">Euler(4x4矩阵)</param>
	///<returns type="Matrix3(3x3矩阵)">返回新的Matrix3(3x3矩阵)</returns>	
	copy: function ( m ) {

		var me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ],
			me[ 1 ], me[ 4 ], me[ 7 ],
			me[ 2 ], me[ 5 ], me[ 8 ]

		);

		return this;	//返回新的Matrix3(3x3矩阵)

	},

	/*
	///multiplyVector3方法用来将3x3矩阵和一个Vector3(三维向量)相乘.并返回新的3x3矩阵.
	/// NOTE:multiplyVector3方法已经被删除使用vector.applyMatrix3( matrix )方法替换,这里保留是为了向下兼容.
	/// NOTE:multiplyVector3方法经常用来应用某种变换.
	*/
	///<summary>multiplyVector3</summary>
	///<param name ="vector" type="Vector3">三维向量</param>
	///<returns type="Matrix3">并返回新的3x3矩阵</returns>
	multiplyVector3: function ( vector ) {

		//multiplyVector3方法已经被删除使用vector.applyMatrix3( matrix )方法替换
		console.warn( 'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.' );
		return vector.applyMatrix3( this );	//调用vector.applyMatrix3()方法,并将Matrix3对象本身传递过去,应用变换后,返回新的Matrix3(3x3矩阵)

	},

	/*
	///multiplyVector3Array方法用来将数组a和一个Vector3(三维向量)相乘.并返回新的数组对象.
	/// NOTE:multiplyVector3Array方法已经被删除使用matrix.applyToVector3Array( array )方法替换,这里保留是为了向下兼容.
	/// NOTE:multiplyVector3Array方法经常用来应用某种变换.
	*/
	///<summary>multiplyVector3Array</summary>
	///<param name ="a" type="Array">数组对象</param>
	///<returns type="Array">并返回新的数组对象</returns>
	multiplyVector3Array: function ( a ) {

		//multiplyVector3Array方法已经被删除使用matrix.applyToVector3Array( array )方法替换
		console.warn( 'THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
		return this.applyToVector3Array( a );	//调用matrix.applyToVector3Array()方法,并将Matrix3对象本身传递过去,应用变换后,返回新的Matrix3(3x3矩阵)

	},

	/*
	///applyToVector3Array方法用来将数组a和一个Vector3(三维向量)相乘.并返回新的数组对象.
	/// NOTE:applyToVector3Array方法经常用来应用某种变换.参数offset和参数length可以省略.
	*/
	///<summary>applyToVector3Array</summary>
	///<param name ="array" type="Array">数组对象</param>
	///<param name ="offset" type="Number">偏移量,可以省略,如果省略为0.</param>
	///<param name ="length" type="Number">长度,可以省略,如果省略值为数组长度</param>
	///<returns type="Array">并返回新的数组对象</returns>
	applyToVector3Array: function () {

		var v1 = new THREE.Vector3();

		return function ( array, offset, length ) {

			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = array.length;

			for ( var i = 0, j = offset, il; i < length; i += 3, j += 3 ) {

				v1.x = array[ j ];
				v1.y = array[ j + 1 ];
				v1.z = array[ j + 2 ];

				v1.applyMatrix3( this );	//调用vector.applyMatrix3()方法,并将Matrix3对象本身传递过去,应用变换后,返回新的Matrix3(3x3矩阵)

				array[ j ]     = v1.x;
				array[ j + 1 ] = v1.y;
				array[ j + 2 ] = v1.z;

			}

			return array;	//返回应用变换后的新数组对象.

		};

	}(),

	/*
	///multiplyScalar方法用来将Matrix3(3x3矩阵)的元素直接与参数s相乘.并返回新的Matrix3(3x3矩阵).
	/// NOTE:这里传递的参数s是一个标量.
	*/
	///<summary>multiplyScalar</summary>
	///<param name ="s" type="number">与当前Matrix3(3x3矩阵)对象的值相乘的标量,数值</param>
	///<returns type="Matrix3">返回新的Matrix3(3x3矩阵)</returns>
	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;		//返回新的Matrix3(3x3矩阵)

	},

	/*
	///determinant方法用来获得Matrix3(3x3矩阵)的行列式
	/// NOTE:通过求解行列式值的方式来判断矩阵的逆矩阵是否存在(行列式的值不等于0,表示该矩阵有逆矩阵).
	*/
	///<summary>determinant</summary>
	///<returns type="Number">返回Matrix3(3x3矩阵)的三阶行列式</returns>
	determinant: function () {

		var te = this.elements;

		var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;	//返回Matrix3(3x3矩阵)的三阶行列式

	},

	/*
	///getInverse方法用来获得Matrix3(3x3矩阵)的逆矩阵.
	/// NOTE:逆矩阵与当前矩阵相乘得到单位矩阵.
	*/
	///<summary>getInverse</summary>
	///<param name ="matrix" type="Matrix4">THREE.Matrix4</param>
	///<param name ="throwOnInvertible" type="Number">异常标志</param>
	///<returns type="Matrix3">返回Matrix3(3x3矩阵)的逆矩阵.</returns>
	getInverse: function ( matrix, throwOnInvertible ) {

		// input: THREE.Matrix4
		// 输入参数Matrix是一个4x4矩阵
		// ( based on http://code.google.com/p/webgl-mjs/ )

		var me = matrix.elements;
		var te = this.elements;

		te[ 0 ] =   me[ 10 ] * me[ 5 ] - me[ 6 ] * me[ 9 ];
		te[ 1 ] = - me[ 10 ] * me[ 1 ] + me[ 2 ] * me[ 9 ];
		te[ 2 ] =   me[ 6 ] * me[ 1 ] - me[ 2 ] * me[ 5 ];
		te[ 3 ] = - me[ 10 ] * me[ 4 ] + me[ 6 ] * me[ 8 ];
		te[ 4 ] =   me[ 10 ] * me[ 0 ] - me[ 2 ] * me[ 8 ];
		te[ 5 ] = - me[ 6 ] * me[ 0 ] + me[ 2 ] * me[ 4 ];
		te[ 6 ] =   me[ 9 ] * me[ 4 ] - me[ 5 ] * me[ 8 ];
		te[ 7 ] = - me[ 9 ] * me[ 0 ] + me[ 1 ] * me[ 8 ];
		te[ 8 ] =   me[ 5 ] * me[ 0 ] - me[ 1 ] * me[ 4 ];

		var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ]; 	//获得参数matrix行列式的值

		// no inverses
		// 没有逆矩阵

		if ( det === 0 ) {

			var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";	//提示用户该矩阵没有逆矩阵

			if ( throwOnInvertible || false ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			this.identity();	//获得一个单位矩阵

			return this;	//返回单位矩阵

		}

		this.multiplyScalar( 1.0 / det );	//除以行列式得到逆矩阵

		return this;	//返回Matrix3(3x3矩阵)的逆矩阵.

	},

	/*
	///transpose方法用来获得Matrix3(3x3矩阵)的转置矩阵.
	/// NOTE:一个mxn的矩阵的转置矩阵式nxm矩阵,就是矩阵的行和列交换.
	/// 	例如:
	///			 
	///				--     -- 		--     -- T
	///				| 1 2 3 |		| 1 4 7 |
	///	matrix A =	| 4 5 6 |  = 	| 2 5 8 |
	///				| 7 8 9 |		| 3 6 9 |
	///				--     --		--     --
	*/
	///<summary>transpose</summary>
	///<returns type="Matrix3">返回Matrix3(3x3矩阵)的转置矩阵.</returns>
	transpose: function () {

		var tmp, m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;	//返回Matrix3(3x3矩阵)的转置矩阵.

	},

	/*
	///flattenToArrayOffset方法通过参数offset指定偏移量,将矩阵展开到数组(参数array)中,返回新的数组.
	/// NOTE:flattenToArrayOffset方法可以用在将3x3矩阵变换成4x4矩阵中.
	///				--     --
	///				| 1 2 3 |
	///	matrix A =	| 4 5 6 |  => flattenToArrayOffset(arrary,3) => array(0,0,0,0,1,2,3,0,0,0,0,4,5,6,0,0,0,0,7,8,9)
	///				| 7 8 9 |
	///				--     --
	*/
	///<summary>flattenToArrayOffset</summary>
	///<param name ="array" type="Array">Array数组对象</param>
	///<param name ="offset" type="Number">偏移量</param>
	///<returns type="Matrix3">返回包含矩阵元素的数组</returns>
	flattenToArrayOffset: function ( array, offset ) {

		var te = this.elements;

		array[ offset     ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ] = te[ 8 ];

		return array;	//返回包含矩阵元素的数组

	},

	/*
	///getNormalMatrix方法用来获得Matrix4(4x4矩阵)的正规矩阵.
	/// NOTE:当前矩阵的逆矩阵的转置矩阵就是当前矩阵的正规矩阵.
	*/
	///<summary>getNormalMatrix</summary>
	///<param name ="m" type="Matrix4">THREE.Matrix4</param>
	///<returns type="Matrix3">参数m的正规矩阵.</returns>
	getNormalMatrix: function ( m ) {

		// input: THREE.Matrix4
		// 输入是一个Matrix4(4x4矩阵)对象

		this.getInverse( m ).transpose();	//当前矩阵的逆矩阵的转置矩阵就是当前矩阵的正规矩阵

		return this;	//参数m的正规矩阵

	},

	/*
	///transposeIntoArray方法用来将当前矩阵的转置矩阵存储到一个数组中.然后返回数组.
	/// NOTE:transposeIntoArray方法有点多余,matrix对象本身就是一个数组呀.
	*/
	///<summary>transposeIntoArray</summary>
	///<param name ="r" type="Array">THREE.Matrix4</param>
	///<returns type="Matrix3">参数m的转置矩阵.</returns>
	transposeIntoArray: function ( r ) {

		var m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		//TODO:返回的为啥是this?
		return this;	//参数m的转置矩阵	

	},

	/*fromArray方法
	///fromArray方法将存储Matrix3(3x3矩阵)元素值的数组赋值给当前Matrix3(3x3矩阵)对象
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">Matrix3(3x3矩阵)元素值的数组array</param>
	///<returns type="Matrix3">返回新的Matrix3(3x3矩阵)</returns>	
	fromArray: function ( array ) {

		this.elements.set( array );		//调用set方法,将数组赋值给当前Matrix3(3x3矩阵)对象

		return this;	//返回新的Matrix3(3x3矩阵)

	},

	/*toArray方法
	///toArray方法将当前Matrix3(3x3矩阵)的元素值赋值给数组array.返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">返回含有Matrix3(3x3矩阵)元素值的数组array</returns>	
	toArray: function () {

		var te = this.elements;

		return [
			te[ 0 ], te[ 1 ], te[ 2 ],
			te[ 3 ], te[ 4 ], te[ 5 ],
			te[ 6 ], te[ 7 ], te[ 8 ]
		];										//返回含有Matrix3(3x3矩阵)元素值的数组array

	},

	/*clone方法
	///clone方法克隆一个Matrix3(3x3矩阵)对象.
	*/
	///<summary>clone</summary>
	///<returns type="Vector3">返回克隆的Matrix3(3x3矩阵)对象</returns>	
	clone: function () {

		var te = this.elements;

		return new THREE.Matrix3(

			te[ 0 ], te[ 3 ], te[ 6 ],
			te[ 1 ], te[ 4 ], te[ 7 ],
			te[ 2 ], te[ 5 ], te[ 8 ]

		);			//返回克隆的Matrix3(3x3矩阵)对象

	}

};
