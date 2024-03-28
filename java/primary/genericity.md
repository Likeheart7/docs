---
title: 泛型
author: 岑参
date: '2023-05-02'
---
Java的泛型可以称为伪泛型，ArrayList\<Integer>和ArrayList\<String>在运行期间是同一种类型，其泛型仅在编译期存在，将多种泛型类型实例映射到唯一的字节码表示是通过类型擦除实现的。
## 类型擦除
类型擦除指的是通过类型参数合并，**将泛型类型实例关联到同一份字节码上**。编译器只为泛型类型生成一份字节码。类型擦除关键在于从泛型类型中清除类型参数的相关信息，并且在必要的时候添加类型检查和类型转换的方法。类型擦除的主要步骤如下：

1. 将所有的泛型参数用其最左边界（最顶级的父类）类型替换
2. 移除所有类型参数
> 由于经过类型擦除，所有的泛型类实例都关联到同一份字节码上，**所以泛型类的所有静态变量是共享的。**

## 泛型中的K T V E
E - Element (在集合中使用，因为集合中存放的是元素)
T - Type（Java 类）
K - Key（键）
V - Value（值）
N - Number（数值类型）
? - 表示不确定的java类型（无限制通配符类型）

## 限定通配符

- <? extends T>，即类型必须为T类型或者T子类 
- <? super T>，即类型必须为T类型或者T的父类
### 上界限定符
```java
    public static void main(String[] args) {
        ArrayList<? extends Fruit> list = new ArrayList<>();
        // 无法通过编译，因为? extends Fruit既可以是Apple也可以是Banana，无法确定
        // list.add(new Apple());
        Fruit fruit = list.get(0);
    }
```
> 因为 ? extends Fruit可以是Fruit的任何一个子类，无法确定其某一子类是否符合要求，所以全都无法add
而在get时的返回类型就可以是Fruit

### 下界限定符
```java
        ArrayList<? super Fruit> list2 = new ArrayList<>();
//
        list2.add(new Apple());
		Object object = list2.get(0);
        System.out.println(list2.get(0));
```
> 因为? super Fruit，其类型最小是Fruit，而Apple、Banana等Fruit的子类一定符合要求，所以可以添加。
但是在调用get时就只能返回Object类型

## List<?> 和 List&lt;Object&gt;
```java
List<?> list3 = new ArrayList<>();
List<Object> list4 = new ArrayList<>();

list3 = new ArrayList<String>();
list4 = new ArrayList<String>();        //无法通过编译
```
