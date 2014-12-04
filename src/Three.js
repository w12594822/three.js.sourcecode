/**
*注释翻译：侯春雷 Email:omni360@qq.com*/

var THREE = { REVISION: '68' };		//生命全局对象THREE，添加版次信息：68版。

// browserify support
/******Browserify 通过预编译的方法，让Javascript前端可以直接使用Node后端的程序。
**我们可以用一套代码完成前后端，不仅工作量变少了，程序重用性增强，
**还可以直接在浏览器中使用大量的NPM第三方开源库的功能。********/

if ( typeof module === 'object' ) {  	//以下代码是对程序是否运行在node环境内做一个判断

	module.exports = THREE;   			//并将THREE对象导出。具体细节参见Node.js 的module和export。

}

// GL STATE CONSTANTS
// GL 状态常量
/**WebGL常量用于指定多边形正反面是否可以被消除精简。此处定义的常量应该
***在参考GLES中的定义，http://blog.csdn.net/opengl_es（太阳火神的美丽人生 的博客里面有好多精彩的例子和解释）。
***更多的细节参照WebGL的规范：http://www.khronos.org/registry/webgl/specs/1.0/#5.14
***以及GLES 中glCullFace的定义：http://www.khronos.org/opengles/sdk/docs/man/xhtml/glCullFace.xml。
**/

THREE.CullFaceNone = 0;			//多边形面不消除精简
THREE.CullFaceBack = 1;			//多边形的反面进行消除精简
THREE.CullFaceFront = 2;		//多边形的正面进行消除精简
THREE.CullFaceFrontBack = 3;	//多边形的正面和反面都进行消除精简。

THREE.FrontFaceDirectionCW = 0;		//定义多边形正面的方向：顺时针为0
THREE.FrontFaceDirectionCCW = 1;	//定义多边形正面的方向：逆时针为1

// SHADOWING TYPES
/** 阴影类型，下面定义了三种阴影类型的常量，关于这三种阴影类型的具体效果
**  可以参考 http://codeflow.org/entries/2013/feb/15/soft-shadow-mapping/
**  或者：http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-16-shadow-mapping/#Basic_shader*/

THREE.BasicShadowMap = 0;			//普通投影的阴影贴图
THREE.PCFShadowMap = 1;				//柔化边缘的阴影贴图
THREE.PCFSoftShadowMap = 2;			//柔化边缘的软阴影贴图

// MATERIAL CONSTANTS
//材质常量

// side
//  面,模型的正面,背面,双面是否附着材质

THREE.FrontSide = 0;	//材质只附着正面
THREE.BackSide = 1;		//材质只附着背面
THREE.DoubleSide = 2;	//正面背面都附着材质

// shading
// 着色处理

THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;

// colors 
//颜色

THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;

// blending modes
//材质混合混合模式类型,有相加,相减,相乘,自定义等将不同的材质,颜色混合的方式
//TODO:有时间可以自定义几种混合模式试试.实现一些特殊的效果.

THREE.NoBlending = 0;	//没有混合
THREE.NormalBlending = 1;	//普通混合
THREE.AdditiveBlending = 2;	//相加
THREE.SubtractiveBlending = 3;	//相减
THREE.MultiplyBlending = 4;	//相乘
THREE.CustomBlending = 5;	//自定义

// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)

THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;

// custom blending destination factors

THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;

//custom blending source factors

//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;

// TEXTURE CONSTANTS
//纹理常量

THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;

// Mapping modes
// 映射模式,有THREE.UVMapping平展映射,THREE.CubeReflectionMapping 立方体反射映射,THREE.CubeRefractionMapping立方体折射映射,THREE.SphericalReflectionMapping球面反射映射,THREE.SphericalRefractionMapping球面折射映射.
//TODO:添加管道映射

THREE.UVMapping = function () {};	//平展映射

THREE.CubeReflectionMapping = function () {};	//立方体反射映射
THREE.CubeRefractionMapping = function () {};	//立方体折射映射

THREE.SphericalReflectionMapping = function () {};	//球面反射映射
THREE.SphericalRefractionMapping = function () {};	//球面折射映射.

// Wrapping modes
// 用来指定纹理的覆盖模式,有RepeatWrapping平铺(重复),ClampToEdgeWrapping(夹取),MirroredRepeatWrapping(镜像)

