-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'关于数据类型转换的说法哪个是不正确的','["Java\\u5171\\u6709\\u4e24\\u79cd\\u6570\\u636e\\u7c7b\\u578b\\u7684\\u8f6c\\u6362\\u65b9\\u5f0f:\\u81ea\\u52a8\\u8f6c\\u6362\\u548c\\u5f3a\\u5236\\u8f6c\\u6362", "Java\\u4e2d\\u5f53\\u4e24\\u4e2a\\u7c7b\\u578b\\u4e0d\\u540c\\u7684\\u8fd0\\u7b97\\u5bf9\\u8c61\\u8fdb\\u884c\\u4e8c\\u5143\\u8fd0\\u7b97\\u65f6,Java\\u81ea\\u52a8\\u628a\\u7cbe\\u5ea6\\u8f83\\u4f4e\\u7684\\u7c7b\\u578b\\u8f6c\\u6362\\u6210\\u53e6\\u4e00\\u4e2a\\u7cbe\\u5ea6\\u8f83\\u9ad8\\u7684\\u7c7b\\u578b", "boolean\\u578b\\u6570\\u636e\\u548c\\u5176\\u4ed6\\u6570\\u636e\\u7c7b\\u578b\\u8fdb\\u884c\\u8f6c\\u6362", "char\\u578b\\u548cint\\u578b\\u6570\\u636e\\u53ef\\u4ee5\\u4e92\\u76f8\\u8f6c\\u6362"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'整型数据类型中，需要内存空间最少的是()','["short", "long", "int", "byte"]',NULL,'D',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'设有定义float x=3.5f, y=4.6f, z=5.7f, 则以下的表达式中,值为true的是','["x > y || x > z", "x != y", "z > (y + x)", "y < z"]',NULL,'B',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'指出下列类型转换中正确的是','["int i=8.3;", "long L=8.4f;", "int i=(boolean)8.9;", "double d = 100;"]',NULL,'D',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'设int x = 2, 则表达式 (x++)*3 的值是','["6", "9", "6,0", "9.0"]',NULL,'A',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'在switch(expression)语句中,expression的数据类型不能是','["byte", "char", "float", "short"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'若a和b是整型变量并以正确赋值,以下正确的switch语句是:','["switch(a+b);{}", "switch(a+b*3.0){}", "switch a{}", "switch(a%b) {}"]',NULL,'D',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'执行如下程序代码
a=0;c=0; do{ --c; a=a-1; }while(a>0);
后，C的值是( )','["0", "1", "-1", "\\u6b7b\\u5faa\\u73af"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'以下由for语句构成的循环执行的次数是
for(int i=0;;i++){};','["\\u6709\\u8bed\\u6cd5\\u9519,\\u4e0d\\u80fd\\u6267\\u884c", "\\u65e0\\u9650\\u6b21", "\\u6267\\u884c1\\u6b21", "\\u4e00\\u6b21\\u4e5f\\u4e0d\\u6267\\u884c"]',NULL,'D',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'设X、Y均为已定义的类名,下列声明类X的对象x1的语句中正确的是?','["X x1=new X();", "X x1 = X();", "X x1=new Y();", "int X x1;"]',NULL,'A',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'面向对象程序不包含下面的哪个组成部分?','["\\u7c7b", "\\u5bf9\\u8c61", "\\u63a5\\u53e3", "\\u7a0b\\u5e8f\\u5458"]',NULL,'D',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'下列哪种说法是正确的( )','["\\u5b9e\\u4f8b\\u65b9\\u6cd5\\u53ef\\u76f4\\u63a5\\u8c03\\u7528\\u5b50\\u7c7b\\u7684\\u5b9e\\u4f8b\\u65b9\\u6cd5", "\\u5b9e\\u4f8b\\u65b9\\u6cd5\\u53ef\\u76f4\\u63a5\\u8c03\\u7528\\u5b50\\u7c7b\\u7684\\u7c7b\\u65b9\\u6cd5", "\\u5b9e\\u4f8b\\u65b9\\u6cd5\\u53ef\\u76f4\\u63a5\\u8c03\\u7528\\u5176\\u4ed6\\u7c7b\\u7684\\u5b9e\\u4f8b\\u65b9\\u6cd5", "\\u5b9e\\u4f8b\\u65b9\\u6cd5\\u53ef\\u76f4\\u63a5\\u8c03\\u7528\\u672c\\u7c7b\\u7684\\u7c7b\\u65b9\\u6cd5"]',NULL,'D',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'在创建对象是必须( )','["\\u5148\\u58f0\\u660e\\u5bf9\\u8c61\\uff0c\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61\\uff0c\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4\\uff0c\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61\\uff0c\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4\\uff0c\\u5bf9\\u5bf9\\u8c61\\u521d\\u59cb\\u5316\\uff0c\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u4e0a\\u8ff0\\u8bf4\\u6cd5\\u90fd\\u5bf9"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'以下关于构造函数的描述错误的是?','["\\u6784\\u9020\\u51fd\\u6570\\u7684\\u8fd4\\u56de\\u7c7b\\u578b\\u53ea\\u80fd\\u662fvoid\\u578b", "\\u6784\\u9020\\u51fd\\u6570\\u662f\\u7c7b\\u7684\\u4e00\\u79cd\\u7279\\u6b8a\\u51fd\\u6570,\\u5b83\\u7684\\u65b9\\u6cd5\\u540d\\u5fc5\\u987b\\u4e0e\\u7c7b\\u540d\\u76f8\\u540c", "\\u6784\\u9020\\u51fd\\u6570\\u7684\\u4e3b\\u8981\\u4f5c\\u7528\\u662f\\u5b8c\\u6210\\u5bf9\\u7c7b\\u7684\\u5bf9\\u8c61\\u7684\\u521d\\u59cb\\u5316\\u5de5\\u4f5c", "\\u4e00\\u822c\\u5728\\u521b\\u5efa\\u65b0\\u5bf9\\u8c61\\u65f6,\\u7cfb\\u7edf\\u4f1a\\u8c03\\u7528\\u6784\\u9020\\u51fd\\u6570"]',NULL,'A',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'下列构造方法的调用方式中,正确的是','["\\u6309\\u7167\\u4e00\\u822c\\u65b9\\u6cd5\\u8c03\\u7528", "\\u7531\\u7528\\u6237\\u76f4\\u63a5\\u8c03\\u7528", "\\u53ea\\u80fd\\u901a\\u8fc7new\\u81ea\\u52a8\\u8c03\\u7528", "\\u4e0d\\u80fd\\u8c03\\u7528,\\u81ea\\u52a8\\u6267\\u884c"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'下列说法正确的有( )','["class\\u4e2d\\u7684\\u6784\\u9020\\u65b9\\u6cd5\\u4e0d\\u53ef\\u7701\\u7565", "\\u6784\\u9020\\u65b9\\u6cd5\\u5fc5\\u987b\\u4e0eclass\\u540c\\u540d\\uff0c\\u4f46\\u65b9\\u6cd5\\u4e0d\\u80fd\\u4e0eclass\\u540c\\u540d", "\\u6784\\u9020\\u65b9\\u6cd5\\u5728\\u4e00\\u4e2a\\u5bf9\\u8c61\\u88abnew\\u65f6\\u6267\\u884c", "\\u4e00\\u4e2aclass\\u53ea\\u80fd\\u5b9a\\u4e49\\u4e00\\u4e2a\\u6784\\u9020\\u65b9\\u6cd5"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'假设A类有如下定义,设a是A类的一个实例,下列语句调用哪个是错误的?
class A{
 int i;
 static String s;
 void method1() {}
 static void method2() {}
}','["System.out.println(a.i);", "a.method1();", "A.method1();", "A.method2();"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'下列关于静态方法的描述中,错误的是','["\\u9759\\u6001\\u65b9\\u6cd5\\u5c5e\\u4e8e\\u7c7b\\u7684\\u5171\\u4eab\\u6210\\u5458", "\\u9759\\u6001\\u65b9\\u6cd5\\u662f\\u901a\\u8fc7\\"\\u7c7b\\u540d.\\u65b9\\u6cd5\\u540d\\"\\u7684\\u65b9\\u5f0f\\u6765\\u8c03\\u7528", "\\u9759\\u6001\\u65b9\\u6cd5\\u53ea\\u80fd\\u88ab\\u7c7b\\u8c03\\u7528\\uff0c\\u4e0d\\u80fd\\u88ab\\u5bf9\\u8c61\\u8c03\\u7528", "\\u9759\\u6001\\u65b9\\u6cd5\\u4e2d\\u53ef\\u4ee5\\u8bbf\\u95ee\\u9759\\u6001\\u53d8\\u91cf"]',NULL,'C',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'下面方法定义中,正确的是:','["int x(char ch) { return (int)ch;}", "void x(char ch) { return true;}", "void x() {return true;}", "int x(int a,b) {return a-b;}"]',NULL,'A',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'下列不属于面向对象的三大特征的是?','["\\u7ee7\\u627f", "\\u65b9\\u6cd5", "\\u5c01\\u88c5", "\\u591a\\u6001"]',NULL,'B',1,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'功能：创建一个Circle类，此类中包括一个半径属性radius和一个计算周长的方法findLong。
      在main方法中创建Circle类的对象c，并计算半径为10的圆的周长',NULL,'public class Circle {
    double radius;

    double findLong() {
        return 2*3.14*radius;
    }

    public static void main(String[] args){
    /*******************SPACE*******************/
        【?】;
        c.radius = 10.0;
    /*******************SPACE*******************/
        System.out.println(【?】);
    }
}','=======(答案1)=======
Circle c = new Circle()
=======(答案2)=======
c.findLong()',5,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'功能：创建一个Dog类，此类中包括一个姓名属性name。在main方法中创建Dog类的对象d，并设置其姓名为"XiaoBai"。',NULL,'public class Dog {
    String name;

    public static void main(String[] args){
    /*******************SPACE*******************/
        【?】;
    /*******************SPACE*******************/
        【?】 = "XiaoBai";
    }
}','=======(答案1)=======
Dog() d = new Dog()
=======(答案2)=======
d.name',5,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'功能：创建一个Employee类，属性有员工姓名name，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Employee {
    String name;
    /*******************SPACE*******************/
    【?】 {
        name = "LiuFang";
    }

    Employee(String name){
    /*******************SPACE*******************/
        【?】 = name;
    }
}','=======(答案1)=======
Employee()
=======(答案2)=======
this.name',5,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Telephone {
    String brand;
    /*******************SPACE*******************/
    【?】 {
        brand = "iPhone";
    }

    Telephone(String brand){
    /*******************SPACE*******************/
        【?】 = brand;
    }
}','=======(答案1)=======
Telephone() {
=======(答案2)=======
this.brand',5,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'题目：写一个方法逆序输出任意一个整数',NULL,'public class PrintRerverse {
    int b;
    /*****************FOUND*****************/  
    while(a == 0)
    {
        b = a% 10;
    /*****************FOUND*****************/  
        a = a%10;
        System.out.print(b);
    }
}','=======(答案1)=======
while(a != 0)
=======(答案2)=======
a = a / 10;',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'题目：写一个学生类Student，请修改程序中的错误。',NULL,'class Student {
    String name;
    int age;
    /*****************FOUND*****************/  
    Student(char s,int i) {
        name = s;
    /*****************FOUND*****************/  
        age =this. i;
    }
}','=======(答案1)=======
Student(String s,int i) {
=======(答案2)=======
this.age = i;',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'题目：输入一组数，输入-1代表结束，查找最高成绩，并保存在变量max中，输出max，要求使用while循环实现。',NULL,'import java.util.*;
public class Prog1{
/**********Program**********/
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);




    }
/**********  End  **********/
}','int score, max = 0;
Scanner sc = new Scanner(System.in);
score = sc.nextInt();
while(score != -1){
    if(score > max) {
        max = score;
    }
    score = sc.nextInt();
}
System.out.println(max);',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'题目：使用for循环和if语句实现计算并输出1-100的奇数和，循环变量名为i，存放和的变量名为sum',NULL,'public class Prog1{
/**********Program**********/

    public static void main(String[] args) {




    }
/**********  End  **********/
}','public static void main(String[] args) {
    int i, sum = 0;
    for(int i=1;i<=100;i++){
        if(i%2 !=0){
            sum = sum + i;
        }
    }
    System.out.println(sum);
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'题目：定义一个Circle类，包含一个名为radius属性，类型为int，用不带参数的构造方法和一个findArea方法，该方法返回圆的面积，π取3.14',NULL,'public class Circle {
/**********Program**********/
    public static void main(String[] args) {
        



    }
/**********  End  **********/
}','int radius;
Circle() {
    radius = 10;
}
void findArea() {
double area = 3.14*radius*radius;
System.out.println(“面积是” + area);
    return 3.14 * radius * radius;
}
public static void main(String[] args) {
    Circle c = new Circle();
    c.findArea();
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '66' LIMIT 1),'题目:定义一个名为Prog1的类，属性有平时成绩(pingshi)，期末成绩(qimo)，都为int类型;不带参数的构造方法，方法有计算并输出总成绩的方法calculateScore()，
计算方式为:总成绩=平时成绩+期末成绩的1/2;在main方法中，创建Prog1对象s，然后调用calculateScore0方法来输出总成绩。',NULL,'public class Student {
/**********Program**********/




/**********  End  **********/
}','int pingshi;
int qimo;
Prog1() {
    pingshi = 45;
    qimo = 56;
}

void calculateScore() {
    double score = pingshi + qimo * 0.5;
    System.out.print(“分数为：” + score);
}

Public static void main(String[] args) {
    Prog1 s =  new Prog1();
    s.calculateScore();
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '66';
