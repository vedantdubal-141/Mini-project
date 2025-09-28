
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int a= 1;
    int i = 1;

    while (i <= n) {
        int j = 1;
        while (j <= n) {
            printf("%d ", a);
            a++;
            j++;
        }
        printf("\n");
        i++;
    }

    return 0;
}