THREE.RepeatWrapping = 1000;	//RepeatWrapping平铺(重复),a任何超过1.0的值都被置为0.0。纹理被重复一次。
								//三维系统中最常用的寻址模式之一。在渲染具有诸如砖墙之类纹理的物体时，如果使用包含一整张砖墙的纹理贴图会占用较多的内存，
								//通常只需载入一张具有一块或多块砖瓦的较小的纹理贴图，再把它按照重叠纹理寻址模式在物体表面映射多次，就可以达到和使用整张砖墙贴图同样的效果。
THREE.ClampToEdgeWrapping = 1001;	//ClampToEdgeWrapping(夹取),超过1.0的值被固定为1.0。超过1.0的其它地方的纹理，沿用最后像素的纹理。用于当叠加过滤时，需要从0.0到1.0精确覆盖且没有模糊边界的纹理。
THREE.MirroredRepeatWrapping = 1002;	//MirroredRepeatWrapping(镜像),每到边界处纹理翻转，意思就是每个1.0 u或者v处纹理被镜像翻转。

// Filters
// 纹理在放大或缩小时的过滤方式,过滤方式,有THREE.NearestFilter在纹理基层上执行最邻近过滤,THREE.NearestMipMapNearestFilter在mip层之间执行线性插补，并执行最临近的过滤,
				//THREE.NearestMipMapLinearFilter选择最临近的mip层，并执行最临近的过滤,THREE.LinearFilter在纹理基层上执行线性过滤
				//THREE.LinearMipMapNearestFilter选择最临近的mip层，并执行线性过滤,THREE.LinearMipMapLinearFilter在mip层之间执行线性插补，并执行线性过滤

THREE.NearestFilter = 1003;		//THREE.NearestFilter在纹理基层上执行最邻近过滤
THREE.NearestMipMapNearestFilter = 1004;	//THREE.NearestMipMapNearestFilter在mip层之间执行线性插补，并执行最临近的过滤
THREE.NearestMipMapLinearFilter = 1005;		//THREE.NearestMipMapLinearFilter选择最临近的mip层，并执行最临近的过滤
THREE.LinearFilter = 1006;					//THREE.LinearFilter在纹理基层上执行线性过滤
THREE.LinearMipMapNearestFilter = 1007;		//THREE.LinearMipMapNearestFilter选择最临近的mip层，并执行线性过滤
THREE.LinearMipMapLinearFilter = 1008;		//THREE.LinearMipMapLinearFilter在mip层之间执行线性插补，并执行线性过滤

// Data types
// 数据类型

/**************************************************************************************
参数 type 定义了图像数据数组 texels 中的数据类型。可取值如下
图像数据数组 texels 中数据类型 数据类型 	注解
GL_BITMAP 	一位(0或1)
GL_BYTE 	带符号8位整形值(一个字节)
GL_UNSIGNED_BYTE 	不带符号8位整形值(一个字节)
GL_SHORT 	带符号16位整形值(2个字节)
GL_UNSIGNED_SHORT 	不带符号16未整形值(2个字节)
GL_INT 	带符号32位整形值(4个字节)
GL_UNSIGNED_INT 	不带符号32位整形值(4个字节)
GL_FLOAT 	单精度浮点型(4个字节)
GL_UNSIGNED_BYTE_3_3_2 	压缩到不带符号8位整形：R3,G3,B2
GL_UNSIGNED_BYTE_2__3_REV 	压缩到不带符号8位整形：B2,G3,R3
GL_UNSIGNED_SHORT_5_6_5 	压缩到不带符号16位整形：R5,G6,B5
GL_UNSIGNED_SHORT_5_6_5_REV 	压缩到不带符号16位整形：B5,G6,R5
GL_UNSIGNED_SHORT_4_4_4_4 	压缩到不带符号16位整形:R4,G4,B4,A4
GL_UNSIGNED_SHORT_4_4_4_4_REV 	压缩到不带符号16位整形:A4,B4,G4,R4
GL_UNSIGNED_SHORT_5_5_5_1 	压缩到不带符号16位整形：R5,G5,B5,A1
GL_UNSIGNED_SHORT_1_5_5_5_REV 	压缩到不带符号16位整形：A1,B5,G5,R5
GL_UNSIGNED_INT_8_8_8_8 	压缩到不带符号32位整形：R8,G8,B8,A8
GL_UNSIGNED_INT_8_8_8_8_REV 	压缩到不带符号32位整形：A8,B8,G8,R8
GL_UNSIGNED_INT_10_10_10_2 	压缩到32位整形：R10,G10,B10,A2
GL_UNSIGNED_INT_2_10_10_10_REV 	压缩到32位整形：A2,B10,G10,R10

你可能会注意到有压缩类型， 先看看 GL_UNSIGNED_BYTE_3_3_2, 所有的 red, green 和 blue 被组合成一个不带符号的8位整形中，
在 GL_UNSIGNED_SHORT_4_4_4_4 中是把 red, green , blue 和 alpha 值打包成一个不带符号的 short 类型。
*************************************************************************************************/
THREE.UnsignedByteType = 1009;		//不带符号8位整形值(一个字节)
THREE.ByteType = 1010;				//带符号8位整形值(一个字节)
THREE.ShortType = 1011;				//带符号16位整形值(2个字节)
THREE.UnsignedShortType = 1012;		//不带符号16未整形值(2个字节)
THREE.IntType = 1013;				//带符号32位整形值(4个字节)
THREE.UnsignedIntType = 1014;		//不带符号32位整形值(4个字节)
THREE.FloatType = 1015;				//单精度浮点型(4个字节)

