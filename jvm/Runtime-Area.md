# 运行时数据区
根据《Java虚拟机规范》规定，Java虚拟机所管理的内存包括以下几个运行时数据区域。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/23118939/1681203065714-80e49c25-1193-4032-9bf7-e49efe72f060.png#averageHue=%23e3e3e3&clientId=ubed642fa-073b-4&from=paste&height=355&id=uaaf36be5&name=image.png&originHeight=444&originWidth=766&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=41480&status=done&style=none&taskId=ue8008729-28a3-40ce-830f-49da1f405c1&title=&width=612.8)
Java虚拟机运行时数据区
## 程序计数器
 是一块较小的内存空间，它可以看作是当前线程所执行的字节码的行号指示器。在Java虚拟机的概念模型里，**字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令**，它是程序控制流的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。
 Java虚拟机的多线程是通过线程轮流切换、分配处理器执行时间的方式来实现的，在任何一个确定的时刻，一个处理器（对于多核处理器来说是一个内核）都只会执行一条线程中的指令。因此，为了线程切换后能恢复到正确的执行位置，每条线程都需要有一个独立的程序计数器，各条线程之间计数器互不影响，独立存储，我们称这类内存区域为“线程私有”的内存。
 如果线程正在执行的是一个**Java方法**，这个计数器记录的是正在执行的**虚拟机字节码指令的地址**；如果正在执行的是**本地（Native）方法**，这个计数器**值则应为空（Undefined）**。此内存区域是唯一一个在《Java虚拟机规范》中没有规定任何OutOfMemoryError情况的区域。
 ## 虚拟机栈
和程序计数器一样是线程私有的，其生命周期与线程相同。每个方法被执行的时候，虚拟机都会同步创建一个栈帧用于存储局部变量表（本地变量表）、操作数栈、动态连接、方法出口等信息。每一个方法被调用直至执行完毕的过程就是一个栈帧在虚拟机栈中从入栈到出栈的过程。
一般说的栈指的是Java中的虚拟机栈，或者更多情况下只是虚拟机栈的局部变量表部分。
### 局部变量表
局部变量表存放了编译期可知的各种**基本数据类型、对象引用**(reference类型，并不等同于对象本身，可能是一个指向对象起始地址的指针，或指向一个代表对象的句柄或其他与对象相关的位置)**和returnAddress类型**(执行一条字节码指令的地址)。
这些数据类型在局部变量表中的存储空间以**局部变量槽**标识，**64位长度的long和double占两个变量槽，其他的都占一个**。局部变量表所需的内存空间在编译期完成分配，当进入一个方法时，这个方法在栈帧中分配多大的局部变量表空间是完全确定的，运行期不会改变局部变量表的大小(该大小指变量槽的数量)，至于使用多大的空间实现一个变量槽由虚拟机决定。
 在《Java虚拟机规范》中，对这个内存区域规定了两类异常状况：如果线程请求的栈深度大于虚拟机所允许的深度，将抛出StackOverflowError异常；如果Java虚拟机栈容量可以动态扩展，当栈扩展时无法申请到足够的内存会抛出OutOfMemoryError异常。  
> - HotSpot虚拟机的栈容量不支持动态扩展。

