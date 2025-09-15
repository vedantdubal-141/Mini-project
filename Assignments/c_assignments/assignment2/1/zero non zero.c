#include <stdio.h>

int main() {
    int a;

    printf("Enter an integer: ");
    scanf("%d", &a);

    if (a == 0) {
        printf("Zero.\n");
    } else {
        printf("Non-zero.\n");
    }

    return 0;
}
