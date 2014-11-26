/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://exocortex.com
 */
/*
///Geometry是场景中由顶点和三角面构成的几何体对象的基类,保存描述几何体所有必要的数据.Geometry对象的功能函数采用定义构造的函数原型对象来实现.
/// 用法:var geometry = new THREE.Geometry();
		 geometry.vertices.push( new THREE.Vector3( -10, 10, 0 ), 
			 new THREE.Vector3( -10, -10, 0 ),
			  new THREE.Vector3( 10, -10, 0 )
			  ); 
		 geometry.faces.push( new THREE.Face3( 0, 1, 2 ) ); 
		 geometry.computeBoundingSphere();
*/
///<summary>Geometry</summary>
THREE.Geometry = function () {

/****************************************
****下面是Geometry对象的属性定义
****************************************/
	this.id = THREE.GeometryIdCount ++;	//Geometry对象id属性.
	this.uuid = THREE.Math.generateUUID();	//调用THREE.Math.generateUUID()方法,Geometry对象uuid(通用唯一识别码)属性,

	this.name = '';		//Geometry对象name属性,可以为当前对象定义一个名称,初始化为''

	this.vertices = [];	//Geometry对象顶点位置存放在this.vertices属性中,该属性是一个数组,初始化为空数组.
						// NOTE: 若要更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true.
	this.colors = [];  // one-to-one vertex colors, used in Points and Line
						// 根据索引的顺序一对一的保存顶点颜色,用于点和线.
						// NOTE: 网格顶点的颜色存放在面里面.如果要更新this.colors属性需要将Geometry.colorsNeedUpdate设置为true.

	this.faces = [];	//将Geometry对象的三角面存放在this.faces属性中,该属性是一个数组,初始化为空数组.这个数组描述在模型中每个顶点式怎样彼此连接的.
						//如果要更新this.faces属性,需要将Geometry.elementsNeedUpdate 设置为true.

	this.faceVertexUvs = [ [] ];	//将Geometry对象的三角面的uv层存放在this.faceVertexUvs属性中,按照三角面的索引顺序,将三角面的顶点按照顶点在三角面中的索引顺序存放在数组中,这里是一个二维数组.
									//NOTE:如果要更新this.faceVertexUvs的值,需要将Geometry.uvsNeedUpdate属性设置为true

/*
///MorphTargets
///原文地址:http://www.tuicool.com/articles/rYzuuu
///先睹为快
///
///MorphTargets允许物体发生变形。如果该物体的geometry有 $n$ 个顶点，那么MorphTargets允许你再指定 $n$ 个， $2n$ 个， $3n$ 个甚至更多个顶点
///（比如，$ p\cdot n$ 个），同时mesh对象提供一个数组morphTargetInfluences（公式中$ f_{j} $表示morphTargetInfluences[j]），具有 $p$ 个元素，
///每个元素取值在0-1之间。渲染这个物体的时候，某个顶点 $V_{i}$ 的位置其实变了，成了:
///
///$$V_{i}=V_{i}+\sum_{j=0}^{p}f_{j}\cdot (V_{j,i}-V_{i})$$
///
///举个简单的例子，一个立方体有8个顶点， MorphTargets又指定了8个顶点，立方体的一个顶点为（1,1,1），而在 MorphTargets中与之对应的顶点为（2,2,2），
///那么当 morphTargetInfluences[0]为0.5的时候，实际渲染的时候该顶点的位置就成了（1.5,1.5,1.5）。这样做的好处是显而易见的，你可以通过简单地调整
/// morphTargetInfluences数组来使物体形变，只要之前你设置好了。
///
///向物体加入morphTargets的方法很简单：
///
///var geometry = new THREE.CubeGeometry(100,100,100);
///   var material = new THREE.MeshLambertMaterial({color:0xffffff, morphTargets:true});
///
///    var vertices = [];
///    for(var i=0; i<geometry.vertices.length; i++)
///    {
///       var f = 2;
///        vertices.push(geometry.vertices[i].clone());
///        vertices[i].x *= f;
///        vertices[i].y *= f;
///        vertices[i].z *= f;
///    }
///    geometry.morphTargets.push({name:'target0', vertices:vertices});
/// 在其他什么地方（比如animate()或render()方法中）改变morphTargetInfluences，实在方便
///
///var s = 0;
///function render()
///{
///    s += 0.03;
///    mesh.morphTargetInfluences[0] = Math.abs(Math.sin(s));
///    ...
///}
///最关键的问题是，我相信，这个功能是通过着色器来完成的。我阅读过一些简单的着色器，因此我发现在着色器中完成这件事实在太合适了。
///如果某个geometry有几千甚至上万个顶点，使用JavaScript逐个计算变形后顶点的位置会造成很大压力，而显卡大规模并行计算的能力很适合处理这个任务
///（毕竟每个顶点是独立地）。
 */


	this.morphTargets = [];		//变形顶点数组,每个变形顶点都是一个javascript对象.{ name: "targetName", vertices: [ new THREE.Vector3(), ... ] }
								//NOTE:变形的顶点数量和顺序与原定点的数量和顺序一致.
	this.morphColors = [];		//变形顶点的颜色数组也有和变形顶点数组类似的结构,每种颜色是一个javascript对象.morphColor = { name: "colorName", colors: [ new THREE.Color(), ... ] }
								//NOTE:变形顶点的颜色数量和顺序和面或面的顶点数量和顺序一致.
	this.morphNormals = [];		//变形法线向量数组也有和变形顶点数组类似的结构,每个法向量是javascript对象.morphNormal = { name: "NormalName", normals: [ new THREE.Vector3(), ... ] }

	this.skinWeights = [];		//蒙皮权重数组,和顶点数组的数量和顺序保持一致.
	this.skinIndices = [];		//蒙皮指数数组,和顶点数组的数量和顺序保持一致.

	this.lineDistances = [];	//这个数组包含将顶点按照索引顺序依次连线产生的几何线段的长度,这里需要LinePieces/LineDashedMaterial 正确被渲染,线的长度也可以通过computeLineDistances方法生成.
								//NOTE:如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true

	this.boundingBox = null;	//立方体界限,根据当前几何体生成的立方体界限
	this.boundingSphere = null;	//球体界限,根据当前几何体生成的球体界限

	this.hasTangents = false;	//调用geometry.computetangents方法,如果当前几何体有几何切线,设置为true.

	this.dynamic = true; // the intermediate typed arrays will be deleted when set to false
						 // 如果设置为false,属性数组的中间值将被删除.如果设置为true,属性缓存将实时改变,除非内部属性数组被送到GPU,对应的缓存被删除.

	// update flags
	// 更新标记.

	this.verticesNeedUpdate = false;		//如果已经更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true.默认为false
	this.elementsNeedUpdate = false;		//如果已经更新this.faces属性,需要将Geometry.elementsNeedUpdate 设置为true.默认为false
	this.uvsNeedUpdate = false;				//如果已经更新this.faceVertexUvs的值,需要将Geometry.uvsNeedUpdate属性设置为true.默认为false
	this.normalsNeedUpdate = false;			//如果三角面对象的法线向量数组已经更新,需要将Geometry.normalsNeedUpdate属性设置为true.默认为false
	this.tangentsNeedUpdate = false;		//如果三角面的顶点正切数组已经更新,需要将Geometry.tangentsNeedUpdate属性设置为true.默认为false
	this.colorsNeedUpdate = false;			//如果已经要更新this.colors属性,需要将Geometry.colorsNeedUpdate设置为true.默认为false
	this.lineDistancesNeedUpdate = false;	//如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true.默认为false

	this.buffersNeedUpdate = false;			//如果缓冲区需要更新,设置为true.
	this.groupsNeedUpdate = false;			//如果想组中添加删除对象,设置为true.

};

