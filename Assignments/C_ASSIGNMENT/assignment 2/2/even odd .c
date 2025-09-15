#include <stdio.h>

int main() {
    float a;
    int b;

    printf("Enter a number: ");
    scanf("%f", &a);

    b = (int)a;

    if (b % 2 == 0) {
        printf("Even.\n");
    } else {
        printf("Odd.\n");
    }

    return 0;
}
