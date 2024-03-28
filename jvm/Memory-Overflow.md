---
title: 内存溢出
author: 陈生 
date: '2023-08-17'
---

- 将堆的最小值-Xms参数与最大值-Xmx参数 设置为一样即可避免堆自动扩展  
-  参数-XX：+HeapDumpOnOutOf-MemoryError可以让虚拟机 在出现内存溢出异常的时候Dump出当前的内存堆转储快照以便进行事后分析  
## 堆溢出
```java
import java.util.ArrayList;

public class HeapOOM {
    public static void main(String[] args) {
        ArrayList<OomObject> list = new ArrayList<>();
        while (true) {
            list.add(new OomObject());
        }
    }
    static class OomObject{

    }
}
```
VMOptions：`-Xms20m -Xmx20m -XX:+Heap	DumpOnOutOfMemoryError`
>  如果不是内存泄漏，换句话说就是内存中的对象确实都是必须存活的，那就应当检查Java虚拟机的堆参数（-Xmx与-Xms）设置，与机器的内存对比，看看是否还有向上调整的空间。再从代码上检查 是否存在某些对象生命周期过长、持有状态时间过长、存储结构设计不合理等情况，尽量减少程序运 行期的内存消耗  

## 栈溢出
 由于HotSpot虚拟机中并不区分虚拟机栈和本地方法栈，因此对于HotSpot来说，-Xoss参数（设置 本地方法栈大小）虽然存在，但实际上是没有任何效果的，栈容量只能由-Xss参数来设定。
关于虚拟机栈和本地方法栈，在《Java虚拟机规范》中描述了两种异常： 

1. 如果线程请求的栈深度大于虚拟机所允许的最大深度，将抛出StackOverflowError异常。 
2. 如果虚拟机的栈内存允许动态扩展，当扩展栈容量无法申请到足够的内存时，将抛出 OutOfMemoryError异常  

无论是由于栈帧太大还是虚拟机栈容量太小，当新的栈帧内存无法分配的时候， HotSpot虚拟机抛出的都是StackOverflowError异常。可是如果在允许动态扩展栈容量大小的虚拟机 上，相同代码则会导致不一样的情况。
如果测试时不限于单线程，通过不断建立线程的方式，在HotSpot上也是可以产生内存溢出异常 的  
```java
public class StackSOF {
    private int stackLength = 1;
    public void stackLeak() {
        stackLength ++;
        stackLeak();
    }

    public static void main(String[] args) {
        StackSOF sof = new StackSOF();
        try {
            sof.stackLeak();
        } catch (Throwable e) {
            System.out.println("stack length:" + sof.stackLength);
            throw e;
        }
    }
}
```
VMOptions：`-Xss128k`
>  出现StackOverflowError异常时，会有明确错误堆栈可供分析，相对而言比较容易定位到问题所在。如果使用HotSpot虚拟机默认参数，栈深度在大多数情况下（因为每个方法压入栈的帧大小并不是 一样的，所以只能说大多数情况下）到达1000~2000是完全没有问题，对于正常的方法调用（包括不能 做尾递归优化的递归调用），这个深度应该完全够用了。但是，如果是建立过多线程导致的内存溢 出，在不能减少线程数量或者更换64位虚拟机的情况下，就只能通过减少最大堆和减少栈容量来换取 更多的线程。这种通过“减少内存”的手段来解决内存溢出的方式，如果没有这方面处理经验，一般比 较难以想到，这一点读者需要在开发32位系统的多线程应用时注意。也是由于这种问题较为隐蔽，从 JDK 7起，以上提示信息中“unable to create native thread”后面，虚拟机会特别注明原因可能是“possibly   out of memory or process/resource limits reached”。  

## 方法区和运行时常量池溢出
> -XX：MaxMetaspaceSize：设置元空间最大值，默认是-1，即不限制，或者说只受限于本地内存 大小。 ·-XX：MetaspaceSize：指定元空间的初始空间大小，以字节为单位，达到该值就会触发垃圾收集 进行类型卸载，同时收集器会对该值进行调整：如果释放了大量的空间，就适当降低该值；如果释放 了很少的空间，那么在不超过-XX：MaxMetaspaceSize（如果设置了的话）的情况下，适当提高该 更多IT书籍请关注：www.cmsblogs.cn 值。 ·-XX：MinMetaspaceFreeRatio：作用是在垃圾收集之后控制最小的元空间剩余容量的百分比，可 减少因为元空间不足导致的垃圾收集的频率。类似的还有-XX：Max-MetaspaceFreeRatio，用于控制最 大的元空间剩余容量的百分比。  

## 直接内存溢出
>  由直接内存导致的内存溢出，一个明显的特征是在Heap Dump文件中不会看见有什么明显的异常 情况，如果读者发现内存溢出之后产生的Dump文件很小，而程序中又直接或间接使用了 DirectMemory（典型的间接使用就是NIO），那就可以考虑重点检查一下直接内存方面的原因了。  

