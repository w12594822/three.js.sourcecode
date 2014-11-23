/**
 * @author alteredq / http://alteredqualia.com/
 */
/*
///Clock对象的构造函数.用来记录时间.Clock对象的功能函数采用
///定义构造的函数原型对象来实现.
///
///	用法: var clock = new Clock(true)
///	创建时钟用来记录时间,传递参数true,设置自动开始记录.
///	NOTE: 参数(autostart)为true,自动开始记录,省略该参数也自动开始记录时间,设置为false,穿件时间,但不开始记录.以毫秒为单位,从 1 January 1970 00:00:00 UTC开始.
*/
///<summary>Clock</summary>
///<param name ="autoStart" type="Boolean">true 或者 false</param>
THREE.Clock = function ( autoStart ) {

	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;		//自动开始记录时间

	this.startTime = 0;		//开始记录的时间截,以毫秒为单位,从 1 January 1970 00:00:00 UTC开始.
	this.oldTime = 0;		//上一次记录时间截.以毫秒为单位,从 1 January 1970 00:00:00 UTC开始.
	this.elapsedTime = 0;	//记录当前时间距离上一次记录时间截.以毫秒为单位,从 1 January 1970 00:00:00 UTC开始.

	this.running = false;	//用来跟踪时钟是否在记录时间.

};

/****************************************
****下面是Clock对象提供的功能函数.
****************************************/
THREE.Clock.prototype = {

	constructor: THREE.Clock,	//构造器,返回对创建此对象的Clock函数的引用

	/*
	///start方法用来开始记录时间,获得开始的时间截.
	*/
	///<summary>start</summary>
	start: function () {

		this.startTime = self.performance !== undefined && self.performance.now !== undefined
					 ? self.performance.now()
					 : Date.now();	

		this.oldTime = this.startTime;	
		this.running = true;	//开始记录时间
	},

	/*
	///stop方法用来停止记录时间,获得结束的时间截.
	*/
	///<summary>stop</summary>
	stop: function () {

		this.getElapsedTime();	//获得结束的时间截
		this.running = false;	//停止记录时间

	},

	/*
	///getElapsedTime方法用来返回从oldTimed到stop之间的时间长度,以秒为单位.
	*/
	///<summary>getElapsedTime</summary>
	///<returns type="Date">以秒为单位,时间长度</returns>
	getElapsedTime: function () {

		this.getDelta();
		return this.elapsedTime;	//返回时间长度

	},

	/*
	///getDelta方法是getElapsedTime方法的实现,具体的算法.
	*/
	///<summary>getElapsedTime</summary>
	///<returns type="Date">以秒为单位,时间长度</returns>
	getDelta: function () {

		var diff = 0;

		if ( this.autoStart && ! this.running ) {

			this.start();

		}

		if ( this.running ) {

			var newTime = self.performance !== undefined && self.performance.now !== undefined
					 ? self.performance.now()
					 : Date.now();

			diff = 0.001 * ( newTime - this.oldTime );
			this.oldTime = newTime;

			this.elapsedTime += diff;

		}

		return diff;	//返回时间长度

	}

};
