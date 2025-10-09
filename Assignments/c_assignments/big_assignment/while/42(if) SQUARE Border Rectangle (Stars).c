#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    int i=0;
    while (i<=n)
    {
        int j=0;
        while (j<=n)
        {
            if (i==0 || i==n && j==0 || j==n)
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
