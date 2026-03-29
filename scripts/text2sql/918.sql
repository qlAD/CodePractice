-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'功能：创建一个Circle类，此类中包括一个半径属性radius和一个计算周长的方法findLong。
在main方法中创建Circle类的对象c，并计算半径为10的圆的周长。',NULL,'public class Circle {
    double radius;
    double findLong(){
        return 2*3.14*radius;
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
c.findLong()',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'功能：创建一个Dog类，此类中包括1个姓名属性name。在main方法中创建Dog类的对象d，并设置其姓名为"XiaoBai"。',NULL,'public class Dog {
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
d.name',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'功能：创建一个Telephone类，属性有电话品牌brand，还有2个构造方法，其中一个没有参数，一个带参数',NULL,'public class Telephone {
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
this.brand',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'功能：创建一个Telephone类，属性有电话号码number，还有2个构造方法，其中一个没有参数，一个带参数。',NULL,'class Telephone {
    String number;
/**********SPACE**********/
    【?】 {
        number="041184835202";
    }
    Telephone(String number){
/**********SPACE**********/
        【?】 = number;
    }
}','=======(答案1)=======
Telephone()
=======(答案2)=======
this.number',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'题目：用循环语句实现打印1到100之间的自然数,包含1和100。',NULL,'class Test {
    public static void main(String[] args) {
        int i=1;
        /**********FOUND**********/
        while(i<100)
        {
            System.out.println(" "+i);
            /**********FOUND**********/
            i--;
        }
    }
}','=======(答案1)=======
while(i <= 100)
=======(答案2)=======
i++; 或者 i=i+1;',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'题目：下面是一个类的定义，请修改程序中的错误。',NULL,'class Student
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
this.age = i;',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'题目：输入一组成绩，输入-1代表结束，查找最高成绩，并保存在变量max中，输出max，要求使用while循环实现。',NULL,'import java.util.Scanner;
public class Prog1{
/**********Program**********/

/**********  End  **********/
}','import java.util.Scanner;
public class Prog1{
    public static void main(String[] args) {
        int score, max = 0;
        Scanner sc = new Scanner(System.in);
        score = sc.nextInt();
        while(score != -1){
            if(score > max){
                max = score;
            }
            score = sc.nextInt();
        }
        System.out.println(max);
    }
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'题目：使用while循环语句实现计算并输出1-100的能被3整除的数的和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
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
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'题目：定义类，属性包括商品名称name（String）、商品编号id（String）和价格price（double）三个属性，有无参的构造方法，和计算折扣价格并输出的方法，方法头为public void computeDiscout(double percent)，其中形参代表打折的百分比。
创建商品类的对象，对象名为g，调用计算折扣价格的方法，打印9折的折扣价。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    String name;
    String id;
    double price;
    Prog1(){
        name = "虾条";
        id = "g009";
        price = 3.5;
    }
    public void computeDiscout(double percent){
        System.out.println(name + "原价为" + price + "元");
        price = price * percent;
        System.out.println(name + "折扣后的价格是" + price + "元");
    }
    public static void main(String[] args){
        Prog1 g = new Prog1();
        g.computeDiscout(0.9);
    }
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '918' LIMIT 1),'题目：定义一个名为Prog1的类，属性有平时成绩（pingshi），期末成绩（qimo），都为int类型；不带参数的构造方法，方法有计算并输出总成绩的方法calculateScore()，计算方式为：总成绩=平时成绩+期末成绩的1/2；
在main方法中，创建Prog1对象s，然后调用calculateScore()方法来输出总成绩。',NULL,'public class Prog1{
/**********Program**********/

/**********  End  **********/
}','public class Prog1{
    int pingshi;
    int qimo;
    Prog1(){
        pingshi = 45;
        qimo = 56;
    }
    void calculateScore(){
        double score = pingshi + qimo * 0.5;
        System.out.println("分数为：" + score);
    }
    public static void main(String[] args){
        Prog1 s = new Prog1();
        s.calculateScore();
    }
}',10,'2026-03-29 09:52:01','2026-03-29 09:52:01');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '918';
