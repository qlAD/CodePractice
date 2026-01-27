INSERT INTO code_practice.questions (`language`,`type`,chapter_id,difficulty,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',1,'medium','下面哪个标识符是合法的','["#_pound", "$123+w", "5Interstate", "a_b"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','下列哪一个是合法的标识符','["12class", "+viod", "-5", "_black"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','下列数据类型的精度由高到低的顺序是','["float,double,int,long", "double,float,int,byte", "byte,long,double,float", "double,int,float,long"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','整型数据类型中，需要内存空间最少的是( )','["short", "long", "int", "byte"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','以下标识符中哪项是不合法的（ ）','["class", "$double", "hello", "BigMeaninglessName"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','对于一个三位的正整数 n,取出它的十位数字k(k为整型)的表达式是','["k = n / 10 % 10", "k = n%10 % 10", "k = n % 10", "k = n / 10"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','下列语句哪一个正确（ ）','["Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fmachine code", "Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fbyte code", "Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fDLL", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u6b63\\u786e"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','执行如下程序代码
a=0;c=0; do{ --c; a=a-1; }while(a>0);
后，C的值是( )','["0", "1", "-1", "\\u6b7b\\u5faa\\u73af"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','下列关于for循环和while循环的说法中哪个是正确的？ （ ）','["while\\u5faa\\u73af\\u4e2d\\u4e0d\\u80fd\\u4f7f\\u7528continue\\u8bed\\u53e5\\uff0cfor\\u5faa\\u73af\\u4e2d\\u53ef\\u4ee5\\u4f7f\\u7528\\uff1b", "while\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u4e0d\\u80fd\\u7701\\u7565\\uff0cfor\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u53ef\\u4ee5\\u7701\\u7565\\uff1b", "while\\u5faa\\u73af\\u8bed\\u53e5\\u524d\\u4e0d\\u80fd\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff0cfor\\u5faa\\u73af\\u53ef\\u4ee5\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff1b", "\\u4ee5\\u4e0a\\u5168\\u90fd\\u4e0d\\u5bf9"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','下列对Java语言的叙述中,错误的是','["Java\\u865a\\u62df\\u673a\\u89e3\\u91ca\\u6267\\u884c\\u5b57\\u8282\\u7801", "Java\\u4e2d\\u6267\\u884c\\u8df3\\u8f6c\\u529f\\u80fd\\u7684\\u8bed\\u53e5\\u662fswitch\\u8bed\\u53e5", "Java\\u7684\\u7c7b\\u662f\\u5bf9\\u5177\\u6709\\u76f8\\u540c\\u884c\\u4e3a\\u5bf9\\u8c61\\u7684\\u4e00\\u79cd\\u62bd\\u8c61", "Java\\u4e2d\\u7684\\u5783\\u573e\\u56de\\u6536\\u673a\\u5236\\u662f\\u4e00\\u4e2a\\u7cfb\\u7edf\\u7ea7\\u7684\\u7ebf\\u7a0b"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','在switch(expression)语句中,expression的数据类型不能是','["byte", "char", "float", "short"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','下列语句序列执行后,s的值是
int s=1,i=1;
while(i<=4){
s=s*i;
i++;}','["6", "4", "24", "5"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','Java 支持的3 种跳转语句不包括','["break\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "return\\u8bed\\u53e5", "goto\\u8bed\\u53e5"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','若a和b是整型变量并以正确赋值,以下正确的switch语句是:','["switch(a+b);{}", "switch(a+b*3.0){}", "switch a{}", "switch(a%b) {}"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','下列哪些语句关于Java内存回收的说明是正确的? （ ）','["\\u7a0b\\u5e8f\\u5458\\u5fc5\\u987b\\u521b\\u5efa\\u4e00\\u4e2a\\u7ebf\\u7a0b\\u6765\\u91ca\\u653e\\u5185\\u5b58", "\\u5185\\u5b58\\u56de\\u6536\\u7a0b\\u5e8f\\u8d1f\\u8d23\\u91ca\\u653e\\u65e0\\u7528\\u5185\\u5b58", "\\u5185\\u5b58\\u56de\\u6536\\u7a0b\\u5e8f\\u5141\\u8bb8\\u7a0b\\u5e8f\\u5458\\u76f4\\u63a5\\u91ca\\u653e\\u5185\\u5b58", "\\u5185\\u5b58\\u56de\\u6536\\u7a0b\\u5e8f\\u53ef\\u4ee5\\u5728\\u6307\\u5b9a\\u7684\\u65f6\\u95f4\\u91ca\\u653e\\u5185\\u5b58\\u5bf9\\u8c61"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','Java 类可以作为( )','["\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236", "\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236\\u548c\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u4e0a\\u8ff0\\u90fd\\u4e0d\\u5bf9"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','方法的重载是指,两个方法具有相同名称和不同的参数形式.其中不同的参数形式是指()','["\\u53c2\\u6570\\u4e2a\\u6570\\u3001\\u7c7b\\u578b\\u3001\\u987a\\u5e8f\\u4e0d\\u540c", "\\u53c2\\u6570\\u6709\\u65e0\\u8fd4\\u56de\\u503c", "\\u65b9\\u6cd5\\u7684\\u4fee\\u9970\\u7b26\\u4e0d\\u540c", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u5bf9"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','在Java中,一个类可同时定义许多同名的方法,这些方法的形式参数的个数、类型或顺序各不相同,返回的值也可以不相同.这种面向对象程序特性称为?','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','有以下方法的定义,请选择该方法的返回类型?
type method(byte x,float y){
    return x/y*2;
}','["byte", "short", "int", "float"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','下面关于数组定义语句不正确的是?','["int[ ]  a1,a2;", "int  a0[ ]={11,2,30,84,5};", "double[] d=new double[8];", "float f[ ]=new  {2.0f,3.5f,5.6f,7.8f};"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','下面哪种写法可以实现访问数组arr的第1个元素?','["arr[0]", "arr(0)", "arr[1]", "arr(1)"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','下列对长度为4的数组a的定义中,正确的是?','["int[4] a=new int[];", "int a[]=new int[5];", "int a[]={2,4,2,1};", "int[4] a=new int[4];"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','在一个应用程序中定义了数组a：int[ ]  a={1,2,3,4,5,6,7,8,9,10},为了打印输出数组a的最后一个数组元素，下面正确的代码是?','["System.out.println(a[10]);", "System.out.println(a[9]);", "System.out.println(a[a.length]);", "System.out.println(a(8));"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','下面哪一个是合法的数组声明和构造语句?','["int[] ages = [100];", "int ages = new int[100];", "int[] ages = new int[100];", "int() ages = new int(100);"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','int a[ ]={45,4,67,23,65,87,34,52,56};数组中a[5]的值为','["23", "45", "65", "87"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','设有定义语句int  a[ ]={3,9,-9,-2,8}; 则以下对此语句的叙述错误的是?','["a\\u6570\\u7ec4\\u67095\\u4e2a\\u5143\\u7d20", "\\u6570\\u7ec4\\u4e2d\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u662f\\u6574\\u578b", "a\\u7684\\u503c\\u4e3a3", "\\u5bf9\\u6570\\u7ec4\\u5143\\u7d20\\u7684\\u5f15\\u7528a[a.length-1]\\u662f\\u5408\\u6cd5\\u7684"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','下列描述中正确的是：','["HashMap\\u4e2d\\u7684\\u5143\\u7d20\\u65e0\\u5e8f\\u53ef\\u91cd\\u590d", "HashMap\\u4e2d\\u7684\\u5143\\u7d20\\u6709\\u5e8f\\u4e0d\\u53ef\\u91cd\\u590d", "HashMap\\u4e2d\\u7684\\u5143\\u7d20\\u952e\\uff0d\\u503c\\u6210\\u5bf9\\u51fa\\u73b0", "HashSet\\u4e2d\\u7684\\u5143\\u7d20\\u952e\\uff0d\\u503c\\u6210\\u5bf9\\u51fa\\u73b0"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','list是一个ArrayList的对象，哪个选项的代码填写到//todo delete处，可以在Iterator遍历的过程中正确并安全的删除一个list中保存的对象？
       Iterator it = list.iterator();
       int index = 0;
       while (it.hasNext()){
              Object obj = it.next();
              if (needDelete(obj)) { //needDelete返回boolean，决定是否要删除
           //todo delete
              }
              index ++;
       }','["list.remove(obj);", "list.remove(index);", "list.remove(it.next());", "it.remove();"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','题示代码的功能为：对于一个存放Person对象的ArrayList进行循环遍历，并取到每个Person对象的idCard和userName。
public class Person{
private Long idCard;
pirvate String userName;
//一下是getter和setter方法
……
}
List list=new ArrayList();
Person p1=new Person();
p1.setIdCard(new Long(1001));
p1.setUserName("terry");
Person p2=new Person();
p2.setIdCard(new Long(1002));
p2.setUserName("tom");
list.add(p1);
list.add(p2);
for(《插入代码》){
System.out.println(person.getIdCard()+":"+person.getUserName());
}
那么《插入代码》处的代码为()','["List list:person", "List list:Person", "Person person:List", "Person person:list"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','题目代码的功能是：采用Iterator进行循环遍历到集合中的每一个元素，并将其移除，《插入代码》处应填入的代码是
ArrayList list = new ArrayList();
list.add("java");
list.add("php");
list.add(".net");
《插入代码》 为()','["Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nit.next();\\nit.remove();\\n}", "Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nit.remove();\\n}", "Iterator it=list.iterator();\\nwhile(it. hasNext()){\\nObject obj=it.next();\\nlist.remove(obj);\\n}", "Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nlist.remove();\\n}"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：定义一个学生类Prog1，包括姓名、学号、数学成绩、外语
      成绩、计算机成绩等属性，以及初始化各属性的构造方法、
      计算学生平均成绩的方法、显示学生成绩单的方法',NULL,'import java.awt.*;
public class Prog1
 {
   String name;
   long no;
   double math;
   double english;
   double computer; 
  /*******************SPACE*******************/
   Prog1(【?】 s,long n,double m,double e,double c)
    {
     name=s;
     no=n;
     math=m;
     english=e;
     computer=c;
    }
  /*******************SPACE*******************/
   public 【?】 average() 
    { 
      return (math+english+computer)/3;
     }
  /*******************SPACE*******************/
   public void print【?】
    {
      System.out.println("姓名:"+name);
      System.out.println("学号:"+no);
      System.out.println("数学成绩:"+math);
      System.out.println("外语成绩:"+english);
      System.out.println("计算机成绩:"+computer);
    }
   public static void main (String args[]) 
     {
        Prog1 b=new Prog1("李利",20030101,78,67,89);
        b.print();
  /*******************SPACE*******************/
        System.out.println("平均分:"+b.【?】);     
      }
}','=======(答案1)=======
String
=======(答案2)=======
double
=======(答案3)=======
()
=======(答案4)=======
average()',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：数组a已从小到大排好顺序，将一个数插入数组a中,使其仍
      然有序',NULL,'class Prog1
{
  public static void main(String args[]) 
   { 
     int a[] = { 1,4,6,9,13,16,19,28,40,100,0 };
     int number = 5;
     int temp1,temp2,end,i,j;
     System.out.println("初始的数组a:");
     for(i = 0;i <10;i++)
        System.out.print(a[i] + " ");
     System.out.println();
     System.out.println("插入数值"+number+"之后的数组a:");
     end=a[9];
 /**********************SPACE**********************/
     if(【?】)        
        a[10] = number;
     else
       {
        for(i = 0;i <10;i++)
 /**********************SPACE**********************/
          { if(【?】) 
 /**********************SPACE**********************/
              {        temp1 = 【?】;
                a[i] = number;
                for(j = i+1;j <11;j++) 
 /**********************SPACE**********************/
                  { 【?】=a[j]; 
                    a[j]=temp1;
                    temp1=temp2; 
                   }
                break; 
               }
           }
        }
     for(i=0;i<11;i++) 
       System.out.print(a[i] + " ");
  }
}','=======(答案1)=======
number>end
=========或=========
end<number
=======(答案2)=======
a[i]> number
=========或=========
number<a[i]
=======(答案3)=======
a[i]
=======(答案4)=======
temp2',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：定义一个Date类，包括年、月、日三个属性，以及设置日期
      的方法，显示日期的方法；定义一个学生类Prog1，包括姓
      名、生日属性，包括设置姓名与生日的方法，显示姓名生日的
      方法',NULL,'class Date 
 {
   int day, month, year;
/*******************SPACE*******************/
   public void setDate( int y, int m, 【?】) 
    {
      day = d;
      month = m;
      year = y;
     }
/*******************SPACE*******************/
   public void printDate【?】
     {
	System.out.println(year+"年"+month+"月"+day+"日");
     }
 }
public class Prog1
{  
  String name;
/*******************SPACE*******************/
  Date birth=【?】 Date();
  int age;
  void setBlank(String n,int y,int m,int d)
   {
    name=n;
    birth.setDate(y,m,d);
    } 
  void calAge()
   {if (birth.month<7)
      age=2004-birth.year;
    else
      age=2004-birth.year-1; 
    }
  void printBlank()
   {
    System.out.print(name+"的生日是");
    birth.printDate();
/*******************SPACE*******************/
    【?】;    
    System.out.println(name+"的年龄是"+age);
    }
  public static void main (String args[]) 
     {
	Prog1 s = new Prog1();
	s.setBlank("李利",1985,6,2);
       	s.printBlank();
      }
}','=======(答案1)=======
int d
=======(答案2)=======
()
=======(答案3)=======
new
=======(答案4)=======
calAge()',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：根据学生的考试的百分制成绩得出分数等级。
     (90~100为A级，80~89为B级，70~79为C级，60~69为D级，
      60分以下为E级)',NULL,'import java.io.*;
public class Prog1
{
   public static void main(String args[]) throws IOException
    { 
     int grade;
 /*****************FOUND*****************/  
     boolean str;
     BufferedReader buf;
     buf=new BufferedReader(new InputStreamReader(System.in));
     System.out.print("请输入考试成绩：");
     str=buf.readLine();      
 /*****************FOUND*****************/  
     grade=Int.parseInt(str); 
     System.out.print("对应的级别为：");
 /*****************FOUND*****************/  
     if (grade>90)
       System.out.println("A"); 
     else if (grade>=80)
       System.out.println("B"); 
     else if (grade>=70)
       System.out.println("C"); 
     else if (grade>=60)
       System.out.println("D"); 
 /*****************FOUND*****************/
     otherwise 
       System.out.println("E");     
   }
}','=======(答案1)=======
String str;
=======(答案2)=======
grade=Integer.parseInt(str);
=======(答案3)=======
if (grade>=90)
=======(答案4)=======
else',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：计算斐波纳契数列的第20项，并以每行5项的形式输出。
      (斐波纳契数列的第一项为0，第二项为1，其后各项依次
      为相临前两项之和，即0，1，1，2，3，5，8...)',NULL,'public class Prog1
{
  public static void main(String args[])
    { 
/***********FOUND***********/
      Integer f1,f2,f3=0,i;
      f1=0;
      f2=1;
/***********FOUND***********/
      for (i=3;i<=20;i--)
        {f3=f1+f2;
/***********FOUND***********/
         f2=f3;
/***********FOUND***********/
         f1=f2;
        } 
    System.out.println("第 20项为:"+f3);      
    } 
} ','=======(答案1)=======
int f1,f2,f3=0,i;
=======(答案2)=======
for (i=3;i<=20;i++)
=======(答案3)=======
f1=f2;
=======(答案4)=======
f2=f3;',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：在屏幕上输出如下图形
              *
            * * *
          * * * * *
        * * * * * * *
          * * * * *
            * * *
              *',NULL,'public class Prog1
{
  public static void main(String args[])
    { int i,j;
    /***********FOUND***********/
      for (i=1;i<4;i++)
        {
         for(j=1;j<=4-i;j++)
           System.out.print("  ");
    /***********FOUND***********/
         for (j=1;j<=i-1;j++)
           System.out.print("* ");
    /***********FOUND***********/
         System.out.print();
        }
       for (i=1;i<=3;i++)
        {
    /***********FOUND***********/
         for(j=1;j<i;j++)
           System.out.print("  ");
         for (j=1;j<=7-2*i;j++)
           System.out.print("* ");
         System.out.println();
        }
    
    } 
}','=======(答案1)=======
for (i=1;i<=4;i++)
=======(答案2)=======
for (j=1;j<=2*i-1;j++)
=======(答案3)=======
System.out.println();
=======(答案4)=======
for(j=1;j<=i;j++)',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',20,'medium','题目：一球从100米高度(变量名：high)自由落下，每次落地后反跳回原高度的一半；再落下。
编写一个方法(方法名：statLength)计算球在第n次落地时，共经过多少米？。在main方法中调用
该方法计算并输出球在第10次落地时经过的距离。
要求循环使用for循环，循环变量名为i',NULL,'public class Prog1{
/**********Program**********/


 public static void main(String[] args) {

 
 }
/**********  End  **********/
}','static double statLength(int n){
		double total=100;
		double high=100;
		for(int i=2;i<=n;i++){
			high = high/2;
			total += high*2;
		}
		return total;
	}
	public static void main(String[] args){
		System.out.println (statLength(10));
	}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',2,'medium','题目：使用while循环和if语句实现计算并输出1-100的能被3整除的数的和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
/**********Program**********/
public static void main(String[] args) {




}
/**********  End  **********/
}','public static void main(String[] args) {
int i = 1   ,   sum = 0;
while (   i<= 100   ) {
if (   i%3==0  )
sum=sum+i;
i++;（或者写 i=i+1）
}
System.out.println("结果为 "+sum);
}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',12,'medium','题目：从键盘输入的10个整数，保存到数组a中，将数组中的元素按逆序重新存放后输出。
要求使用for循环，循环变量名为i。
举例：
输入的10个整数后，数组中存放的是： 1 2 3 4 5 6 7 8 9 10
逆序重新存放后，数组中存放的是：10 9 8 7 6 5 4 3 2 1',NULL,'import java.util.*;
public class Prog1{
/**********Program**********/
public static void main(String[] args) {
   Scanner sc = new Scanner(System.in);



}
/**********  End  **********/
}','int a[] = new int[10];
Scanner sc = new Scanner(System.in);
int i;
int temp;

for(i=0;i<a.length;i++){
{
   a[i] = sc.nextInt();
}

for(i=0;i<=a.length/2;i++){
    temp = a[i];
    a[i] = a[a.length-1-i];
    a[a.length-1-i] = temp;
}

for(i=0;i<a.length;i++)
{
System.out.println(a[i]);
}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',30,'medium','（ArrayList）按要求完成题目编写：
1）创建ArrayList对象list，添加三个Integer对象s1、s2、s3，值分别为20、21、22
2） 通过for循环对list进行遍历，输出全部Integer的值
3） 查找是否包含s1，如果存在，删除
4）通过foreach循环对list进行遍历，输出Integer的值',NULL,'import java.util.*;
public class Prog1{
/**********Program**********/





/**********  End  **********/
}','public static void main(String[] args) {
		ArrayList<Integer> list = new ArrayList<Integer>();
		Integer s1 = 20;
		Integer s2 = 21;
		Integer s3 = 22;
		list.add(s1);
		list.add(s2);
		list.add(s3);
		for (int i=0;i<list.size();i++) {
			System.out.println(list.get(i));
		}
		if (list.contains(s1)) {
			list.remove(s1);
		}
		for (Integer s : list) {
			System.out.println(s);
		}
	}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','执行语句int i=1,j=++i;后i与j的值分别为（ ）','["1\\u4e0e1", "2\\u4e0e1", "1\\u4e0e2", "2\\u4e0e2"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','下列运算符合法的是（ ）','["&&", "<>", "if", ":="]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','以下的选项中能正确表示Java语言中的一个整型常量的是','["12.", "-20", "1,000", "4 5 6"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','设int x = 1 , y = 2 , z = 3,则表达式 y+=z--/++x中y的值是','["3", "3.5", "4", "4.5"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','下列不可作为java语言标识符的是( )','["a2", "$2", "_2", "22"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','Java是从（ ）语言改进重新设计。','["Ada", "C++", "Pasacal", "BASIC"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','有以下代码,其中变量i可能的类型是
switch(i){
default:System.out.println("hello"); }','["byte", "long", "double", "A and B"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','下列语句序列执行后,x 的值是
int a=4,b=1,x=6;
if(a==b) x+=a;
else x=++a*x;','["15", "30", "25", "5"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','有如下程序段：
int total=0;
for(int i=0;i<4;i++){
if(i==1)continue;
if(i==2)break;
total +=i;
}
则执行完该程序段后total的值为（ ）','["0", "1", "3", "6"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','下列语句中执行跳转功能的语句是','["for\\u8bed\\u53e5", "while\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "switch\\u8bed\\u53e5"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','在Java中，一个类可同时定义许多同名的方法，这些方法的形式参数个数、类型或顺序各不相同，传回的值也可以不相同。这种面向对象程序的特性称为（ ）','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',5,'medium','为了区分类中重载的同名的不同方法，要求(  )','["\\u91c7\\u7528\\u4e0d\\u540c\\u7684\\u5f62\\u5f0f\\u53c2\\u6570\\u5217\\u8868", "\\u8fd4\\u56de\\u503c\\u7684\\u6570\\u636e\\u7c7b\\u578b\\u4e0d\\u540c", "\\u8c03\\u7528\\u65f6\\u7528\\u7c7b\\u540d\\u6216\\u8005\\u5bf9\\u8c61\\u540d\\u505a\\u524d\\u7f00", "\\u53c2\\u6570\\u540d\\u4e0d\\u540c"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','设 i、j 为int型变量名，a 为int型数组名，以下选项中，正确的赋值语句是','["i = i + 2", "a[0] = 7;", "i++ - --j;", "a(0) = 66;"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','设有定义语句int  a[ ]={66,88,99}; 则以下对此语句的叙述错误的是','["\\u5b9a\\u4e49\\u4e86\\u4e00\\u4e2a\\u540d\\u4e3aa\\u7684\\u4e00\\u7ef4\\u6570\\u7ec4", "a\\u6570\\u7ec4\\u67093\\u4e2a\\u5143\\u7d20", "a\\u6570\\u7ec4\\u7684\\u5143\\u7d20\\u7684\\u4e0b\\u6807\\u4e3a1\\uff5e3", "\\u6570\\u7ec4\\u4e2d\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u662f\\u6574\\u578b"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',12,'medium','下面关于对象数组的叙述正确的是?','["\\u5bf9\\u8c61\\u6570\\u7ec4\\u7684\\u957f\\u5ea6\\u53ef\\u4ee5\\u4fee\\u6539", "\\u5bf9\\u8c61\\u6570\\u7ec4\\u91cc\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u90fd\\u662f\\u90a3\\u4e2a\\u5bf9\\u8c61\\u7684\\u5f15\\u7528", "\\u5bf9\\u8c61\\u6570\\u7ec4\\u7684\\u7d22\\u5f15\\u662f\\u4ece1\\u5f00\\u59cb\\u7684", "\\u6570\\u7ec4\\u4e2d\\u53ef\\u4ee5\\u5b58\\u653e\\u591a\\u79cd\\u7c7b\\u578b\\u7684\\u5bf9\\u8c61"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','list是一个ArrayList的对象，哪个选项的代码填写到//todo delete处，可以在Iterator遍历的过程中正确并安全的删除一个list中保存的对象？
 Iterator it = list.iterator();
       int index = 0;
       while (it.hasNext()){
              Object obj = it.next();
              if (needDelete(obj)) { //needDelete返回boolean，决定是否要删除
           //todo delete
              }
              index ++;
       }','["list.remove(obj);", "list.remove(index);", "list.remove(it.next());", "it.remove();"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','Java的集合框架中重要的接口java.util.Collection定义了许多方法。选项中哪个方法不是Collection接口所定义的？','["int size()", "boolean containsAll(Collection c)", "compareTo(Object obj)", "boolean remove(Object obj)"]',NULL,'C',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：定义一个Student类，包括年、月、日三个属性，以及设置日
      期的方法，显示日期的方法；定义一个Prog1，包括姓名、生
      日属性，包括设置姓名与生日的方法，显示姓名生日的方法',NULL,'class Student
 {
   int day, month, year;
   public void setDate( int d, int m, int y) 
    {
      day = d;
      month = m;
/*******************SPACE*******************/
      【?】;
     }
   public void printDate()
     {
	System.out.println(year+"年"+month+"月"+day+"日");
     }
 }
/*******************SPACE*******************/
public class Prog1 【?】 Student
{  
  String name;
  Student  birth;
  void setStudent(String n,Student b)
   {
    name=n;
    birth=b;
    } 
  void printStudent()
   {
    System.out.print(name+"的生日是");
/*******************SPACE*******************/
    birth.【?】;    
    }
  public static void main (String args[]) 
     {
	Prog1 s = new Prog1();
	Student d=new Student();
        d.setDate(22, 2, 1985);
        s.setStudent("李利",d);
/*******************SPACE*******************/
	s.【?】;
      }
}','=======(答案1)=======
year = y
=======(答案2)=======
extends
=======(答案3)=======
printDate()
=======(答案4)=======
printStudent()',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：编写应用程序，该类中有一个方法sort()参数和返回值类型
      均为字符串数组，从命令行传入多个字符串，调用方法sort()
      对该字符串数组按字母顺序排序。',NULL,'public class Prog1
{ 
  public static void main(String args[]) 
   {
    if(args.length>0)
     {
 /**********************SPACE**********************/
      String str[]=new String[【?】];
 /**********************SPACE**********************/
      str=【?】(args);
      for (int i=0;i<str.length;i++)
          System.out.println(str[i]);
     }
   }
  static String[] sort(String str[])
   {
    String[] s=new String[str.length];
    s=str;
    String temp;
    for (int i=0;i<s.length-1;i++) 
 /**********************SPACE**********************/
      for (int j=i+1;j<【?】;j++)
       {
        if (s[i].compareTo(s[j])>0)
          {
           temp=s[i];
 /**********************SPACE**********************/
           【?】;
           s[j]=temp;
          }
       } 
    return s;
  }
}','=======(答案1)=======
args.length
=======(答案2)=======
sort
=======(答案3)=======
s.length
=======(答案4)=======
s[i]=s[j]',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：按如下要求定义两个类A和B, 类A中定义一个int 类型属
      性x（将其赋值为8）和一个在命令行下输出x值的方法
      myPrint()。类B是类A的子类，其中也定义一个int 类型
      属性y（将其赋值为16）和String类型的属性s（将其赋值
      为"java program!"）；一个在命令行下输出y和s值的方法
      myPrint()；类B中还有一个方法printAll( )，该方法中分
      别调用父类和子类的myPrint()方法。编写Application，创
      建类类B的对象b，调用printAll( )方法，输出结果',NULL,'public class Prog1
{
  public static void main(String args[])
   { 
 /**********************SPACE**********************/
     【?】=new B();
     b.printAll( );
   }
}
class A
{
 int x=8;
 public void myPrint()
  { 
   System.out.println( "x="+x );
  }
}
 /**********************SPACE**********************/
class B 【?】
{
  int y=16;
 /**********************SPACE**********************/
  【?】 s="java program!";
  public void myPrint()
   { 
    System.out.println("y="+y); 
    System.out.println("s="+s);
   }
  void printAll()
   { 
 /**********************SPACE**********************/
    【?】.myPrint();
    myPrint(); 
   }
}','=======(答案1)=======
B b
=======(答案2)=======
extends A
=======(答案3)=======
String
=======(答案4)=======
super',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：从键盘上输入一个自然数m，将m的立方表示成m个连续的奇
      数之和。提示：其中最大的奇数为m×(m+1)-1',NULL,'import java.io.*;
public class Prog1
{
   public static void main(String args[]) throws IOException
    {
      int m,t,p,s;
      BufferedReader buf;
      buf=new BufferedReader(new InputStreamReader(System.in));
      System.out.print("请输入一个自然数:");
      m=Integer.parseInt(buf.readLine());  
 /***********FOUND***********/
      p=0;
      p=m*(m+1)-1;
      System.out.print(m+"×"+m+"×"+m+"="+p);
 /***********FOUND***********/
      t=m-1;
      do
       {
 /***********FOUND***********/
        s=s+t;
        t--;
        p=p-2;
        System.out.print("+"+p);
 /***********FOUND***********/
       }while(p==0);
       
     System.out.println("="+s);
   } 
} ','=======(答案1)=======
s=0;
=======(答案2)=======
t=m;
=======(答案3)=======
s=s+p;
=======(答案4)=======
}while(t!=0);
=========或=========
}while(s==m*m*m);',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：求键盘上输入的一个整数的所有因子，以5个一行的形式输出
      ，并求出所有因子之和。（如果一个整数a能被整数b整除，
       则b是a的因子。）',NULL,'import java.io.*;
public class Prog1
{
   public static void main(String args[]) throws IOException
    { 
     int n,cn=0,sum=0;
     BufferedReader buf;
     buf=new BufferedReader(new InputStreamReader(System.in));
     System.out.print("请输入一个整数：");
     n=Integer.parseInt(buf.readLine());        
     System.out.println(n+"的所有因子如下：");
/***********FOUND***********/
     for(int k=1;k<n;k++)
       {
/***********FOUND***********/
         if(n%k=0)
 	 {System.out.print(k+"  ");
          cn++;
/***********FOUND***********/
          if (cn/5==0)
            System.out.println();
/***********FOUND***********/
          }sum+=k;
        }
      System.out.println();
      System.out.println("所有因子和值是："+sum);		
      
   }
}','=======(答案1)=======
for(int k=1;k<=n;k++)
=======(答案2)=======
if(n%k==0)
=======(答案3)=======
if (cn%5==0)
=======(答案4)=======
sum+=k;}',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：求出数组a中能被3整除的数的和值',NULL,'import java.io.* ;
public class Prog1
{
  public   static   void    main(String  args[ ])
   { 
/***********FOUND***********/
    int   i, s=1 ;
    int  a[ ]= {10,20,30,40,50,60,70,80,90 };
/***********FOUND***********/
    for  ( i=0; i<a; i++ )
/***********FOUND***********/
       if ( a[i]/3==0 )  
/***********FOUND***********/
          s=a[i]; 
    System.out.println("s="+s);
    }
}','=======(答案1)=======
int   i , s = 0 ;
=======(答案2)=======
for  ( i=0; i<a.length; i++ )
=======(答案3)=======
if ( a[i]%3==0 )
=======(答案4)=======
s+=a[i];',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',20,'medium','题目：编写一个sum 方法，计算1~n之间所有能被3整除或者个位数是3的整数的和；并在main方法中调用该方法计算n=100时的和，并输出。',NULL,'public class Prog1{
/**********Program**********/


 public static void main(String[] args) {

 
 }
/**********  End  **********/
}','public static int sum(int n)
{
  int sum=0;
  for(int i=1;i<=n;i++)
  {
    if(i%3==0||i%10==3){
       sum = sum + i;
    }
  }
  return sum;
}
public static void main(String[] args)
{
   System.out.println(sum(100));
}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',2,'medium','题目：输入一组成绩，输入-1代表结束，查找最高成绩，并保存在变量max中，输出max，要求使用while循环实现。',NULL,'import java.util.Scanner;
public class Prog1{


/**********Program**********/

 public static void main(String[] args){
      Scanner sc = new Scanner(System.in);


 }

/**********  End  **********/
}','int score,max=0;
Scanner sc = new Scanner(System.in);
score=sc.nextInt();
while(score!=-1){
   if(score>max){
     max = score;
    }
   score=sc.nextInt();
}
System.out.println(max);',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',12,'medium','题目：定义一个长度为100的布尔型数组，数组名为fig，并用for循环语句将数组所有元素赋值为false',NULL,'public class Prog1{
/**********Program**********/


/**********  End  **********/
}','public static void main(String[] args) {
boolean [] fig   =   new boolean[100];
for(int i=0;i<fig.length;i++){   	 
 g[i]=false;
 System.out.println("fig[ "+i+" ]= "+fig[i]);
    }
   }',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',30,'medium','定义字符串变量s， "aababcabcdabcde",编程获取字符串中每一个字母出现的次数，
并按要求输出结果:a(5)b(4)c(3)d(2)e(1)
1、定义一个字符串(写完之后可以升级成键盘录入)
2、定义一个HashMap集合对象(考虑自然还是比较器排序)
                    键：Character
                    值：Integer
3、将字符串转化成字符数组
4、遍历字符数组得到每一个字符，使用for(char c :chars)
5、遍历字符数组，对每一个字符，使用该字符取得集合中对应的返回值
 是null,说明集合中还没有该字符作为键存在，就把该字符作为键，value设置为1存储
 不是null，说明该键已经存在了，把value取出来，加1，重新存储到集合中。
6、使用StringBuffer做字符串拼接
7、遍历集合，获取到键和值，按照对应的输出格式进行输出，for(Map.Entry<Character,Integer> keyValue:entries)
8、将StringBuffer转成String输出',NULL,'/**********Program**********/

public class Prog1 {





}

/**********  End  **********/','public class Prog1 {
    public static void main(String[] args) {
        String s = "aababcabcdabcde";
        HashMap<Character, Integer> map = new HashMap<>();

        char[] chars = s.toCharArray();

        for (char c : chars) {
            Integer value = map.get(c);

            if (value == null) {
                map.put(c, 1);
            } else {
                value++;
                map.put(c, value);
            }
        }

        StringBuffer sb = new StringBuffer();

        Set<Map.Entry<Character, Integer>> entries = map.entrySet();
        for (Map.Entry<Character, Integer> keyValue : entries) {
            Character key = keyValue.getKey();
            Integer value = keyValue.getValue();
            sb.append(key).append("(").append(value).append(")");
        }

        String result = sb.toString();
        System.out.println("统计的结果为：");
        System.out.println(result);
    }
}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','下列单词中,不属于Java关键字的是','["NULL", "class", "this", "byte"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是( )','["a1.java", "a1.class", "a1", "\\u4ee5\\u4e0a\\u90fd\\u5bf9"]',NULL,'A',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',1,'medium','Java语言中,占用32位存储空间的是','["long,double", "long,float", "int,double", "int,float"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','以下for循环的执行次数是:
for(int x=0;(x==0)&(x<4);x++);','["\\u65e0\\u9650\\u6b21", "1\\u6b21", "4\\u6b21", "3\\u6b21"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','以下由 for 语句构成的循环执行的次数是
for(int i=0;i>0;i++);','["\\u6709\\u8bed\\u6cd5\\u9519,\\u4e0d\\u80fd\\u6267\\u884c", "\\u65e0\\u9650\\u6b21", "\\u6267\\u884c1\\u6b21", "\\u4e00\\u6b21\\u4e5f\\u4e0d\\u6267\\u884c"]',NULL,'D',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','有以下代码,运行完后i的最终值是
int i=1;
int j=i++;
if((i>++j)&&(i++==j))   i+=j;','["1", "2", "3", "4"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',2,'medium','下列语句序列执行后,m的值是
int m=1;
for(int i=5;i>0;i--)
m*=i;','["15", "120", "60", "0"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','single_choice',14,'medium','欲构造ArrayList类的一个实例，此类继承了List接口，下列哪个方法是正确的？','["ArrayList myList=new Object\\uff08\\uff09\\uff1b", "List myList=new ArrayList\\uff08\\uff09\\uff1b", "ArrayList myList=new List\\uff08\\uff09\\uff1b", "List myList=new List\\uff08\\uff09\\uff1b"]',NULL,'B',1,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：编写Application,求从命令行传入任意多个整数的最大值',NULL,'import java.io.*;
public class Prog1
{
 public static void main (String[] args)
  {
   int n=args.length;
   if(n==0)
     System.out.println("Please input int numbers!");
   else
    {
 /**********************SPACE**********************/
     int x[]=【?】[n];
     for(int i=0;i<args.length;i++)
 /**********************SPACE**********************/
        x[i]=【?】.parseInt(args[i]);
     System.out.println("max="+ArrayMax(x));

    }

  }

 static int ArrayMax( int array[] )
  {
   int max = array[0];
 /**********************SPACE**********************/
   for( int i =1; i < 【?】; i++)
    {
     if ( array[i] > max )
       max = array[i];
    }
 /**********************SPACE**********************/
   return 【?】;
  }
} ','=======(答案1)=======
new int
=======(答案2)=======
Integer
=======(答案3)=======
array.length
=======(答案4)=======
max',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','fill_blank',1,'medium','功能：找出一个二维数组中的鞍点，即该位置上的元素在该行上
      最大，在该列上最小。也可能没有鞍点',NULL,'public class Prog1
{
  public static void main(String args[]) 
   {
    final int N=3;
/*******************SPACE*******************/
    【?】={{1,2,3},{4,5,6},{7,8,9}};
    int t1,t2,col,row;
    col=row=t1=t2=0;
    for(int i=0;i<N;i++)
       {t1=a[i][0];
        for(int j=1;j<N;j++)
/*******************SPACE*******************/
          if (【?】)
            {
             t1=a[i][j];
             col=j;
            }
        t2=a[0][col];
        for(int j=1;j<N;j++)
          if(a[j][col]<t2)
            {
             t2=a[j][col];
/*******************SPACE*******************/
             【?】;
            }
         if (t1==t2)
/*******************SPACE*******************/
           【?】;
       }          
     if(t1==t2)
       System.out.println("鞍点是位于第"+(row+1)+"行第"+(col+1)+"列的"+t1);
     else
       System.out.println("不存在鞍点"); 
   }
}','=======(答案1)=======
int a[][]
=======(答案2)=======
a[i][j]>t1
=======(答案3)=======
row=j
=======(答案4)=======
break',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：计算 1/1+1/2+1/3+...+1/100 的值',NULL,'public class Prog1
{  
  public static void  main( String args[ ])
   { 
/***********FOUND***********/
     int  sum=0.0;
/***********FOUND***********/
     for(int i=1; i<100; i++)
/***********FOUND***********/
       sum+=1/i;
/***********FOUND***********/
     System.out.println( "sum=",sum );
   }
}','=======(答案1)=======
double  sum=0.0;
=======(答案2)=======
for(int i=1; i<=100; i++)
=======(答案3)=======
sum+=1/(double)i;
=========或=========
sum+=1.0/i;
=========或=========
sum+=1.0/(double)i;
=======(答案4)=======
System.out.println( "sum="+sum );',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','error_fix',1,'medium','题目：求出1~1000以内的完全平方数，要求每行输出5个数（完全
      平方数是指能够表示成另一个整数的平方的整数）',NULL,'import java.io.*;
public class Prog1
{
   public static void main(String args[]) 
    {
      int n,i,p;
/***********FOUND***********/
      p=1;
      for(i=1;i<40;i++)
        {
/***********FOUND***********/
         n=i;
         if (n>1000)
/***********FOUND***********/
            break;
         System.out.print(n+"\\t");
         p++;
/***********FOUND***********/
         if(p/5==0)
           System.out.println();
         }
     }
}','=======(答案1)=======
p=0;
=======(答案2)=======
n=i*i;
=======(答案3)=======
continue;
=======(答案4)=======
if(p%5==0)',5,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',20,'medium','题目：编写一个area方法，计算半径为r的圆的面积；并在main方法中调用该方法计算半径为5.5的圆的面积，并输出该面积。',NULL,'public class Prog1{
/**********Program**********/


 public static void main(String[] args) {

 
 }
/**********  End  **********/
}','public static double area(double r)
{
     return 3.14*r*r;
}
public static void main(String[] args)
{
   System.out.println(area(5.5));
}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34'),
	 ('java','programming',30,'medium','（ArrayList）按要求完成题目编写：
1）创建ArrayList对象list，添加三个字符串对象s1、s2、s3，字符串的值分别为001、002、003
2） 通过for循环对list进行遍历，输出全部字符串
3） 查找是否包含s1，如果存在，删除
4）创建迭代器it ，使用迭代器对list进行遍历，输出全部字符串',NULL,'import java.util.*;
public class Prog1{
/**********Program**********/





/**********  End  **********/
}','public static void main(String[] args) {
		ArrayList<String> list = new ArrayList<String>();
		String s1="001";
		String s2="002";
		String s3="003";
		list.add(s1);
		list.add(s2);
		list.add(s3);
		for (String s : list) {
			System.out.println(s);
		}
		if (list.contains(s1)) {
			list.remove(s1);
		}
		Iterator<String> it = list.iterator();
		while (it.hasNext()) {
			String s = it.next();

			System.out.println(s);
		}
}',10,'2026-01-27 20:06:34','2026-01-27 20:06:34');