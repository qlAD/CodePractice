-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列数据类型的精度由高到低的顺序是()','["float,double,int,long", "double,float,int,byte", "byte,long,double,float", "double,int,float,long"]',NULL,'B

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'Java application中的主类包含main方法，main方法的返回类型是什么？()','["int", "float", "void", "double"]',NULL,'C

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'定义变量int x=3;那么表达式x/6*5的计算结果是()','["0", "1", "2.5", "2"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'对于一个三位的正整数n，取出它的十位数字k(k为整型)的表达式是()','["k = n / 10 % 10", "k = n % 10 % 10", "k = n % 10", "k = n / 10"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列不可作为Java语言标识符的是()','["a2", "$2", "_2", "22"]',NULL,'D

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'有以下代码,其中变量可能的类型是
switch(i){ default:System.out.println("hello");}','["byte", "long", "double", "A and B"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列语句序列执行后,k的值是
int i=4,j=5,k=9,m=5;
if(i > j || m < k) k++;
else k--;','["5", "9", "8", "10"]',NULL,'D

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列关于for循环和while循环的说法中哪个是正确的？()','["while\\u5faa\\u73af\\u4e2d\\u4e0d\\u80fd\\u4f7f\\u7528continue\\u8bed\\u53e5\\uff0cfor\\u5faa\\u73af\\u4e2d\\u53ef\\u4ee5\\u4f7f\\u7528\\uff1b", "while\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u4e0d\\u80fd\\u7701\\u7565\\uff0cfor\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u53ef\\u4ee5\\u7701\\u7565\\uff1b", "while\\u5faa\\u73af\\u8bed\\u53e5\\u524d\\u4e0d\\u80fd\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff0cfor\\u5faa\\u73af\\u53ef\\u4ee5\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff1b", "\\u4ee5\\u4e0a\\u5168\\u90fd\\u4e0d\\u5bf9"]',NULL,'B

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列语句序列执行后,i的值是
int i=10;
do{ i/=2; }while(i>1);','["1", "5", "2", "0"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下面方法定义中,正确的是:','["int x(){char ch=''a'';return (int)ch;}", "void x(){return true;}", "int x(){return true;}", "int x(int a,b){return a-b;}"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'在创建对象时必须()','["\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u5bf9\\u5bf9\\u8c61\\u521d\\u59cb\\u5316,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u4e0a\\u8ff0\\u8bf4\\u6cd5\\u90fd\\u5bf9"]',NULL,'C

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'类Test1, Test2定义如下:
1. public class Test1{
2.   public float aMethod(float a, float b) throws
3.   IOException{ }
4. }
5. public class Test2 extends Test1{
6.
7. }
将以下哪种方法插入行6是不合法的。','["float aMethod(float a, float b ){}", "public int aMethod(int a, int b) throws Exception{}", "public float aMethod(float p, float q){}", "public int aMethod(int a, int b ) throws IOException{}"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列不属于面向对象的三大特征的是？','["\\u7ee7\\u627f", "\\u65b9\\u6cd5", "\\u5c01\\u88c5", "\\u591a\\u6001"]',NULL,'B

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'有一个类A，以下为其构造方法的声明，其中正确的是？','["void A(int x)", "A(int x)", "a(int x)", "void a(int x)"]',NULL,'B

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'以下关于构造函数的描述错误的是？','["\\u6784\\u9020\\u51fd\\u6570\\u7684\\u8fd4\\u56de\\u7c7b\\u578b\\u53ea\\u80fd\\u662fvoid\\u578b", "\\u6784\\u9020\\u51fd\\u6570\\u662f\\u7c7b\\u7684\\u4e00\\u79cd\\u7279\\u6b8a\\u51fd\\u6570\\uff0c\\u5b83\\u7684\\u65b9\\u6cd5\\u540d\\u5fc5\\u987b\\u4e0e\\u7c7b\\u540d\\u76f8\\u540c", "\\u6784\\u9020\\u51fd\\u6570\\u7684\\u4e3b\\u8981\\u4f5c\\u7528\\u662f\\u5b8c\\u6210\\u5bf9\\u7c7b\\u7684\\u5bf9\\u8c61\\u7684\\u521d\\u59cb\\u5316\\u5de5\\u4f5c", "\\u4e00\\u822c\\u5728\\u521b\\u5efa\\u65b0\\u5bf9\\u8c61\\u65f6\\uff0c\\u7cfb\\u7edf\\u4f1a\\u81ea\\u52a8\\u8c03\\u7528\\u6784\\u9020\\u51fd\\u6570"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下列对构造方法的调用方式的描述中正确的是？','["\\u4f7f\\u7528new\\u8c03\\u7528", "\\u4f7f\\u7528\\u7c7b\\u540d\\u8c03\\u7528", "\\u4f7f\\u7528\\u5bf9\\u8c61\\u540d\\u8c03\\u7528", "\\u8c03\\u7528\\u65b9\\u6cd5\\u4e3a\\u5bf9\\u8c61\\u540d.\\u65b9\\u6cd5\\u540d()"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'下面哪个关键字用来修饰静态()','["static", "protected", "public", "private"]',NULL,'A

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'假设A类有如下定义，设a是A类的一个实例，下列语句调用哪个是错误的？
class A{
    int i;
    static String s;
    void method1(){}
    static void method2(){}
}','["System.out.println(a.i);", "a.method1();", "A.method1();", "A.method2();"]',NULL,'C

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'若在某个类中定义如下的方法:static void testMethod() 该方法属于？','["\\u672c\\u5730\\u65b9\\u6cd5", "\\u6700\\u7ec8\\u65b9\\u6cd5", "\\u9759\\u6001\\u65b9\\u6cd5", "\\u62bd\\u8c61\\u65b9\\u6cd5"]',NULL,'C

---',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'设X是已定义的类名，下列声明X类的对象x1的语句中正确的是()','["static X x1(123);", "public X x1=new X(123);", "Y x1;", "X x1=X();"]',NULL,'B',1,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'功能：创建一个Circle类，此类中包括一个半径属性radius和一个计算周长的方法findLong。
在main方法中创建Circle类的对象c，并计算半径为10的圆的周长。',NULL,'public class Circle {
    double radius;
    double findLong(){
        return 2*Math.PI*radius;
    }
public static void main(String[] args){
/**********SPACE**********/
    【?】;
    c.radius=10.0;
/**********SPACE**********/
    System.out.println(【?】);
}
}','=======(答案1)=======
Circle c = new Circle()
=======(答案2)=======
c.findLong()

---',5,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'功能：创建一个Dog类，此类中包括1个大小属性size。在main方法中创建Dog类的对象d，并设置其大小为8。',NULL,'class Dog {
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

---',5,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'功能：创建一个Telephone类，属性有电话费charge，还有2个构造方法，其中一个没有参数，一个带参数。',NULL,'public class Telephone {
    double charge;
/**********SPACE**********/
    【?】 {
        charge=50.5;
    }
    Telephone(double charge){
/**********SPACE**********/
        【?】 = charge;
    }
}','=======(答案1)=======
Telephone()
=======(答案2)=======
this.charge

---',5,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数。',NULL,'public class Telephone {
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
this.brand',5,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'题目:蒙特卡罗模拟使用随机数和概率来解决问题。这个方法在数学、物理、化学和财经方面有很广的应用。
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

---',10,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'题目:定义一个汽车类，成员变量有载客人数、重量和颜色。方法有输出所有成员变量的方法。
定义一个测试类，创建一个汽车，输出该汽车的所有信息。',NULL,'class Vehicle {
    int passengers;
    double weight;
/**********FOUND**********/
    public outputInfo() {
        System.out.println("passengers=" + passengers);
        System.out.println("weight=" + weight);
        System.out.println("color=" + color);
    }
    public static void main(String[] args) {
        Vehicle v1 = new Vehicle();
/**********FOUND**********/
    outputInfo()
    }
}','=======(答案1)=======
public void outputInfo() {
=======(答案2)=======
v1.outputInfo();',10,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'题目：使用for循环语句实现计算并输出1-100的奇数和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
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

---',10,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'题目:使用for循环和if语句实现输出1到100中能被7整除或者个位数是7的数字，循环变量名为i',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    public static void main(String[] args) {
        for(int i=1;i<=100;i++){
            if(i % 7 == 0 || i % 10 == 7){
                System.out.println(i);
            }
        }
    }
}

---',10,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'题目:设计一个描述二维平面上点的类Point，要求如下：
(a)该类需要描述点的双精度浮点型的横坐标x和纵坐标y。
(b)提供能够初始化横纵坐标的有参构造方法，要求参数名称与属性同名。
(c)计算两点间距离的方法distance。
提示:两点之间距离等于两点横纵坐标之差的平方和再开方
Math类中求平方根的方法:static double sqrt(double a)',NULL,'/**********Program**********/

/**********  End  **********/

public class Progl{
    public static void main(Stringll args) {
        Point p1=new Point(2,3);
        Point p2=new Point(4,5);
        System.out.printIn("两个点的距离:"+p1.distance(p2));
    }
}','class Point{
    double x;
    double y;
    public Point(double x,double y){
        this.x = x;
        this.y = y;
    }
    public double distance(Point p){
        return Math.sqrt((x-p.x)*(x-p.x)+(y-p.y)*(y-p.y));
    }
}

---',10,'2026-03-29 12:29:36','2026-03-29 12:29:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '205' LIMIT 1),'题目:定义一个教师类Teacher，要求如下:
(a)教师的姓名(name,String类型)，所授课程(course,String类型)，课时数量(courseNum,double类型)和课时系数(radio，double类型)，所有教师的课时系数相同。属性均是私有的。
(b)提供一个有参的构造方法(要求包括姓名，所授课程，课时数量)。
(c)为私有属性提供访问器方法。
(d)定义一个计算课时当量的courseCompute方法(课时当量=课时量*系数)，返回值类型为double。
(e)定义一个计算课时费的moneyCompute()方法(课时费=课时当量*钱数，如果当量超过100，每课时30元，当量不超过100每课时20元)
(f)要求所有方法都是共有的',NULL,'/**********Program**********/

/**********  End  **********/
public class Progl{
    public static void main(String[] args) {
        Teacher.setRadio(1.2);
        Teacher t1=new Teacher("张三","Java",64.0);
        System.out.println(t1.getName()+" "+t1.getCourse()+" "+t1.getCourseNum());
        double num=tl.courseCompute();
        System.out.println("课时当量:"+num);
        System.out.println("课时费:"+t1.moneyCompute());
    }
}','class Teacher {
    private String name;
    private String course;
    private double courseNum;
    private static double radio;
    public Teacher(String name,String course,double courseNum){
        this.name=name;
        this.course=course;
        this.courseNum=courseNum;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setCourse(String course) {
        this.course = course;
    }
    public void setCourseNum(double courseNum) {
        this.courseNum = courseNum;
    }
    public static void setRadio(double radio) {
        Teacher.radio = radio;
    }
    public String getName(){
        return name;
    }
    public String getCourse() {
        return course;
    }
    public double getCourseNum() {
        return courseNum;
    }
    public static double getRadio() {
        return radio;
    }
    public double courseCompute() {
        return courseNum*radio;
    }
    public double moneyCompute() {
        if(this.courseCompute()>100){
            return (courseCompute()-100)*30+100*20;
        } else {
            return this.courseCompute()*20;
        }
    }
}',10,'2026-03-29 12:29:36','2026-03-29 12:29:36');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '205';
