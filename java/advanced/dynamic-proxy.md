---
title: 代理
author: 陈生
date: '2023-08-19'
---
## 静态代理
1. 目标代理对象接口
```java
public interface ChanService {
    void say();
}
```

2. 目标代理对象
```java
public class ChanServiceImpl implements ChanService{
    @Override
    public void say() {
        System.out.println("既是同舟，在狮子山下且共济");
    }
}
```

3. 代理类
```java
public class ChanServiceProxy implements ChanService {
    private ChanService chanService;

    public ChanServiceProxy(ChanService chanService) {
        this.chanService = chanService;
    }

    @Override
    public void say() {
        System.out.println("作为一个代理类，可以增强被代理类的功能");
        chanService.say();
        System.out.println("也可以控制被代理对象权限");
    }
}
```

4. 测试类
```java
public class DemoStaticProxy {
    public static void main(String[] args) {
        ChanServiceProxy csp = new ChanServiceProxy(new ChanServiceImpl());
        csp.say();
    }
}
```
代理类的目的：

- 增强被代理类的功能
- 控制被代理类的权限
## 动态代理
动态代理中的代理类并不要求在编译器确定，而是在运行期间动态生成，从而实现对目标对象的代理功能。反射是动态代理的一种实现方式。
在Java中有两种动态代理的方式：

- JDK动态代理，java.lang.reflect包中的Proxy类和InvocationHandler接口提供了生成动态代理类的能力。**需要被代理类实现至少一个接口，通过创建该接口的实现类实现动态代理**
- CGLib：第三方类库，通过运行时在内存中动态生成一个子类对象从而实现对目标对象的功能扩展，如果某类被final修饰，是无法使用cglib的。
### JDK动态代理
实现步骤

1. 定义一个类，实现InvocationHandler接口，重写其方法invoke
2. 添加成员变量target（即被代理对象）和方法getProxy（获取代理类对象）
3. 使用时，创建代理类对象，传入被代理对象，通过getProxy方法获取代理对象并强转为被代理对象所实现的接口类型。
4. 通过代理类调用需要调用的方法
```java
public class DemoJDKProxyPrintService implements InvocationHandler {
    private Object target;


    public DemoJDKProxyPrintService(Object target){
        super();
        this.target = target;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("begin" + method.getName());

        Object result = method.invoke(target, args);

        System.out.println("after" + method.getName());
        return result;
    }

    public Object getProxy(){
        return Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(), target.getClass().getInterfaces(), this);
    }
}

public static void main(String[] args) {
    DemoPrintServiceImpl demoPrintService = new DemoPrintServiceImpl();
    DemoJDKProxyPrintService handler = new DemoJDKProxyPrintService(demoPrintService);
    DemoPrintService proxy = (DemoPrintService) handler.getProxy();
    proxy.show();
}
```
> 被代理类的所有方法都会经过invoke方法

### Cglib
```java
public class DemoCglibPrintService implements MethodInterceptor {
    private Enhancer enhancer = new Enhancer();

    public Object getProxy(Class clazz){
//        设置被代理类
        enhancer.setSuperclass(clazz);
        enhancer.setCallback(this);
//        通过字节码技术动态创建子类实例
        return enhancer.create();

    }

    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("前置代理");
        Object result = methodProxy.invokeSuper(o, objects);
        System.out.println("后置代理");
        return result;
    }
}

public class DemoPeformCglibEffect {
    public static void main(String[] args) {
        DemoCglibPrintService cglib = new DemoCglibPrintService();
        DemoPrintService proxy = (DemoPrintService) cglib.getProxy(DemoPrintServiceImpl.class);
        proxy.print();
        System.out.println();
        proxy.show();
    }
}
```

- Cglib底层通过Java字节码操控框架ASM，来转换字节码并生成新的类

