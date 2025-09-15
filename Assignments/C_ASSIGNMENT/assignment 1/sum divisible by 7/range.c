#include <stdio.h>

int main() {
    int number;

    printf("Enter an integer: ");
    scanf("%d", &number);

    if (number >= 100 && number <= 200) {
        printf("The number is within the range 100 to 200.\n");
    } else {
        printf("The number is not within the range 100 to 200.\n");
    }

    return 0;
}
