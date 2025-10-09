#include <stdio.h>

int main() {
    int num;

    do {
        printf("Enter an even or odd number: ");
        scanf("%d", &num);
        if (num % 2 == 0) {
            printf("Even number.\\n");
        }
    } while (num % 2 == 0); // Loop runs as long as the number is even

    printf("You entered an odd number. Loop ended.\\n");

    return 0;
}