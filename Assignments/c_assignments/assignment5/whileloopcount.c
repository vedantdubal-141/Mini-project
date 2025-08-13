#include <stdio.h>

int main() {
    int number;

    printf("Please enter a number to start the countdown: ");
    scanf("%d", &number);

    while (number >= 1) {
        printf("%d\n", number);
        number--;
    }

    return 0;
}
