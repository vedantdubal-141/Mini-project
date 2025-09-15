#include <stdio.h>

int main() {
    int a;
    float b, c;

    printf("Enter an integer: ");
    scanf("%d", &a);

    printf("Enter a float: ");
    scanf("%f", &b);

   
    c = a + b;

    printf("The result is: %f\n", c);

    return 0;
}
