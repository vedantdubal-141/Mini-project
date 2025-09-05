#include <stdio.h>

int main()
{
    int n, m;
    int i;

    printf("Enter rows and columns (n m): ");
    scanf("%d %d", &n, &m);

    while (i<n)
    {
        int j=0;
        while (j<m)
        {
            if (i==0 || i==n || j==0 || j==m)
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
