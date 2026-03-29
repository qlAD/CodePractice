-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'定义变量int x=3;那么表达式i/6*5的计算结果是()','["0", "1", "2.5", "2"]',NULL,'A

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'Java是从（）语言改进重新设计。','["Ada", "C++", "Pascal", "BASIC"]',NULL,'B

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'对于一个三位的正整数n，取出它的十位数字k(k为整型)的表达式是()','["k = n / 10 % 10", "k = n % 10 % 10", "k = n % 10", "k = n / 10"]',NULL,'A

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'Java application中的主类需包含main方法，main方法的返回类型是什么？()','["int", "float", "void", "double"]',NULL,'C

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'整型数据类型中，需要内存空间最少的是()','["short", "long", "int", "byte"]',NULL,'D

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'下列语句序列执行后,m的值是
int i=10,j=9;
while(i>j) i--;
m=i;','["15", "120", "60", "0"]',NULL,'B

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'有以下代码,其中变量可能的类型是
switch(i){ default:System.out.println("hello");}','["byte", "long", "double", "A and B"]',NULL,'A

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'以下for循环的执行次数是:
for(int x=0;(x==4)&(x<4);x++);','["\\u65e0\\u9650\\u6b21", "\\u4e00\\u6b21\\u4e5f\\u4e0d\\u6267\\u884c", "4\\u6b21", "3\\u6b21"]',NULL,'B

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'Java支持的3种跳转语句不包括','["break\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "return\\u8bed\\u53e5", "goto\\u8bed\\u53e5"]',NULL,'D

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'关于以下application的说明，正确的是()
1. class StaticStuff
2. {
3.   static int x=10;
4.   static { x+=5;}
5.   public static void main (String args[ ])
6.   {
7.     System.out.println("x="+x);
8.   }
9.   static {x/=3;}
10. }','["4\\u884c\\u4e0e9\\u884c\\u4e0d\\u80fd\\u901a\\u8fc7\\u7f16\\u8bd1\\uff0c\\u56e0\\u4e3a\\u7f3a\\u5c11\\u65b9\\u6cd5\\u540d\\u548c\\u8fd4\\u56de\\u7c7b\\u578b", "9\\u884c\\u4e0d\\u80fd\\u901a\\u8fc7\\u7f16\\u8bd1\\uff0c\\u56e0\\u4e3a\\u53ea\\u80fd\\u6709\\u4e00\\u4e2a\\u9759\\u6001\\u521d\\u59cb\\u5316\\u5668", "\\u7f16\\u8bd1\\u901a\\u8fc7\\uff0c\\u6267\\u884c\\u7ed3\\u679c\\u4e3a:x=5", "\\u7f16\\u8bd1\\u901a\\u8fc7\\uff0c\\u6267\\u884c\\u7ed3\\u679c\\u4e3a:x=3"]',NULL,'C

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'若在某一个类定义中定义有如下的方法:static void testMethod() 该方法属于？','["\\u672c\\u5730\\u65b9\\u6cd5", "\\u6700\\u7ec8\\u65b9\\u6cd5", "\\u9759\\u6001\\u65b9\\u6cd5", "\\u62bd\\u8c61\\u65b9\\u6cd5?"]',NULL,'C

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'下面方法定义中,不正确的是:','["float x(int a,int b){return a-b;}", "int x(int a,int b){return a-b;}", "int x(int a,int b){return a*b;}", "int x(int a,int b){return 1.2*(a-b);}"]',NULL,'D

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'下面正确的main方法是()','["public static void main(String args)", "public static int main(String[] args)", "public static void main(String[] args)", "public final void main(String args)"]',NULL,'C

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'以下关于构造函数的描述错误的是（）','["\\u6784\\u9020\\u51fd\\u6570\\u7684\\u8fd4\\u56de\\u7c7b\\u578b\\u53ea\\u80fd\\u662fvoid\\u578b\\u3002", "\\u6784\\u9020\\u51fd\\u6570\\u662f\\u7c7b\\u7684\\u4e00\\u79cd\\u7279\\u6b8a\\u51fd\\u6570\\uff0c\\u5b83\\u7684\\u65b9\\u6cd5\\u540d\\u5fc5\\u987b\\u4e0e\\u7c7b\\u540d\\u76f8\\u540c\\u3002", "\\u6784\\u9020\\u51fd\\u6570\\u7684\\u4e3b\\u8981\\u4f5c\\u7528\\u662f\\u5b8c\\u6210\\u5bf9\\u7c7b\\u7684\\u5bf9\\u8c61\\u7684\\u521d\\u59cb\\u5316\\u5de5\\u4f5c\\u3002", "\\u4e00\\u822c\\u5728\\u521b\\u5efa\\u65b0\\u5bf9\\u8c61\\u65f6\\uff0c\\u7cfb\\u7edf\\u4f1a\\u81ea\\u52a8\\u8c03\\u7528\\u6784\\u9020\\u51fd\\u6570\\u3002"]',NULL,'A

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'this在程序中代表的是？','["\\u7c7b\\u7684\\u5bf9\\u8c61", "\\u5c5e\\u6027", "\\u65b9\\u6cd5", "\\u7236\\u7c7b"]',NULL,'A

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'有一个类A，以下为其构造方法的声明，其中正确的是？','["void A(int x)", "A(int x)", "a(int x)", "void a(int x)"]',NULL,'B

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'假设A类有如下定义,设a是A类的一个实例,下列语句调用哪个是错误的?
class A{
    int i;
    static String s;
    void method1(){}
    static void method2(){}
}','["System.out.println(a.i);", "a.method1();", "A.method1();", "A.method2();"]',NULL,'C

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'下列关于静态方法的描述中,错误的是','["\\u9759\\u6001\\u65b9\\u6cd5\\u6307\\u7684\\u662f\\u88abstatic\\u5173\\u952e\\u5b57\\u4fee\\u9970\\u7684\\u65b9\\u6cd5", "\\u9759\\u6001\\u65b9\\u6cd5\\u4e0d\\u5360\\u7528\\u5bf9\\u8c61\\u7684\\u5185\\u5b58\\u7a7a\\u95f4,\\u800c\\u975e\\u9759\\u6001\\u65b9\\u6cd5\\u5360\\u7528\\u5bf9\\u8c61\\u7684\\u5185\\u5b58\\u7a7a\\u95f4", "\\u9759\\u6001\\u65b9\\u6cd5\\u5185\\u53ef\\u4ee5\\u4f7f\\u7528this\\u5173\\u952e\\u5b57", "\\u9759\\u6001\\u65b9\\u6cd5\\u5185\\u90e8\\u53ea\\u80fd\\u8bbf\\u95ee\\u88abstatic\\u4fee\\u9970\\u7684\\u6210\\u5458"]',NULL,'C

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'下列哪个关键字在定义类时用不到？','["class", "public", "extends", "int"]',NULL,'D

