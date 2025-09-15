#include <stdio.h>

int main() {
    int a, b;

    printf("Enter the first number: ");
    scanf("%d", &a);

    printf("Enter the second number: ");
    scanf("%d", &b);

    if (a < b) {
        printf("The smaller number is: %d\n", a);
    } else {
        printf("The smaller number is: %d\n", b);
    }

    return 0;
}
