#include <stdio.h>

int main() {
    int a;

    printf("Enter an integer: ");
    scanf("%d", &a);

    if (a % 4 == 0) {
        printf("The number is divisible by 4.\n");
    } else {
        printf("The number is not divisible by 4.\n");
    }

    return 0;
}
