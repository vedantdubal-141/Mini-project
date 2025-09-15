#include <stdio.h>

int main() {
    int a;

    printf("Enter an integer: ");
    scanf("%d", &a);

    if (a > 0 && a < 100) {
        printf("The number is positive and less than 100.\n");
    } else {
        printf("The number is not in the desired range.\n");
    }

    return 0;
}
