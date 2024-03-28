---
title: 注解
author: 岑参
date: '2023-08-12'
---
# 注解
## 元注解
元注解一共有六个：

1. @Target：表示注解可以使用在什么地方
2. @Retention：表示在什么级别保存该注解信息
3. @Documented：将此注解包含到javadoc中
4. @Inherited：子类会继承该注解
5. @Repeatable：表示该注解可以在一个元素上使用多次。1.8新增
6. @Native：用于修饰成员变量，表示这个变量可以被本地代码引用， 常常被代码生成工具使用。1.8新增

## 通过反射获取注解的值

- 自定义注解
```java
@Target(ElementType.FIELD)
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
public @interface DemoAnno {
    String name() default "have Anno";
}
```

- 被自定义注解修饰的类
```java
@ToString
public class DemoPerformClass {
    @DemoAnno(name="anno value1")
    private String valueOne;
    @DemoAnno(name="anno value2")
    private String valueTwo;
    private String valueThree;
}
```

- 通过反射将注解的值注入属性
```java
public class DemoAnnoWithReflect {
    public static void main(String[] args) {
        DemoPerformClass demoPerformClass = new DemoPerformClass();
        System.out.println(demoPerformClass);
        demoAnnoResolver(demoPerformClass);
        System.out.println(demoPerformClass);
    }

    private static void demoAnnoResolver(Object obj) {
        Class<?> clazz = obj.getClass();

        Field[] fields = clazz.getDeclaredFields();
//            遍历所有属性，过滤到被DemoAnno修饰的属性
        for(Field field : fields){
            if(field.isAnnotationPresent(DemoAnno.class)){
//                如果某属性被DemoAnno注解修饰，获取该属性上的该注解
                DemoAnno anno = field.getAnnotation(DemoAnno.class);
                if(anno != null){`
//                    如果成功获取该注解，就通过反射的方式对这个注解修饰的属性赋值
                    field.setAccessible(true);
                    try {
                        field.set(obj, anno.name());
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }

            }
        }

    }
}
```
