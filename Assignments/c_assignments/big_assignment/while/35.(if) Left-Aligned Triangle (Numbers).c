 #include <stdio.h>

int main ()
{

    int n;
    scanf("%d",&n);
    int i=1;

    while(i<=n)
    {
        int j=1;
        int a=1;

        while(j<=2*i-1)
        {
            if(j<i)
            {
                printf(" ");

            }
            else
            {
                printf("%d", a);
                a++;

            }
            j++;
        }

        printf("\n");
        i++;
    }

}