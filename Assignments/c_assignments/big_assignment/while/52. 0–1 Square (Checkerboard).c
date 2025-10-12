
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int i = 1;

    while (i <= n) {
        int j = 1;
        while (j <= n) {
            if ((i+j) % 2 == 0) { printf("1");}
            else { printf("0");}
            j++;
        }
        printf("\n");
        i++;
    }

    return 0;
}
