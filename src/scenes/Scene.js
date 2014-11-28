/**
 * @author mrdoob / http://mrdoob.com/
 */
/*
///Scene是场景对象,所有的对象,灯光,动画,骨骼等都需要放置在场景内.Scene对象的功能函数采用定义构造的函数原型对象来实现.
*/
///<summary>Scene</summary>
THREE.Scene = function () {

	THREE.Object3D.call( this );	//调用Object3D对象的call方法,将原本属于Object3D的方法交给当前对象Scene来使用.

	this.fog = null;		//场景的雾效属性
	this.overrideMaterial = null;		//场景的材质属性,默认为null,如果设置了这个属性,场景中的所有对象渲染成这个材质.

	this.autoUpdate = true; 	// checked by the renderer
								//默认为true,表示渲染器每一帧都会检查场景和场景中的对象的矩阵的是否更新,如果为false,场景中的对象将不会被自动更新.

	/***********************新版中已经删除********************************
	this.matrixAutoUpdate = false;		//默认为false,场景中的矩阵是否自动更新,新版中已经删除这个属性.
	**********************************************************************/

	this.__lights = [];		//场景中的所有灯光存放在__lights属性数组中,新版中已经删除这个属性
	
	/***********************新版中已经删除********************************
	this.__objectsAdded = [];	//场景中的添加的所有相机和骨骼存放在__objectsAdded属性数组中,新版中已经删除这个属性
	this.__objectsRemoved = [];	//场景中的删除的所有相机和骨骼存放在__objectsRemoved属性数组中,新版中已经删除这个属性
	//TODO: 这里的属性啥意思?是新加的?添加的相机应该在children数组内呀?应该是这里为了提高效率将相机和骨骼单独放到这个属性数组中.
	**********************************************************************/
};
/*************************************************
****下面是Scene对象的方法属性定义,继承自Object3D
**************************************************/
THREE.Scene.prototype = Object.create( THREE.Object3D.prototype );	//Scene对象从THREE.Objec3D的原型继承所有属性方法

/************************************下面的方法已经在新版中删除******************************************
//
///__addObject方法用来添加灯光对象到场景的__lights属性数组中,添加相机和骨骼到场景的__objectsAdded
/// NOTE:新版中已经删除这个方法
//
///<summary>__addObject</summary>
///<param name ="object" type="Light,Carmera,Bone">Light,Carmera,Bone,可以包含子对象</param>
///<returns type="Scene">返回新的Scene对象</returns>
THREE.Scene.prototype.__addObject = function ( object ) {

	if ( object instanceof THREE.Light ) {		//如果是灯光,

		if ( this.__lights.indexOf( object ) === - 1 ) {	

			this.__lights.push( object );	//添加到__lights属性数组中

		}

		if ( object.target && object.target.parent === undefined ) {

			this.add( object.target );	

		}

	} else if ( ! ( object instanceof THREE.Camera || object instanceof THREE.Bone ) ) {	//如果是骨骼或者相机

		this.__objectsAdded.push( object );	//添加到__objectsAdded属性数组中

		// check if previously removed
		// 检查对象是否已经被删除

		var i = this.__objectsRemoved.indexOf( object );	//如果对象呗删除过

		if ( i !== - 1 ) {

			this.__objectsRemoved.splice( i, 1 );	//从__objectsRemoved数组中删除.

		}

	}

	this.dispatchEvent( { type: 'objectAdded', object: object } );	//调度事件
	object.dispatchEvent( { type: 'addedToScene', scene: this } );	//调度事件

	for ( var c = 0; c < object.children.length; c ++ ) {	//如果对象有子对象

		this.__addObject( object.children[ c ] );	//将子对象也添加到__objectsAdded属性数组中

	}

};

//
///__removeObject方法用来从场景的__lights属性数组中删除灯光对象,添加相机和骨骼从场景的__objectsRemoved
/// NOTE:新版中已经删除这个方法
//
///<summary>__removeObject</summary>
///<param name ="object" type="Light,Carmera,Bone">Light,Carmera,Bone,可以包含子对象</param>
///<returns type="Scene">返回新的Scene对象</returns>
THREE.Scene.prototype.__removeObject = function ( object ) {

	if ( object instanceof THREE.Light ) {

		var i = this.__lights.indexOf( object );

		if ( i !== - 1 ) {

			this.__lights.splice( i, 1 );

		}

		if ( object.shadowCascadeArray ) {

			for ( var x = 0; x < object.shadowCascadeArray.length; x ++ ) {

				this.__removeObject( object.shadowCascadeArray[ x ] );

			}

		}

	} else if ( ! ( object instanceof THREE.Camera ) ) {

		this.__objectsRemoved.push( object );

		// check if previously added
		// 检查对象是否已经添加.

		var i = this.__objectsAdded.indexOf( object );

		if ( i !== - 1 ) {

			this.__objectsAdded.splice( i, 1 );

		}

	}

	this.dispatchEvent( { type: 'objectRemoved', object: object } );
	object.dispatchEvent( { type: 'removedFromScene', scene: this } );

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.__removeObject( object.children[ c ] );

	}

};

**************************************************************************/


/*clone方法
///clone方法克隆一个Scene对象,将属性数组分别复制.
*/
///<summary>clone</summary>
///<returns type="Scene">返回克隆的Scene对象</returns>	
THREE.Scene.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Scene();

	THREE.Object3D.prototype.clone.call( this, object );

	if ( this.fog !== null ) object.fog = this.fog.clone();
	if ( this.overrideMaterial !== null ) object.overrideMaterial = this.overrideMaterial.clone();

	object.autoUpdate = this.autoUpdate;
	/***********************新版中已经删除********************************
	object.matrixAutoUpdate = this.matrixAutoUpdate;	//新版中已经删除
	**********************************************************************/
	return object;	//返回克隆的Scene对象

};