## 本地方法栈
和虚拟机栈类似，区别只是本地方法栈为虚拟机使用的本地方法服务。
《Java虚拟机规范》对本地方法栈中方法使用的语言、使用方式与数据结构并没有任何强制规定，因此具体的虚拟机可以根据需要自由实现它，甚至有的Java虚拟机（譬如HotSpot虚拟机）直接就把本地方法栈和虚拟机栈合二为一。与虚拟机栈一样，本地方法栈也会在栈深度溢出或者栈扩展失败时分别抛出StackOverflowError和OutOfMemoryError异常。
## 堆
堆是虚拟机所管理的内存中最大的一块。**是被所有线程共享的一块内存区域。**在虚拟机启动时创建。**该区域的唯一目的是存放对象实例**。Java中**几乎**[**[1]**](https://www.yuque.com/likeheart-wvd0w/qml5p0/dxhrhyx1z5egf3pi?inner=u07d95da7)所有对象实例都在这里分配内存。
由于现代多数垃圾收集器都是基于分代理论设计的，所以 中经常会出现新生代、老年代、永久代、Eden空间、From Survivor空间、To Survivor空间等名词，这些只是一部分垃圾收集器的共同特性或者说是设计风格，而不是某个Java虚拟机具体实现的固有内存布局。
在堆中，新生代与老年代的比例默认为1：2，新生代分为Eden区、ToSurvivor区和FromSurvivor区，默认比例8：1：1，其中ToSurvivor和FromSurvivor在每次Minor GC后互换。因为新生代能存活的对象大概率是少的，在HotSpot中采用的是标记-复制算法，每次Minor GC清理Eden和FromSurvivor区，将存活的对象放到ToSurvivor区。
从内存分配的角度来说，**所有线程共享的Java堆中可以划分出多个线程私有的分配缓冲区(Thread Local Allocation Buffer, TLAB)**，以提升对象分配时的效率。内存细分的目的只是为了更好的回收，或更快的分配内存。
根据虚拟机规范规定，堆可以在物理上不连续，只是在逻辑上被视为时连续的，但是对于大对象(如数组对象)，出于实现简单、存储高效的考虑，很可能会要求连续的空间。
当前主流的Java堆都是按照可扩展的来实现的(通过参数-Xmx、-Xms来配置)。如果堆中没有足够的内存进行实例分配，会抛出OutOfMemoryError异常。
:::info
[1]: Java虚拟机规范的描述是：所有对象实例以及数组都应该在堆上分配。但是从实现角度来说，Java对象实例都分配在堆上并不那么绝对。
:::
## 方法区
方法区和堆一样，是各个线程共享的内存区域，**用于存储已被虚拟机加载的类型信息、常量、静态变量、即时编译器编译后的代码缓存等**数据。《Java虚拟机规范》将其描述为堆的一个逻辑部分，但是本质上方法区与堆是区分开的。
### 永久代、元空间与方法区
方法区是《Java虚拟机规范》规定的一个运行时数据区域。是HotSpot虚拟机选择将收集器的分代设计扩展至方法区，或者说使用永久代来实现方法区而已。这样使得HotSpot的垃圾收集器能够像管理Java堆一样管理这部分内存，省去了专门为方法区编写内存管理代码的工作。而在其他虚拟机实现中(JRockit、J9)，是不存在永久代的概念的。由于永久代设计带来的问题(Java应用更容易遇到内存溢出问题，永久代有-XX:MaxPermSize的上限，不设置也会有默认大小)。

- 从JDK 6开始逐步采用**本地内存**来实现方法区
- JDK 7 将原本放在永久代的字符串常量池、静态变量等移出，放在堆区。
- JDK 8 废弃永久代概念，改用和JRockit、J9一样在本地内存中实现的元空间(metaspace)，把7中永久代还剩余的内容（主要是类型信息）移到元空间，**字符串常量池还在堆区**。
> 字符串常量池分成两个部分：字符串实例以及一个叫做StringTable的东西，StringTable存储在元空间，而String实例对象 jdk8之后可以存储在堆中，然后把引用保存在StringTable里

根据《Java虚拟机规范》的规定，如果方法区无法满足新的内存分配需求时，将抛出 OutOfMemoryError异常  
### 运行时常量池
 运行时常量池（Runtime Constant Pool）是方法区的一部分。Class文件中除了有**类的版本、字段、方法、接口**等描述信息外，还有一项信息是**常量池表**（Constant Pool Table），**用于存放编译期生成的各种字面量与符号引用**，这部分内容将在类加载后存放到方法区的运行时常量池中。一般来说，除了保存Class文件中描述的符号引用外，还会把由符号引用翻译出来的直接引用也存储在运行时常量池中  
运行时常量池相对于Class文件常量池的另外一个重要特征是具备动态性，Java语言并不要求常量一定只有编译期才能产生，也就是说，并非预置入Class文件中常量池的内容才能进入方法区运行时常量池，运行期间也可以将新的常量放入池中，这种特性被开发人员利用得比较多的便是String类的 intern()方法。
既然运行时常量池是方法区的一部分，自然受到方法区内存的限制，当常量池无法再申请到内存 时会抛出OutOfMemoryError异常。
## 直接内存
 直接内存（Direct Memory）并不是虚拟机运行时数据区的一部分，也不是《Java虚拟机规范》中定义的内存区域。但是这部分内存也被频繁地使用，而且也可能导致OutOfMemoryError异常出现。
 在JDK 1.4中新加入了NIO（New Input/Output）类，引入了一种基于通道（Channel）与缓冲区（Buffer）的I/O方式，它可以使用Native函数库直接分配堆外内存，然后通过一个存储在Java堆里面的DirectByteBuffer对象作为这块内存的引用进行操作。这样能在一些场景中显著提高性能，因为避免了 在Java堆和Native堆中来回复制数据。
 显然，本机直接内存的分配不会受到Java堆大小的限制，但既然是内存，则肯定还是会受到本机总内存（包括物理内存、SWAP分区或者分页文件）大小以及处理器寻址空间的限制，一般服务器管理员配置虚拟机参数时，会根据实际内存去设置-Xmx等参数信息，但经常忽略掉直接内存，使得 各个内存区域总和大于物理内存限制（包括物理的和操作系统级的限制），从而导致动态扩展时出现 OutOfMemoryError异常。  