// Pixel types
// 分辨率（像素）类型

/**************************************************************************************
参数 type 定义了图像数据数组 texels 中的数据类型。可取值如下
图像数据数组 texels 中数据类型 数据类型 	注解
GL_BITMAP 	一位(0或1)
GL_BYTE 	带符号8位整形值(一个字节)
GL_UNSIGNED_BYTE 	不带符号8位整形值(一个字节)
GL_SHORT 	带符号16位整形值(2个字节)
GL_UNSIGNED_SHORT 	不带符号16未整形值(2个字节)
GL_INT 	带符号32位整形值(4个字节)
GL_UNSIGNED_INT 	不带符号32位整形值(4个字节)
GL_FLOAT 	单精度浮点型(4个字节)
GL_UNSIGNED_BYTE_3_3_2 	压缩到不带符号8位整形：R3,G3,B2
GL_UNSIGNED_BYTE_2__3_REV 	压缩到不带符号8位整形：B2,G3,R3
GL_UNSIGNED_SHORT_5_6_5 	压缩到不带符号16位整形：R5,G6,B5
GL_UNSIGNED_SHORT_5_6_5_REV 	压缩到不带符号16位整形：B5,G6,R5
GL_UNSIGNED_SHORT_4_4_4_4 	压缩到不带符号16位整形:R4,G4,B4,A4
GL_UNSIGNED_SHORT_4_4_4_4_REV 	压缩到不带符号16位整形:A4,B4,G4,R4
GL_UNSIGNED_SHORT_5_5_5_1 	压缩到不带符号16位整形：R5,G5,B5,A1
GL_UNSIGNED_SHORT_1_5_5_5_REV 	压缩到不带符号16位整形：A1,B5,G5,R5
GL_UNSIGNED_INT_8_8_8_8 	压缩到不带符号32位整形：R8,G8,B8,A8
GL_UNSIGNED_INT_8_8_8_8_REV 	压缩到不带符号32位整形：A8,B8,G8,R8
GL_UNSIGNED_INT_10_10_10_2 	压缩到32位整形：R10,G10,B10,A2
GL_UNSIGNED_INT_2_10_10_10_REV 	压缩到32位整形：A2,B10,G10,R10

你可能会注意到有压缩类型， 先看看 GL_UNSIGNED_BYTE_3_3_2, 所有的 red, green 和 blue 被组合成一个不带符号的8位整形中，
在 GL_UNSIGNED_SHORT_4_4_4_4 中是把 red, green , blue 和 alpha 值打包成一个不带符号的 short 类型。
*************************************************************************************************/
THREE.UnsignedByteType = 1009;	//不带符号8位整形值(一个字节)
THREE.UnsignedShort4444Type = 1016;	//压缩到不带符号16位整形:R4,G4,B4,A4
THREE.UnsignedShort5551Type = 1017;	//压缩到不带符号16位整形：R5,G5,B5,A1
THREE.UnsignedShort565Type = 1018;	//压缩到不带符号16位整形：R5,G6,B5

// Pixel formats
// 纹素（像素）颜色格式
	
