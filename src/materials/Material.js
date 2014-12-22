/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/*
///Material是材质对象的抽象基类,当创建材质时都从这个类继承.Material对象的功能函数采用定义构造的函数原型对象来实现.
/// 简单的说就是物体看起来是什么质地。材质可以看成是材料和质感的结合。在渲染程式中，它是表面各可视属性的结合，
/// 这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。
///
*/
///<summary>Material</summary>
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

	//参考:http://blog.csdn.net/tudoumayi/article/details/6489575
	//参考:https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.13
	//参考:https://www.opengl.org/registry/specs/EXT/blend_color.txt
	//参考:http://blog.sina.com.cn/s/blog_9f4bc8e301014m6c.html
	//参考:https://www.opengl.org/registry/specs/EXT/blend_color.txt
	//参考:https://www.khronos.org/opengles/sdk/docs/man/xhtml/glBlendFuncSeparate.xml
	/*************************************摘抄自王路杰滴博客,http://blog.sina.com.cn/s/blog_9f4bc8e301014m6c.html***********

	混合是什么呢？混合就是把两种颜色混在一起。具体一点，就是把某一像素位置原来的颜色和将要画上去的颜色，通过某种方式混在一起，从而实现特殊的效果。
	假设我们需要绘制这样一个场景：透过红色的玻璃去看绿色的物体，那么可以先绘制绿色的物体，再绘制红色玻璃。在绘制红色玻璃的时候，利用“混合”功能，
	把将要绘制上去的红色和原来的绿色进行混合，于是得到一种新的颜色，看上去就好像玻璃是半透明的。
	要使用OpenGL的混合功能，只需要调用：glEnable(GL_BLEND);即可。
	要关闭OpenGL的混合功能，只需要调用：glDisable(GL_BLEND);即可。
	注意：只有在RGBA模式下，才可以使用混合功能，颜色索引模式下是无法使用混合功能的。
	一、源因子和目标因子
	前面我们已经提到，混合需要把原来的颜色和将要画上去的颜色找出来，经过某种方式处理后得到一种新的颜色。
	这里把将要画上去的颜色称为“源颜色”，把原来的颜色称为“目标颜色”。
	OpenGL 会把源颜色和目标颜色各自取出，并乘以一个系数（源颜色乘以的系数称为“源因子”，目标颜色乘以的系数称为“目标因子”），然后相加，这样就得到了新的颜色。
	（也可以不是相加，新版本的OpenGL可以设置运算方式，包括加、减、取两者中较大的、取两者中较小的、逻辑运算等，但我们这里为了简单起见，不讨论这个了）
	下面用数学公式来表达一下这个运算方式。假设源颜色的四个分量（指红色，绿色，蓝色，alpha值）是(Rs, Gs, Bs,  As)，目标颜色的四个分量是(Rd, Gd, Bd, Ad)，
	又设源因子为(Sr, Sg, Sb, Sa)，目标因子为(Dr, Dg, Db,  Da)。则混合产生的新颜色可以表示为：
	(Rs*Sr+Rd*Dr, Gs*Sg+Gd*Dg, Bs*Sb+Bd*Db, As*Sa+Ad*Da)
	当然了，如果颜色的某一分量超过了1.0，则它会被自动截取为1.0，不需要考虑越界的问题。

	源因子和目标因子是可以通过glBlendFunc函数来进行设置的。glBlendFunc有两个参数，前者表示源因子，后者表示目标因子。这两个参数可以是多种值，下面介绍比较常用的几种。
	GL_ZERO：     表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算。
	GL_ONE：      表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
	GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。
	GL_DST_ALPHA：表示使用目标颜色的alpha值来作为因子。
	GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。
	GL_ONE_MINUS_DST_ALPHA：表示用1.0减去目标颜色的alpha值来作为因子。
	除 此以外，还有GL_SRC_COLOR（把源颜色的四个分量分别作为因子的四个分量）、GL_ONE_MINUS_SRC_COLOR、 GL_DST_COLOR、GL_ONE_MINUS_DST_COLOR等，前两个在OpenGL旧版本中只能用于设置目标因子，
	后两个在OpenGL 旧版本中只能用于设置源因子。新版本的OpenGL则没有这个限制，并且支持新的GL_CONST_COLOR（设定一种常数颜色，将其四个分量分别作为因子的四个分量）、GL_ONE_MINUS_CONST_COLOR、GL_CONST_ALPHA、
	 GL_ONE_MINUS_CONST_ALPHA。另外还有GL_SRC_ALPHA_SATURATE。新版本的OpenGL还允许颜色的alpha 值和RGB值采用不同的混合因子。但这些都不是我们现在所需要了解的。毕竟这还是入门教材，不需要整得太复杂~

	举例来说：
	如果设置了glBlendFunc(GL_ONE, GL_ZERO);，则表示完全使用源颜色，完全不使用目标颜色，因此画面效果和不使用混合的时候一致（当然效率可能会低一点点）。如果没有设置源因子和目标因子，则默认情况就是这样的设置。
	如果设置了glBlendFunc(GL_ZERO, GL_ONE);，则表示完全不使用源颜色，因此无论你想画什么，最后都不会被画上去了。（但这并不是说这样设置就没有用，有些时候可能有特殊用途）
	如果设置了glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);，则表示源颜色乘以自身的alpha 值，目标颜色乘以1.0减去源颜色的alpha值，这样一来，源颜色的alpha值越大，则产生的新颜色中源颜色所占比例就越大，
	                                                                而目标颜色所占比例则减小。这种情况下，我们可以简单的将源颜色的alpha值理解为“不透明度”。这也是混合时最常用的方式。
	如果设置了glBlendFunc(GL_ONE, GL_ONE);，则表示完全使用源颜色和目标颜色，最终的颜色实际上就是两种颜色的简单相加。例如红色(1, 0, 0)和绿色(0, 1, 0)相加得到(1, 1, 0)，结果为黄色。
	注意：
	        所谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则红色就是源颜色，绿色才是目标颜色。
	        在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕了。
	 
	一、源因子和目标因子
	前面我们已经提到，混合需要把原来的颜色和将要画上去的颜色找出来，经过某种方式处理后得到一种新的颜色。这里把将要画上去的颜色称为“源颜色”，把原来的颜色称为“目标颜色”。
	OpenGL 会把源颜色和目标颜色各自取出，并乘以一个系数（源颜色乘以的系数称为“源因子”，目标颜色乘以的系数称为“目标因子”），然后相加，这样就得到了新的颜色。（也可以不是相加，
	新版本的OpenGL可以设置运算方式，包括加、减、取两者中较大的、取两者中较小的、逻辑运算等，但我们这里为了简单起见，不讨论这个了）
	下面用数学公式来表达一下这个运算方式。假设源颜色的四个分量（指红色，绿色，蓝色，alpha值）是(Rs, Gs, Bs,  As)，目标颜色的四个分量是(Rd, Gd, Bd, Ad)，又设源因子为(Sr, Sg, Sb, Sa)，
	目标因子为(Dr, Dg, Db,  Da)。则混合产生的新颜色可以表示为：
	        (Rs*Sr+Rd*Dr, Gs*Sg+Gd*Dg, Bs*Sb+Bd*Db, As*Sa+Ad*Da)
	当然了，如果颜色的某一分量超过了1.0，则它会被自动截取为1.0，不需要考虑越界的问题。

	源因子和目标因子是可以通过glBlendFunc函数来进行设置的。glBlendFunc有两个参数，前者表示源因子，后者表示目标因子。这两个参数可以是多种值，下面介绍比较常用的几种。
	GL_ZERO：     表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算。
	GL_ONE：      表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
	GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。
	GL_DST_ALPHA：表示使用目标颜色的alpha值来作为因子。
	GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。
	GL_ONE_MINUS_DST_ALPHA：表示用1.0减去目标颜色的alpha值来作为因子。
	除 此以外，还有GL_SRC_COLOR（把源颜色的四个分量分别作为因子的四个分量）、GL_ONE_MINUS_SRC_COLOR、 GL_DST_COLOR、GL_ONE_MINUS_DST_COLOR等，前两个在OpenGL旧版本中只能用于设置目标因子，
	后两个在OpenGL 旧版本中只能用于设置源因子。新版本的OpenGL则没有这个限制，并且支持新的GL_CONST_COLOR（设定一种常数颜色，将其四个分量分别作为因子的四个分量）、GL_ONE_MINUS_CONST_COLOR、
	GL_CONST_ALPHA、 GL_ONE_MINUS_CONST_ALPHA。另外还有GL_SRC_ALPHA_SATURATE。新版本的OpenGL还允许颜色的alpha 值和RGB值采用不同的混合因子。但这些都不是我们现在所需要了解的。毕竟这还是入门教材，不需要整得太复杂~

	举例来说：
	如果设置了glBlendFunc(GL_ONE, GL_ZERO);，则表示完全使用源颜色，完全不使用目标颜色，因此画面效果和不使用混合的时候一致（当然效率可能会低一点点）。如果没有设置源因子和目标因子，则默认情况就是这样的设置。
	如果设置了glBlendFunc(GL_ZERO, GL_ONE);，则表示完全不使用源颜色，因此无论你想画什么，最后都不会被画上去了。（但这并不是说这样设置就没有用，有些时候可能有特殊用途）
	如果设置了glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);，则表示源颜色乘以自身的alpha 值，目标颜色乘以1.0减去源颜色的alpha值，这样一来，源颜色的alpha值越大，则产生的新颜色中源颜色所占比例就越大，而目标颜色所占比例则减小。
	这种情况下，我们可以简单的将源颜色的alpha值理解为“不透明度”。这也是混合时最常用的方式。
	如果设置了glBlendFunc(GL_ONE, GL_ONE);，则表示完全使用源颜色和目标颜色，最终的颜色实际上就是两种颜色的简单相加。例如红色(1, 0, 0)和绿色(0, 1, 0)相加得到(1, 1, 0)，结果为黄色。
	注意：
	所谓源颜色和目标颜色，是跟绘制的顺序有关的。假如先绘制了一个红色的物体，再在其上绘制绿色的物体。则绿色是源颜色，红色是目标颜色。如果顺序反过来，则红色就是源颜色，绿色才是目标颜色。
	在绘制时，应该注意顺序，使得绘制的源颜色与设置的源因子对应，目标颜色与设置的目标因子对应。不要被混乱的顺序搞晕了。

	三、实现三维混合
	也许你迫不及待的想要绘制一个三维的带有半透明物体的场景了。但是现在恐怕还不行，还有一点是在进行三维场景的混合时必须注意的，那就是深度缓冲。
	深度缓冲是这样一段数据，它记录了每一个像素距离观察者有多近。在启用深度缓冲测试的情况下，如果将要绘制的像素比原来的像素更近，则像素将被绘制。否则，像素就会被忽略掉，不进行绘制。
	这在绘制不透明的物体时非常有用——不管是先绘制近的物体再绘制远的物体，还是先绘制远的物体再绘制近的物体，或者干脆以混乱的顺序进行绘制，最后的显示结果总是近的物体遮住远的物体。
	然而在你需要实现半透明效果时，发现一切都不是那么美好了。如果你绘制了一个近距离的半透明物体，则它在深度缓冲区内保留了一些信息，使得远处的物体将无法再被绘制出来。虽然半透明的物体仍然半透明，但透过它看到的却不是正确的内容了。
	要解决以上问题，需要在绘制半透明物体时将深度缓冲区设置为只读，这样一来，虽然半透明物体被绘制上去了，深度缓冲区还保持在原来的状态。如果再有一个物体出现在半透明物体之后，在不透明物体之前，
	则它也可以被绘制（因为此时深度缓冲区中记录的是那个不透明物体的深度）。以后再要绘制不透明物体时，只需要再将深度缓冲区设置为可读可写的形式即可。嗯？你问我怎么绘制一个一部分半透明一部分不透明的物体？这个好办，
	只需要把物体分为两个部分，一部分全是半透明的，一部分全是不透明的，分别绘制就可以了。
	即使使用了以上技巧，我们仍然不能随心所欲的按照混乱顺序来进行绘制。必须是先绘制不透明的物体，然后绘制透明的物体。否则，假设背景为蓝色，近处一块红色玻璃，中间一个绿色物体。
	如果先绘制红色半透明玻璃的话，它先和蓝色背景进行混合，则以后绘制中间的绿色物体时，想单独与红色玻璃混合已经不能实现了。
	总结起来，绘制顺序就是：首先绘制所有不透明的物体。如果两个物体都是不透明的，则谁先谁后都没有关系。然后，将深度缓冲区设置为只读。接下来，绘制所有半透明的物体。
	如果两个物体都是半透明的，则谁先谁后只需要根据自己的意愿（注意了，先绘制的将成为“目标颜色”，后绘制的将成为“源颜色”，所以绘制的顺序将会对结果造成一些影响）。最后，将深度缓冲区设置为可读可写形式。
	调用glDepthMask(GL_FALSE);可将深度缓冲区设置为只读形式。调用glDepthMask(GL_TRUE);可将深度缓冲区设置为可读可写形式。
	一些网上的教程，包括大名鼎鼎的NeHe教程，都在使用三维混合时直接将深度缓冲区禁用，即调用glDisable(GL_DEPTH_TEST);。这样做并不正确。如果先绘制一个不透明的物体，再在其背后绘制半透明物体，
	本来后面的半透明物体将不会被显示（被不透明的物体遮住了），但如果禁用深度缓冲，则它仍然将会显示，并进行混合。NeHe提到某些显卡在使用glDepthMask函数时可能存在一些问题，但可能是由于我的阅历有限，并没有发现这样的情况。

	那么，实际的演示一下吧。我们来绘制一些半透明和不透明的球体。假设有三个球体，一个红色不透明的，一个绿色半透明的，一个蓝色半透明的。红色最远，绿色在中间，蓝色最近。根据前面所讲述的内容，红色不透明球体必须首先绘制，
	而绿色和蓝色则可以随意修改顺序。这里为了演示不注意设置深度缓冲的危害，我们故意先绘制最近的蓝色球体，再绘制绿色球体。
	为了让这些球体有一点立体感，我们使用光照。在(1, 1, -1)处设置一个白色的光源。代码如下：
	void setLight(void)
	{
	    static const GLfloat light_position[] = {1.0f, 1.0f, -1.0f, 1.0f};
	    static const GLfloat light_ambient[]  = {0.2f, 0.2f, 0.2f, 1.0f};
	    static const GLfloat light_diffuse[]  = {1.0f, 1.0f, 1.0f, 1.0f};
	    static const GLfloat light_specular[] = {1.0f, 1.0f, 1.0f, 1.0f};

	    glLightfv(GL_LIGHT0, GL_POSITION, light_position);
	    glLightfv(GL_LIGHT0, GL_AMBIENT,  light_ambient);
	    glLightfv(GL_LIGHT0, GL_DIFFUSE,  light_diffuse);
	    glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular);

	    glEnable(GL_LIGHT0);
	    glEnable(GL_LIGHTING);
	    glEnable(GL_DEPTH_TEST);
	}
	每一个球体颜色不同。所以它们的材质也都不同。这里用一个函数来设置材质。
	void setMatirial(const GLfloat mat_diffuse[4], GLfloat mat_shininess)
	{
	    static const GLfloat mat_specular[] = {0.0f, 0.0f, 0.0f, 1.0f};
	    static const GLfloat mat_emission[] = {0.0f, 0.0f, 0.0f, 1.0f};

	    glMaterialfv(GL_FRONT, GL_AMBIENT_AND_DIFFUSE, mat_diffuse);
	    glMaterialfv(GL_FRONT, GL_SPECULAR,  mat_specular);
	    glMaterialfv(GL_FRONT, GL_EMISSION,  mat_emission);
	    glMaterialf (GL_FRONT, GL_SHININESS, mat_shininess);
	}
	有了这两个函数，我们就可以根据前面的知识写出整个程序代码了。这里只给出了绘制的部分，其它部分大家可以自行完成。
	void myDisplay(void)
	{
	    // 定义一些材质颜色
	    const static GLfloat red_color[] = {1.0f, 0.0f, 0.0f, 1.0f};
	    const static GLfloat green_color[] = {0.0f, 1.0f, 0.0f, 0.3333f};
	    const static GLfloat blue_color[] = {0.0f, 0.0f, 1.0f, 0.5f};

	    // 清除屏幕
	    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

	    // 启动混合并设置混合因子
	    glEnable(GL_BLEND);
	    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	    // 设置光源
	    setLight();

	    // 以(0, 0, 0.5)为中心，绘制一个半径为.3的不透明红色球体（离观察者最远）
	    setMatirial(red_color, 30.0);
	    glPushMatrix();
	    glTranslatef(0.0f, 0.0f, 0.5f);
	    glutSolidSphere(0.3, 30, 30);
	    glPopMatrix();

	    // 下面将绘制半透明物体了，因此将深度缓冲设置为只读
	    glDepthMask(GL_FALSE);

	    // 以(0.2, 0, -0.5)为中心，绘制一个半径为.2的半透明蓝色球体（离观察者最近）
	    setMatirial(blue_color, 30.0);
	    glPushMatrix();
	    glTranslatef(0.2f, 0.0f, -0.5f);
	    glutSolidSphere(0.2, 30, 30);
	    glPopMatrix();

	    // 以(0.1, 0, 0)为中心，绘制一个半径为.15的半透明绿色球体（在前两个球体之间）
	    setMatirial(green_color, 30.0);
	    glPushMatrix();
	    glTranslatef(0.1, 0, 0);
	    glutSolidSphere(0.15, 30, 30);
	    glPopMatrix();

	    // 完成半透明物体的绘制，将深度缓冲区恢复为可读可写的形式
	    glDepthMask(GL_TRUE);

	    glutSwapBuffers();
	}

	大家也可以将上面两处glDepthMask删去，结果会看到最近的蓝色球虽然是半透明的，但它的背后直接就是红色球了，中间的绿色球没有被正确绘制。

	小结：
	本课介绍了OpenGL混合功能的相关知识。
	混合就是在绘制时，不是直接把新的颜色覆盖在原来旧的颜色上，而是将新的颜色与旧的颜色经过一定的运算，从而产生新的颜色。新的颜色称为源颜色，原来旧的颜色称为目标颜色。传统意义上的混合，
	是将源颜色乘以源因子，目标颜色乘以目标因子，然后相加。
	源因子和目标因子是可以设置的。源因子和目标因子设置的不同直接导致混合结果的不同。将源颜色的alpha值作为源因子，用1.0减去源颜色alpha值作为目标因子，是一种常用的方式。
	这时候，源颜色的alpha值相当于“不透明度”的作用。利用这一特点可以绘制出一些半透明的物体。
	在进行混合时，绘制的顺序十分重要。因为在绘制时，正要绘制上去的是源颜色，原来存在的是目标颜色，因此先绘制的物体就成为目标颜色，后来绘制的则成为源颜色。绘制的顺序要考虑清楚，
	将目标颜色和设置的目标因子相对应，源颜色和设置的源因子相对应。
	在进行三维混合时，不仅要考虑源因子和目标因子，还应该考虑深度缓冲区。必须先绘制所有不透明的物体，再绘制半透明的物体。在绘制半透明物体时前，还需要将深度缓冲区设置为只读形式，
	否则可能出现画面错误。
	*************************************************************************************************************************/
	/***************自定义混合源和目标颜色因子**************************************************************************************
	THREE.ZeroFactor = 200;                       //GL_ZERO：     表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算
	THREE.OneFactor = 201;                        //GL_ONE：      表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
	THREE.SrcColorFactor = 202;                   //GL_SRC_COLOR  表示使用源颜色的四个分量分别作为因子的四个分量
	THREE.OneMinusSrcColorFactor = 203;           //GL_ONE_MINUS_SRC_COLOR 表示使用1.0减去源颜色的四个分量分别作为因子的四个分量
	THREE.SrcAlphaFactor = 204;                   //GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。
	THREE.OneMinusSrcAlphaFactor = 205;           //GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。
	THREE.DstAlphaFactor = 206;                   //GL_DST_ALPHA：表示使用目标颜色的alpha值来作为因子。
	THREE.OneMinusDstAlphaFactor = 207;           //GL_ONE_MINUS_DST_ALPHA：表示用1.0减去目标颜色的alpha值来作为因子。

	//custom blending source factors
	// 自定义混合模式源颜色因子

	//THREE.ZeroFactor = 200;
	//THREE.OneFactor = 201;
	//THREE.SrcAlphaFactor = 204;
	//THREE.OneMinusSrcAlphaFactor = 205;
	//THREE.DstAlphaFactor = 206;
	//THREE.OneMinusDstAlphaFactor = 207;
	THREE.DstColorFactor = 208;                   //GL_DST_COLOR  表示使用目标颜色的四个分量分别作为因子的四个分量
	THREE.OneMinusDstColorFactor = 209;           //GL_ONE_MINUS_DST_COLOR  表示使用1.0减去目标颜色的四个分量分别作为因子的四个分量
	THREE.SrcAlphaSaturateFactor = 210;           //GL_SRC_ALPHA_SATURATE  表示源颜色的alpha 值和RGB值采用不同的混合因子
	*****************************************************************************************************************************/
	this.blendSrc = THREE.SrcAlphaFactor;	//混合颜色的源颜色因子,默认为THREE.SrcAlphaFactor. GL_SRC_ALPHA：表示使用源颜色的alpha值来作为因子。其它选项参考上面注释
	this.blendDst = THREE.OneMinusSrcAlphaFactor;	//混合颜色的目标颜色因子,默认为THREE.OneMinusSrcAlphaFactor. GL_ONE_MINUS_SRC_ALPHA：表示用1.0减去源颜色的alpha值来作为因子。其它选项参考上面注释

	// 参考:https://www.khronos.org/opengles/sdk/docs/man/xhtml/glBlendEquation.xml
	// 参考:https://www.opengl.org/wiki/Blending
	// 参考:http://blog.sina.com.cn/s/blog_7b62c61c01016nnc.html
	/*********************************************设置混合方程式*********************************************************
	设置混合方程式：glBlendEquation(GLenum mode);
	        GLenum mode可取的值：
	        GL_FUNC_ADD                        Cf = (Cs * S)+(Cd * D)
	        GL_FUNC_SUBTRACT                   Cf = (Cs * S)-(Cd * D)   
	        GL_FUNC_RESERSE_SUBTRACT           Cf = (Cd * D)-(Cs * S)
	        GL_MIN                             Cf = min(Cs,Cd)
	        GL_MAX                             Cf = max(Cs,Cd)
	其中：
	        a. Cf表示混合后显示的颜色
	        b. Cd混合前颜色缓冲中已经有的颜色值
	        c. Cs将要绘制的颜色
	        d. S为glBlendFunc函数设置时的第一个参数,源颜色因子
	        e. D为glBlendFunc函数设置时的第二个参数,目标颜色因子
	**********************************************设置混合方程式*********************************************************/
	this.blendEquation = THREE.AddEquation;		//混合方程式,默认为THREE.AddEquation,相加,看上面公式
	/************************深度测试************************************************************************************
	参考:http://blog.csdn.net/zhongjling/article/details/7573055
	openGL里常出现深度测试，一直不清楚。今天就来弄清楚。
	  （1）什么是深度？
	        深度其实就是该象素点在3d世界中距离摄象机的距离（绘制坐标），深度缓存中存储着每个象素点（绘制在屏幕上的）的深度值！
	   深度值（Z值）越大，则离摄像机越远。
	   深度值是存贮在深度缓存里面的，我们用深度缓存的位数来衡量深度缓存的精度。深度缓存位数越高，则精确度越高，目前的显卡一般都可支持16位的Z Buffer，一些高级的显卡已经可以支持32位的Z Buffer，但一般用24位Z Buffer就已经足够了。
	  （2）为什么需要深度？
	   在不使用深度测试的时候，如果我们先绘制一个距离较近的物体，再绘制距离较远的物体，则距离远的物体因为后绘制，会把距离近的物体覆盖掉，这样的效果并不是我们所希望的。而有了深度缓冲以后，绘制物体的顺序就不那么重要了，都能按照远近（Z值）正常显示，这很关键。
	        实际上，只要存在深度缓冲区，无论是否启用深度测试，OpenGL在像素被绘制时都会尝试将深度数据写入到缓冲区内，除非调用了glDepthMask(GL_FALSE)来禁止写入。这些深度数据除了用于常规的测试外，还可以有一些有趣的用途，比如绘制阴影等等。
	 （2）启用深度测试
	     使用 glEnable(GL_DEPTH_TEST);
	     在默认情况是将需要绘制的新像素的z值与深度缓冲区中对应位置的z值进行比较，如果比深度缓存中的值小，那么用新像素的颜色值更新帧缓存中对应像素的颜色值。
	     但是可以使用glDepthFunc(func)来对这种默认测试方式进行修改。
	     其中参数func的值可以为GL_NEVER（没有处理）、GL_ALWAYS（处理所有）、GL_LESS（小于）、GL_LEQUAL（小于等于）、GL_EQUAL（等于）、GL_GEQUAL（大于等于）、GL_GREATER（大于）或GL_NOTEQUAL（不等于），其中默认值是GL_LESS。
	    一般来将，使用glDepthFunc(GL_LEQUAL);来表达一般物体之间的遮挡关系。 
	（3）启用了深度测试，那么这就不适用于同时绘制不透明物体。

	备注：
		绘制半透明物体时，需注意：在绘制半透明物体时前，还需要利用glDepthMask(GL_FALSE)将深度缓冲区设置为只读形式，否则可能出现画面错误。为什么呢，因为画透明物体时，将使用混色，这时就不能继续使用深度模式，而是利用混色函数来进行混合。这一来，就可以使用混合函数绘制半透明物体了。

	*****************************深度测试*******************************************************************************/
	this.depthTest = true;		//深度测试,默认为true,如果设置为false,在场景中远处的对象不被近处的对象遮挡

	/*****************************************************************************************************************
	如果flag是GL_FLASE，那么向深度缓冲区写入是禁止的。否则，就是允许的。初始时，是允许向深度缓冲区写入数据的。
	glDepthMask指定是否允许向深度缓冲区写入数据。如果flag是GL_FLASE，那么向深度缓冲区写入是禁止的。否则，就是允许的。
	初始时，是允许向深度缓冲区写入数据的。
	如果在glBegin和glEnd之间执行glDepthMask，会产生GL_INVALID_OPERATION。
	参考:http://blog.csdn.net/wlsgzl/article/details/13022959
	******************************************************************************************************************/
	this.depthWrite = true;		//允许或禁止向深度缓冲区写入数据,默认为true,指定是否允许向深度缓冲区写入数据。


	this.polygonOffset = false;	//多边形位移,当两个面共面时,会出现十分难看的z - fighting 问题,要解决此问题可以使用, Polygon Offset,
								//参考:https://www.opengl.org/sdk/docs/man2/xhtml/glPolygonOffset.xml
	this.polygonOffsetFactor = 0;	//多边形位移因子
	this.polygonOffsetUnits = 0;	//多边形位移单位

	/*************************alpha测试*******************************************************************************
	参考:http://blog.sina.com.cn/s/blog_471132920101d8z1.html
	原创文章如需转载请注明：转载自风宇冲Unity3D教程学院
	                       Shader第十二讲 Alpha测试

	引言：本讲和下一讲主要讲Alpha即透明通道有关的内容。RGBA，其中最终在屏幕上显示的只有RGB即 红绿蓝组成的颜色，Alpha并没有任何颜色显示。A只是辅助颜色运算特别是多图层运算而已。例如在单图层的情况下(1,1,1,0.8)输出的是(1,1,1)*0.8即 浅灰色(0.8,0.8,0.8)，和(0.8,0.8,0.8)是等价的.但是假如不再是单图层而背景为绿色(0,1,0,1)的时候，(0.8,0.8,0.8)就不知道怎么去运算了，而(1,1,1,0.8)知道。看不懂这段引言？没关系，往下看，当学完第五讲和第六讲后再回来看就自然能深刻理解了。

	什么是通道：
	通道是8位的灰度图像，能够显示256种灰度，用来表示颜色的RGBA值。R=Red红色，G=Green绿色，B=blue蓝色，A=alhpa透明值, 其中RGB为原色通道，A为透明通道。
	在通道中，以白色代替透明表示要处理的部分（选择区域）；以黑色表示不需处理的部分（非选择区域）
	所有通道取值范围是 [0,255]， 但是在Shader里取值范围是[0,1], 0和1分辨对应0和255
	什么是Alpha通道：
	定义：一般图形卡具有32位总线，附加的8位信号就被用来保存不可见的透明度信号以方便处理用，这就是Alpha通道。白色的alpha象素用以定义不透明的彩色象素，而黑色的alpha象素用以定义透明象素，黑白之间的灰阶用来定义半透明象素。
	简而言之：Alpha通道取值同样为[0,255] 以及Shader[0,1], 值越小最透明，值最大越不透明。在Shader里即0为透明，什么都没有,编辑器显示为黑色。1则不透明，全部都显示，编辑器其显示为白色如下图。
	【风宇冲】Unity3D教程宝典之Shader篇：第十二讲 <wbr>Alpha测试

	什么是Alpha Test：
	Alpha Test ,中文就是透明度测试。简而言之就是V&F shader中最后fragment函数输出的该点颜色值（即上一讲frag的输出half4）的alpha值与固定值进行比较。 AlphaTest语句通常位于Pass{}中的起始位置。

	语法：
	第一种: AlphaTest Off： 不测试，全渲染
	第二种：Alpha 比较符 目标alpha值
	其中目标alpha值取值范围是 0至1， 也可以用参数 ，如 AlphaTest [varName]。

	比较符:(目标alpha值下面记作x)
	Always  全渲染（任意x值）
	Never   全不渲染
	Greater  点的alpha值大于x时渲染
	GEuqal   点的alpha值大于等于x时渲染
	Less       点的alpha值小于x时渲染
	LEqual    点的alpha值小于等于x时渲染
	Equal  点的alpha值等于x时渲染
	NotEqual  点的alpha值不等于x时渲染

	例：
	AlphaTest never  0      全不渲染（这个0可以是任意值，但必须填）
	AlphaTest always 0      全渲染（这个0可以是任意值，但必须填）
	AlphaTest off               全渲染
	AlphaTest Greater 0.4  当alpha大于0.4渲染，   缺点是边缘过于锋利并且显示不完整，alpha小于0.4的部分被忽略掉了
	Alpha Blend                 边缘柔和，但是中心也太柔和，没有实体的感觉
	AlphaTest Greater 0.4 / AlphaTest LEqual 0.4 两个部分，大于0.4不混合，小于0.4混合。效果是既有实体感觉，边缘也柔和。
	【风宇冲】Unity3D教程宝典之Shader篇：第十二讲 <wbr>Alpha测试


	*************************alpha测试*********************************************************************************/
	this.alphaTest = 0;	//alpha测试,取值范围0.0-1.0

	this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
						// 当三角面之间产生间距,发生图形走样时,填充像素,确保图形保真,消除走样.通常取值范围在0.0=1.0之间.

	this.visible = true;	//可见性,默认为true

	this.needsUpdate = true;	//当设置为true时,标记材质已经更新.

};

