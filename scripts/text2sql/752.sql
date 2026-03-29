-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）
INSERT INTO code_practice.questions (`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'对于一个三位的正整数 n,取出它的十位数字k(k为整型)的表达式是','["k = n / 10 % 10", "k = n%10 % 10", "k = n % 10", "k = n / 10"]',NULL,'A',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下列单词中,不属于Java关键字的是','["NULL", "class", "this", "byte"]',NULL,'A',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'有一段java 应用程序，它的主类名是a1，那么保存它的源文件名可以是( )','["a1.java", "a1.class", "a1", "\\u4ee5\\u4e0a\\u90fd\\u5bf9"]',NULL,'A',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下列不可作为java语言标识符的是( )','["a2", "$2", "_2", "22"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下面哪个标识符是合法的','["#_pound", "$123+w", "5Interstate", "a_b"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'Java语言中,占用32位存储空间的是','["long,double", "long,float", "int,double", "int,float"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下列运算符合法的是（ ）','["&&", "<>", "if", ":="]',NULL,'A',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'在switch(expression)语句中,expression的数据类型不能是','["byte", "char", "float", "short"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'若a和b是整型变量并以正确赋值,以下正确的switch语句是:','["switch(a+b);{}", "switch(a+b*3.0){}", "switch a{}", "switch(a%b) {}"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下列语句中执行跳转功能的语句是','["for\\u8bed\\u53e5", "while\\u8bed\\u53e5", "continue\\u8bed\\u53e5", "switch\\u8bed\\u53e5"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'以下for循环的执行次数是:
for(int x=0;(x==0)&(x<4);x++);','["\\u65e0\\u9650\\u6b21", "1\\u6b21", "4\\u6b21", "3\\u6b21"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'以下由 for 语句构成的循环执行的次数是
for(int i=0;i>0;i++);','["\\u6709\\u8bed\\u6cd5\\u9519,\\u4e0d\\u80fd\\u6267\\u884c", "\\u65e0\\u9650\\u6b21", "\\u6267\\u884c1\\u6b21", "\\u4e00\\u6b21\\u4e5f\\u4e0d\\u6267\\u884c"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'有以下代码,运行完后i的最终值是
int i=1;
int j=i++;
if((i>++j)&&(i++==j))   i+=j;','["1", "2", "3", "4"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下列语句序列执行后,m的值是
int m=1;
for(int i=5;i>0;i--)
m*=i;','["15", "120", "60", "0"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'方法的重载是指,两个方法具有相同名称和不同的参数形式.其中不同的参数形式是指()','["\\u53c2\\u6570\\u4e2a\\u6570\\u3001\\u7c7b\\u578b\\u3001\\u987a\\u5e8f\\u4e0d\\u540c", "\\u53c2\\u6570\\u6709\\u65e0\\u8fd4\\u56de\\u503c", "\\u65b9\\u6cd5\\u7684\\u4fee\\u9970\\u7b26\\u4e0d\\u540c", "\\u4ee5\\u4e0a\\u90fd\\u4e0d\\u5bf9"]',NULL,'A',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'在Java中,一个类可同时定义许多同名的方法,这些方法的形式参数的个数、类型或顺序各不相同,返回的值也可以不相同.这种面向对象程序特性称为?','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'Java 类可以作为( )','["\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236", "\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u7c7b\\u578b\\u5b9a\\u4e49\\u673a\\u5236\\u548c\\u6570\\u636e\\u5c01\\u88c5\\u673a\\u5236", "\\u4e0a\\u8ff0\\u90fd\\u4e0d\\u5bf9"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'为了区分类中重载的同名的不同方法，要求(  )','["\\u91c7\\u7528\\u4e0d\\u540c\\u7684\\u5f62\\u5f0f\\u53c2\\u6570\\u5217\\u8868", "\\u8fd4\\u56de\\u503c\\u7684\\u6570\\u636e\\u7c7b\\u578b\\u4e0d\\u540c", "\\u8c03\\u7528\\u65f6\\u7528\\u7c7b\\u540d\\u6216\\u8005\\u5bf9\\u8c61\\u540d\\u505a\\u524d\\u7f00", "\\u53c2\\u6570\\u540d\\u4e0d\\u540c"]',NULL,'A',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'在Java中，一个类可同时定义许多同名的方法，这些方法的形式参数个数、类型或顺序各不相同，传回的值也可以不相同。这种面向对象程序的特性称为（ ）','["\\u9690\\u85cf", "\\u8986\\u76d6", "\\u91cd\\u8f7d", "Java\\u4e0d\\u652f\\u6301\\u6b64\\u7279\\u6027"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下面关于对象数组的叙述正确的是?','["\\u5bf9\\u8c61\\u6570\\u7ec4\\u7684\\u957f\\u5ea6\\u53ef\\u4ee5\\u4fee\\u6539", "\\u5bf9\\u8c61\\u6570\\u7ec4\\u91cc\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u90fd\\u662f\\u90a3\\u4e2a\\u5bf9\\u8c61\\u7684\\u5f15\\u7528", "\\u5bf9\\u8c61\\u6570\\u7ec4\\u7684\\u7d22\\u5f15\\u662f\\u4ece1\\u5f00\\u59cb\\u7684", "\\u6570\\u7ec4\\u4e2d\\u53ef\\u4ee5\\u5b58\\u653e\\u591a\\u79cd\\u7c7b\\u578b\\u7684\\u5bf9\\u8c61"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'在一个应用程序中定义了数组a：int[ ]  a={1,2,3,4,5,6,7,8,9,10},为了打印输出数组a的最后一个数组元素，下面正确的代码是?','["System.out.println(a[10]);", "System.out.println(a[9]);", "System.out.println(a[a.length]);", "System.out.println(a(8));"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'设有定义语句int  a[ ]={3,9,-9,-2,8}; 则以下对此语句的叙述错误的是?','["a\\u6570\\u7ec4\\u67095\\u4e2a\\u5143\\u7d20", "\\u6570\\u7ec4\\u4e2d\\u7684\\u6bcf\\u4e2a\\u5143\\u7d20\\u662f\\u6574\\u578b", "a\\u7684\\u503c\\u4e3a3", "\\u5bf9\\u6570\\u7ec4\\u5143\\u7d20\\u7684\\u5f15\\u7528a[a.length-1]\\u662f\\u5408\\u6cd5\\u7684"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下面关于数组定义语句不正确的是?','["int[ ]  a1,a2;", "int  a0[ ]={11,2,30,84,5};", "double[] d=new double[8];", "float f[ ]=new  {2.0f,3.5f,5.6f,7.8f};"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'设 i、j 为int型变量名，a 为int型数组名，以下选项中，正确的赋值语句是','["i = i + 2", "a[0] = 7;", "i++ - --j;", "a(0) = 66;"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'int a[ ]={45,4,67,23,65,87,34,52,56};数组中a[5]的值为','["23", "45", "65", "87"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'下列对长度为4的数组a的定义中,正确的是?','["int[4] a=new int[];", "int a[]=new int[5];", "int a[]={2,4,2,1};", "int[4] a=new int[4];"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'欲构造ArrayList类的一个实例，此类继承了List接口，下列哪个方法是正确的？','["ArrayList myList=new Object\\uff08\\uff09\\uff1b", "List myList=new ArrayList\\uff08\\uff09\\uff1b", "ArrayList myList=new List\\uff08\\uff09\\uff1b", "List myList=new List\\uff08\\uff09\\uff1b"]',NULL,'B',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'Java的集合框架中重要的接口java.util.Collection定义了许多方法。选项中哪个方法不是Collection接口所定义的？','["int size()", "boolean containsAll(Collection c)", "compareTo(Object obj)", "boolean remove(Object obj)"]',NULL,'C',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'list是一个ArrayList的对象，哪个选项的代码填写到//todo delete处，可以在Iterator遍历的过程中正确并安全的删除一个list中保存的对象？
       Iterator it = list.iterator();
       int index = 0;
       while (it.hasNext()){
              Object obj = it.next();
              if (needDelete(obj)) { //needDelete返回boolean，决定是否要删除
           //todo delete
              }
              index ++;
       }','["list.remove(obj);", "list.remove(index);", "list.remove(it.next());", "it.remove();"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','single_choice',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'list是一个ArrayList的对象，哪个选项的代码填写到//todo delete处，可以在Iterator遍历的过程中正确并安全的删除一个list中保存的对象？
 Iterator it = list.iterator();
       int index = 0;
       while (it.hasNext()){
              Object obj = it.next();
              if (needDelete(obj)) { //needDelete返回boolean，决定是否要删除
           //todo delete
              }
              index ++;
       }','["list.remove(obj);", "list.remove(index);", "list.remove(it.next());", "it.remove();"]',NULL,'D',1,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'功能：编写Application,求从命令行传入任意多个整数的最大值',NULL,'import java.io.*;
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
max',5,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'功能：找出一个二维数组中的鞍点，即该位置上的元素在该行上
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
break',5,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','fill_blank',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'功能：定义一个Date类，包括年、月、日三个属性，以及设置日期
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
calAge()',5,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'题目：求键盘上输入的一个整数的所有因子，以5个一行的形式输出
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
sum+=k;}',5,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'题目：计算 1/1+1/2+1/3+...+1/100 的值',NULL,'public class Prog1
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
System.out.println( "sum="+sum );',5,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','error_fix',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'题目：求出1~1000以内的完全平方数，要求每行输出5个数（完全
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
if(p%5==0)',5,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'题目：编写一个area方法，计算半径为r的圆的面积；并在main方法中调用该方法计算半径为5.5的圆的面积，并输出该面积。',NULL,'public class Prog1{
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
}',10,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'题目：输入一组成绩，输入-1代表结束，查找最高成绩，并保存在变量max中，输出max，要求使用while循环实现。',NULL,'import java.util.Scanner;
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
System.out.println(max);',10,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'题目：从键盘输入的10个整数，保存到数组a中，将数组中的元素按逆序重新存放后输出。
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
}',10,'2026-03-29 08:27:43','2026-03-29 08:27:43'),
	 ('java','programming',(SELECT id FROM code_practice.papers WHERE papers_id = '752' LIMIT 1),'（ArrayList）按要求完成题目编写：
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
}',10,'2026-03-29 08:27:43','2026-03-29 08:27:43');

UPDATE code_practice.papers p SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) WHERE p.papers_id = '752';
