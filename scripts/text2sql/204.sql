-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'关于数据类型转换的说法哪个是不正确的()','["Java\\u5171\\u6709\\u4e24\\u79cd\\u6570\\u636e\\u7c7b\\u578b\\u7684\\u8f6c\\u6362\\u65b9\\u5f0f:\\u81ea\\u52a8\\u8f6c\\u6362\\u548c\\u5f3a\\u5236\\u8f6c\\u6362", "Java\\u4e2d\\u5f53\\u4e24\\u4e2a\\u7c7b\\u578b\\u4e0d\\u540c\\u7684\\u8fd0\\u7b97\\u5bf9\\u8c61\\u8fdb\\u884c\\u4e8c\\u5143\\u8fd0\\u7b97\\u65f6,Java\\u81ea\\u52a8\\u628a\\u7cbe\\u5ea6\\u8f83\\u4f4e\\u7684\\u7c7b\\u578b\\u8f6c\\u6362\\u6210\\u53e6\\u4e00\\u4e2a\\u7cbe\\u5ea6\\u8f83\\u9ad8\\u7684\\u7c7b\\u578b", "boolean\\u578b\\u6570\\u636e\\u80fd\\u548c\\u5176\\u4ed6\\u6570\\u636e\\u7c7b\\u578b\\u8fdb\\u884c\\u8f6c\\u6362", "char\\u578b\\u548cint\\u578b\\u6570\\u636e\\u53ef\\u4ee5\\u4e92\\u76f8\\u8f6c\\u6362"]',NULL,'C

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'以下的选项中能正确表示Java语言中的一个整型常量的是()','["12.", "-20", "1,000", "4 5 6"]',NULL,'B

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'现有一个变量声明为boolean aa,下面赋值语句中正确的是()','["aa=false;", "aa=False;", "aa=\\"true\\";", "aa=0;"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下列运算符合法的是()','["&&", "<>", "if", ":="]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'设int x = 2，则表达式(x++) * 3的值是()','["6", "9", "6.0", "9.0"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'Java支持的跳转语句不包括()','["break\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "return\\u8bed\\u53e5", "goto\\u8bed\\u53e5"]',NULL,'D

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下列语句序列执行后,i的值是
int i=10;
do{ i/=2; }while(i>1);','["1", "5", "2", "0"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'有以下代码,运行完后的最终值是
int i=1;
int j=i++;
if((i>++j)&&(i++==j)) i+=j;','["1", "2", "3", "4"]',NULL,'B

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'有以下代码,其中变量可能的类型是
switch(i){ default:System.out.println("hello");}','["byte", "long", "double", "A and B"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'定义类头时,不可能用到的关键字是?','["class", "public", "extends", "static"]',NULL,'D

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下列不属于面向对象的三大特征的是?','["\\u7ee7\\u627f", "\\u65b9\\u6cd5", "\\u5c01\\u88c5", "\\u591a\\u6001"]',NULL,'B

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'在创建对象时必须()','["\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u5bf9\\u5bf9\\u8c61\\u521d\\u59cb\\u5316,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u4e0a\\u8ff0\\u8bf4\\u6cd5\\u90fd\\u5bf9"]',NULL,'C

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'在创建对象时必须()','["\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u5bf9\\u5bf9\\u8c61\\u521d\\u59cb\\u5316,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u4e0a\\u8ff0\\u8bf4\\u6cd5\\u90fd\\u5bf9"]',NULL,'C

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下列对构造方法的调用方式的描述中正确的是?','["\\u4f7f\\u7528new\\u8c03\\u7528", "\\u4f7f\\u7528\\u7c7b\\u540d\\u8c03\\u7528", "\\u4f7f\\u7528\\u5bf9\\u8c61\\u540d\\u8c03\\u7528", "\\u8c03\\u7528\\u65b9\\u6cd5\\u4e3a\\u5bf9\\u8c61\\u540d.\\u65b9\\u6cd5\\u540d()"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'this在程序中代表的是()','["\\u7c7b\\u7684\\u5bf9\\u8c61", "\\u5c5e\\u6027", "\\u65b9\\u6cd5", "\\u7236\\u7c7b"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下列说法正确的有()','["class\\u4e2d\\u7684\\u6784\\u9020\\u65b9\\u6cd5\\u4e0d\\u53ef\\u7701\\u7565", "\\u6784\\u9020\\u65b9\\u6cd5\\u5fc5\\u987b\\u4e0eclass\\u540c\\u540d\\uff0c\\u4f46\\u65b9\\u6cd5\\u4e0d\\u80fd\\u4e0eclass\\u540c\\u540d", "\\u6784\\u9020\\u65b9\\u6cd5\\u5728\\u4e00\\u4e2a\\u5bf9\\u8c61\\u88abnew\\u65f6\\u6267\\u884c", "\\u4e00\\u4e2aclass\\u53ea\\u80fd\\u5b9a\\u4e49\\u4e00\\u4e2a\\u6784\\u9020\\u65b9\\u6cd5"]',NULL,'C

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下列关于静态方法的描述中,错误的是()','["\\u9759\\u6001\\u65b9\\u6cd5\\u5c5e\\u4e8e\\u7c7b\\u7684\\u5171\\u4eab\\u6210\\u5458", "\\u9759\\u6001\\u65b9\\u6cd5\\u662f\\u901a\\u8fc7\\"\\u7c7b\\u540d.\\u65b9\\u6cd5\\u540d\\"\\u7684\\u65b9\\u5f0f\\u6765\\u8c03\\u7528", "\\u9759\\u6001\\u65b9\\u6cd5\\u53ea\\u80fd\\u88ab\\u7c7b\\u8c03\\u7528,\\u4e0d\\u80fd\\u88ab\\u5bf9\\u8c61\\u8c03\\u7528", "\\u9759\\u6001\\u65b9\\u6cd5\\u4e2d\\u53ef\\u4ee5\\u8bbf\\u95ee\\u9759\\u6001\\u53d8\\u91cf"]',NULL,'C

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'下面哪个关键字用来修饰静态()','["static", "protected", "public", "private"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'关于Java源文件下列说法正确的是?','["\\u4e00\\u4e2ajava\\u6e90\\u6587\\u4ef6\\u4e2d\\u53ea\\u80fd\\u6709\\u4e00\\u4e2apublic\\u4fee\\u9970\\u7684\\u7c7b", "\\u4e00\\u4e2ajava\\u6e90\\u6587\\u4ef6\\u4e2d\\u53ea\\u80fd\\u6709\\u4e00\\u4e2a\\u7f3a\\u7701\\u7684\\u7c7b\\u3002", "\\u4e00\\u4e2ajava\\u6e90\\u6587\\u4ef6\\u4e2d\\u53ef\\u4ee5\\u6709\\u591a\\u4e2aprotected\\u4fee\\u9970\\u7684\\u7c7b", "\\u4e00\\u4e2ajava\\u6e90\\u6587\\u4ef6\\u4e2d\\u53ef\\u4ee5\\u6709\\u591a\\u4e2aprivate\\u4fee\\u9970\\u7684\\u7c7b"]',NULL,'A

---',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'设X是已定义的类名,下列声明X类的对象x1的语句中正确的是()','["static X x1;", "public X x1=new X(123);", "X x1;", "X x1=X();"]',NULL,'B',1,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'功能：创建一个Dog类，此类中包括1个大小属性size。在main方法中创建Dog类的对象d，并设置其大小为8。',NULL,'class Dog {
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

---',5,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'功能：创建一个Circle类，此类中包括一个半径属性radius和一个计算周长的方法findLong。',NULL,'public class Circle {
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

---',5,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'功能：创建一个Telephone类，属性有电话费charge，还有2个构造方法，其中一个没有参数，一个带参数。',NULL,'public class Telephone {
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

---',5,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数。',NULL,'public class Telephone {
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
this.brand',5,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'题目:蒙特卡罗模拟使用随机数和概率来解决问题。这个方法在数学、物理、化学和财经方面有很广的应用。
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

---',10,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'题目：下面是一个类的定义，请修改程序中的错误。',NULL,'class Car {
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
Car obj = new Car("Nissan","黑色");',10,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'题目：使用while循环语句实现计算并输出1-100的能被3整除的数的和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    public static void main(String[] args) {
        int i = 1, sum = 0;
        while(i <= 100){
            if(i % 3 == 0){
                sum = sum + i;
            }
            i++;
        }
        System.out.println("结果为" + sum);
    }
}

---',10,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'题目：使用for循环和if语句实现计算并输出1-100的奇数和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    public static void main(String[] args) {
        int i, sum = 0;
        for (i = 1l i <= 100; i++) {
            if (i % 2 != 0) {
                sum = sum + i;
            }
        }
        System.out.println( sum);
    }
}

---',10,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'题目:定义一个电风扇类Fan，要求如下:
(a)属性包括:电风扇型号model(String类型)、价格price(double类型)
    和开关状态running(boolean类型)，并且所有属性为私有。
(b)至少提供一个有参的构造方法(要求型号可以初始化为任意值，价格不能小于0，
    开关状态必须为false)。
(c)为私有属性提供访问器方法。',NULL,'/**********Program**********/

/**********  End  **********/
public class Prog1{
    public static void main(String[] args) {
        Fan m1 = new Fan("吊扇", 300);
    }
}','class Fan {
    private String model;
    private double price;
    private boolean running;
    public Fan(String model,double price) {
        this.model=model;
        if(price >=0) {
            this.price=price;
        }
        this.running=false;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public boolean isRunning() {
        return running;
    }
    public void setRunning(boolean running) {
        this.running = running;
    }
    public String getModel(){
        return model;
    }
}
---',10,'2026-03-29 12:00:51','2026-03-29 12:00:51'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '204' LIMIT 1),'题目:定义一个教师类Teacher，要求如下:
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
}',10,'2026-03-29 12:00:51','2026-03-29 12:00:51');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '204';
