#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);

    int i = 0;
    while (i < n) {
        int j = 0;
        while (j < n) {
            if (j >= i) {
                printf("*");
            } else {
                printf(" ");
            j++;
        }
        printf("\n");
        i++;
    }

    return 0;
}
