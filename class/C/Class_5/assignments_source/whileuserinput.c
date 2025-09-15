#include <stdio.h>

int main() {
    int limit;
    int counter = 1;

    printf("Please enter a number: ");
    scanf("%d", &limit);

    while (counter <= limit) {
        printf("%d\n", counter);
        counter++;
    }

    return 0;
}
