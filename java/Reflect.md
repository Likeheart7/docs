# 反射
- 反射允许运行时获取自身信息
- Java的Class类是反射的基础，通过访问被装入JVM的Class对象获取信息
- 虚拟机为每种类型管理一个独一无二的Class对象
- 反射比直接执行代码逻辑效率低

## 反射与工厂模式实现IOC
### 通过反射实现的工厂模式
```java
class Factory{
    public static fruit getInstance(String ClassName){
        fruit f=null;
        try{
            f=(fruit)Class.forName(ClassName).newInstance();
        }catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
}
```
### 反射机制结合属性文件的工厂模式（即IoC）

1. 编写properties文件
```properties
apple=Apple
banana=Banana
```

2. 通过Properties类读取Properties文件
3. 使用反射工厂通过读取到的值创建对象
```java
public class DemoSimpleIoc {
    public static void main(String[] args) throws Exception {
        Properties properties = getProperties();
        Fruit apple = ReflectFruitFactory.getInstance(properties.getProperty("apple"));
        if(apple != null){
            apple.eat();
        }
    }

    public static Properties getProperties(){
        //        读取properties文件
        Properties pro = new Properties();
        try {
            pro.load(new FileInputStream("D:\\theirprojects\\demo\\src\\test\\java\\com\\example\\demo\\reflect\\simpleIOC\\fruit.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return pro;
    }

}
```
## IOC的本质
通过反射，将原先自行创建的对象，变成根据配置文件进行对象生成。
