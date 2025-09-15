#include <stdio.h>

int main() {
    float a;
    int b;

    printf("Enter a floating-point number: ");
    scanf("%f", &a);

    b = (int)a;

    printf("The integer part is: %d\n", b);

    return 0;
}
