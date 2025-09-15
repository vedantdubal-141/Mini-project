#include <stdio.h>

int main() {
    int num1, num2;

    printf("Enter the first integer: ");
    scanf("%d", &num1);

    printf("Enter the second integer: ");
    scanf("%d", &num2);

    if (num1 % 3 == 0 && num2 % 3 == 0) {
        printf("Both numbers are divisible by 3.\n");
    } else {
        printf("At least one of the numbers is not divisible by 3.\n");
    }

    return 0;
}
