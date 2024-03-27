# String
## String
1. char[] ：字符数组，String本质上使用char数组存储数据。**在 Java 9 之后，String 类的实现改用 byte 数组存储字符串，同时使用 `coder` 来标识使用了哪种编码。**
2. hash：String对应的hash值，通过构造器String(String original)创建时，在构造器内部就对成员变量hash进行了赋值
```java
public String(String original) {
  this.value = original.value;
  this.hash = original.hash;
}
```
### String Pool
**字符串常量池（String Pool）** 存着所有字符串字面量（literal strings），**这些字面量在编译时期就确定**。不仅如此，还可以使用 String 的 **intern() 方法在运行过程将字符串添加到 String Pool** 中。==如果使用字面量的形式声明字符串，字符串会自动添加到String Pool中==。
### 不可变的优势
* 可以缓存hash值
* String Pool的需要
* 线程安全
* 作为参数时防止篡改
## 字符串拼接

### +

​	本质上Java通过+进行字符串拼接的操作是Java语言提供的语法糖，对于代码
```java
    public static void main(String[] args) {
        String a = "123";
        String b = "456";
        String c = a + b;
    }
```
​	通过反编译可以看到，在编译器对其进行编译后，原理是通过new一个StringBuilder对象，通过其append方法进行拼接。其反编译后的代码为

```java
    public static void main(String[] args) {
        String a = "123";
        String b = "456";
        (new StringBuilder()).append(a).append(b).toString();
    }
```

### concat()

```java
    public String concat(String str) {
        //首先判断如果str为空串，直接返回当前字符串即可
        if (str.isEmpty()) {
            return this;
        }
        int len = value.length;
        int otherLen = str.length();
        char buf[] = Arrays.copyOf(value, len + otherLen);
        str.getChars(buf, len);
// 		最后返回一个新new出来的String
        return new String(buf, true);
    }
```
### StringBuilder的append方法

首先StringBuilder中的append方法调用了其父类的append
```java
    public StringBuilder append(String str) {
        super.append(str);
        return this;
    }
```
	该父类为AbstractStringBuilder，具体实现如下
```java
    public AbstractStringBuilder append(String str) {
        // 如果append的参数接收的是null，就会拼接null这四个字符
        if (str == null)
            return appendNull();
        int len = str.length();
        ensureCapacityInternal(count + len);
        str.getChars(0, len, value, count);
        count += len;
        return this;
    }
```
	可以看到此处并没有重新new一个对象，所以在循环拼接等情况下一定要使用StringBuilder的append方法。
> StringBuffer是加了synchronized关键字修饰的StringBuilder

### StringJoiner

```java
StringJoiner sj = new StringJoiner(",");
sj.add("chen");
sj.add("xing");
System.out.println(sj);
```
输出结果为：`chen,xing`
它有两个构造器
```java
@delimiter: 每两次add之间的分隔符
public StringJoiner(CharSequence delimiter) {}

@prefix：最终字符串的前缀
@suffix：最终字符串的后缀
public StringJoiner(CharSequence delimiter,
                    CharSequence prefix,
                    CharSequence suffix) {}
```
StringJoiner内部通过StringBuilder实现，主要为了Java 8 结合stream使用。
```java
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("chen");
        list.add("xing");
        list.add("chen");
        list.add("hai");

        String res = list.stream().collect(Collectors.joining(", "));
        System.out.println(res);
    }
```
结果为`chen, xing, chen, hai`，可以通过String.join(delimiter, List)代替。

### 字符串拼接整型

String.valueOf(int i)内部实现是通过Integer.toString()；
```java
public static String valueOf(int i) {
    return Integer.toString(i);
}
```
```java
public static void main(String[] args) {
    int i = 10;
    String str = "" + i;
}
```
直接使用+拼接字符串和整型，实际上还是通过StringBuilder的append方法，其反编译结果为
```java
public static void main(String[] args) {
    int i = 10;
    (new StringBuilder()).append("").append(i).toString();
}
```
## 附

### 字符串长度限制

字符串有长度限制，在编译期，要求字符串常量池中的常量不能超过65535，并且在javac执行过程中控制了最大值为65534。
在运行期，长度不能超过Int的范围，否则会抛异常。

### Java 6 和 Java 7中subString的区别

在Java 6 中subString其实是取了原String的部分，虽然是两个不同的String对象，但是指向的char[]是同一个，只是通过beginIndex和endIndex进行截取。
表面上这种方法是对内存空间的节省，但是如果原String销毁了，而该子String仍存在，那么char[]中未被该子String使用的部分，本质上是造成了内存泄露的。

### Switch对字符串的支持

switch不支持long类型
switch的编译会用到两个指令，tablesswitch和lookupswitch，这两个命令只会运行在int上，对于byte、short的支持通过强转为int类型实现。
switch对字符串的支持通过hashcode()和equals()方法实现，hashcode()返回的是int类型。为防止哈希碰撞，又通过equals进行二次检测。其反编译后的代码如下
最终通过生成了两个switch，第一个通过hashCode和equals确定var3的值，第二个通过var3判断决定走哪一条分支。

```java
public static void main(String[] args) {
    String flag = "abc";
    byte var3 = -1;
    switch(flag.hashCode()) {
    case 96354:
        if (flag.equals("abc")) {
            var3 = 0;
        }
        break;
    case 97347:
        if (flag.equals("bcd")) {
            var3 = 1;
        }
    }

    switch(var3) {
    case 0:
        System.out.println("a");
        break;
    case 1:
        System.out.println("b");
    }

}

```

> 如果在循环中使用switch代码块，需要频繁的调用hashCode方法，但是由于String中有一个成员变量hash存储了对象的哈希值，所以开销并不会太大。

