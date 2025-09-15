#include <stdio.h>

int main() {
    int num1, num2;
    int sum;

    printf("Enter the first integer: ");
    scanf("%d", &num1);

    printf("Enter the second integer: ");
    scanf("%d", &num2);

    sum = num1 + num2;

    if (sum % 2 == 0) {
        printf("The sum is an even number.\n");
    } else {
        printf("The sum is an odd number.\n");
    }

    return 0;
}
