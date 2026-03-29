-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'有一段java应用程序，它的主类名是a1，那么保存它的源文件名可以是()','["a1.java", "a1.class", "a1", "\\u4ee5\\u4e0a\\u90fd\\u5bf9"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下列语句哪一个正确()','["Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fmachine code", "Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fbyte code", "Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fDLL", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u6b63\\u786e"]',NULL,'B

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'现有一个变量声明为boolean aa,下面赋值语句中正确的是()','["aa=false;", "aa=False;", "aa=\\"true\\";", "aa=0"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'Java语言具有许多优点和特点，哪个反映了Java程序并行机制的特点？()','["\\u5b89\\u5168\\u6027", "\\u8de8\\u5e73\\u53f0", "\\u591a\\u7ebf\\u7a0b", "\\u53ef\\u79fb\\u690d"]',NULL,'C

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'Java是从（）语言改进重新设计。','["Ada", "C++", "Pascal", "BASIC"]',NULL,'B

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'有以下代码,运行完后的最终值是
int i=1;
int j=i++;
if((i>j++)&&(i++==j)) i+=j;','["1", "2", "3", "4"]',NULL,'B

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'有如下程序段:
int total=0;
for(int i=0;i<4;i++){
    if(i == 1) continue;
    if(i==2) break;
    total +=i;
}
则执行完该程序段后total的值为()','["0", "1", "3", "6"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'以下由for语句构成的循环执行的次数是
for(int i=0;i>0;i++);','["\\u6709\\u8bed\\u6cd5\\u9519,\\u4e0d\\u80fd\\u6267\\u884c", "\\u65e0\\u9650\\u6b21", "\\u6267\\u884c1\\u6b21", "\\u4e00\\u6b21\\u4e5f\\u4e0d\\u6267\\u884c"]',NULL,'D

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'若a和b是整型变量并以正确赋值,以下正确的switch语句是:','["switch(a+b);{}", "switch(a+b*3.0){}", "switch a{}", "switch(a%b) {}"]',NULL,'D

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'在Java中用什么关键字修饰的方法可以直接通过类名来调用？()','["static", "final", "private", "void"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'在创建对象时必须()','["\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u5148\\u58f0\\u660e\\u5bf9\\u8c61,\\u4e3a\\u5bf9\\u8c61\\u5206\\u914d\\u5185\\u5b58\\u7a7a\\u95f4,\\u5bf9\\u5bf9\\u8c61\\u521d\\u59cb\\u5316,\\u7136\\u540e\\u624d\\u80fd\\u4f7f\\u7528\\u5bf9\\u8c61", "\\u4e0a\\u8ff0\\u8bf4\\u6cd5\\u90fd\\u5bf9"]',NULL,'C

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'设A为已定义的类名,下列声明并创建A类的对象a的语句中正确的是?','["A a=new A();", "public A a=A();", "A a=new class();", "a a;"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下列语句正确的是()','["\\u5f62\\u5f0f\\u53c2\\u6570\\u53ef\\u88ab\\u89c6\\u4e3a\\u65b9\\u6cd5\\u7684\\u5c40\\u90e8\\u53d8\\u91cf", "\\u5f62\\u5f0f\\u53c2\\u6570\\u53ef\\u88abprivate\\u4fee\\u9970", "\\u5f62\\u5f0f\\u53c2\\u6570\\u548c\\u5b9e\\u9645\\u53c2\\u6570\\u90fd\\u53ea\\u80fd\\u662f\\u65b9\\u6cd5\\u7684\\u5c40\\u90e8\\u53d8\\u91cf", "\\u5f62\\u5f0f\\u53c2\\u6570\\u4e0d\\u53ef\\u4ee5\\u662f\\u5bf9\\u8c61"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下列对方法的调用方式的描述中正确的是？','["\\u4f7f\\u7528new\\u8c03\\u7528", "\\u4f7f\\u7528\\u7c7b\\u540d\\u8c03\\u7528", "\\u4f7f\\u7528\\u5bf9\\u8c61\\u540d\\u8c03\\u7528", "\\u8c03\\u7528\\u65b9\\u6cd5\\u4e3a\\u5bf9\\u8c61\\u540d.\\u65b9\\u6cd5\\u540d()"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下列构造方法的调用方式中,正确的是','["\\u6309\\u7167\\u4e00\\u822c\\u65b9\\u6cd5\\u8c03\\u7528", "\\u7531\\u7528\\u6237\\u76f4\\u63a5\\u8c03\\u7528", "\\u53ea\\u80fd\\u901a\\u8fc7new\\u81ea\\u52a8\\u8c03\\u7528", "\\u4e0d\\u7528\\u8c03\\u7528,\\u81ea\\u52a8\\u6267\\u884c"]',NULL,'C

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下面有关于子类继承父类构造方法的描述，其中正确的是()','["\\u521b\\u5efa\\u5b50\\u7c7b\\u7684\\u5bf9\\u8c61\\u65f6\\uff0c\\u5148\\u6267\\u884c\\u5b50\\u7c7b\\u81ea\\u5df1\\u7684\\u6784\\u9020\\u65b9\\u6cd5\\uff0c\\u7136\\u540e\\u6267\\u884c\\u7236\\u7c7b\\u7684\\u6784\\u9020\\u65b9\\u6cd5", "\\u5b50\\u7c7b\\u53ef\\u4ee5\\u4e0d\\u7528\\u8c03\\u7528\\u7236\\u7c7b\\u7684\\u6784\\u9020\\u65b9\\u6cd5", "\\u5b50\\u7c7b\\u5fc5\\u987b\\u901a\\u8fc7super\\u5173\\u952e\\u5b57\\u8c03\\u7528\\u7236\\u7c7b\\u7684\\u6784\\u9020\\u65b9\\u6cd5", "\\u521b\\u5efa\\u5b50\\u7c7b\\u7684\\u5bf9\\u8c61\\u65f6\\uff0c\\u5148\\u6267\\u884c\\u7236\\u7c7b\\u7684\\u6784\\u9020\\u65b9\\u6cd5\\uff0c\\u7136\\u540e\\u6267\\u884c\\u5b50\\u7c7b\\u81ea\\u5df1\\u7684\\u6784\\u9020\\u65b9\\u6cd5"]',NULL,'D

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下列关于静态方法的描述中,错误的是()','["\\u9759\\u6001\\u65b9\\u6cd5\\u6307\\u7684\\u662f\\u88abstatic\\u5173\\u952e\\u5b57\\u4fee\\u9970\\u7684\\u65b9\\u6cd5", "\\u9759\\u6001\\u65b9\\u6cd5\\u4e0d\\u5360\\u7528\\u5bf9\\u8c61\\u7684\\u5185\\u5b58\\u7a7a\\u95f4,\\u800c\\u975e\\u9759\\u6001\\u65b9\\u6cd5\\u5360\\u7528\\u5bf9\\u8c61\\u7684\\u5185\\u5b58\\u7a7a\\u95f4", "\\u9759\\u6001\\u65b9\\u6cd5\\u5185\\u53ef\\u4ee5\\u4f7f\\u7528this\\u5173\\u952e\\u5b57", "\\u9759\\u6001\\u65b9\\u6cd5\\u5185\\u90e8\\u53ea\\u80fd\\u8bbf\\u95ee\\u88abstatic\\u4fee\\u9970\\u7684\\u6210\\u5458"]',NULL,'C

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下面哪个关键字用来修饰静态()','["static", "protected", "public", "private"]',NULL,'A

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'面向对象程序不包含下面的哪个组成部分？','["\\u7c7b", "\\u5bf9\\u8c61", "\\u63a5\\u53e3", "\\u7a0b\\u5e8f\\u6bb5"]',NULL,'D

---',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'下面哪个main方法是正确的？','["public static void main(String args)", "public static int main(String[] args)", "public static void main(String[] args)", "public final void main(String args)"]',NULL,'C',1,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'功能：定义一个接口',NULL,'public interface MyInterface { //定义一个接口
/**********SPACE**********/
    void 【?】;
    void showMessage();
}
/**********SPACE**********/
public class MyClass 【?】 MyInterface { //MyClass类实现MyInterface接口
    @Override
    public void myMethod(){
        System.out.println("This is a method from the interface.");
    }

    @Override
    public void showMessage(){
        System.out.println("Hello from MyClass.");
    }
}','=======(答案1)=======
myMethod()
=======(答案2)=======
implements
---',5,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'功能：创建一个Dog类，此类中包括1个姓名属性name。在main方法中创建Dog类的对象d，并设置其姓名为"XiaoBai"。',NULL,'public class Dog {
    String name;
    public static void main(String[] args){
/**********SPACE**********/
    【?】;
/**********SPACE**********/
    【?】 = "XiaoBai";
}
}','=======(答案1)=======
Dog d = new Dog()
=======(答案2)=======
d.name

---',5,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Telephone {
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
this.brand

---',5,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'功能：创建一个Telephone类，属性有电话号码charge，还有2个构造方法，其中一个没有参数，一个带参数。',NULL,'public class Telephone {
    double charge;
/**********SPACE**********/
    【?】 {
        charge=56.5;
    }
    Telephone(double charge){
/**********SPACE**********/
        【?】 = charge;
    }
}','=======(答案1)=======
Telephone()
=======(答案2)=======
this.charge',5,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'题目：假设某个大学今年的学费是1000美金，而且以每年7%的速度增加，多少年之后学费会翻倍？',NULL,'class Tuition {
    public static void main(String[] args) {
        double tuition = 10000;
        int year = 1;
/**********FOUND**********/
        while(tuition<=2000)
        {
            tuition = tuition * 1.07;
/**********FOUND**********/
            year--;
        }
        System.out.println("Tuition will be doubled in "
                + year + " years");
    }
}','=======(答案1)=======
while(tuition < 2000)
=======(答案2)=======
year++;

---',10,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'题目：下面是一个类的定义，请修改程序中的错误。',NULL,'class Student
{
    String name;
    int age;
/**********FOUND**********/
    Student(char s,int i)
    {
        name=s;
/**********FOUND**********/
        age=this.i;
    }
}','=======(答案1)=======
Student(String s,int i)
=======(答案2)=======
age = i;',10,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'题目：使用while循环语句实现计算并输出1-100的能被3整除的数的和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
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

---',10,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'题目：使用for循环和if语句实现计算并输出1-100的奇数和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    public static void main(String[] args) {
        int i, sum = 0;
        for (i = 1; i <= 100; i++) {
            if (i % 2 != 0) {
                sum = sum + i;
            }
        }
        System.out.println(sum);
    }
}

