---
title: 枚举
author: 岑参
date: '2023-04-10'
---
枚举是单例模式最好的实现方式之一。
## 枚举示例
从**类型安全性**和**程序可读性**两方面考虑，int和String枚举模式的缺点如下所示：

1. 对于`int`类型，某个方法在参数为该枚举类型时，如果调用方使用EnumClass.EnumInstance作为参数传入，则不会产生问题，若**调用方直接传入某个int类型的变量或字面量**，就可能出现意外的情况
2. 对于`String`类型，由于通过String实现需要依赖于字符串的比较操作，所以会产生性能问题。
### 一个简单的枚举示例
```java
public enum DemoSimpleEnumExample {
    SPRING, SUMMER, FALL, WINTER;
}
```
### 一个包含成员变量的枚举示例
```java
public enum DemoEnumWithProperty {
    MONDAY(1), TUESDAY(2),WEDNESDAY(3),THURSDAY(4), FRIDAY(5), SATURDAY(6), SUNDAY(7);

    private Integer code;
    private DemoEnumWithProperty(Integer code){
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
```

- 枚举实例必须写在枚举类最前面
- <mark>构造器不能为public</mark>
### 使用接口组织枚举
```java
public interface Food {  
    enum Coffee implements Food{  
        BLACK_COFFEE,DECAF_COFFEE,LATTE,CAPPUCCINO  
    }  
    enum Dessert implements Food{  
        FRUIT, CAKE, GELATO  
    }  
}
```
## 枚举的本质
枚举本质是一个**由final修饰**的类，该类**继承了Enum类**
`public final class com.example.demo.enums.DemoSimpleEnumExample extends java.lang.Enum<com.example.demo.enums.DemoSimpleEnumExample>`

> switch对枚举的支持本质上用的是抽象类Enum的成员变量oridinal

