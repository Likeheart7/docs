---
title: 关于布尔值的问题
author: 岑参
date: '2022-07-14'
---

### 变量命名问题
```java
public class U4T {
    private boolean isSuccess;

    public boolean isSuccess() {
        return isSuccess;
    }
}
```
IDE快捷生成的对boolean的getter方法是以is开头的，而对Boolean默认生成的是get开头的。

jackson和fastjson通过反射遍历出所有的getter方法和访问修饰符为public的成员变量，根据Javabean规范，对getter方法对应的属性进行序列化（即使getter方法对应的属性并不存在，也会出一个键值对）。而Gson通过反射直接遍历出所有的属性，对其进行序列化。
```java
    public static void main(String[] args) throws IOException {
        Model3 model3 = new Model3();
        model3.setSuccess(true);
        ObjectMapper om = new ObjectMapper();
        String serial = om.writeValueAsString(model3);
        System.out.println("序列化结果为：" + serial);
        Gson gson = new Gson();
        Model3 deserial = gson.fromJson(serial, Model3.class);
        System.out.println("----------------------------");
        System.out.println(deserial);
    }
```
所以在上述情况下，会出现错误的结果
```shell
序列化结果为：{"success":true}
----------------------------
Model3{isSuccess=false}
```

所以，<mark>不要使用is作为变量开头</mark>