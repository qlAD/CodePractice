-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'执行语句 int i=1; int j=++i; 后，i和j的值分别为（）','["i=1,j=1", "i=2,j=1", "i=1,j=2", "i=2,j=2"]',NULL,'D',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下面哪个选项中，哪个反映了Java程序并行机制的特点？（）','["\\u5b89\\u5168\\u6027", "\\u8de8\\u5e73\\u53f0", "\\u591a\\u7ebf\\u7a0b", "\\u53ef\\u79fb\\u690d"]',NULL,'C',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'以下标识符中哪项是不合法的（）','["class", "$double", "HelloWorld", "BigMeaninglessName"]',NULL,'A',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'以下由for语句构成的循环执行的次数是
for(int i=0;i>0;i++){};','["\\u6709\\u8bed\\u6cd5\\u9519\\uff0c\\u4e0d\\u80fd\\u6267\\u884c", "\\u65e0\\u9650\\u6b21", "\\u6267\\u884c1\\u6b21", "\\u4e00\\u6b21\\u4e5f\\u4e0d\\u6267\\u884c"]',NULL,'D',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下列关于for循环和while循环的说法中哪个是正确的？（）','["while\\u5faa\\u73af\\u4e2d\\u4e0d\\u80fd\\u4f7f\\u7528continue\\u8bed\\u53e5\\uff0cfor\\u5faa\\u73af\\u4e2d\\u53ef\\u4ee5\\u4f7f\\u7528\\uff1b", "while\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u4e0d\\u80fd\\u7701\\u7565\\uff0cfor\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u53ef\\u4ee5\\u7701\\u7565\\uff1b", "while\\u5faa\\u73af\\u8bed\\u53e5\\u524d\\u4e0d\\u80fd\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff0cfor\\u5faa\\u73af\\u53ef\\u4ee5\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff1b", "\\u4ee5\\u4e0a\\u5168\\u90fd\\u4e0d\\u5bf9"]',NULL,'B',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'执行如下程序代码
int i=10;
do {i/=2;} while(i>1);
执行后，i的值是（）','["1", "5", "2", "0"]',NULL,'A',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'在创建对象时必须（）','["\\u5148\\u58f0\\u660e\\u5bf9\\u8c61\\uff0c\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61\\uff0c\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4\\uff0c\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61\\uff0c\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4\\uff0c\\u5bf9\\u5bf9\\u8c61\\u521d\\u59cb\\u5316\\uff0c\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u4e0a\\u8ff0\\u8bf4\\u6cd5\\u90fd\\u5bf9"]',NULL,'C',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下面方法定义中，不正确的是（）','["float x(int a,int b){return a-b;}", "int x(int a,int b){return a-b;}", "int x(int a,int b){return a*b;}", "int x(int a,int b){return 1.2*(a-b);}"]',NULL,'D',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下面类的定义中正确的是？','["class A", "class 2A", "int class A", "public class A()"]',NULL,'A',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下列哪种说法是正确的（）','["class\\u4e2d\\u7684\\u6784\\u9020\\u65b9\\u6cd5\\u4e0d\\u53ef\\u7701\\u7565", "\\u6784\\u9020\\u65b9\\u6cd5\\u5fc5\\u987b\\u4e0eclass\\u540c\\u540d\\uff0c\\u4f46\\u65b9\\u6cd5\\u4e0d\\u80fd\\u4e0eclass\\u540c\\u540d", "\\u6784\\u9020\\u65b9\\u6cd5\\u5728\\u4e00\\u4e2a\\u5bf9\\u8c61\\u88abnew\\u65f6\\u6267\\u884c", "\\u4e00\\u4e2aclass\\u53ea\\u80fd\\u5b9a\\u4e49\\u4e00\\u4e2a\\u6784\\u9020\\u65b9\\u6cd5"]',NULL,'C',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下面哪个关键字用来修饰常量（）','["static", "final", "public", "private"]',NULL,'B',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'继承的关键字是（）','["extend", "extends", "Extend", "Extends"]',NULL,'B',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'关于继承的特征，正确的说法是（）','["\\u4e00\\u4e2a\\u7c7b\\u53ef\\u4ee5\\u7ee7\\u627f\\u591a\\u4e2a\\u7236\\u7c7b", "\\u4e00\\u4e2a\\u7c7b\\u53ef\\u4ee5\\u5177\\u6709\\u591a\\u4e2a\\u5b50\\u7c7b", "\\u5b50\\u7c7b\\u53ef\\u4ee5\\u4f7f\\u7528\\u7236\\u7c7b\\u7684\\u6240\\u6709\\u65b9\\u6cd5", "\\u5b50\\u7c7b\\u5fc5\\u987b\\u8986\\u76d6\\u7236\\u7c7b\\u7684\\u5168\\u90e8\\u65b9\\u6cd5"]',NULL,'B',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'关于以下代码的说明正确的是（）
1. class HasStatic{
2.   private static int x=100;
3.   public static void main(String args[]){
4.     HasStatic hs1=new HasStatic();
5.     hs1.x++;
6.     HasStatic hs2=new HasStatic();
7.     hs2.x++;
8.     hs1=new HasStatic();
9.     hs1.x++;
10.    HasStatic.x--;
11.    System.out.println("x="+x);
12.  }
13. }','["\\u884c5\\u4e0d\\u80fd\\u901a\\u8fc7\\u7f16\\u8bd1\\uff0c\\u56e0\\u4e3a\\u5f15\\u7528\\u4e86\\u79c1\\u6709\\u9759\\u6001\\u53d8\\u91cf", "\\u884c10\\u4e0d\\u80fd\\u901a\\u8fc7\\u7f16\\u8bd1\\uff0c\\u56e0\\u4e3ax\\u662f\\u79c1\\u6709\\u9759\\u6001\\u53d8\\u91cf", "\\u7a0b\\u5e8f\\u901a\\u8fc7\\u7f16\\u8bd1\\uff0c\\u8f93\\u51fa\\u7ed3\\u679c\\u4e3a\\uff1ax=103", "\\u7a0b\\u5e8f\\u901a\\u8fc7\\u7f16\\u8bd1\\uff0c\\u8f93\\u51fa\\u7ed3\\u679c\\u4e3a\\uff1ax=102"]',NULL,'D',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'覆盖与重载的关系是（）','["\\u8986\\u76d6\\u53ea\\u6709\\u53d1\\u751f\\u5728\\u7236\\u7c7b\\u4e0e\\u5b50\\u7c7b\\u4e4b\\u95f4\\uff0c\\u800c\\u91cd\\u8f7d\\u53ef\\u4ee5\\u53d1\\u751f\\u5728\\u540c\\u4e00\\u4e2a\\u7c7b\\u4e2d", "\\u8986\\u76d6\\u65b9\\u6cd5\\u53ef\\u4ee5\\u4e0d\\u540c\\u540d\\uff0c\\u800c\\u91cd\\u8f7d\\u65b9\\u6cd5\\u5fc5\\u987b\\u540c\\u540d", "final\\u4fee\\u9970\\u7684\\u65b9\\u6cd5\\u53ef\\u4ee5\\u88ab\\u8986\\u76d6\\uff0c\\u4f46\\u4e0d\\u80fd\\u88ab\\u91cd\\u8f7d", "\\u8986\\u76d6\\u4e0e\\u91cd\\u8f7d\\u662f\\u540c\\u4e00\\u56de\\u4e8b"]',NULL,'A',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'下面关于抽象类的描述错误的是（）','["\\u62bd\\u8c61\\u7c7b\\u7684\\u4fee\\u9970\\u7b26\\u53ef\\u4ee5\\u662fpublic", "\\u62bd\\u8c61\\u7c7b\\u4e2d\\u7684\\u4fee\\u9970\\u7b26\\u53ef\\u4ee5\\u662f\\u9ed8\\u8ba4\\u7684", "\\u62bd\\u8c61\\u7c7b\\u4e2d\\u53ef\\u4ee5\\u6709\\u62bd\\u8c61\\u65b9\\u6cd5\\uff0c\\u4e5f\\u53ef\\u4ee5\\u6709\\u975e\\u62bd\\u8c61\\u65b9\\u6cd5", "\\u62bd\\u8c61\\u7c7b\\u4e2d\\u53ef\\u4ee5\\u6709\\u62bd\\u8c61\\u65b9\\u6cd5\\uff0c\\u4f46\\u4e0d\\u80fd\\u6709\\u975e\\u62bd\\u8c61\\u65b9\\u6cd5"]',NULL,'D',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'在调用方法时，若要使方法改变实参的值，可以（）','["\\u7528\\u57fa\\u672c\\u6570\\u636e\\u7c7b\\u578b\\u4f5c\\u4e3a\\u53c2\\u6570", "\\u7528\\u5bf9\\u8c61\\u4f5c\\u4e3a\\u53c2\\u6570", "A\\u548cB\\u90fd\\u5bf9", "A\\u548cB\\u90fd\\u4e0d\\u5bf9"]',NULL,'B',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'以下哪一个方法的定义是正确的（）','["interface B {void print() {}; }", "abstract interface B { void print(); }", "abstract interface B extends A1, A2 { abstract void print() {}; }", "interface B { void print(); }"]',NULL,'D',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'在一个应用程序中定义了数组a: int[] a={1,2,3,4,5,6,7,8,9,10};为了打印输出数组a的最后一个数组元素，下面正确的代码是？','["System.out.println(a[10]);", "System.out.println(a[9]);", "System.out.println(a[a.length]);", "System.out.println(a(8));"]',NULL,'B',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'String str = "welcome", 则 str.substring(1, 4) 的输出结果是','["welc", "elco", "elc", "elcm"]',NULL,'C',1,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'功能：创建一个Circle类，此类中包括一个半径属性radius和一个计算面积的方法findArea。
      在main方法中创建Circle类的对象c，并计算半径为5的圆的面积。',NULL,'public class Book {
    double radius;
    double findArea() {
        return 3.14*radius*radius;
    }

    public static void main(String[] args){
        /**********SPACE**********/
        【?】;
        c.radius = 5.0;
        /**********SPACE**********/
        System.out.println(【?】);
    }
}','=======(答案1)=======
Circle c = new Circle()
=======(答案2)=======
c.findArea()',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Telephone {
    /**********SPACE**********/
    【?】 {
        change = 50;
    }
    Telephone(double change){
    /**********SPACE**********/
        【?】 = change;
    }
}','=======(答案1)=======
Telephone()
=======(答案2)=======
this.change',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'功能：定义绝对值的方法abs()，该方法的功能是实现：如果参数为正数，又返回参数的绝对值；如果参数为负数，又返回参数的绝对值。',NULL,'public class Test1 {
    public int abs(int n) {
    /**********SPACE**********/
        if(【?】)
            return n;
        else
            return -n;
    }
    /**********SPACE**********/
    public double abs(double 【?】) {
        if(n<=0)
            return -n;
        else
            return n;
    }
}','=======(答案1)=======
n <= 0
=======(答案2)=======
n',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'功能：定义一个抽象类，包含求面积的抽象方法',NULL,'/**********SPACE**********/
public 【?】 class Test {
    /**********SPACE**********/
    public abstract double area()【?】
}','=======(答案1)=======
abstract
=======(答案2)=======
;',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'功能：下面定义一个接口，完成程序填空',NULL,'/**********SPACE**********/
public 【?】 ITF {
    final double PI = Math.PI;
/**********SPACE**********/
    public abstract double area(double a, double b)【?】
}','=======(答案1)=======
interface
=======(答案2)=======
;',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'功能：编写一个方法isHuiWen(String s)，检查一个字符串是否为回文。',NULL,'public static boolean isHuiWen(String str) {
    /**********SPACE**********/
    for (int i = 0; i < 【?】; i++) {
        if (str.charAt(i) != str.charAt(str.length() - 1 - i)) {
            return false;
        }
    }
    /**********SPACE**********/
    【?】;
}','=======(答案1)=======
str.length()
=======(答案2)=======
return true;',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'题目：写一个方法，输出任意一个整数',NULL,'public void printReverse(int a) {
    int b;
/**********FOUND**********/
    while(a == 0) {
        b = a%10;
/**********FOUND**********/
        a = a%10;
        System.out.print(b);
    }
}','=======(答案1)=======
while(a != 0)
=======(答案2)=======
a = a / 10;',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'题目：下面是一个类的定义，请修改程序中的错误。',NULL,'class Student {
    String name;
    int age;
/**********FOUND**********/
    Student(char s,int i) {
        name = s;
/**********FOUND**********/
        age = this.i;
    }
}','=======(答案1)=======
public Student(String s,int i)
=======(答案2)=======
this.age = i;',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'题目：定义一个学生类，其中属性有学号、类号和专业，方法有对属性进行访问的方法，请改正程序的错误。',NULL,'class Student {
/**********FOUND**********/
    private int number;
    private String major;

    public int getMajor() {
/**********FOUND**********/
        return number;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNumber() {
        return number;
    }

}','=======(答案1)=======
private String number;
=======(答案2)=======
return major;',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'题目：找出下面代码的错误',NULL,'/**********FOUND**********/
class SuperClass {
    public abstract void fun();
}

class SubClass extends SuperClass {
/**********FOUND**********/
    void fun() {
        System.out.println("SubClass''s fun()");
    }
}','=======(答案1)=======
abstract class SuperClass
=======(答案2)=======
public void fun()',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'KTA_O18框架的设计与定义
KTA_O19重用主程序框架
假设你是一位赛车游戏开发人员。在游戏中有汽车类Car，它有一个动力系统Power接口，接口中有输出动力outputPowerO方法和补充能源recharge0方法。
动力系统有两种实现方式:1、汽油Oil;2、电力Electricity。汽油实现方式中有:0il95、Oi98等方式。电力实现方式中有:氢能Hydrogen和锂电Lithium等方式。
请基于以上业务背景，设计Java类并实现相应功能。
运行Test程序的输出结果如下:
汽车启动了
汽车行驶中
输出动力:95.0
加95号汽油
汽车停止了
汽车启动了
汽车行驶中
输出动力:120.0
加氢
汽车停止了
//测试代码
public class Progl{
    public static void main(String[] args) {
        Car car = new Car();
        car.setBrand("奔驰");
        Power oil = new Oil950;
        car.setPower(oil);
        car.start();
        car.run();
        System.out.printIn("输出动力 :" + car.getPower().outputPower());
        car.getPower().recharge();
        car.stop();
        car.setPower(new Hydrogen());
        car.start();
        car.run();
        System.out.println("输出动力 :"+ car.getPower().outputPower());
        car.getPower().recharge();
        car.stop();
    }
}
类图说明:
可见性修饰符:
-代表private (本类可见)，#代表protected(本包及子类可见)，+代表public(任何位置可见)
类名斜体字代表抽象类
方法名斜体字代表抽象方法
Car类:
    -属性:
        -brand:汽车品牌，String类型，可读写
        -power:动力系统，Power类型，可读写
    -方法:
        -start():启动汽车，输出"汽车启动了"，无返回值run():汽车行驶，输出"汽车行驶中"，无返回值
        -stop():停止汽车，输出"汽车停止了"，无返回值
Power接口:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -recharge():补充能源，无参数，无返回值
Oi抽象类:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -addOil():加油，无参数，无返回值
        -recharge():补充能源，无参数，无返回值
Electricity抽象类:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -recharge():充电，无参数，无返回值
Oil95类:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -addOil():加95号汽油，无参数，无返回值
Oil98类:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -addOil():加98号汽油，无参数，无返回值
Hydrogen类:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -recharge0:加氢，无参数，无返回值
Lithium类:
    -方法:
        -outputPower():输出动力，无参数，返回值为double类型
        -recharge0:充电，无参数，无返回值',NULL,'import java.util.Scanner;

//测试代码
public class Progl{
    public static void main(Stringll args) {
        Car car = new Car();
        car.setBrand("奔驰");
        Power oil = new Oil95();
        car.setPower(oil);
        car.start();
        car.run();
        System.out.println("输出动力:"+car.getPower().outputPower());
        car.getPower().recharge();
        car.stop();
        car.setPower(new Hydrogen());
        car.start();
        car.run();
        System.out.println("输出动力:"+ car.getPower().outputPower());
        car.getPower().recharge();
        car.stop();
    }
}
/**********Program**********/

/**********  End  **********/','interface Power {
    double outputPower();
    void recharge();
}
abstract class oil implements Power {
    public abstract double outputPower();
    public abstract void addOil();
    @Override
    public void recharge() {
        addOil();
    }
}
class Oil95 extends Oil {
    public double outputPower() {
        return 95.0;
    }
    public void addOil() {
        System.out.println("加95号汽油");
    }
}
class Oil98 extends Oil {
    public double outputPower() {
        return 98.0;
    }
    public void addOil() {
        System.out.println("加98号汽油");
    }
}
abstract class Electricity implements Power {
    public abstract double outputPower();
    public abstract void recharge();
}
class Hydrogen extends Electricity {
    public double outputPower() {
        return 120.0
    }
    public void recharge() {
        System.out.println("加氢");
    }
}
class Lithium extends Electricity {
    public double outputPower() {
        return 100.0;
    }
    public void recharge() {
        System.out.println("充电");
    }
}
public class Car {
    private String brand;
    private Power power;
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Power getPower() {
        return power;
    }
    public void setPower(Power power) {
        this.power = power;
    }
    public void start() {
        System.out.println("汽车启动了");
    }
    public void run() {
        System.out.printIn("汽车行驶中");
    }
    public void stop() {
        System.out.printIn("汽车停止了");
    }
}',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'题目:药物与处方药的核心类设计与实现
业务描述:
在健康领域，药物(Medicine)是基础类，包含名称和用途属性。处方药(PrescriptionMedicine)是药物的子类，它有一个额外的属性:处方编号。
题目要求:
(1)创建一个Medicine类，包含私有的名称String name和用途属性String use。
(2)创建一个PrescriptionMedicine类, 继承自Medicine类,并添加处方编号属性String prescriptionNumber.
(3)在PrescriptionMedicine类中，覆盖use0方法，使其在使用药物前验证处方编号是否为空，如果为空，则提示:“处方编号无效，无法使用药物:XXX药物名称"，如果不为空则输出编号、名称及用途信息。
(4)在主程序中，创建药物和处方药对象，并调用use()方法模拟使用药物。',NULL,'/**********Program**********/

/**********  End  **********/
//主程序
public class Progl{
    public static void main(String[] args) {
        //创建药物对象
        Medicine medicine = new Medicine("普通感冒药","治疗普通感冒");
        //创建处方药对象
        PrescriptionMedicine prescriptionMedicine = new PrescriptionMedicine("抗生", "治细感染", "RX123456");
        //模拟使用药物
        medicine.use();
        System.out.println("----------");
        prescriptionMedicine.use();
    }
}','class Medicine {
    private String name;
    private String use;

    public Medicine(String name, String use) {
        this.name = name;
        this.use = use;
    }

    pbulic String getName() {
        return name;
    }

    public String getUse() {
        return use;
    }

    public void use() {
        System.out.println("使用药物：" + name);
        System.out.println("用途" + use);
    }
}

class PrescriptionMedicine extends Medicine {
    private String prescriptionNumber;
    public PrescriptionMedicine(String name, String use, String prescriptionNumber) {
        super(name,use);//调用父类构造方法
        this.prescriptionNumber = prescriptionNumber;
    }
    //获取处方编号
    public String getPrescriptionNumberO {
        return prescriptionNumber;
    }
    //覆盖父类的use方法，添加验证处方编号的逻辑
    @Override
    public void use() {
        if (prescriptionNumber != null && !prescriptionNumber.isEmpty()) {
            System.out.printIn("验证方编号:" + prescriptionNumber);
            System.out.println("处方药使用:"+getName0);
            System.out.printIn("用途:" + getUse());
        } else {
            System.out.println("处方编号无效，无法使用药物:"+getName());
        }
    }
}',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'(ArrayList)按要求完成题目编写:
1)创建ArrayList对象list, 添加三个Integer对象s1,s2,s3,值分别为20,21,22
2)通过for循环对ist进行遍历，输出全部Integer的值
3)查找是否包含s1，如果存在，删除
4)通过foreach循环对list进行遍历，输出Integer的值',NULL,'import java.util.*;
public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public static void main(Stringll args) {
    ArrayList<Integer> list = new ArrayList<Integer> ():
    Integer sl = 20;
    Integer s2 = 21;
    Integer s3 = 22;
    list.add(sl);
    list.add(s2);
    list.add(s3);
    for (int i=0;i<list.size();i++){
        System.out.println(list.get(i));
        if (list.contains(s1)){
            list.remove(sl);
        }
        for (Integer s : list) {
            System.out.println(s);
        }
    }
}',4,'2026-03-29 11:12:05','2026-03-29 11:12:05'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '107' LIMIT 1),'题目:定义一个表示图书的类Book,该类的属性包括name(书名)、author (作者名)、price (书的价格)，定义输出图书基本信息的show方法。
编写测试类，创建Book类的一个对象b，调用show方法，运行结果如下:
书名:红楼梦
作者:曹雪芹
价格:65.0',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','class Book{
    String name;
    String author;
    double price;
    public void show(){
        System.out.println("书名是"+name);
        System.out.println("作者是"+author);
        System.out.println("价格是"+price);
    }
}

public class Progl{
    public static void main(String[] args) {
        Book b = new Book();
        b.author="曹雪芹";
        b.name="红楼梦";
        b.price=65;
        b.show();
    }
}
1',4,'2026-03-29 11:12:05','2026-03-29 11:12:05');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '107';