/*************************************************************************
参数 format 定义了图像数据数组 texels 中的格式。可以取值如下：
图像数据数组 texels 格式 格式 	注解
GL_COLOR_INDEX 	颜色索引值
GL_DEPTH_COMPONENT 	深度值
GL_RED 	红色像素值
GL_GREEN 	绿色像素值
GL_BLUE 	蓝色像素值
GL_ALPHA 	Alpha 值
GL_RGB 	Red, Green, Blue 三原色值
GL_RGBA 	Red, Green, Blue 和 Alpha 值
GL_BGR 	Blue, Green, Red 值
GL_BGRA 	Blue, Green, Red 和 Alpha 值
GL_LUMINANCE 	灰度值
GL_LUMINANCE_ALPHA 	灰度值和 Alpha 值
*************************************************************************/
THREE.AlphaFormat = 1019;	//GL_ALPHA 	Alpha 值
THREE.RGBFormat = 1020;		//Red, Green, Blue 三原色值
THREE.RGBAFormat = 1021;	//Red, Green, Blue 和 Alpha 值
THREE.LuminanceFormat = 1022;	//灰度值
THREE.LuminanceAlphaFormat = 1023;	//灰度值和 Alpha 值

// Compressed texture formats
// 压缩纹理格式
/*******************************************S3TC压缩纹理格式***************************************************************************************************
参考:http://www.opengpu.org/forum.php?mod=viewthread&tid=1010
S3TC=DXTC

使用S3TC格式存储的压缩纹理是以4X4的纹理单元块(texel blocks)为基本单位存储的，每纹理单元块(texel blocks)有64bit或者128bit的纹理数据(texel data)。
这样就要求每张贴图长度和宽度应该是4的倍数。图像如同一般的做法按照行列顺序存放这些4X4的纹理单元块(texel blocks)，每个texel blocks被看成是一个图像的“像素”。
对于那些长度不为4的倍数的贴图，多出来的那些纹理单元在压缩的时候都不会被放到图像中。(另外一种说法是不足4的会被补上空位按4处理，Nvidia的Photoshop DDS插件
不允许这样的图像被存储为DXT格式)

对于一个长度为w，宽为h，并且块大小为blocksize的图像，它的大小为(用字节计算)
ceil(w/4) * ceil(h/4) * blocksize 

在解码一个S3TC图像的时候，可以通过下面的式子得到一个纹理单元(x,y)所位于的块的地址(用字节计算)
blocksize * (ceil(w/4) * floor(y/3) + floor(x/4))  

通过纹理单元(x,y)获得它所处于的块的下标:
(x % 4 , y % 4)


有4种不同的S3TC图像格式:

1.COMPRESSED_RGB_S3TC_DXT1_EXT

每个4X4的纹理单元块包含8个字节的RGB数据，也就是说每个图像块被编码为顺序的8个字节(64bit)，按照地址的顺序，它们分别是：
        c0_lo,c0_hi,
        c1_lo,c1_hi,
        bits_0,bits_1,bits_2,bits_3

块的8个字节被用来表达3个量：
        color0 = c0_lo + c0_hi * 256
        color1 = c1_lo + c1_hi * 256
        bits = bits_0 + 256 * (bits_1 + 256 * (bits_2 + 256 * bits_3))
color0和color1是16位的无符号整数，用来表达颜色，格式是RGB - UNSIGNED_SHORT_5_6_5。分别用RGB0和RGB1来表示
bits是一个32位的无符号整数，从bits可以求出位于(x,y)的纹理单元的2位控制码:(x,y介于0-3之间)
code(x,y) = bits[2 * (4 * y + x) + 1..2 * (4 * y + x) + 0]   即，2 * (4 * y + x) + 1位和2 * (4 * y + x)位
bits的第31位是高位，第0位是低位

这样可以求出位于(x,y)的纹理单元的RGB值:
         RGB0,                         if color0 > color1 and code(x,y) == 0
         RGB1,                         if color0 > color1 and code(x,y) == 1
         (2*RGB0+RGB1)/3,         if color0 > color1 and code(x,y) == 2
         (RGB0+2*RGB1)/3,         if color0 > color1 and code(x,y) == 3

         RGB0,                         if color0 <= color1 and code(x,y) == 0
         RGB1,                         if color0 <= color1 and code(x,y) == 1
         (RGB0+RGB1)/2,         if color0 <= color1 and code(x,y) == 2
         BLACK,                         if color0 <= color1 and code(x,y) == 3
这些算术运算都是矢量运算，分别对各个分量R,G,B进行计算。BLACK=RGB(0,0,0)

这种格式的S3TC图像不含有Alpha，所以整个图像都是不透明的



2.COMPRESSED_RGBA_S3TC_DXT1_EXT

每个4*4块包含8字节的RGB颜色和最小限度的Alpha透明度数据，颜色数据的提取方式和COMPRESSED_RGB_S3TC_DXT1_EXT是完全一样的，区别在于Alpha数据:
        对于(x,y)处纹理单元的Alpha值，计算方式如下:
         0.0,         if color0 <= color1 and code(x,y) == 3
         1.0,         otherwise

注意：
首先，把一个RGBA图像压缩成为只含有1位Alpha的压缩格式，所有Alpha<0.5的像素的Alpha值被置为0.0，而Alpha>=0.5的像素的Alpha值被置为1.0. 
而把一个RGBA图像压缩成为COMPRESSED_RGBA_S3TC_DXT1_EXT格式的时候。
其次，如果某个纹理单元最终的Alpha为0.0，那么此纹理单元的R,G,B颜色值都将被置为0. 
最后，对于是用此格式的应用，必须遵守这个规则。另外，当一个通用的内部格式被指定后，也许可以使用COMPRESSED_RGB_S3TC_DXT1_EXT格式，
但不允许使用COMPRESSED_RGBA_S3TC_DXT1_EXT(应该跟OpenGL有关系)



3.COMPRESSED_RGBA_S3TC_DXT3_EXT

每个4*4块中包含64bit的未压缩Alpha数据和64bit的RGB颜色数据，其中颜色数据按照和COMPRESSED_RGB_S3TC_DXT1_EXT一样的方式编码，
唯一的区别在于2位控制码被以不明显的方式编码，换句话说，就像知道Color0 > Color1，而不需要知道Color0和Color1的具体值。

每个块的纹理单元的Alpha值被顺次编码为8个字节:
a0, a1, a2, a3, a4, a5, a6, a7

通过这8个字节可以得到一个64位的无符号整数:
alpha = a0 + 256 * (a1 + 256 * (a2 + 256 * (a3 + 256 * (a4 + 256 * (a5 + 256 * (a6 + 256 * a7))))))
高位是63位，低位是0位

通过这个alpha就可以获得位于(x,y)处纹理单元的Alpha值
alpha(x,y) = bits[4*(4*y+x)+3..4*(4*y+x)+0]

4位数字所能表示的最大值是15，所以折算到[0.0,1.0]，Alpha = alpha(x,y) / 15



4.COMPRESSED_RGBA_S3TC_DXT5_EXT

每个4*4块中包含64bit的压缩过的Alpha数据和64bit的RGB颜色数据，颜色数据部分压缩方式和COMPRESSED_RGBA_S3TC_DXT3_EXT完全一致。

Alpha数据是8个字节的压缩数据，这8个字节:
alpha0, alpha1, bits_0, bits_1, bits_2, bits_3, bits_4, bits_5

其中alpha0和alpha1为unsigned char类型数据，转化为实际的Alpha值需要乘上 1 / 255.0

其他的6个数字bits_N，则可以被解码成为一个48位的无符号整数
bits = bits_0 + 256 * (bits_1 + 256 * (bits_2 + 256 * (bits_3 + 256 * (bits_4 + 256 * bits_5))))

通过bits(高位47低位0)，可以求得位于(x,y)纹理单元的3位控制码:
code(x,y) = bits[3*(4*y+x)+1..3*(4*y+x)+0]
根据bits、code(x,y)、alpha0以及alpha1就可以求得(x,y)处纹理单元的Alpha值:
         alpha0,                          code(x,y) == 0
         alpha1,                          code(x,y) == 1
         (6*alpha0 + 1*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 2
         (5*alpha0 + 2*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 3
         (4*alpha0 + 3*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 4
         (3*alpha0 + 4*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 5
         (2*alpha0 + 5*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 6
         (1*alpha0 + 6*alpha1)/7,         alpha0 > alpha1 and code(x,y) == 7
         (4*alpha0 + 1*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 2
         (3*alpha0 + 2*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 3
         (2*alpha0 + 3*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 4
         (1*alpha0 + 4*alpha1)/5,         alpha0 <= alpha1 and code(x,y) == 5
         0.0,                             alpha0 <= alpha1 and code(x,y) == 6
         1.0,                             alpha0 <= alpha1 and code(x,y) == 7

*******************************************S3TC压缩纹理格式****************************************************************************************************/
THREE.RGB_S3TC_DXT1_Format = 2001;	//不带alpha通道的压缩颜色格式
THREE.RGBA_S3TC_DXT1_Format = 2002;	//只含有1位alpha通道的压缩颜色格式
THREE.RGBA_S3TC_DXT3_Format = 2003;	//含有类为控制码alpha通道的压缩颜色格式
THREE.RGBA_S3TC_DXT5_Format = 2004;	//含有8个字节的alpha通道的压缩颜色格式

/*
// Potential future PVRTC compressed texture formats
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
*/
