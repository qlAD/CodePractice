-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下面哪个标识符是合法的','["#_pound", "$123+w", "5Interstate", "a_b"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列哪一个是合法的标识符','["12class", "+viod", "-5", "_black"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列数据类型的精度由高到低的顺序是','["float,double,int,long", "double,float,int,byte", "byte,long,double,float", "double,int,float,long"]',NULL,'B',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'整型数据类型中，需要内存空间最少的是( )','["short", "long", "int", "byte"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'以下标识符中哪项是不合法的（ ）','["class", "$double", "hello", "BigMeaninglessName"]',NULL,'A',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'对于一个三位的正整数 n,取出它的十位数字k(k为整型)的表达式是','["k = n / 10 % 10", "k = n%10 % 10", "k = n % 10", "k = n / 10"]',NULL,'A',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列语句哪一个正确（ ）','["Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fmachine code", "Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fbyte code", "Java\\u7a0b\\u5e8f\\u7ecf\\u7f16\\u8bd1\\u540e\\u4f1a\\u4ea7\\u751fDLL", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u6b63\\u786e"]',NULL,'B',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'执行如下程序代码
a=0;c=0; do{ --c; a=a-1; }while(a>0);
后，C的值是( )','["0", "1", "-1", "\\u6b7b\\u5faa\\u73af"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列关于for循环和while循环的说法中哪个是正确的？ （ ）','["while\\u5faa\\u73af\\u4e2d\\u4e0d\\u80fd\\u4f7f\\u7528continue\\u8bed\\u53e5\\uff0cfor\\u5faa\\u73af\\u4e2d\\u53ef\\u4ee5\\u4f7f\\u7528\\uff1b", "while\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u4e0d\\u80fd\\u7701\\u7565\\uff0cfor\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u53ef\\u4ee5\\u7701\\u7565\\uff1b", "while\\u5faa\\u73af\\u8bed\\u53e5\\u524d\\u4e0d\\u80fd\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff0cfor\\u5faa\\u73af\\u53ef\\u4ee5\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff1b", "\\u4ee5\\u4e0a\\u5168\\u90fd\\u4e0d\\u5bf9"]',NULL,'B',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列对Java语言的叙述中,错误的是','["Java\\u865a\\u62df\\u673a\\u89e3\\u91ca\\u6267\\u884c\\u5b57\\u8282\\u7801", "Java\\u4e2d\\u6267\\u884c\\u8df3\\u8f6c\\u529f\\u80fd\\u7684\\u8bed\\u53e5\\u662fswitch\\u8bed\\u53e5", "Java\\u7684\\u7c7b\\u662f\\u5bf9\\u5177\\u6709\\u76f8\\u540c\\u884c\\u4e3a\\u5bf9\\u8c61\\u7684\\u4e00\\u79cd\\u62bd\\u8c61", "Java\\u4e2d\\u7684\\u5783\\u573e\\u56de\\u6536\\u673a\\u5236\\u662f\\u4e00\\u4e2a\\u7cfb\\u7edf\\u7ea7\\u7684\\u7ebf\\u7a0b"]',NULL,'B',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'在switch(expression)语句中,expression的数据类型不能是','["byte", "char", "float", "short"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列语句序列执行后,s的值是
int s=1,i=1;
while(i<=4){
s=s*i;
i++;}','["6", "4", "24", "5"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'Java 支持的3 种跳转语句不包括','["break\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "return\\u8bed\\u53e5", "goto\\u8bed\\u53e5"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'若a和b是整型变量并以正确赋值,以下正确的switch语句是:','["switch(a+b);{}", "switch(a+b*3.0){}", "switch a{}", "switch(a%b) {}"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列哪些语句关于Java内存回收的说明是正确的? （ ）','["\\u7a0b\\u5e8f\\u5458\\u5fc5\\u987b\\u521b\\u5efa\\u4e00\\u4e2a\\u7ebf\\u7a0b\\u6765\\u91ca\\u653e\\u5185\\u5b58", "\\u5185\\u5b58\\u56de\\u6536\\u7a0b\\u5e8f\\u8d1f\\u8d23\\u91ca\\u653e\\u65e0\\u7528\\u5185\\u5b58", "\\u5185\\u5b58\\u56de\\u6536\\u7a0b\\u5e8f\\u5141\\u8bb8\\u7a0b\\u5e8f\\u5458\\u76f4\\u63a5\\u91ca\\u653e\\u5185\\u5b58", "\\u5185\\u5b58\\u56de\\u6536\\u7a0b\\u5e8f\\u53ef\\u4ee5\\u5728\\u6307\\u5b9a\\u7684\\u65f6\\u95f4\\u91ca\\u653e\\u5185\\u5b58\\u5bf9\\u8c61"]',NULL,'B',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'Java 类可以作为( )','["\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236", "\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236\\u548c\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u4e0a\\u8ff0\\u90fd\\u4e0d\\u5bf9"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'方法的重载是指,两个方法具有相同名称和不同的参数形式.其中不同的参数形式是指()','["\\u53c2\\u6570\\u4e2a\\u6570\\u3001\\u7c7b\\u578b\\u3001\\u987a\\u5e8f\\u4e0d\\u540c", "\\u53c2\\u6570\\u6709\\u65e0\\u8fd4\\u56de\\u503c", "\\u65b9\\u6cd5\\u7684\\u4fee\\u9970\\u7b26\\u4e0d\\u540c", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u5bf9"]',NULL,'A',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'在Java中,一个类可同时定义许多同名的方法,这些方法的形式参数的个数、类型或顺序各不相同,返回的值也可以不相同.这种面向对象程序特性称为?','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'有以下方法的定义,请选择该方法的返回类型?
type method(byte x,float y){
    return x/y*2;
}','["byte", "short", "int", "float"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下面关于数组定义语句不正确的是?','["int[ ]  a1,a2;", "int  a0[ ]={11,2,30,84,5};", "double[] d=new double[8];", "float f[ ]=new  {2.0f,3.5f,5.6f,7.8f};"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下面哪种写法可以实现访问数组arr的第1个元素?','["arr[0]", "arr(0)", "arr[1]", "arr(1)"]',NULL,'A',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列对长度为4的数组a的定义中,正确的是?','["int[4] a=new int[];", "int a[]=new int[5];", "int a[]={2,4,2,1};", "int[4] a=new int[4];"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'在一个应用程序中定义了数组a：int[ ]  a={1,2,3,4,5,6,7,8,9,10},为了打印输出数组a的最后一个数组元素，下面正确的代码是?','["System.out.println(a[10]);", "System.out.println(a[9]);", "System.out.println(a[a.length]);", "System.out.println(a(8));"]',NULL,'B',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下面哪一个是合法的数组声明和构造语句?','["int[] ages = [100];", "int ages = new int[100];", "int[] ages = new int[100];", "int() ages = new int(100);"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'int a[ ]={45,4,67,23,65,87,34,52,56};数组中a[5]的值为','["23", "45", "65", "87"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'设有定义语句int  a[ ]={3,9,-9,-2,8}; 则以下对此语句的叙述错误的是?','["a\\u6570\\u7ec4\\u67095\\u4e2a\\u5143\\u7d20", "\\u6570\\u7ec4\\u4e2d\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u662f\\u6574\\u578b", "a\\u7684\\u503c\\u4e3a3", "\\u5bf9\\u6570\\u7ec4\\u5143\\u7d20\\u7684\\u5f15\\u7528a[a.length-1]\\u662f\\u5408\\u6cd5\\u7684"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'下列描述中正确的是：','["HashMap\\u4e2d\\u7684\\u5143\\u7d20\\u65e0\\u5e8f\\u53ef\\u91cd\\u590d", "HashMap\\u4e2d\\u7684\\u5143\\u7d20\\u6709\\u5e8f\\u4e0d\\u53ef\\u91cd\\u590d", "HashMap\\u4e2d\\u7684\\u5143\\u7d20\\u952e\\uff0d\\u503c\\u6210\\u5bf9\\u51fa\\u73b0", "HashSet\\u4e2d\\u7684\\u5143\\u7d20\\u952e\\uff0d\\u503c\\u6210\\u5bf9\\u51fa\\u73b0"]',NULL,'C',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'list是一个ArrayList的对象，哪个选项的代码填写到//todo delete处，可以在Iterator遍历的过程中正确并安全的删除一个list中保存的对象？
       Iterator it = list.iterator();
       int index = 0;
       while (it.hasNext()){
              Object obj = it.next();
              if (needDelete(obj)) { //needDelete返回boolean，决定是否要删除
           //todo delete
              }
              index ++;
       }','["list.remove(obj);", "list.remove(index);", "list.remove(it.next());", "it.remove();"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题示代码的功能为：对于一个存放Person对象的ArrayList进行循环遍历，并取到每个Person对象的idCard和userName。
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
那么《插入代码》处的代码为()','["List list:person", "List list:Person", "Person person:List", "Person person:list"]',NULL,'D',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目代码的功能是：采用Iterator进行循环遍历到集合中的每一个元素，并将其移除，《插入代码》处应填入的代码是
ArrayList list = new ArrayList();
list.add("java");
list.add("php");
list.add(".net");
《插入代码》 为()','["Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nit.next();\\nit.remove();\\n}", "Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nit.remove();\\n}", "Iterator it=list.iterator();\\nwhile(it. hasNext()){\\nObject obj=it.next();\\nlist.remove(obj);\\n}", "Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nlist.remove();\\n}"]',NULL,'A',1,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'功能：定义一个学生类Prog1，包括姓名、学号、数学成绩、外语
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
average()',5,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'功能：数组a已从小到大排好顺序，将一个数插入数组a中,使其仍
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
temp2',5,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'功能：定义一个Date类，包括年、月、日三个属性，以及设置日期
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
calAge()',5,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目：根据学生的考试的百分制成绩得出分数等级。
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
else',5,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目：计算斐波纳契数列的第20项，并以每行5项的形式输出。
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
f2=f3;',5,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目：在屏幕上输出如下图形
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
for(j=1;j<=i;j++)',5,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目：一球从100米高度(变量名：high)自由落下，每次落地后反跳回原高度的一半；再落下。
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
	}',10,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目：使用while循环和if语句实现计算并输出1-100的能被3整除的数的和，循环变量名为i，存放和的变量名为sum。',NULL,'public class Prog1{
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
}',10,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'题目：从键盘输入的10个整数，保存到数组a中，将数组中的元素按逆序重新存放后输出。
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
}',10,'2026-03-29 08:27:30','2026-03-29 08:27:30'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '745' LIMIT 1),'（ArrayList）按要求完成题目编写：
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
	}',10,'2026-03-29 08:27:30','2026-03-29 08:27:30');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '745';
