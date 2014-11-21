// File:src/math/Color.js

/**
 * @author mrdoob / http://mrdoob.com/
 */
/*color构造方法
@color 参数为一个rgb颜色值 rgb(256,256,256) 或者一个0x开头的6位16进制颜色值(0xaabbff);
*/

THREE.Color = function ( color ) {

	if ( arguments.length === 3 ) {	//当传递参数为rgb颜色值时

		return this.setRGB( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] );	//设置rgb颜色值

	}

	return this.set( color )	//设置16进制颜色值

};

THREE.Color.prototype = {

	constructor: THREE.Color,	//构造器,返回对创建此对象Color函数的引用.

	r: 1, g: 1, b: 1,	//初始化属性（颜色值）r,g,b为1
	/*set 方法
	///颜色对象内置的set方法，将16进制颜色值，rgb颜色值，颜色对象复制给当前实例。
	*/
	///<summary>set</summary>
	///<param name ="value" type="Color(颜色对象)" type="number(16进制颜色值）" type="string(rgb颜色值)">颜色</param>
	///<returns type="Color">返回颜色对象</returns>
	set: function ( value ) {

		if ( value instanceof THREE.Color ) {	//如果参数value是THREE.Color的实例化对象

			this.copy( value );		//调用THREE.copy方法,复制value对象

		} else if ( typeof value === 'number' ) {	//如果参数value的类型为number

			this.setHex( value );	//调用setHex方法,设置16进制颜色值

		} else if ( typeof value === 'string' ) {	//如果参数value的类型为string

			this.setStyle( value );	//调用setStyle方法,设置rgb颜色值

		}

		return this;	//返回颜色对象

	},
	/*setHex方法
	///setHex方法用于设置16进制颜色值给当前实例
	///更多关于hex颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	*/
	///<summary>setHex</summary>
	///<param name ="hex" type="number(16进制颜色值0xffddff）">16进制数值0xffddff</param>
	///<returns type="Color">返回颜色对象</returns>
	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255; //将左边两位16进制数值变换成rgb颜色值对应的red，并赋值给属性Color.r。
		this.g = ( hex >> 8 & 255 ) / 255;  //将中间两位16进制数值变换成rgb颜色值对应的green，并赋值给属性Color.g。
		this.b = ( hex & 255 ) / 255;	    //将右边两位16进制数值变换成rgb颜色值对应的blue，并赋值给属性Color.b。

		return this;	//返回颜色对象

	},

	/*setRGB方法
	///setRGB方法用于设置rgb(255,255,255)颜色值给当前实例
	///更多关于rgb颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E4%B8%89%E5%8E%9F%E8%89%B2%E5%85%89%E6%A8%A1%E5%BC%8F
	///或 http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	*/
	///<summary>setRGB</summary>
	///<param name ="r" type="number(0-255）">red(0-255)红色</param>
	///<param name ="g" type="number(0-255）">green(0-255)绿色</param>
	///<param name ="b" type="number(0-255）">blue(0-255)蓝色</param>
	///<returns type="Color">返回颜色对象</returns>

	setRGB: function ( r, g, b ) {

		this.r = r;	//将参数r赋值给Color.r
		this.g = g;	//将参数r赋值给Color.g
		this.b = b;	//将参数r赋值给Color.b

		return this; //返回颜色对象

	},

	/*setHSL方法
	///HSL颜色HSL和HSV都是一种将RGB色彩模型中的点在圆柱坐标系中的表示法。这两种表示法试图做到比RGB基于笛卡尔
	///坐标系的几何结构更加直观.HSL即色相、饱和度、亮度（英语：Hue, Saturation, Lightness）
	///
	/// 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、绿色、蓝色等将360度的一个圆环平分成3分，0(360),120,240，取值范围是0-360，本库将区间设置为0.0-1.0。
	/// 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值，输入时为0.0-1.0.
	/// 明度（V），亮度（L），取0-100%，输入时为0.0-1.0.
	///
	///更多关于hsl颜色的内容参考维基百科, http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
	///或者 http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	///setHSL方法用于设置 hsl(360,1.0,0.5)颜色值给当前实例
	*/
	///<summary>setHSL</summary>
	///<param name ="h" type="number(0.0-1.0）">hue(0.0-1.0)色相</param>
	///<param name ="s" type="number(0.0-1.0）">saturation(0.0-1.0)饱和度</param>
	///<param name ="l" type="number(0.0-1.0）">lightness(0.0-1.0)亮度</param>
	///<returns type="Color">返回颜色对象</returns>

	setHSL: function ( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0
		//h,s,l 取值范围是 0.0 - 1.0

		if ( s === 0 ) {	//如果s=0,表示灰色,

			this.r = this.g = this.b = l;	//定义rgb都为l.

		} else {	//否则测试l的值

			//定义一个方法hue2rgb,将hsl颜色转换成rgb颜色值,根据第三个参数计算rgb的值。
			//更多关于hsl颜色模型和hsl转换成rgb方面的内容
			//参考下面的实例或者查看维基百科。
			var hue2rgb = function ( p, q, t ) {		

				if ( t < 0 ) t += 1;	//设置t在1.0的取值范围内
				if ( t > 1 ) t -= 1;	//设置t在1.0的取值范围内
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;	//如果t的值小于1/6,返回color对应的rgb属性值.
				if ( t < 1 / 2 ) return q;		//如果t的值小于1/2,返回color对应的rgb属性值.
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );		//如果t的值小于2/3,返回color对应的rgb属性值.
				return p;		//返回color对应的rgb属性值.

			};

			//如果l<=0.5，p=l*(1+s),否则p等于l+s-(l*s);
			/*实例1：
			 	hsl(0.3333,0.3,0.4),
			 	p = l <= 0.5 ? l * ( 1 + s ) = 0.4 * (1 + 0.3) = 0.52,
			 	q = ( 2 * l ) - p = (2 * 0.4) - 0.52 = 0.28

			 	this.r = hue2rgb(q,p,h + 1/3) = hue2rgb(0.52,0.28,0.6666) = 
			 		[if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t )] = 
			 		0.28 +(0.52 - 0.28) *6 *( 2/3 - 0.6666333333333333) = 0.2800048

				this.g = hue2rgb(q,p,h) = hue2rgb(0.52,0.28,0.3333) = 
					[if ( t < 1 / 2 ) return q] = 0.52

				this.b = hue2rgb(q,p,h - 1/3) = hue2rgb(0.52,0.28,-0.000333) =
					[return p] = 0.28

				因此rgb(0.2800048 * 255，0.52 * 255，0.28 * 255)  = rgb(71,132,71)
																  = hex(0x478447)
			*/

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s ); 
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this; //返回颜色对象。

	},

	/*setStyle方法
	///setStyle方法用于通过参数style传递不同的rgb颜色值表示类型给当前实例,列出了以下5种样式，分别是：
	///		rgb(255,0,0)	数值型
	///		rgb(100%,0%,0%)	百分比型
	///		#ff0000 		6位16进制型
	///		#f00 			3位16进制型
	///		red 			颜色名
	///		
	///
	///更多关于rgb颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E4%B8%89%E5%8E%9F%E8%89%B2%E5%85%89%E6%A8%A1%E5%BC%8F
	///或 http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	*/
	///<summary>setStyle</summary>
	///<param name ="style" type="string">style</param>
	///<returns type="Color">返回颜色对象</returns>
	setStyle: function ( style ) {

		// rgb(255,0,0)
		// 
		//将我们平常习惯的颜色值表达形式rgb(255,0,0)-数值型，转换成THREE.JS认识的形式0.0-1.0，
		//这里将取值范围从0-255换算成0.0-1.0.

		if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为数值型rgb(255,0,0)

			var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。

			this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.r
			this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.g
			this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.b

			return this; //返回颜色对象。

		}

		// rgb(100%,0%,0%)
		//将我们平常习惯的颜色值表达形式rgb(100%,0%,0%)-百分比型，转换成THREE.JS认识的形式0.0-1.0，
		//这里将取值范围从0%-100%换算成0.0-1.0.

		if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为百分比型rgb(100%,0%,0%)

			var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。

			this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.r
			this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.g
			this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.b

			return this; //返回颜色对象。

		}

		// #ff0000
		//将我们平常习惯的颜色值表达形式#ff0000-6位16进制型，转换成THREE.JS认识的形式0.0-1.0，
		//这里将取值范围从00-ff换算成0.0-1.0.
		
		if ( /^\#([0-9a-f]{6})$/i.test( style ) ) {		//用正则表达式检查当前传递的颜色值表达样式是否为6位16进制型 #ff0000

			var color = /^\#([0-9a-f]{6})$/i.exec( style );		//将字符串中的数值赋值给color，color是一个数组。

			this.setHex( parseInt( color[ 1 ], 16 ) );	//将数组中的第2个元素转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b

			return this; //返回颜色对象。

		}

		// #f00
		//将我们平常习惯的颜色值表达形式#f00-3位16进制型，转换成THREE.JS认识的形式0.0-1.0，
		//这里将取值范围从0-f换算成0.0-1.0.
		
		if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为3位16进制型 #f00

			var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。

			this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );	//将数组中的第2，3,4个元素*2，转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b

			return this; //返回颜色对象。

		}

		// red
		//将我们平常习惯的颜色值表达形式red颜色名，转换成THREE.JS认识的形式0.0-1.0，
		//这里将颜色名换算成0.0-1.0.

		if ( /^(\w+)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为颜色名，即参数style中是否只是字符串没有数字。

			this.setHex( THREE.ColorKeywords[ style ] );	//将字符串作为THREE.ColorKeywords对象的属性名，取出与该属性名相对应的16进制的属性值.调用setHex 方法，将16进制的属性值赋值给Color.r,Color.g,Color.b

			return this;	//返回颜色对象。

		}


	},

	/*copy方法
	///copy方法用于赋值颜色属性给当前实例
	*/
	///<summary>copy</summary>
	///<param name ="color" type="THREE.Color">color</param>
	///<returns type="Color">返回颜色对象</returns>
	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;	//返回颜色对象。

	},


	/****************************************
	****下面函数用于对色彩的Gamma 曲线调整，对色彩进行补偿之类的吧，
	****使图形图像色彩更加的绚丽，不至于失真。
	****更多专业知识求大神补充。
	****************************************/

	/*copyGammaToLinear方法
	///copyGammaToLinear方法用于将color的rgb值分别平方，赋给调用者对象
	*/
	///<summary>copyGammaToLinear</summary>
	///<param name ="color" type="THREE.Color">color</param>
	///<returns type="Color">返回颜色对象</returns>
	copyGammaToLinear: function ( color ) {

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;	//返回颜色对象。

	},

	/*copyLinearToGamma方法
	///copyLinearToGamma方法用于将color的rgb值分别开方，赋给调用者对象
	*/
	///<summary>copyLinearToGamma</summary>
	///<param name ="color" type="THREE.Color">color</param>
	///<returns type="Color">返回颜色对象</returns>
	copyLinearToGamma: function ( color ) {

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;	//返回颜色对象。

	},

	/*convertGammaToLinear方法
	///convertGammaToLinear方法对调用者自身的rgb值平方。
	*/
	///<summary>convertGammaToLinear</summary>
	///<returns type="Color">返回颜色对象</returns>
	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	/*convertGammaToLinear方法
	///convertGammaToLinear方法对调用者自身的rgb值开方。
	*/
	///<summary>convertGammaToLinear</summary>
	///<returns type="Color">返回颜色对象</returns>
	///
	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	/*getHex方法
	///getHex方法用于获得16进制颜色值并返回16进制int型颜色值
	///更多关于hex颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	*/
	///<summary>getHex</summary>
	///<returns type="number">返回16进制数值</returns>
	getHex: function () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	},

	/*getHexString方法
	///getHexString方法用于获得16进制颜色值并返回string型颜色值
	///更多关于hex颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	*/
	///<summary>getHexString</summary>
	///<returns type="number">返回string型颜色值</returns>
	getHexString: function () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	},

	/*getHSL方法
	///HSL颜色HSL和HSV都是一种将RGB色彩模型中的点在圆柱坐标系中的表示法。这两种表示法试图做到比RGB基于笛卡尔
	///坐标系的几何结构更加直观.HSL即色相、饱和度、亮度（英语：Hue, Saturation, Lightness）
	///
	/// 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、绿色、蓝色等将360度的一个圆环平分成3分，0(360),120,240，取值范围是0-360，本库将区间设置为0.0-1.0。
	/// 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值，输入时为0.0-1.0.
	/// 明度（V），亮度（L），取0-100%，输入时为0.0-1.0.
	///
	///更多关于hsl颜色的内容参考维基百科, http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
	///或者 http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	///getHSL方法用于获得 hsl(360,1.0,0.5)颜色值并返回hsl(360,1.0,0.5)样式的int型颜色值
	*/
	///<summary>getHSL</summary>
	///<param name ="optionalTarget" type="Object{ h: 0, s: 0, l: 0 }">可选的目标值</param>
	///<returns name="hsl" type="Object{ h: 0, s: 0, l: 0 }">返回hsl(360,1.0,0.5)样式的int型颜色值</returns>
	getHSL: function ( optionalTarget ) {

		// h,s,l ranges are in 0.0 - 1.0
		//h,s,l 取值范围是 0.0 - 1.0

		//创建对象hsl，将可选参数optionalTarget赋值给hsl，如果没有可选参数optionalTarget，
		//将hsl初始化为{ h: 0, s: 0, l: 0 };
		var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

		var r = this.r, g = this.g, b = this.b; //创建变量r,g,b分别将color对象属性rgb复制给新建变量rgb

		var max = Math.max( r, g, b );	//创建变量max并将rgb中最大值赋值给变量max
		var min = Math.min( r, g, b );	//创建变量min并将rgb中最小值赋值给变量min

		var hue, saturation;	//声明两个变量，hue，stturation
		var lightness = ( min + max ) / 2.0;	//创建变量lightness，将min+max的一半赋值给lightness

		if ( min === max ) {	//如果最大值等于最小值 
			//hue和saturation等于0.就是色相和饱和度等于0,当前颜色就是灰色.
			hue = 0;	//色相
			saturation = 0;	//饱和度

		} else {

			var delta = max - min;	//创建变量delta = max-min

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min ); //根据亮度的大小做判断,得出饱和度.

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;		//根据最大值得出hue色相的值.
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;	//得出数值除以6.

		}

		hsl.h = hue;			//设置hsl.h的值等于hue
		hsl.s = saturation;		//设置hsl.s的值等于saturation
		hsl.l = lightness;		//设置hsl.l的值等于lightness

		return hsl; //返回hsl格式的颜色值.

	},

	/*getStyle方法
	///getStyle方法用于获得一个rgb(255,0,0)	数值型的颜色值：
	///		rgb(255,0,0)	数值型
	///
	///TODO:在这里,是不是可以添加其他的几种样式呢?
	///
	///		rgb(100%,0%,0%)	百分比型
	///		#ff0000 		6位16进制型
	///		#f00 			3位16进制型
	///		red 			颜色名
	///		
	///
	///更多关于rgb颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E4%B8%89%E5%8E%9F%E8%89%B2%E5%85%89%E6%A8%A1%E5%BC%8F
	///或 http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
	*/
	///<summary>getStyle</summary>
	///<returns type="String">返回String类型的rgb(255,0,0)	数值型颜色值</returns>
	getStyle: function () {

		//这里因为THREE.JS的取值范围是0.0 -1.0,所以乘以255,返回给我们习惯的rgb(255,0,0)	数值型的颜色值.
		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	},


	/****************************************
	****下面函数用于对颜色的计算.
	****************************************/

	/*offsetHSL方法
	///offsetHSL方法将当前颜色按照传递的参数(h,s,l)对颜色值进行偏移.
	*/
	///<summary>offsetHSL</summary>
	///<param name ="h" type="number(0.0-1.0）">hue(0.0-1.0)色相</param>
	///<param name ="s" type="number(0.0-1.0）">saturation(0.0-1.0)饱和度</param>
	///<param name ="l" type="number(0.0-1.0）">lightness(0.0-1.0)亮度</param>
	///<returns type="Color">返回颜色对象</returns>	
	offsetHSL: function ( h, s, l ) {

		var hsl = this.getHSL();	//获得当前对象的颜色值赋值给对象hsl

		hsl.h += h; hsl.s += s; hsl.l += l;		//对hsl中的属性分别进行赋值.

		this.setHSL( hsl.h, hsl.s, hsl.l );		//将最新的数值赋值给当前颜色对象.

		return this;		//返回颜色对象

	},

	/*add方法
	///add方法将当前颜色与传递参数(color)进行相加,返回颜色对象.
	*/
	///<summary>add</summary>
	///<param name ="color" type="THREE.Color">颜色值{r:"",g:"",b:""}</param>
	///<returns type="Color">返回颜色对象</returns>	
	add: function ( color ) {

		this.r += color.r;	
		this.g += color.g;
		this.b += color.b;

		return this;	//返回颜色对象

	},

	/*addColors方法
	///addColors方法将传递参数(color1,color2)进行相加然后赋值给当前颜色,返回颜色对象.
	*/
	///<summary>addColors</summary>
	///<param name ="color1" type="THREE.Color">颜色值{r:"",g:"",b:""}</param>
	///<param name ="color2" type="THREE.Color">颜色值{r:"",g:"",b:""}</param>
	///<returns type="Color">返回颜色对象</returns>	
	addColors: function ( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;	//返回颜色对象

	},

	/*addScalar方法
	///addScalar方法将当前颜色的rgb值与传递参数(s)进行相加,返回颜色对象.
	*/
	///<summary>addScalar</summary>
	///<param name ="s" type="number">标量,取值范围 0.0 - color.r[g][b] <= s <= 1.0 - color.r[g][b] </param>
	///<returns type="Color">返回颜色对象</returns>	
	addScalar: function ( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;	//返回颜色对象

	},

	/*multiply方法
	///multiply方法将当前颜色与传递参数(color)进行相乘,返回颜色对象.
	*/
	///<summary>multiply</summary>
	///<param name ="color" type="THREE.Color">颜色值{r:"",g:"",b:""}</param>
	///<returns type="Color">返回颜色对象</returns>	
	multiply: function ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;	//返回颜色对象

	},

	/*multiplyScalar方法
	///multiplyScalar方法将当前颜色的rgb值与传递参数(s)进行相乘,返回颜色对象.
	*/
	///<summary>multiplyScalar</summary>
	///<param name ="s" type="number">标量,取值范围 0.0 / color.r[g][b] <= s <= 1.0 / color.r[g][b] </param>
	///<returns type="Color">返回颜色对象</returns>	
	multiplyScalar: function ( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;	//返回颜色对象

	},

	/*lerp方法
	///lerp方法将当前颜色this.r[g][b]设置为下限和上限参数color.r[g][b] 之间进行线性插值，
	/// alpha 表示权值。从下限this.r[g][b]到上限color.r[g][b]乘以百分比alpha(0.0-1.0),加上当前颜色
	///this.r[g][b] 的和设置给当前颜色对象,返回颜色对象.
	///注意，如果 this.r[g][b] 和 color.r[g][b]是向量，则权值 alpha 必须是标量取值范围是0.0-1.0.
	*/
	///<summary>lerp</summary>
	///<param name ="color" type="THREE.Color">颜色值{r:"",g:"",b:""}</param>
	///<param name ="alpha" type="number">百分比权值(0.0-1.0)</param>
	///<returns type="Color">返回颜色对象</returns>	
	lerp: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha; 	//从下限this.r到上限color.r乘以百分比alpha(0.0-1.0),加上当前颜色this.r的和设置给当前颜色对象
		this.g += ( color.g - this.g ) * alpha;		//从下限this.g到上限color.g乘以百分比alpha(0.0-1.0),加上当前颜色this.g的和设置给当前颜色对象
		this.b += ( color.b - this.b ) * alpha;		//从下限this.b到上限color.b乘以百分比alpha(0.0-1.0),加上当前颜色this.b的和设置给当前颜色对象

		return this;	//返回颜色对象

	},

	/*equals方法
	///equals方法相当于比较运算符===,将当前颜色和参数c中的rgb值进行对比,返回bool型值.
	*/
	///<summary>equals</summary>
	///<param name ="c" type="THREE.Color">颜色值{r:"",g:"",b:""}</param>
	///<returns type="bool">返回true or false</returns>	
	equals: function ( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );	//将当前颜色和参数c中的rgb值进行对比,返回bool型值.

	},

	/*fromArray方法
	///fromArray方法将存储颜色值的数组赋值给当前颜色对象
	*/
	///<summary>fromArray</summary>
	///<param name ="array" type="Array">颜色值数组array[0.5,0.5,0.5]</param>
	///<returns type="Color">返回颜色对象</returns>	
	fromArray: function ( array ) {

		this.r = array[ 0 ];
		this.g = array[ 1 ];
		this.b = array[ 2 ];

		return this;	//返回颜色对象

	},

	/*toArray方法
	///toArray方法将当前颜色对象的属性赋值给数组array[0.5,0.5,0.5].返回一个数组对象.
	*/
	///<summary>toArray</summary>
	///<returns type="Array">颜色值数组array[0.5,0.5,0.5]</returns>	
	toArray: function () {

		return [ this.r, this.g, this.b ];	//颜色值数组array[0.5,0.5,0.5]

	},

	/*clone方法
	///clone方法克隆一个颜色对象.
	*/
	///<summary>clone</summary>
	///<returns type="THREE.Color">返回颜色对象</returns>	
	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );	//返回颜色对象

	}

};