---',10,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'题目：定义一个名为Prog1的类，属性有平时成绩（pingshi），期末成绩（qimo），都为int类型；不带参数的构造方法，方法有计算并输出总成绩的方法calculateScore()，计算方式为：总成绩=平时成绩+期末成绩的1/2；在main方法中，创建Prog1对象s，然后调用calculateScore()方法来输出总成绩。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    int pingshi;
    int qimo;
    Prog1(){
        pingshi = 45;
        qimo =56;
    }
    void calculateScore(){
        double score = pingshi + qimo * 0.5;
        System.out.println("分数为：" + score);
    }
    public static void main(String[] args){
        Prog1 s = new Prog1();
        s.calculateScore();
    }
}

---',10,'2026-03-29 11:35:03','2026-03-29 11:35:03'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '203' LIMIT 1),'题目:定义一个名为Prog1的类，属性包括name(书名,String类型)、author (作者名,String类型)、price(书的价格,double类型)，定义不带参数的构造方法，定义输出图书基本信息的show方法。在main方法中，创建Prog1类的一个对象b，调用show方法。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','String name;
String author;
double price;
Prog1() {
    name="文化苦旅";
    author="余秋雨";
    price=56;
}
void show() {
    System.out.println("书名是"+name);
    System.out.println("作者是"+author);
    System.out.println("价格是"+price);
}
public static void main(String[] args) {
    Prog1 b = new Prog1();
    b.show();
}',10,'2026-03-29 11:35:03','2026-03-29 11:35:03');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '203';
