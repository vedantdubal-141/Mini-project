#include <stdio.h>

int main() {
    float a;

    printf("Enter a number: ");
    scanf("%f", &a);

    if (a > 5.5) {
        printf("The number is greater than 5.5.\n");
    } else {
        printf("The number is not greater than 5.5.\n");
    }

    return 0;
}
