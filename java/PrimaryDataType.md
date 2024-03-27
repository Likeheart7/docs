# 基本数据类型

## 基本数据类型

> byte/8、short/16、int/32、long/64、float/32、double/64、char/16、boolean/?

boolean只有true/false两个值，可以使用1bit来存储，**JVM在编译器会将boolean的数据类型转为int，使用1表示true，0表示false；并且JVM支持boolean数组，通过读写byte数组来实现，也就是说==数组中的boolean元素每个占8bit==。**

## 包装类

> Byte、Short、Int、Long、Float、Double、Character、Boolean

### 包装类的缓存池

`new Integer(120)`和`Integer.valueOf(120)`的区别是：

* 前者每次都会创建一个新的对象
* 后者会使用缓存池中的对象

Integer中valueOf()方法**先判断值是否在缓存池中，如果在就直接返回缓存池中的对象**

```JAVA
public static Integer valueOf(int i) {
    // 判断值i是否在缓存池中
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        // 缓存池是一个静态内部类
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

缓存池的具体实现

```java
private static class IntegerCache {
    // Integer缓存池范围为从-128-127
        static final int low = -128;
        static final int high;
        static final Integer cache[];
	// 通过静态代码块给cache数组内放入所有的值
        static {
            // high value may be configured by property
            // Integer的缓存池的上界可调
            int h = 127;
            String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                try {
                    int i = parseInt(integerCacheHighPropValue);
                    i = Math.max(i, 127);
                    // Maximum array size is Integer.MAX_VALUE
                    h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
                } catch( NumberFormatException nfe) {
                    // If the property cannot be parsed into an int, ignore it.
                }
            }
            high = h;

            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);

            // range [-128, 127] must be interned (JLS7 5.1.7)
            assert IntegerCache.high >= 127;
        }

        private IntegerCache() {}
    }
```



> 编译器在自动装箱时调用valueOf()方法

#### 各种包装类的缓存池具体对应的值

- boolean：true and false
- byte：all values
- short： -128 and 127
- int ： -128 and 127
- long：-128 and 127
- char in the range \u0000 to \u007F

* double and float without cache





















