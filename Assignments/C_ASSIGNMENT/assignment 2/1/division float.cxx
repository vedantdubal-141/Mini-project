#include <stdio.h>

int main() {
    int a, b;
    float c;

    printf("Enter the first integer: ");
    scanf("%d", &a);

    printf("Enter the second integer: ");
    scanf("%d", &b);

    c = (float)a / b;

    printf("The result of the division is: %.2f\n", c);

    return 0;
}
