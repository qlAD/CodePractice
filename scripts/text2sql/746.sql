-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'执行语句int i=1,j=++i;后i与j的值分别为（ ）','["1\\u4e0e1", "2\\u4e0e1", "1\\u4e0e2", "2\\u4e0e2"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列哪一个是合法的标识符','["12class", "+viod", "-5", "_black"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列运算符合法的是（ ）','["&&", "<>", "if", ":="]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'以下的选项中能正确表示Java语言中的一个整型常量的是','["12.", "-20", "1,000", "4 5 6"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'设int x = 1 , y = 2 , z = 3,则表达式 y+=z--/++x中y的值是','["3", "3.5", "4", "4.5"]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列不可作为java语言标识符的是( )','["a2", "$2", "_2", "22"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'Java是从（ ）语言改进重新设计。','["Ada", "C++", "Pasacal", "BASIC"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列关于for循环和while循环的说法中哪个是正确的？ （ ）','["while\\u5faa\\u73af\\u4e2d\\u4e0d\\u80fd\\u4f7f\\u7528continue\\u8bed\\u53e5\\uff0cfor\\u5faa\\u73af\\u4e2d\\u53ef\\u4ee5\\u4f7f\\u7528\\uff1b", "while\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u4e0d\\u80fd\\u7701\\u7565\\uff0cfor\\u5faa\\u73af\\u7684\\u5faa\\u73af\\u6761\\u4ef6\\u53ef\\u4ee5\\u7701\\u7565\\uff1b", "while\\u5faa\\u73af\\u8bed\\u53e5\\u524d\\u4e0d\\u80fd\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff0cfor\\u5faa\\u73af\\u53ef\\u4ee5\\u52a0\\u8bed\\u53e5\\u6807\\u53f7\\uff1b", "\\u4ee5\\u4e0a\\u5168\\u90fd\\u4e0d\\u5bf9"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列对Java语言的叙述中,错误的是','["Java\\u865a\\u62df\\u673a\\u89e3\\u91ca\\u6267\\u884c\\u5b57\\u8282\\u7801", "Java\\u4e2d\\u6267\\u884c\\u8df3\\u8f6c\\u529f\\u80fd\\u7684\\u8bed\\u53e5\\u662fswitch\\u8bed\\u53e5", "Java\\u7684\\u7c7b\\u662f\\u5bf9\\u5177\\u6709\\u76f8\\u540c\\u884c\\u4e3a\\u5bf9\\u8c61\\u7684\\u4e00\\u79cd\\u62bd\\u8c61", "Java\\u4e2d\\u7684\\u5783\\u573e\\u56de\\u6536\\u673a\\u5236\\u662f\\u4e00\\u4e2a\\u7cfb\\u7edf\\u7ea7\\u7684\\u7ebf\\u7a0b"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'有以下代码,其中变量i可能的类型是
switch(i){
default:System.out.println("hello"); }','["byte", "long", "double", "A and B"]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列语句序列执行后,x 的值是
int a=4,b=1,x=6;
if(a==b) x+=a;
else x=++a*x;','["15", "30", "25", "5"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'若a和b是整型变量并以正确赋值,以下正确的switch语句是:','["switch(a+b);{}", "switch(a+b*3.0){}", "switch a{}", "switch(a%b) {}"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'有如下程序段：
int total=0;
for(int i=0;i<4;i++){
if(i==1)continue;
if(i==2)break;
total +=i;
}
则执行完该程序段后total的值为（ ）','["0", "1", "3", "6"]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列语句中执行跳转功能的语句是','["for\\u8bed\\u53e5", "while\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "switch\\u8bed\\u53e5"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'在Java中,一个类可同时定义许多同名的方法,这些方法的形式参数的个数、类型或顺序各不相同,返回的值也可以不相同.这种面向对象程序特性称为?','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'在Java中，一个类可同时定义许多同名的方法，这些方法的形式参数个数、类型或顺序各不相同，传回的值也可以不相同。这种面向对象程序的特性称为（ ）','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'Java 类可以作为( )','["\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236", "\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236\\u548c\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u4e0a\\u8ff0\\u90fd\\u4e0d\\u5bf9"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'方法的重载是指,两个方法具有相同名称和不同的参数形式.其中不同的参数形式是指()','["\\u53c2\\u6570\\u4e2a\\u6570\\u3001\\u7c7b\\u578b\\u3001\\u987a\\u5e8f\\u4e0d\\u540c", "\\u53c2\\u6570\\u6709\\u65e0\\u8fd4\\u56de\\u503c", "\\u65b9\\u6cd5\\u7684\\u4fee\\u9970\\u7b26\\u4e0d\\u540c", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u5bf9"]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'为了区分类中重载的同名的不同方法，要求(  )','["\\u91c7\\u7528\\u4e0d\\u540c\\u7684\\u5f62\\u5f0f\\u53c2\\u6570\\u5217\\u8868", "\\u8fd4\\u56de\\u503c\\u7684\\u6570\\u636e\\u7c7b\\u578b\\u4e0d\\u540c", "\\u8c03\\u7528\\u65f6\\u7528\\u7c7b\\u540d\\u6216\\u8005\\u5bf9\\u8c61\\u540d\\u505a\\u524d\\u7f00", "\\u53c2\\u6570\\u540d\\u4e0d\\u540c"]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'设 i、j 为int型变量名，a 为int型数组名，以下选项中，正确的赋值语句是','["i = i + 2", "a[0] = 7;", "i++ - --j;", "a(0) = 66;"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'int a[ ]={45,4,67,23,65,87,34,52,56};数组中a[5]的值为','["23", "45", "65", "87"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'设有定义语句int  a[ ]={66,88,99}; 则以下对此语句的叙述错误的是','["\\u5b9a\\u4e49\\u4e86\\u4e00\\u4e2a\\u540d\\u4e3aa\\u7684\\u4e00\\u7ef4\\u6570\\u7ec4", "a\\u6570\\u7ec4\\u67093\\u4e2a\\u5143\\u7d20", "a\\u6570\\u7ec4\\u7684\\u5143\\u7d20\\u7684\\u4e0b\\u6807\\u4e3a1\\uff5e3", "\\u6570\\u7ec4\\u4e2d\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u662f\\u6574\\u578b"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下面哪一个是合法的数组声明和构造语句?','["int[] ages = [100];", "int ages = new int[100];", "int[] ages = new int[100];", "int() ages = new int(100);"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下面关于对象数组的叙述正确的是?','["\\u5bf9\\u8c61\\u6570\\u7ec4\\u7684\\u957f\\u5ea6\\u53ef\\u4ee5\\u4fee\\u6539", "\\u5bf9\\u8c61\\u6570\\u7ec4\\u91cc\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u90fd\\u662f\\u90a3\\u4e2a\\u5bf9\\u8c61\\u7684\\u5f15\\u7528", "\\u5bf9\\u8c61\\u6570\\u7ec4\\u7684\\u7d22\\u5f15\\u662f\\u4ece1\\u5f00\\u59cb\\u7684", "\\u6570\\u7ec4\\u4e2d\\u53ef\\u4ee5\\u5b58\\u653e\\u591a\\u79cd\\u7c7b\\u578b\\u7684\\u5bf9\\u8c61"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'下列对长度为4的数组a的定义中,正确的是?','["int[4] a=new int[];", "int a[]=new int[5];", "int a[]={2,4,2,1};", "int[4] a=new int[4];"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'在一个应用程序中定义了数组a：int[ ]  a={1,2,3,4,5,6,7,8,9,10},为了打印输出数组a的最后一个数组元素，下面正确的代码是?','["System.out.println(a[10]);", "System.out.println(a[9]);", "System.out.println(a[a.length]);", "System.out.println(a(8));"]',NULL,'B',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目代码的功能是：采用Iterator进行循环遍历到集合中的每一个元素，并将其移除，《插入代码》处应填入的代码是
ArrayList list = new ArrayList();
list.add("java");
list.add("php");
list.add(".net");
《插入代码》 为()','["Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nit.next();\\nit.remove();\\n}", "Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nit.remove();\\n}", "Iterator it=list.iterator();\\nwhile(it. hasNext()){\\nObject obj=it.next();\\nlist.remove(obj);\\n}", "Iterator it=list.iterator();\\nwhile(it.hasNext()){\\nlist.remove();\\n}"]',NULL,'A',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'list是一个ArrayList的对象，哪个选项的代码填写到//todo delete处，可以在Iterator遍历的过程中正确并安全的删除一个list中保存的对象？
 Iterator it = list.iterator();
       int index = 0;
       while (it.hasNext()){
              Object obj = it.next();
              if (needDelete(obj)) { //needDelete返回boolean，决定是否要删除
           //todo delete
              }
              index ++;
       }','["list.remove(obj);", "list.remove(index);", "list.remove(it.next());", "it.remove();"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题示代码的功能为：对于一个存放Person对象的ArrayList进行循环遍历，并取到每个Person对象的idCard和userName。
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
那么《插入代码》处的代码为()','["List list:person", "List list:Person", "Person person:List", "Person person:list"]',NULL,'D',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'Java的集合框架中重要的接口java.util.Collection定义了许多方法。选项中哪个方法不是Collection接口所定义的？','["int size()", "boolean containsAll(Collection c)", "compareTo(Object obj)", "boolean remove(Object obj)"]',NULL,'C',1,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'功能：定义一个Student类，包括年、月、日三个属性，以及设置日
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
printStudent()',5,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'功能：编写应用程序，该类中有一个方法sort()参数和返回值类型
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
s[i]=s[j]',5,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'功能：按如下要求定义两个类A和B, 类A中定义一个int 类型属
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
super',5,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目：从键盘上输入一个自然数m，将m的立方表示成m个连续的奇
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
}while(s==m*m*m);',5,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目：求键盘上输入的一个整数的所有因子，以5个一行的形式输出
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
sum+=k;}',5,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目：求出数组a中能被3整除的数的和值',NULL,'import java.io.* ;
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
s+=a[i];',5,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目：编写一个sum 方法，计算1~n之间所有能被3整除或者个位数是3的整数的和；并在main方法中调用该方法计算n=100时的和，并输出。',NULL,'public class Prog1{
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
}',10,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目：输入一组成绩，输入-1代表结束，查找最高成绩，并保存在变量max中，输出max，要求使用while循环实现。',NULL,'import java.util.Scanner;
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
System.out.println(max);',10,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'题目：定义一个长度为100的布尔型数组，数组名为fig，并用for循环语句将数组所有元素赋值为false',NULL,'public class Prog1{
/**********Program**********/


/**********  End  **********/
}','public static void main(String[] args) {
boolean [] fig   =   new boolean[100];
for(int i=0;i<fig.length;i++){   	 
 g[i]=false;
 System.out.println("fig[ "+i+" ]= "+fig[i]);
    }
   }',10,'2026-03-29 08:27:36','2026-03-29 08:27:36'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '746' LIMIT 1),'定义字符串变量s， "aababcabcdabcde",编程获取字符串中每一个字母出现的次数，
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
}',10,'2026-03-29 08:27:36','2026-03-29 08:27:36');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '746';
