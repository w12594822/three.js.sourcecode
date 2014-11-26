/**
 * @author mrdoob / http://mrdoob.com/
 */
/*
///BufferAttribute类用来存储于bufferGeometry相关联的属性数据,更多细节可以参考官方的样例http://threejs.org/
/// 这个类用来存储内置属性例如顶点位置,法线,颜色,等,但也可以用于存储bufferGeometry对象的自定义属性.
///BufferAttribute对象的功能函数采用定义构造的函数原型对象来实现.
/// TODO:增加一个基类setAttr(index,item,itemSize)根据跟多不同的属性相长度设置属性
///
*/
///<summary>BufferAttribute</summary>
///<param name ="array" type="Array">属性数组</param>
///<param name ="itemSize" type="number">属性相长度</param>
///<returns type="BufferAttribute">返回新的属性数组</returns>
THREE.BufferAttribute = function ( array, itemSize ) {

	this.array = array;		//BufferAttribute的array属性
	this.itemSize = itemSize;	//BufferAttribute的itemSize属性

};

/****************************************
****下面是BufferAttribute对象提供的功能函数.
****************************************/
THREE.BufferAttribute.prototype = {

	constructor: THREE.BufferAttribute,		//构造器,返回对创建此对象BufferAttribute函数的引用.

	/*
	///get length 方法用来获取BufferAttribute的数组长度
	///NOTE: get length()BufferAttribute.prototype.length(),这种用法在除ie浏览器以外的浏览器上可以使用.
	*/
	///<summary>get length</summary>
	///<returns type="number">返回BufferAttribute的数组长度</returns>
	get length () {	

		return this.array.length;	//返回BufferAttribute的数组长度

	},

	/*
	///set方法用来重新设置BufferAttribute的属性数组
	*/
	///<summary>set</summary>
	///<param name ="value" type="Array">属性数组</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	set: function ( value ) {

		this.array.set( value );	

		return this;	//返回新的BufferAttribute属性对象

	},

	/*
	///setX方法用来重新设置含有3个属性相的BufferAttribute属性数组的第一个分量
	/// NOTE:setX方法中,属性数组的长度是属性相的长度乘以属性的个数.比如要存放100个点的坐标,坐标有3个属性相,那么属性数组的长度是300,如果想改变第30个点的x坐标就将index设为30
	*/
	///<summary>setX</summary>
	///<param name ="index" type="Number">属性数组的索引</param>
	///<param name ="x" type="Number">属性数组的第一个分量</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	setX: function ( index, x ) {

		this.array[ index * this.itemSize ] = x;

		return this;	//返回新的BufferAttribute属性对象

	},

	/*
	///setY方法用来重新设置含有3个属性相的BufferAttribute属性数组的第二个分量
	/// NOTE:setY方法中,属性数组的长度是属性相的长度乘以属性的个数.比如要存放100个点的坐标,坐标有3个属性相,那么属性数组的长度是300,如果想改变第30个点的Y坐标就将index设为30
	*/
	///<summary>setY</summary>
	///<param name ="index" type="Number">属性数组的索引</param>
	///<param name ="y" type="Number">属性数组的第一个分量</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	setY: function ( index, y ) {

		this.array[ index * this.itemSize + 1 ] = y;

		return this;	//返回新的BufferAttribute属性对象

	},

	/*
	///setZ方法用来重新设置含有3个属性相的BufferAttribute属性数组的第三个分量
	/// NOTE:setY方法中,属性数组的长度是属性相的长度乘以属性的个数.比如要存放100个点的坐标,坐标有3个属性相,那么属性数组的长度是300,如果想改变第30个点的Z坐标就将index设为30
	*/
	///<summary>setZ</summary>
	///<param name ="index" type="Number">属性数组的索引</param>
	///<param name ="z" type="Number">属性数组的第一个分量</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	setZ: function ( index, z ) {

		this.array[ index * this.itemSize + 2 ] = z;

		return this;	//返回新的BufferAttribute属性对象

	},

	/*
	///setXY方法用来重新设置含有3个属性相的BufferAttribute属性数组的第一个和第二个分量
	/// NOTE:setXY方法中,属性数组的长度是属性相的长度乘以属性的个数.比如要存放100个点的坐标,坐标有3个属性相,那么属性数组的长度是300,如果想改变第30个点的x,y坐标就将index设为30
	*/
	///<summary>setXY</summary>
	///<param name ="index" type="Number">属性数组的索引</param>
	///<param name ="x" type="Number">属性数组的第一个分量</param>
	///<param name ="y" type="Number">属性数组的第二个分量</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	setXY: function ( index, x, y ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;

		return this;	//返回新的BufferAttribute属性对象

	},

	/*
	///setXYZ方法用来重新设置含有3个属性相的BufferAttribute属性数组的第一个,第二个和第三个分量
	/// NOTE:setXY方法中,属性数组的长度是属性相的长度乘以属性的个数.比如要存放100个点的坐标,坐标有3个属性相,那么属性数组的长度是300,如果想改变第30个点的x,y,z坐标就将index设为30
	*/
	///<summary>setXYZ</summary>
	///<param name ="index" type="Number">属性数组的索引</param>
	///<param name ="x" type="Number">属性数组的第一个分量</param>
	///<param name ="y" type="Number">属性数组的第二个分量</param>
	///<param name ="z" type="Number">属性数组的第三个分量</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	setXYZ: function ( index, x, y, z ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;

		return this;	//返回新的BufferAttribute属性对象

	},

	/*
	///setXYZW方法用来重新设置含有3个属性相的BufferAttribute属性数组的第一个,第二个和第三个,第四个分量
	/// NOTE:setXYZW方法中,属性数组的长度是属性相的长度乘以属性的个数.比如要存放100个点的坐标,坐标有4个属性相,那么属性数组的长度是400,如果想改变第30个点的x,y,z,w坐标就将index设为30
	*/
	///<summary>setXYZW</summary>
	///<param name ="index" type="Number">属性数组的索引</param>
	///<param name ="x" type="Number">属性数组的第一个分量</param>
	///<param name ="y" type="Number">属性数组的第二个分量</param>
	///<param name ="z" type="Number">属性数组的第三个分量</param>
	///<param name ="w" type="Number">属性数组的第四个分量</param>
	///<returns type="BufferAttribute">返回新的BufferAttribute属性对象</returns>
	setXYZW: function ( index, x, y, z, w ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
		this.array[ index + 3 ] = w;

		return this;	//返回新的BufferAttribute属性对象

	}

};


/**********************************************************************************
****下面这些方法是定义不同数据类型的属性,已经在新版本中删除,这里保留是为了向后兼容.
***********************************************************************************/
THREE.Int8Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint8Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint8ClampedAttribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );


};

THREE.Int16Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint16Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Int32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Float32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Float64Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};