---',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'设X、Y均为已定义的类名，下列声明类X的对象x1的语句中正确的是？','["X x1 = new X();", "X x1 = X();", "X x1 = new Y();", "int X x1;"]',NULL,'AA',1,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'功能：创建一个Dog类，此类中包括1个大小属性size。在main方法中创建Dog类的对象d，并设置其大小为8。',NULL,'class Dog {
    int size;
    public static void main(String[] args){
/**********SPACE**********/
    【?】;
/**********SPACE**********/
    【?】 = 8;
}
}','=======(答案1)=======
Dog d = new Dog()
=======(答案2)=======
d.size

---',5,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'功能：定义一个接口',NULL,'public interface MyInterface { //定义一个接口
/**********SPACE**********/
    void【?】;
    void showMessage();
}
/**********SPACE**********/
public class MyClass 【?】 MyInterface { //MyClass类实现MyInterface接口
    @Override
    public void myMethod() {
        System.out.println(""This is a method from the interface");
    }
    @Override
    public void show showMessage() {
        System.out.println("Hello from MyClass!");
    }
}','=======(答案1)=======
myMethod()
=======(答案2)=======
implements

---',5,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'功能：创建一个Employee类，属性有员工姓名name，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Employee {
    String name;
/**********SPACE**********/
    【?】 {
        name="LiYang";
    }
    Employee(String name){
/**********SPACE**********/
        【?】 = name;
    }
}','=======(答案1)=======
Employee()
=======(答案2)=======
this.name

---',5,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Telephone {
    String brand;
/**********SPACE**********/
    【?】 {
        brand="Iphone6";
    }
    Telephone(String brand){
/**********SPACE**********/
        【?】 = brand;
    }
}','=======(答案1)=======
Telephone()
=======(答案2)=======
this.brand',5,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'题目:蒙特卡罗模拟使用随机数和概率来解决问题。这个方法在数学、物理、化学和财经方面有很广的应用。
使用蒙特卡罗模拟来估算pai值.为了使用蒙特卡罗方法来估算pai值，画出一个圆的外接正方形，假设这个圆的半径为1。
那么圆面积就是pai而外接正方形的面积是4。随机产生正方形中的一个点。
该点落在这个园内的概率为circleArea/squareArea(圆面积/正方形面积)=pai/4.
编写程序，在正方形内随机产生1000000个点，用numberOfHits表示落在园内的点。由此求出pai的近似值。',NULL,'public class MonteCarloSimulation {
    public static void main(String[] args) {
        final int NUMBER_OF_TRIALS = 1000000;
        int numberOfHits = 0;
        /**********FOUND**********/
        for(int i=0;i<numberOfHits;i++){
            double x = Math.random() * 2.0 - 1;
            double y = Math.random() * 2.0 - 1;
            if(x*x + y*y <= 1) {
                numberOfHits++;
            } 
        }
/**********FOUND**********/
        double pi = 4.0 * NUMBER_OF_TRIALS / numberOfHits;
        System.out.println("π = " + pi);
    }
}','=======(答案1)=======
for(int i=0;i<NUMBER_OF_TRIALS;i++){
=======(答案2)=======
double pi = 4.0 * numberOfHits / NUMBER_OF_TRIALS;

---',10,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'题目：下面是一个类的定义，请修改程序中的错误。',NULL,'class Car {
    private String brand;
    private double color;
    private double speed;
/**********FOUND**********/
    public Car(String brand,double color){
        this.brand = brand;
        this.color = color;
    }
}
public class Test {
    public static void main(String[] args){
/**********FOUND**********/
        Car obj = new Car("Nissan");
    }
}','=======(答案1)=======
public Car(String brand,String color){
=======(答案2)=======
Car obj = new Car("Nissan","黑色");',10,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'题目:编写一个应用程序，应用for循环计算整数n的阶乘，n的初始值为8，并将结果输出，循环变量名为i存放阶乘的变量名为p',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    public static void main(String[] args) {
        int p = 1;
        int n = 8;
        for (int i = 1; i <= n; i++) {
            p = p * i;
        }
        System.out.println("n的阶乘是" + p);
    }
}

