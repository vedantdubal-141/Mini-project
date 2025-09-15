#include <stdio.h>

int main() {
    int num1, num2;
    int difference;

    printf("Enter the first integer: ");
    scanf("%d", &num1);

    printf("Enter the second integer: ");
    scanf("%d", &num2);

    difference = num1 - num2;
    
    if (difference < 0) {
        difference = difference * -1;
    }

    printf("The difference is: %d\n", difference);

    if (difference > 50) {
        printf("The difference is greater than 50.\n");
    } else {
        printf("The difference is not greater than 50.\n");
    }

    return 0;
}
