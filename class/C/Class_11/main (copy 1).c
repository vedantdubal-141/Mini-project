#include <stdio.h>
int main(void) {
    int n = 5;
    for (int r = n; r>=1; r--) {
        for (int c = n; c >= r; c--) {
            printf("%d ", c);
        }
        printf("\n");
    }

    return 0;
}
