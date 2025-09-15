#include <stdio.h>

int main() {
    int a;
    float b;

    printf("Enter an integer: ");
    scanf("%d", &a);

    b = (float)a;

    printf("Original integer: %d\n", a);
    printf("Converted float: %f\n", b);

    return 0;
}
