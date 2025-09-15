1#include <stdio.h>

int main() {
    int num1, num2;

    printf("Enter the first number: ");
    scanf("%d", &num1);

    printf("Enter the second number: ");
    scanf("%d", &num2);

    if (num2 == 0) {
        printf("Error: Cannot divide by zero.\n");
    } else if (num1 % num2 == 0) {
        printf("%d is divisible by %d.\n", num1, num2);
    } else {
        printf("%d is not divisible by %d.\n", num1, num2);
    }

    return 0;
}