---',10,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'题目：使用for循环语句实现计算并输出1-100的奇数和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    public static void main(String[] args) {
        int i, sum = 0;
        for(i=1;i<=100;i++){
            if(i % 2 != 0){
                sum = sum + i;
            }
        }
        System.out.println(sum);
    }
}

---',10,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'题目:定义一个名为Prog1的类，包含一个名为radius属性，类型为int，不带参数的构造方法和计算并输出面积方法findArea (面积=3.14*radius*radius )，在main方法中,创建Prog1类的一个对象c，调用findArea方法。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','int radius;
Prog1(){
    radius=10;
}
void findArea() {
    double area=3.14*radius*radius;
    System.out.println("面积是"+area);
}
public static void main(String[] args) {
    Progl c = new Prog1();
    c.findArea();
}

---',10,'2026-03-29 12:49:37','2026-03-29 12:49:37'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '206' LIMIT 1),'题目:定义一个MP3类，要求如下:
(a)属性包括:MP3品牌brand (String类型)、颜色color (String类型)和存储容量capacity(double类型)，并且所有属性为私有。
(b)至少提供一个有参的构造方法(要求品牌和颜色可以初始化为任意值，但存储容量的初始值必须为0)。
(c)为私有属性提供访问器方法。',NULL,'/**********Program**********/

/**********  End  **********/
public class Prog1{
    public static void main(String[] args){
        MP3 m1 = new MP3("ipod","white");
        m1.setCapacity(16.0);
    }
}','class MP3{
    private String brand;
    private String color;
    private double capacity;
    public MP3(String brand,String color){
        this.brand = brand;
        this.color = color;
        capacity = 0;
    }
    public double getCapacity(){
        return capacity;
    }
    public void setCapacity(double capacity){
        this.capacity = capacity;
    }
    public String getColor(){
        return color;
    }
    public void setColor(String color){
        this.color = color;
    }
    public String getBrand(){
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
}',10,'2026-03-29 12:49:37','2026-03-29 12:49:37');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '206';
