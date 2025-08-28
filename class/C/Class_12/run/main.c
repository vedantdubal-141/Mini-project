#include <stdio.h>

int main() {
    int n;
    int i=1, f=0, f1=1, f2=1, f3;
    printf("Enter a positive integer: ");
    scanf("%d", &n);

    while (i<=n) {
        f2 = f1 + f2;
        f1=f2;
        f2=f3;
        printf("%d\n", f3);

        i++;
    }

}