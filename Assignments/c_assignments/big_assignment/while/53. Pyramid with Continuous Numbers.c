to do this 53. Pyramid with Continuous Numbers
Input: n = 4

         1
      2  3  4
   5  6  7  8  9
10 11 12 13 14 15 16

#include <stdio.h>

int main()
{
    int n;
    scanf("%d",&n);
    int i=0;
    int a=1;

    while (i<=n)
    {
        int j=0;
        while (j<=n)
        {
            if ((i+j)>=n)
            {
                if (a<10){
                    printf("%d", a  );
                    a++;
                }
                else
                {
                    printf("%d", a );
                }
                
            }
            else
            {
                printf("   ");

            }
            j++;
        }

        int k=0;
        while (k<=n)
        {
            if ((i+j)>=n)
            {
                if(a<10)
                {
                    printf("%d", a );
                }
                else
                {
                    printf("%d", a );
                }
            }
            else
            {
                printf("   ");
            }
            k++;
        }
        printf("\n");
        i++;
    }
    return 0;
}

i think this code is ostly correct however idk where to increment a++