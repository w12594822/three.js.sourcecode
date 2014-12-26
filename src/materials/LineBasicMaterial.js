/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round",
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */

/*
///LineBasicMaterial方法根据参数parameters创建线段的线型材质,parameters参数的格式看上面.LineBasicMaterial对象的功能函数采用
/// 定义构造的函数原型对象来实现.大部分属性方法继承自材质的基类Material.用材质来定义线性,第一次见,真的很有想象力.简直就是对绘图软件的终结.
*/
///<summary>LineBasicMaterial</summary>
///<param name ="parameters" type="String">string类型的JSON格式材质属性参数</param>
///<returns type="LineBasicMaterial">返回LineBasicMaterial,线段材质.</returns>
THREE.LineBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );	//调用Material对象的call方法,将原本属于Material的方法交给当前对象LineBasicMaterial来使用.

	this.color = new THREE.Color( 0xffffff );	//颜色属性
	/*******************************************linecap和linejoin属性详解****************************************
	lineCap 属性指定线段如何结束。只有绘制较宽线段时，它才有效。这个属性的合法值如下表所示。默认值是："round"。
		值				含义
	"butt"		这个默认值指定了线段应该没有线帽。线条的末点是平直的而且和线条的方向正交，这条线段在其端点之外没有扩展。
	"round"		这个值指定了线段应该带有一个半圆形的线帽，半圆的直径等于线段的宽度，并且线段在端点之外扩展了线段宽度的一半。
	"square"	这个值表示线段应该带有一个矩形线帽。这个值和 "butt" 一样，但是线段扩展了自己的宽度的一半。

	lineJoin 属性设置或返回所创建边角的类型，当两条线交汇时。
	注释：值 "miter" 受 miterLimit 属性的影响。
	默认值：	round
	值		描述
	bevel	创建斜角。
	round	创建圆角。
	miter	默认。创建尖角。

	********************************************linecap和linejoin属性详解****************************************/
	this.linewidth = 1;		//线宽属性,默认初始化为1.
	this.linecap = 'round';	//线段端点的样式,默认为round,和html的canvas里的属性一样也有"butt", "round", "square"
	this.linejoin = 'round';	//线段边角的类型，当两条线交汇时,默认为round,和html的canvas里的属性一样也有"round", "bevel", "miter"

	this.vertexColors = THREE.NoColors;	//顶点颜色,默认初始化为false.当然还可以有THREE.NoColors / THREE.VertexColors / THREE.FaceColors等选项,这里显示出了javascript的灵活性了.

	this.fog = true;	//雾效,默认初始化为true.
						//TODO: LineDashedMaterial为啥有雾效属性,而且为啥默认初始化为true?????????

	this.setValues( parameters );	//调用Material类的setValues方法,将参数parameters赋值给当前LineBasicMaterial材质的属性.

};

/*************************************************************
****下面是LineBasicMaterial对象的方法属性定义,继承自Material
*************************************************************/
THREE.LineBasicMaterial.prototype = Object.create( THREE.Material.prototype );

/*clone方法
///clone方法克隆LineBasicMaterial对象,
*/
///<summary>clone</summary>
///<param name ="material" type="LineBasicMaterial">LineBasicMaterial对象,可有可无.</param>
///<returns type="LineBasicMaterial">返回克隆的LineBasicMaterial对象</returns>	
THREE.LineBasicMaterial.prototype.clone = function () {
	//以下是将材质的属性一一进行复制.
	var material = new THREE.LineBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;
	material.linecap = this.linecap;
	material.linejoin = this.linejoin;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;	//返回克隆的LineBasicMaterial对象

};
