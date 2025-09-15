#include <stdio.h>

int main() {
    int a;
    float b;

    printf("Enter an integer: ");
    scanf("%d", &a);

    printf("Enter a float: ");
    scanf("%f", &b);

    if ((float)a > b) {
        printf("The integer is larger.\n");
    } else if ((float)a < b) {
        printf("The float is larger.\n");
    } else {
        printf("The numbers are equal.\n");
    }

    return 0;
}
}