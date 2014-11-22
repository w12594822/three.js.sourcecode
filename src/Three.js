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
//  边

THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;

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
//混合模式

THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;

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
// 贴图模式

THREE.UVMapping = function () {};

THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};

THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};

// Wrapping modes
// 覆盖模式

THREE.RepeatWrapping = 1000;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;

// Filters
// 过滤器

THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;

// Data types
// 数据类型

THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;

// Pixel types
// 分辨率（像素）类型

//THREE.UnsignedByteType = 1009;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;

// Pixel formats
// 分辨率（像素）格式

THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;

// Compressed texture formats
// 压缩纹理格式

THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;

/*
// Potential future PVRTC compressed texture formats
THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;
*/
