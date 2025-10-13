#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    int i=0;
    while (i<=n)
    {
        int j=0;
        while (j<=2*n)
        {
            if (i+j==n || j==i || i==0)
            {
                printf("*");
            }
            else
            {
                printf(" ");
            }
            j++;}
        printf("\n");
        i++;}
    return 0;
}
