#include <stdio.h>
int main(void) {
    int n = 5;
    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= r; c++) {
            printf("%d ", c);
        }
        printf("\n");
    }

    return 0;
}