/****************************************
****下面是Fog对象提供的功能函数.
****************************************/

THREE.Material.prototype = {

	constructor: THREE.Material,		//构造器,返回对创建此对象的Material函数的引用

	/*
	///setValues方法用来通过参数values设置材质对象的属性.values参数的格式为
	 values = {
	 *  color: <hex>,
	 *  opacity: <float>,
	 *  map: new THREE.Texture( <Image> ),
	 *
	 *  lightMap: new THREE.Texture( <Image> ),
	 *
	 *  specularMap: new THREE.Texture( <Image> ),
	 *
	 *  alphaMap: new THREE.Texture( <Image> ),
	 *
	 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
	 *  combine: THREE.Multiply,
	 *  reflectivity: <float>,
	 *  refractionRatio: <float>,
	 *
	 *  shading: THREE.SmoothShading,
	 *  blending: THREE.NormalBlending,
	 *  depthTest: <bool>,
	 *  depthWrite: <bool>,
	 *
	 *  wireframe: <boolean>,
	 *  wireframeLinewidth: <float>,
	 *
	 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
	 *
	 *  skinning: <bool>,
	 *  morphTargets: <bool>,
	 *
	 *  fog: <bool>
	 * }
	*/
	///<summary>setValues</summary>
	///<param name ="values" type="Object">材质属性值</param>
	///<returns type="Material">返回新的材质对象</returns>
	setValues: function ( values ) {

		if ( values === undefined ) return;

		for ( var key in values ) {	//遍历values中的键值,并一一赋值给当前材质对象.

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

	/*clone方法
	///clone方法克隆一个材质对象.
	*/
	///<summary>clone</summary>
	///<param name ="material" type="Material">接收结果的材质对象</param>
	///<returns type="Texture">返回克隆的材质对象</returns>	
	clone: function ( material ) {
		//一下将材质属性一一复制.
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

		return material;	//返回克隆的材质对象

	},
	/*dispose方法
	///dispose方法从内存中删除对象,释放资源.
	///NOTE: 当删除材质对象,不要忘记调用这个方法,否则会导致内存泄露.
	*/
	///<summary>dispose</summary>
	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};
///EventDispatcher方法应用到当前Material对象.
THREE.EventDispatcher.prototype.apply( THREE.Material.prototype );
///设置全局的Material对象计数器.
THREE.MaterialIdCount = 0;
