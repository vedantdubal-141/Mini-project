#include <stdio.h>

int main() {
    int number = 1;
    int sum = 0;

    while (number <= 50) {
        sum = sum + number;
        number++;
    }

    printf("The sum of numbers from 1 to 50 is: %d\n", sum);

    return 0;
}