/*ColorKeywords对象
///ColorKeywords对象将存储常用的颜色名和其对应的16进制颜色值.
///供用户直接使用.
*/
THREE.ColorKeywords = { 
		'aliceblue': 0xF0F8FF,
		 'antiquewhite': 0xFAEBD7,
		 'aqua': 0x00FFFF,
		 'aquamarine': 0x7FFFD4,
		 'azure': 0xF0FFFF,

		'beige': 0xF5F5DC,
		 'bisque': 0xFFE4C4,
		 'black': 0x000000,
		 'blanchedalmond': 0xFFEBCD,
		 'blue': 0x0000FF,
		 'blueviolet': 0x8A2BE2,

		'brown': 0xA52A2A,
		 'burlywood': 0xDEB887,
		 'cadetblue': 0x5F9EA0,
		 'chartreuse': 0x7FFF00,
		 'chocolate': 0xD2691E,
		 'coral': 0xFF7F50,

		'cornflowerblue': 0x6495ED,
		 'cornsilk': 0xFFF8DC,
		 'crimson': 0xDC143C,
		 'cyan': 0x00FFFF,
		 'darkblue': 0x00008B,
		 'darkcyan': 0x008B8B,

		'darkgoldenrod': 0xB8860B,
		 'darkgray': 0xA9A9A9,
		 'darkgreen': 0x006400,
		 'darkgrey': 0xA9A9A9,
		 'darkkhaki': 0xBDB76B,
		 'darkmagenta': 0x8B008B,

		'darkolivegreen': 0x556B2F,
		 'darkorange': 0xFF8C00,
		 'darkorchid': 0x9932CC,
		 'darkred': 0x8B0000,
		 'darksalmon': 0xE9967A,
		 'darkseagreen': 0x8FBC8F,

		'darkslateblue': 0x483D8B,
		 'darkslategray': 0x2F4F4F,
		 'darkslategrey': 0x2F4F4F,
		 'darkturquoise': 0x00CED1,
		 'darkviolet': 0x9400D3,

		'deeppink': 0xFF1493,
		 'deepskyblue': 0x00BFFF,
		 'dimgray': 0x696969,
		 'dimgrey': 0x696969,
		 'dodgerblue': 0x1E90FF,
		 'firebrick': 0xB22222,

		'floralwhite': 0xFFFAF0,
		 'forestgreen': 0x228B22,
		 'fuchsia': 0xFF00FF,
		 'gainsboro': 0xDCDCDC,
		 'ghostwhite': 0xF8F8FF,
		 'gold': 0xFFD700,

		'goldenrod': 0xDAA520,
		 'gray': 0x808080,
		 'green': 0x008000,
		 'greenyellow': 0xADFF2F,
		 'grey': 0x808080,
		 'honeydew': 0xF0FFF0,
		 'hotpink': 0xFF69B4,

		'indianred': 0xCD5C5C,
		 'indigo': 0x4B0082,
		 'ivory': 0xFFFFF0,
		 'khaki': 0xF0E68C,
		 'lavender': 0xE6E6FA,
		 'lavenderblush': 0xFFF0F5,
		 'lawngreen': 0x7CFC00,

		'lemonchiffon': 0xFFFACD,
		 'lightblue': 0xADD8E6,
		 'lightcoral': 0xF08080,
		 'lightcyan': 0xE0FFFF,
		 'lightgoldenrodyellow': 0xFAFAD2,
		 'lightgray': 0xD3D3D3,

		'lightgreen': 0x90EE90,
		 'lightgrey': 0xD3D3D3,
		 'lightpink': 0xFFB6C1,
		 'lightsalmon': 0xFFA07A,
		 'lightseagreen': 0x20B2AA,
		 'lightskyblue': 0x87CEFA,

		'lightslategray': 0x778899,
		 'lightslategrey': 0x778899,
		 'lightsteelblue': 0xB0C4DE,
		 'lightyellow': 0xFFFFE0,
		 'lime': 0x00FF00,
		 'limegreen': 0x32CD32,

		'linen': 0xFAF0E6,
		 'magenta': 0xFF00FF,
		 'maroon': 0x800000,
		 'mediumaquamarine': 0x66CDAA,
		 'mediumblue': 0x0000CD,
		 'mediumorchid': 0xBA55D3,

		'mediumpurple': 0x9370DB,
		 'mediumseagreen': 0x3CB371,
		 'mediumslateblue': 0x7B68EE,
		 'mediumspringgreen': 0x00FA9A,
		 'mediumturquoise': 0x48D1CC,

		'mediumvioletred': 0xC71585,
		 'midnightblue': 0x191970,
		 'mintcream': 0xF5FFFA,
		 'mistyrose': 0xFFE4E1,
		 'moccasin': 0xFFE4B5,
		 'navajowhite': 0xFFDEAD,

		'navy': 0x000080,
		 'oldlace': 0xFDF5E6,
		 'olive': 0x808000,
		 'olivedrab': 0x6B8E23,
		 'orange': 0xFFA500,
		 'orangered': 0xFF4500,
		 'orchid': 0xDA70D6,

		'palegoldenrod': 0xEEE8AA,
		 'palegreen': 0x98FB98,
		 'paleturquoise': 0xAFEEEE,
		 'palevioletred': 0xDB7093,
		 'papayawhip': 0xFFEFD5,
		 'peachpuff': 0xFFDAB9,

		'peru': 0xCD853F,
		 'pink': 0xFFC0CB,
		 'plum': 0xDDA0DD,
		 'powderblue': 0xB0E0E6,
		 'purple': 0x800080,
		 'red': 0xFF0000,
		 'rosybrown': 0xBC8F8F,

		'royalblue': 0x4169E1,
		 'saddlebrown': 0x8B4513,
		 'salmon': 0xFA8072,
		 'sandybrown': 0xF4A460,
		 'seagreen': 0x2E8B57,
		 'seashell': 0xFFF5EE,

		'sienna': 0xA0522D,
		 'silver': 0xC0C0C0,
		 'skyblue': 0x87CEEB,
		 'slateblue': 0x6A5ACD,
		 'slategray': 0x708090,
		 'slategrey': 0x708090,
		 'snow': 0xFFFAFA,

		'springgreen': 0x00FF7F,
		 'steelblue': 0x4682B4,
		 'tan': 0xD2B48C,
		 'teal': 0x008080,
		 'thistle': 0xD8BFD8,
		 'tomato': 0xFF6347,
		 'turquoise': 0x40E0D0,

		'violet': 0xEE82EE,
		 'wheat': 0xF5DEB3,
		 'white': 0xFFFFFF,
		 'whitesmoke': 0xF5F5F5,
		 'yellow': 0xFFFF00,
		 'yellowgreen': 0x9ACD32
		  };

