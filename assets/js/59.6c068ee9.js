(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{478:function(v,_,a){"use strict";a.r(_);var t=a(2),s=Object(t.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("类的初始化步骤分为5步：加载、验证、准备、解析、初始化，验证 + 准备 + 解析被称为连接。本部分详细介绍类的初始化的具体操作。")]),v._v(" "),_("h2",{attrs:{id:"加载"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#加载"}},[v._v("#")]),v._v(" 加载")]),v._v(" "),_("p",[v._v("加载阶段虚拟机需要完成以下三件事情：")]),v._v(" "),_("ol",[_("li",[v._v("通过一个类的全限定名来获取定义此类的二进制字节流")]),v._v(" "),_("li",[v._v("将这个字节流代表的静态存储结构转化为"),_("strong",[v._v("方法区的运行时数据结构")])]),v._v(" "),_("li",[v._v("在内存中生成一个代表这个类的Java.lang.Class对象，作为方法区这个类的各种数据的访问入口")])]),v._v(" "),_("p",[v._v("因为Java虚拟机规范没有对这三点具体要求，对于第二条而言，就可以通过各种方式来获取二进制字节流，包括")]),v._v(" "),_("ul",[_("li",[v._v("从zip压缩包获取，是JAR、WAR的基础")]),v._v(" "),_("li",[v._v("从网络获取，如Web Applet")]),v._v(" "),_("li",[v._v("运行时计算生成。如动态代理技术， 在java.lang.reflect.Proxy中，就是用 了ProxyGenerator.generateProxyClass()来为特定接口生成形式为“*$Proxy”的代理类的二进制字节流。")]),v._v(" "),_("li",[v._v("由其他文件生成。典型场景是JSP文件生成对应得Class文件。")]),v._v(" "),_("li",[v._v("从数据库读取。相对少见。")]),v._v(" "),_("li",[v._v("从加密文件获取。是典型的防Class文件被反编译的保护措施，通过加载时解密来防止运行逻辑被窥探。")])]),v._v(" "),_("p",[v._v("相对于类加载的其他阶段，非数组类型的加载阶段是可控性最强的阶段。既可以使用"),_("strong",[v._v("内置的引导类")]),v._v("来完成，也可以通过"),_("strong",[v._v("自定义类加载器")]),v._v("完成。\n对于数组类而言，"),_("strong",[v._v("数组类本身不通过类加载器创建，是由Java虚拟机直接在内存中动态构造出来的")]),v._v("。"),_("strong",[v._v("但数组类的的元素类型最终还是要靠类加载器来加载")]),v._v("。\n加载阶段结束后，Java虚拟机外部的二进制字节流就按照虚拟机设定的格式存储在方法区之中。类型数据安置在方法区之后，会在Java堆中实例化一个Java.lang.Class的对象，这个对象作为程序访问方法区中的类型数据的外部接口。")]),v._v(" "),_("h2",{attrs:{id:"验证"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#验证"}},[v._v("#")]),v._v(" 验证")]),v._v(" "),_("p",[v._v("连接的第一步，目的是确保Class文件的字节流符合要求，被当作代码运行后不会危害虚拟机自身。防止虚拟机本身被恶意代码攻击。大致包括四个方面的检验。")]),v._v(" "),_("h3",{attrs:{id:"文件格式验证"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#文件格式验证"}},[v._v("#")]),v._v(" 文件格式验证")]),v._v(" "),_("p",[v._v("验证字节流是否复合Class文件格式规范，是否能被当前版本的虚拟机处理，可能包括一下验证点：")]),v._v(" "),_("ul",[_("li",[v._v("是否以魔数0xCAFEBABE开头")]),v._v(" "),_("li",[v._v("主次版本号")]),v._v(" "),_("li",[v._v("Class文件中各个部分及文件本身是否有被删除的或附加的其他信息。")]),v._v(" "),_("li",[v._v(".....")])]),v._v(" "),_("p",[v._v("通过了这个阶段的验证，这段字节流才被允进入虚拟机内存的方法区进行存储。")]),v._v(" "),_("h3",{attrs:{id:"元数据验证"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#元数据验证"}},[v._v("#")]),v._v(" 元数据验证")]),v._v(" "),_("p",[v._v("对字节码描述的信息进行语义分析，保证其符合规范要求，验证点有：")]),v._v(" "),_("ul",[_("li",[v._v("类是否有父类")]),v._v(" "),_("li",[v._v("是否继承被final修饰的类")]),v._v(" "),_("li",[v._v("不是抽象类的话是否实现父类或接口中所有要求实现的方法")]),v._v(" "),_("li",[v._v("......")])]),v._v(" "),_("h3",{attrs:{id:"字节码验证"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#字节码验证"}},[v._v("#")]),v._v(" 字节码验证")]),v._v(" "),_("p",[v._v("最复杂的阶段，通过数据流分析和控制流分析，确定程序语义合法、符合逻辑。该阶段对类的方法体(Class文件的Code属性)进行校验分析，保证被校验类的方法在运行时不会危害虚拟机安全。如：")]),v._v(" "),_("ul",[_("li",[v._v("保证任意时刻操作数栈的数据类型与指令代码序列都能配合工作，例如不会出现类似于“在操作 栈放置了一个int类型的数据，使用时却按long类型来加载入本地变量表中”这样的情况。")]),v._v(" "),_("li",[v._v("保证任何跳转指令都不会跳转到方法体以外的字节码指令上")]),v._v(" "),_("li",[v._v("保证方法体的类型转换总是有效的")])]),v._v(" "),_("h3",{attrs:{id:"符号引用验证"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#符号引用验证"}},[v._v("#")]),v._v(" 符号引用验证")]),v._v(" "),_("p",[v._v("发生在虚拟将符号引用转为直接引用的时候，在解析阶段发生，主要校验以下内容：")]),v._v(" "),_("ul",[_("li",[v._v("符号引用中通过字符串描述的全限定名是否有其对应的类")]),v._v(" "),_("li",[v._v("在指定类中是否存在符合方法的字段描述符及简单名称所描述的方法和字段")]),v._v(" "),_("li",[v._v("符号引用中的类、字段、方法的可访问性是否可以被当前类访问")]),v._v(" "),_("li",[v._v("......")])]),v._v(" "),_("p",[v._v("符号引用验证目的是确保解析能够正常执行。如果代码是安全的，已被反复验证的，在生产环境 可以考虑使用-Xverify：none参数来关闭大部分的类验证措施，以缩短虚拟机类加载的时间；")]),v._v(" "),_("h2",{attrs:{id:"准备"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[v._v("#")]),v._v(" 准备")]),v._v(" "),_("p",[v._v("准备阶段是"),_("strong",[v._v("正式为类变量分配内存并设置类变量初始值")]),v._v("的阶段。类变量使用的内存应当在方法区分配，但是"),_("strong",[v._v("方法区是一个逻辑概念，JDK 8及以后，类变量会随着Class对象一起存放在Java堆中，所以类变量实际在堆内存中，虽然这部分堆内存逻辑上属于方法区")]),v._v("。\n:::info\n这里给类变量设置初始值通常是零值，只有当类变量被final修饰时，这个类字段的字段属性表会存在ConstantValue属性，此时准备阶段就会为这个类变量赋ConstantValue的值，也就是常量声明是的值。\n:::")]),v._v(" "),_("h2",{attrs:{id:"解析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#解析"}},[v._v("#")]),v._v(" 解析")]),v._v(" "),_("p",[v._v("解析阶段是Java虚拟机将常量池内的符号引用替换为直接引用的过程。")]),v._v(" "),_("ul",[_("li",[v._v("符号引用")])]),v._v(" "),_("p",[v._v("符号引用以一组符号来描述所引用的目标，符号可以是任何形式的字面量，只要能无歧义的定位到目标。符号引用与虚拟机实现的内存布局无关，目标不一定是已经加载到虚拟机内存中的内容。各种虚拟机内存布局可以不同，但是能接受的符号引用必须是一致的，字面量形式明确定义在Java虚拟机规范的Class文件格式中。")]),v._v(" "),_("ul",[_("li",[v._v("直接引用")])]),v._v(" "),_("p",[v._v("直接引用是可以直接指向目标的指针、 相对偏移量或一个能间接定位到目标的句柄。直接引用和内存布局相关，同一个符号引用在不同虚拟机翻译的直接引用一般不会相同。如果"),_("strong",[v._v("有了直接引用，被引用的目标必定在虚拟机的内存中存在")]),v._v("。")]),v._v(" "),_("h2",{attrs:{id:"初始化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#初始化"}},[v._v("#")]),v._v(" 初始化")]),v._v(" "),_("p",[v._v("初始化时类加载过程最后一个阶段，只有在初始化阶段，Java虚拟机才真正开始执行类中编写的Java程序代码。\n在准备阶段时，变量已经赋零值，初始化阶段，会根据程序员编码制定的计划去初始化类变量和其他资源，从一定角度来说，类的初始化阶段就是执行类构造器<clinit>()方法的过程。该方法不是开发者编写的，而是由javac编译器自动生成的。\n<clinit>方法是由编译器自动收集类中的所有类变量的赋值动作和静态代码块中的语句合并产生的，收集的顺序取决于源文件中出现的顺序，"),_("strong",[v._v("静态代码块可以给定义在代码块后的静态变量赋值，但是不能访问")]),v._v("。因为在准备阶段就为类变量分配内存并赋初始值了。\n> 类的初始化分为：加载--连接(验证、准备、解析)--初始化。")])])}),[],!1,null,null,null);_.default=s.exports}}]);