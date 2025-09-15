#include <stdio.h>

int main() {
    int a;

    printf("Enter a number: ");
    scanf("%d", &a);

    if (a >= 100) {
        printf("The number is greater than or equal to 100.\n");
    } else {
        printf("The number is not greater than or equal to 100.\n");
    }

    return 0;
}
