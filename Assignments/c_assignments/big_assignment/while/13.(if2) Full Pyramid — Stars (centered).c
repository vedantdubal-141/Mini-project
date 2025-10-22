#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);

    int i = 0;
    while (i < n) {
        int a = 1;
        int j = 0;

        while (j < n) {
            if (i-1>=j) {
                printf("*");

            } else {
                printf(" ");
            }
            j++;
        }
        printf("\n");
        i++;
    }

    return 0;
}
