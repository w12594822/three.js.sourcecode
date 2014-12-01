/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	this.id = THREE.TextureIdCount ++;		//纹理属性id
	this.uuid = THREE.Math.generateUUID();	//纹理uuid(通用唯一标识码)属性

	this.name = '';		//纹理名称属性,可有可无

	this.image = image !== undefined ? image : THREE.Texture.DEFAULT_IMAGE;		//纹理的图片,最重要的属性是image，这是一个JavaScript Image类型对象。

	/* 
		Mipmap
	    在三维世界中,显示一张图的大小与摄象机的位置有关,近的地方,图片实际象素就大一些,远的地方图片实际象
	   素就会小一些,就要进行一些压缩,例如一张64*64的图,在近处,显示出来可能是50*50,在远处可能显示出来是20*20.
       如果只限于简单的支掉某些像素,将会使缩小后的图片损失很多细节,图片变得很粗糙,因此,图形学有很多复杂的方
       法来处理缩小图片的问题,使得缩小后的图片依然清晰,然而,这些计算都会耗费一定的时间.

       Mipmap纹理技术是目前解决纹理分辨率与视点距离关系的最有效途径,它会先将图片压缩成很多逐渐缩小的图片,
       例如一张64*64的图片,会产生64*64,32*32,16*16,8*8,4*4,2*2,1*1的7张图片,当屏幕上需要绘制像素点为20*20 时，
       程序只是利用 32*32 和 16*16 这两张图片来计算出即将显示为 20*20 大小的一个图片，这比单独利用 32*32 的
       那张原始片计算出来的图片效果要好得多，速度也更快.

       参考:http://zh.wikipedia.org/wiki/Mipmap
       参考:http://staff.cs.psu.ac.th/iew/cs344-481/p1-williams.pdf
       参考:http://blog.csdn.net/linber214/article/details/3342051
    */

	this.mipmaps = []; //存放mipmaps的属性数组


	this.mapping = mapping !== undefined ? mapping : THREE.Texture.DEFAULT_MAPPING;	//映射模式,有THREE.UVMapping平展映射,THREE.CubeReflectionMapping 立方体反射映射,THREE.CubeRefractionMapping立方体折射映射,THREE.SphericalReflectionMapping球面反射映射,THREE.SphericalRefractionMapping球面折射映射.
	//关于纹理s方向,t方向参考http://blog.csdn.net/kylaoshu364/article/details/5608851
	this.wrapS = wrapS !== undefined ? wrapS : THREE.ClampToEdgeWrapping; //S方向覆盖模式,默认为THREE.ClampToEdgeWrapping,(夹取),超过1.0的值被固定为1.0。超过1.0的其它地方的纹理，沿用最后像素的纹理。用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理。
																		  //还有THREE.RepeatWrapping(重复)和THREE.MirroredRepeatWrapping(镜像)
	this.wrapT = wrapT !== undefined ? wrapT : THREE.ClampToEdgeWrapping; //T方向覆盖模式,默认为THREE.ClampToEdgeWrapping,(夹取),超过1.0的值被固定为1.0。超过1.0的其它地方的纹理，沿用最后像素的纹理。用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理。
																		  //还有THREE.RepeatWrapping(重复)和THREE.MirroredRepeatWrapping(镜像)

    /*
    	纹素
			纹素（英语：Texel，即texture element或texture pixel的合成字）是纹理元素的简称，它是计算机图形纹理空间中的基本单元[1]。如同图像是由像素排列而成，纹理是由纹素排列表示的。
		纹素可以由图像范围来定义，其范围可以通过一些简单的方法来获取，比如阀值。沃罗诺伊分布可以用来描述纹素之间的空间关系。这就意味着我们可以通过将纹素与其周围的纹素图心的连线的垂直平分线将整个纹理分割成连续的多边形。结果就是每一个纹素图心都会有一个沃罗诺伊多边形将其圈起来。
		在对三维表面铺设纹理的时候，通过纹理映射技术将纹素映射到恰当的输出图像像素上。在当今的计算机上，这个过程主要是由图形卡完成的。
		纹理工序起始于空间中的某一位置。这个位置可以是在世界坐标系中，但是一般情况下会设定在物体坐标系中。这样纹理会随着物体运动。然后通过投射的方式将其位置（坐标）从三维矢量值转化为0到1范围的二维矢量值（即uv）。再将这个二维矢量值与纹理的分辨率相乘从而获得纹素的位置。
		当所需纹素的位置不是整数的时候，需要使用纹理滤镜进行处理。

	// 纹理在放大或缩小时的过滤方式,过滤方式,有THREE.NearestFilter在纹理基层上执行最邻近过滤,THREE.NearestMipMapNearestFilter在mip层之间执行线性插补，并执行最临近的过滤,
		//THREE.NearestMipMapLinearFilter选择最临近的mip层，并执行最临近的过滤,THREE.LinearFilter在纹理基层上执行线性过滤
		//THREE.LinearMipMapNearestFilter选择最临近的mip层，并执行线性过滤,THREE.LinearMipMapLinearFilter在mip层之间执行线性插补，并执行线性过滤

	参考:http://blog.csdn.net/kkk328/article/details/7055934
	参考:http://xiaxveliang.blog.163.com/blog/static/297080342013467552467/	

	*/

	this.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;	//纹理在放大时的过滤方式,THREE.LinearFilter在纹理基层上执行线性过滤
	this.minFilter = minFilter !== undefined ? minFilter : THREE.LinearMipMapLinearFilter;	//纹理在缩小时的过滤方式,THREE.LinearMipMapNearestFilter选择最临近的mip层，并执行线性过滤

	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

	this.format = format !== undefined ? format : THREE.RGBAFormat;
	this.type = type !== undefined ? type : THREE.UnsignedByteType;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.generateMipmaps = true;
	this.premultiplyAlpha = false;
	this.flipY = true;
	this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

	this._needsUpdate = false;
	this.onUpdate = null;

};

THREE.Texture.DEFAULT_IMAGE = undefined;
THREE.Texture.DEFAULT_MAPPING = new THREE.UVMapping();

THREE.Texture.prototype = {

	constructor: THREE.Texture,

	get needsUpdate () {

		return this._needsUpdate;

	},

	set needsUpdate ( value ) {

		if ( value === true ) this.update();

		this._needsUpdate = value;

	},

	/*clone方法
	///clone方法克隆一个四元数对象.
	*/
	///<summary>clone</summary>
	///<param name ="texture" type="Texture">接受结果的纹理对象</param>
	///<returns type="Quaternion">返回四元数对象</returns>	
	clone: function ( texture ) {

		if ( texture === undefined ) texture = new THREE.Texture();

		texture.image = this.image;
		texture.mipmaps = this.mipmaps.slice( 0 );

		texture.mapping = this.mapping;

		texture.wrapS = this.wrapS;
		texture.wrapT = this.wrapT;

		texture.magFilter = this.magFilter;
		texture.minFilter = this.minFilter;

		texture.anisotropy = this.anisotropy;

		texture.format = this.format;
		texture.type = this.type;

		texture.offset.copy( this.offset );
		texture.repeat.copy( this.repeat );

		texture.generateMipmaps = this.generateMipmaps;
		texture.premultiplyAlpha = this.premultiplyAlpha;
		texture.flipY = this.flipY;
		texture.unpackAlignment = this.unpackAlignment;

		return texture;

	},

	update: function () {

		this.dispatchEvent( { type: 'update' } );

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Texture.prototype );

THREE.TextureIdCount = 0;
