#include <stdio.h>

int main() {
    int a;

    printf("Enter an integer: ");
    scanf("%d", &a);

    if (a % 10 == 0) {
        printf("The number is a multiple of 10.\n");
    } else {
        printf("The number is not a multiple of 10.\n");
    }

    return 0;
}
