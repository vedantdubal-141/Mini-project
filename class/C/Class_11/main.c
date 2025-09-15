#include <stdio.h>
int main(void) {
    int n = 5;
    char x =
        '*';
    for (int r = 1; r <= n; r++) {
        for (int c = 1; c <= r; c++) {
            printf("%c ", x);
        }
        printf("\n");
    }

    return 0;
}
