/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Material = function () {

	this.id = THREE.MaterialIdCount ++;		//材质属性id
	this.uuid = THREE.Math.generateUUID();	//材质uuid(通用唯一标识码)属性

	this.name = '';		//材质名称属性,可有可无

	this.side = THREE.FrontSide;	//模型正面只附着材质,还有选项THREE.BackSide 材质只附着背面 ,和选项THREE.DoubleSide = 2;	模型双面都附着材质

	this.opacity = 1;		//属性opacity为一个0-1区间的值，表明透明度。属性transparent指定是否使用透明，只有在该值为真的时候，才会将其与混合（透明是渲染像素时，待渲染值与已存在值共同作用计算出渲染后像素值，达到混合的效果）。
	this.transparent = false;	//是否使用透明.

	//属性blending，blendSrc，blendDst，blendEquation指定了混合方式和混合源Src和混合像素已有的像元值Dst的权重指定方式。默认情况下（如构造函数中赋的缺省值），新的像元值等于：新值×alpha+旧值×(1-alpha)。
	this.blending = THREE.NormalBlending;	//材质混合混合模式类型
	//材质混合混合模式类型,有相加,相减,相乘,自定义等将不同的材质,颜色混合的方式
	//TODO:有时间可以自定义几种混合模式试试.实现一些特殊的效果.

	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;

	this.depthTest = true;
	this.depthWrite = true;

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;

	this.alphaTest = 0;

	this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer

	this.visible = true;

	this.needsUpdate = true;

};

THREE.Material.prototype = {

	constructor: THREE.Material,

	setValues: function ( values ) {

		if ( values === undefined ) return;

		for ( var key in values ) {

			var newValue = values[ key ];

			if ( newValue === undefined ) {

				console.warn( "THREE.Material: '" + key + "' parameter is undefined." );
				continue;

			}

			if ( key in this ) {

				var currentValue = this[ key ];

				if ( currentValue instanceof THREE.Color ) {

					currentValue.set( newValue );

				} else if ( currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3 ) {

					currentValue.copy( newValue );

				} else if ( key == 'overdraw' ) {

					// ensure overdraw is backwards-compatable with legacy boolean type
					this[ key ] = Number( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		}

	},

	clone: function ( material ) {

		if ( material === undefined ) material = new THREE.Material();

		material.name = this.name;

		material.side = this.side;

		material.opacity = this.opacity;
		material.transparent = this.transparent;

		material.blending = this.blending;

		material.blendSrc = this.blendSrc;
		material.blendDst = this.blendDst;
		material.blendEquation = this.blendEquation;

		material.depthTest = this.depthTest;
		material.depthWrite = this.depthWrite;

		material.polygonOffset = this.polygonOffset;
		material.polygonOffsetFactor = this.polygonOffsetFactor;
		material.polygonOffsetUnits = this.polygonOffsetUnits;

		material.alphaTest = this.alphaTest;

		material.overdraw = this.overdraw;

		material.visible = this.visible;

		return material;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Material.prototype );

THREE.MaterialIdCount = 0;
