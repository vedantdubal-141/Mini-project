#include <stdio.h>
int main() {
    int n;
    scanf("%d", &n);

    int i = 0;
    while (i < n) {
        int j = 0;
        while (j < n) {
            if (j >= n - i - 1 ) /* for general purposes j >= n - i - 1  */{
                printf("%c", (j - (n - i - 1)) + 65);
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