/****************************************
****下面是Geometry对象提供的功能函数.
****************************************/
THREE.Geometry.prototype = {

	constructor: THREE.Geometry,	//构造器,返回对创建此对象的Geometry函数的引用

	/*
	///applyMatrix方法对对象的vertices属性应用矩阵变换.达到旋转,缩放,移动的目的.
	///更新geometry中的所有顶点坐标和表面的法线向量，所做的实际上是用变换矩阵matrix对geometry形体进行空间变换。
	///normalMatrix是参数matrix左上角3×3矩阵的逆转置矩阵，该矩阵用来旋转矢量（法线，而不是顶点坐标）。
	*/
	///<summary>applyMatrix</summary>
	///<param name ="m" type="Matrix4">仿射矩阵</param>
	///<returns type="Geometry">返回新的Geometry对象</returns>
	applyMatrix: function ( matrix ) {

		var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );	//调用THREE.Matrix3().getNormalMatrix方法,获得规范化的matrix

		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {	//遍历vertices数组,

			var vertex = this.vertices[ i ];
			vertex.applyMatrix4( matrix );	//对每个顶点应用变换.

		}

		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {	//遍历faces数组,

			var face = this.faces[ i ];
			face.normal.applyMatrix3( normalMatrix ).normalize();

			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {	//遍历faces的vertexNormal数组,

				face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();	//对faces中的vertexNormal中的每个顶点应用变换.

			}

		}

		if ( this.boundingBox instanceof THREE.Box3 ) {

			this.computeBoundingBox();	//重新计算当前Geometry对象的立方体界限

		}

		if ( this.boundingSphere instanceof THREE.Sphere ) {

			this.computeBoundingSphere();	//重新计算当前Geometry对象的球体界限

		}

	},

	/*
	///center方法通过计算出当前Geometry对象的立方体界限的中心,获得当前对象的中心.
	*/
	///<summary>center</summary>
	///<returns type="Vector3">返回中心点坐标</returns>
	center: function () {

		this.computeBoundingBox();	//调用computeBoundingBox方法,获得当前Geometry对象的立方体界限

		var offset = new THREE.Vector3();

		offset.addVectors( this.boundingBox.min, this.boundingBox.max );	//
		offset.multiplyScalar( - 0.5 );	//计算出当前Geometry对象的立方体界限的中心

		this.applyMatrix( new THREE.Matrix4().makeTranslation( offset.x, offset.y, offset.z ) );	//调用applyMatrix方法,将对象中的每个顶点应用变换,改变相对新的中心点的顶点坐标
		this.computeBoundingBox();	//重新计算当前Geometry对象的立方体界限

		return offset;	//返回中心点坐标

	},

	/*
	///computeFaceNormals方法重新计算三角面对象的法线向量,计算法线向量，影响的是face数组中每个元素的normal属性，一个face只有1个
	*/
	///<summary>computeFaceNormals</summary>
	///<returns type="Vector3">返回重算法线向量后的几何体对象</returns>
	computeFaceNormals: function () {

		var cb = new THREE.Vector3(), ab = new THREE.Vector3();

		for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {	//遍历faces数组,

			var face = this.faces[ f ];

			var vA = this.vertices[ face.a ];
			var vB = this.vertices[ face.b ];
			var vC = this.vertices[ face.c ];

			cb.subVectors( vC, vB );	
			ab.subVectors( vA, vB );
			cb.cross( ab );	//返回叉积

			cb.normalize();	//规范化cb

			face.normal.copy( cb );	//一一重新设置face的法线向量

		}

	},

	/*
	///computeVertexNormals方法重新计算三角面对象顶点的法线向量,face数组中每个元素的vertexNormal属性，一个face3型对象有3个，一个face4型对象有4个，
	/// 但是需要注意的是，被多个表面共享的顶点，其法线向量只有一个，同时受到多个表面的影响。比如中心在原点，三组表面都垂直于轴的立方体，
	/// 其第一象限中的顶点，法线向量是(1,1,1)的归一化。虽然看上去不可思议，平面的顶点的法线居然不是垂直于平面的，但这种指定法线的方法
	/// 在利用平面模拟曲面的时候有很好的效果。
	///
	/// 定义:顶点法线（Vertex Normal）是过顶点的一个矢量，用于在高洛德着色（Gouraud Shading）中的计算光照和纹理效果。在生成曲面时，
	///		 通常令顶点法线和相邻平面的法线保持等角，如图1，这样进行渲染时，会在平面接缝处产生一种平滑过渡的效果。如果是多边形，
	///		 则令顶点法线等于该点所属平面（三角形）的法线，如图2，以便在接缝处产生突出的边缘。
	/// 
	/// 参考:http://en.wikipedia.org/wiki/Vertex_normal
	/// 参考:http://blog.csdn.net/sophistcxf/article/details/9095911
	/// 参考:http://www.cnblogs.com/flying_bat/archive/2007/10/13/923286.html
	*/
	///<summary>computeVertexNormals</summary>
	///<param name ="areaWeighted" type="Boolean">true表示face数组中的发现没有被计算,false或者忽略表示已经计算过了</param>
	///<returns type="Vector3">返回重算法线向量后的几何体对象</returns>
	computeVertexNormals: function ( areaWeighted ) {

		var v, vl, f, fl, face, vertices;

		vertices = new Array( this.vertices.length );

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ] = new THREE.Vector3();

		}

		if ( areaWeighted ) {	//face 的法线向量必须已经计算过了,如果没有,在这里计算.

			// vertex normals weighted by triangle areas
			// http://www.iquilezles.org/www/articles/normals/normals.htm

			var vA, vB, vC, vD;
			var cb = new THREE.Vector3(), ab = new THREE.Vector3(),
				db = new THREE.Vector3(), dc = new THREE.Vector3(), bc = new THREE.Vector3();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {
				//TODO: 可以直接调用computeFaceNormal()方法.
				face = this.faces[ f ];

				vA = this.vertices[ face.a ];
				vB = this.vertices[ face.b ];
				vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				vertices[ face.a ].add( cb );
				vertices[ face.b ].add( cb );
				vertices[ face.c ].add( cb );

			}

		} else {

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vertices[ face.a ].add( face.normal );	//一一求出
				vertices[ face.b ].add( face.normal );
				vertices[ face.c ].add( face.normal );

			}

		}

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ].normalize();	//一一规范化顶点数组

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.vertexNormals[ 0 ] = vertices[ face.a ].clone();	//一一重新设置vertexNormals的法线向量
			face.vertexNormals[ 1 ] = vertices[ face.b ].clone();	//一一重新设置vertexNormals的法线向量
			face.vertexNormals[ 2 ] = vertices[ face.c ].clone();	//一一重新设置vertexNormals的法线向量

		}

	},

	/*
	///computeMorphNormals方法重新计算三角面对象变形顶点的法线向量,morph应该是用作显示固定连续动画的变形效果。face数组中每个元素的vertexNormal属性，一个face3型对象有3个，一个face4型对象有4个，
	/// 但是需要注意的是，被多个表面共享的顶点，其法线向量只有一个，同时受到多个表面的影响。比如中心在原点，三组表面都垂直于轴的立方体，
	/// 其第一象限中的顶点，法线向量是(1,1,1)的归一化。虽然看上去不可思议，平面的顶点的法线居然不是垂直于平面的，但这种指定法线的方法
	/// 在利用平面模拟曲面的时候有很好的效果。
	///
	/// 定义:顶点法线（Vertex Normal）是过顶点的一个矢量，用于在高洛德着色（Gouraud Shading）中的计算光照和纹理效果。在生成曲面时，
	///		 通常令顶点法线和相邻平面的法线保持等角，如图1，这样进行渲染时，会在平面接缝处产生一种平滑过渡的效果。如果是多边形，
	///		 则令顶点法线等于该点所属平面（三角形）的法线，如图2，以便在接缝处产生突出的边缘。
	/// 
	/// 参考:http://en.wikipedia.org/wiki/Vertex_normal
	/// 参考:http://blog.csdn.net/sophistcxf/article/details/9095911
	/// 参考:http://www.cnblogs.com/flying_bat/archive/2007/10/13/923286.html
	*/
	///<summary>computeMorphNormals</summary>
	///<returns type="Vector3">返回重算变形顶点法线向量后的几何体对象</returns>
	computeMorphNormals: function () {

		var i, il, f, fl, face;

		// save original normals
		// 保存初始法线向量值
		// - create temp variables on first access
		// 首次访问,创建临时变量
		//   otherwise just copy (for faster repeated calls)
		// 否则只是复制,更快的重复调用.

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( ! face.__originalFaceNormal ) {

				face.__originalFaceNormal = face.normal.clone();

			} else {

				face.__originalFaceNormal.copy( face.normal );

			}

			if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

			for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

				if ( ! face.__originalVertexNormals[ i ] ) {

					face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

				} else {

					face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

				}

			}

		}

		// use temp geometry to compute face and vertex normals for each morph
		// 使用临时几何体对象计算每个面和顶点法线向量

		var tmpGeo = new THREE.Geometry();
		tmpGeo.faces = this.faces;

		for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

			// create on first access
			// 首次读取,先创建.

			if ( ! this.morphNormals[ i ] ) {

				this.morphNormals[ i ] = {};
				this.morphNormals[ i ].faceNormals = [];
				this.morphNormals[ i ].vertexNormals = [];

				var dstNormalsFace = this.morphNormals[ i ].faceNormals;
				var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					faceNormal = new THREE.Vector3();
					vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };

					dstNormalsFace.push( faceNormal );
					dstNormalsVertex.push( vertexNormals );

				}

			}

			var morphNormals = this.morphNormals[ i ];

			// set vertices to morph target
			// 设置顶点到变形顶点

			tmpGeo.vertices = this.morphTargets[ i ].vertices;

			// compute morph normals
			// 计算变形顶点法线向量

			tmpGeo.computeFaceNormals();
			tmpGeo.computeVertexNormals();

			// store morph normals
			// 保存变形顶点法线向量

			var faceNormal, vertexNormals;

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {	//遍历三角面的vertexNormal数组

				face = this.faces[ f ];

				faceNormal = morphNormals.faceNormals[ f ];
				vertexNormals = morphNormals.vertexNormals[ f ];

				faceNormal.copy( face.normal );

				vertexNormals.a.copy( face.vertexNormals[ 0 ] );
				vertexNormals.b.copy( face.vertexNormals[ 1 ] );
				vertexNormals.c.copy( face.vertexNormals[ 2 ] );	//一一存储

			}

		}

		// restore original normals
		// 恢复原来的平面法线向量.

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.normal = face.__originalFaceNormal;
			face.vertexNormals = face.__originalVertexNormals;

		}

	},
	/*
	///computeTangents方法重新计算三角面对象顶点的切线空间,
	///TBN切线是一个有方向的单位长度，沿着网格表面指向水平（U）纹理方向。在Three.js中切线被描述为Vector4，包括x,y,z这些组件定义的矢量，
	///如果需要，及w用来翻转副法线。
	///
	/// 参考:http://blog.csdn.net/bonchoix/article/details/8619624
	/// 参考:http://azykise.blog.163.com/blog/static/1730802442010431113010224/
	/// 参考:http://blog.csdn.net/meegomeego/article/details/8605463
	/// 参考:http://shiba.hpe.sh.cn/jiaoyanzu/wuli/showArticle.aspx?articleId=474&classId=4
	///
	/// NOTE:几何体Geometry对象必须有vertex UV属性,0层将被使用.
	*/
	///<summary>computeTangents</summary>
	///<returns type="Vector3">返回重算切线空间后的几何体对象</returns>
	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// tangents go to vertices

		var f, fl, v, vl, i, il, vertexIndex,
			face, uv, vA, vB, vC, uvA, uvB, uvC,
			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r, t, test,
			tan1 = [], tan2 = [],
			sdir = new THREE.Vector3(), tdir = new THREE.Vector3(),
			tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),
			n = new THREE.Vector3(), w;

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			tan1[ v ] = new THREE.Vector3();
			tan2[ v ] = new THREE.Vector3();

		}
		/*
		///handleTriangle方法重新计算三角面对象的切线空间的TB,TBN.
		*/
		///<summary>handleTriangle</summary>
		///<param name ="context" type="Geometry">几何体对象</param>
		///<param name ="a" type="Number">三角面角点a的索引</param>
		///<param name ="b" type="Number">三角面角点b的索引</param>
		///<param name ="c" type="Number">三角面角点c的索引</param>
		///<param name ="ua" type="Number">三角面角点a的索引</param>
		///<param name ="ub" type="Number">三角面角点b的索引</param>
		///<param name ="uc" type="Number">三角面角点c的索引</param>
		function handleTriangle( context, a, b, c, ua, ub, uc ) {

			vA = context.vertices[ a ];
			vB = context.vertices[ b ];
			vC = context.vertices[ c ];

			uvA = uv[ ua ];
			uvB = uv[ ub ];
			uvC = uv[ uc ];

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;
			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;
			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.x - uvA.x;
			s2 = uvC.x - uvA.x;
			t1 = uvB.y - uvA.y;
			t2 = uvC.y - uvA.y;

			r = 1.0 / ( s1 * t2 - s2 * t1 );
			sdir.set( ( t2 * x1 - t1 * x2 ) * r,
					  ( t2 * y1 - t1 * y2 ) * r,
					  ( t2 * z1 - t1 * z2 ) * r );
			tdir.set( ( s1 * x2 - s2 * x1 ) * r,
					  ( s1 * y2 - s2 * y1 ) * r,
					  ( s1 * z2 - s2 * z1 ) * r );

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {	//遍历所有的三角面

			face = this.faces[ f ];
			uv = this.faceVertexUvs[ 0 ][ f ]; // use UV layer 0 for tangents
											   // 使用UV属性的0层.

			handleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );	//一一计算切线坐标空间

		}

		var faceIndex = [ 'a', 'b', 'c', 'd' ];

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {	//遍历所有三角面

			face = this.faces[ f ];

			for ( i = 0; i < Math.min( face.vertexNormals.length, 3 ); i ++ ) {

				n.copy( face.vertexNormals[ i ] );

				vertexIndex = face[ faceIndex[ i ] ];

				t = tan1[ vertexIndex ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness
				// 计算

				tmp2.crossVectors( face.vertexNormals[ i ], t );
				test = tmp2.dot( tan2[ vertexIndex ] );
				w = ( test < 0.0 ) ? - 1.0 : 1.0;

				face.vertexTangents[ i ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );	//切线是一个有方向的单位长度，沿着网格表面指向水平（U）纹理方向。在Three.js中切线被描述为Vector4，包括x,y,z这些组件定义的矢量，如果需要，及w用来翻转副法线。

			}

		}

		this.hasTangents = true;	//将全局属性hasTangents设置为true.

	},

	/*
	///computeLineDistances方法重新计算顶点数组将顶点按照索引顺序依次连线产生的几何线段的长度
	///NOTE:如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true
	*/
	///<summary>computeLineDistances</summary>
	///<returns type="Number">返回重算相邻顶点长度后的几何体对象</returns>
	computeLineDistances: function () {

		var d = 0;
		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {	//遍历所有的顶点.

			if ( i > 0 ) {

				d += vertices[ i ].distanceTo( vertices[ i - 1 ] );

			}

			this.lineDistances[ i ] = d;	//一一将相邻两点的长度保存在this.lineDistances属性中

		}

	},

	/*
	///computeBoundingBox方法重新计算当前几何体对象的立方体界限,并更新this.boundingBox[]属性.
	*/
	///<summary>computeBoundingBox</summary>
	///<returns type="Number">返回重算立方体界限后的几何体对象</returns>
	computeBoundingBox: function () {

		if ( this.boundingBox === null ) {

			this.boundingBox = new THREE.Box3();

		}

		this.boundingBox.setFromPoints( this.vertices );	//计算当前几何体对象的立方体界限并更新this.boundingBox[]属性.

	},

	/*
	///computeBoundingSphere方法重新计算当前几何体对象的球体界限,并更新this.boundingSphere[]属性.
	*/
	///<summary>computeBoundingSphere</summary>
	///<returns type="Number">返回重算球体界限后的几何体对象</returns>
	computeBoundingSphere: function () {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new THREE.Sphere();

		}

		this.boundingSphere.setFromPoints( this.vertices );	//计算当前几何体对象的球体界限并更新this.boundingSphere[]属性.

	},

	/*
	///merge方法将两个几何体对象或者Object3D里面的几何体对象合并,(使用对象的变换)将几何体的顶点,面,UV分别合并.
	*/
	///<summary>merge</summary>
	///<param name ="geometry" type="Geometry">要被合并的几何体.</param>
	///<param name ="matrix" type="Matrix4">可选参数,变换矩阵,当指定了该参数,合并后的对象会应用变换</param>
	///<param name ="materialIndexOffset" type="Number">材质索引偏移量</param>
	///<returns type="Number">返回合并后的几何体对象</returns>	
	merge: function ( geometry, matrix, materialIndexOffset ) {

		if ( geometry instanceof THREE.Geometry === false ) {	//如果geometry不是THREE.Geometry,
			//提示用户对象类型错误.
			console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
			return;	//退出.

		}

		var normalMatrix,
		vertexOffset = this.vertices.length,
		uvPosition = this.faceVertexUvs[ 0 ].length,
		vertices1 = this.vertices,
		vertices2 = geometry.vertices,
		faces1 = this.faces,
		faces2 = geometry.faces,
		uvs1 = this.faceVertexUvs[ 0 ],
		uvs2 = geometry.faceVertexUvs[ 0 ];

		if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

		if ( matrix !== undefined ) {

			normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

		}

		// vertices
		// 合并顶点数组

		for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

			var vertex = vertices2[ i ];

			var vertexCopy = vertex.clone();

			if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );	//应用变换

			vertices1.push( vertexCopy );	//合并数组.

		}

		// faces
		// 合并三角面数组

		for ( i = 0, il = faces2.length; i < il; i ++ ) {

			var face = faces2[ i ], faceCopy, normal, color,
			faceVertexNormals = face.vertexNormals,
			faceVertexColors = face.vertexColors;

			faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
			faceCopy.normal.copy( face.normal );

			if ( normalMatrix !== undefined ) {

				faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

			}

			for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {	//遍历三角面顶点法线向量属猪

				normal = faceVertexNormals[ j ].clone();

				if ( normalMatrix !== undefined ) {

					normal.applyMatrix3( normalMatrix ).normalize();	// 一一合并

				}

				faceCopy.vertexNormals.push( normal );

			}

			faceCopy.color.copy( face.color );

			for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {	//遍历三角面顶点颜色数组

				color = faceVertexColors[ j ];
				faceCopy.vertexColors.push( color.clone() );	//一一合并

			}

			faceCopy.materialIndex = face.materialIndex + materialIndexOffset;	//改变materialIndex属性.

			faces1.push( faceCopy );

		}

		// uvs
		// 合并UV数组

		for ( i = 0, il = uvs2.length; i < il; i ++ ) {	//遍历uv数组

			var uv = uvs2[ i ], uvCopy = [];

			if ( uv === undefined ) {

				continue;

			}

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {	//

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}

			uvs1.push( uvCopy );	//一一合并.

		}

	},

	/*
	///mergeVertices方法用来清理几何体中重复的顶点.
	*/
	///<summary>mergeVertices</summary>
	///<returns type="Number">返回新的几何体对象</returns>
	/*
	 * Checks for duplicate vertices with hashmap.
	 * 用HashMap检查重复的顶点
	 * Duplicated vertices are removed
	 * 删除重复的顶点
	 * and faces' vertices are updated.
	 * 并且更新面的顶点
	 */
	mergeVertices: function () {

		var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
							  // 定义HashMap查找顶点的位置坐标,确保顶点的位置坐标是唯一的.
		var unique = [], changes = [];

		var v, key;
		var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
								 // 数字的小数点长度,比如值为4,相应的小数为0.0001
		var precision = Math.pow( 10, precisionPoints );
		var i,il, face;
		var indices, k, j, jl, u;

		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {	//遍历顶点数组

			v = this.vertices[ i ];
			key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );	//设置HashMap的key属性值

			if ( verticesMap[ key ] === undefined ) {

				verticesMap[ key ] = i;
				unique.push( this.vertices[ i ] );
				changes[ i ] = unique.length - 1;		//生成HashMap容器

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		};


		// if faces are completely degenerate after merging vertices, we
		// have to remove them from the geometry.
		// 如果三角面的顶点有重复,我们将要把这些多余的顶点从几何体对象里删除
		var faceIndicesToRemove = [];

		for ( i = 0, il = this.faces.length; i < il; i ++ ) {	//遍历三角面数组属性

			face = this.faces[ i ];

			face.a = changes[ face.a ];
			face.b = changes[ face.b ];
			face.c = changes[ face.c ];

			indices = [ face.a, face.b, face.c ];

			var dupIndex = - 1;

			// if any duplicate vertices are found in a Face3
			// 如果在Face3中发现任何重复的顶点,
			// we have to remove the face as nothing can be saved
			// 我们将删除顶点
			for ( var n = 0; n < 3; n ++ ) {	//对面的3个点进行遍历.
				if ( indices[ n ] == indices[ ( n + 1 ) % 3 ] ) {

					dupIndex = n;
					faceIndicesToRemove.push( i );	//将要删除的面放到数组faceIndicesToRemove中
					break;

				}
			}

		}

		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {	//遍历要删除的面的数组
			var idx = faceIndicesToRemove[ i ];

			this.faces.splice( idx, 1 );	//删除对应的面

			for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {	//遍历几何体对象的faceVertexUvs属性

				this.faceVertexUvs[ j ].splice( idx, 1 );	//删除对应的uv

			}

		}

		// Use unique set of vertices
		// 使用不包含重复顶点的vertecs数组.

		var diff = this.vertices.length - unique.length;
		this.vertices = unique;
		return diff;	//返回新的几何体对象.

	},

	// Geometry splitting
	/*
	///makeGroups方法根据设置的最大顶点数量(参数maxVerticesInGroup),将对象内的面点分离出来,生成如下格式对象.
	/// 这是一个box对象生成的.
	/// {faces3: Array[12],id: 1materialIndex: 0,numMorphNormals: 0,numMorphTargets: 2,vertices: 36}
	*/
	///<summary>makeGroups</summary>
	///<param name ="usesFaceMaterial" type="Number">可选参数,设置三角面对象的材质索引</param>
	///<param name ="maxVerticesInGroup" type="Number">可选参数,最大顶点数量</param>
	///<returns type="Geometry">返回分离出去的对象</returns>
	makeGroups: ( function () {

		var geometryGroupCounter = 0;

		return function ( usesFaceMaterial, maxVerticesInGroup ) {

			var f, fl, face, materialIndex,
				groupHash, hash_map = {},geometryGroup;

			var numMorphTargets = this.morphTargets.length;
			var numMorphNormals = this.morphNormals.length;

			this.geometryGroups = {};
			this.geometryGroupsList = [];

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];
				materialIndex = usesFaceMaterial ? face.materialIndex : 0;

				if ( ! ( materialIndex in hash_map ) ) {

					hash_map[ materialIndex ] = { 'hash': materialIndex, 'counter': 0 };

				}

				groupHash = hash_map[ materialIndex ].hash + '_' + hash_map[ materialIndex ].counter;

				if ( ! ( groupHash in this.geometryGroups ) ) {

					geometryGroup = { 'id': geometryGroupCounter++, 'faces3': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };
					this.geometryGroups[ groupHash ] = geometryGroup;
					this.geometryGroupsList.push(geometryGroup);
				}

				if ( this.geometryGroups[ groupHash ].vertices + 3 > maxVerticesInGroup ) {	//如果大于参数maxVerticesInGroup

					hash_map[ materialIndex ].counter += 1;
					groupHash = hash_map[ materialIndex ].hash + '_' + hash_map[ materialIndex ].counter;

					if ( ! ( groupHash in this.geometryGroups ) ) {

						geometryGroup = { 'id': geometryGroupCounter++, 'faces3': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };
						this.geometryGroups[ groupHash ] = geometryGroup;
						this.geometryGroupsList.push(geometryGroup);
						
					}

				}

				this.geometryGroups[ groupHash ].faces3.push( f );
				this.geometryGroups[ groupHash ].vertices += 3;

			}

		};

	} )(),

	/*clone方法
	///clone方法克隆一个几何体对象,将顶点数组,三角面数组,三角面顶点uv分别复制.
	*/
	///<summary>clone</summary>
	///<returns type="Vector4">返回克隆的几何体对象</returns>	
	clone: function () {

		var geometry = new THREE.Geometry();

		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			geometry.vertices.push( vertices[ i ].clone() );

		}

		var faces = this.faces;

		for ( var i = 0, il = faces.length; i < il; i ++ ) {

			geometry.faces.push( faces[ i ].clone() );

		}

		var uvs = this.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvs.length; i < il; i ++ ) {

			var uv = uvs[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}

			geometry.faceVertexUvs[ 0 ].push( uvCopy );

		}

		return geometry;	//返回克隆的几何体对象.

	},

	/*dispose方法
	///dispose方法从内存中删除对象,释放资源.
	///NOTE: 当删除几何体对象,不要忘记调用这个方法,否则会导致内存泄露.
	*/
	///<summary>dispose</summary>
	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );	//调度事件.

	}

};
///EventDispatcher方法应用到当前Geometry对象.
THREE.EventDispatcher.prototype.apply( THREE.Geometry.prototype );
///设置全局的Geometry对象计数器.
THREE.GeometryIdCount = 0;
