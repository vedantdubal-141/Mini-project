#include <stdio.h>

int main() {
    float a;

    printf("Enter a number: ");
    scanf("%f", &a);

    if (a > 0) {
        printf("%.2f is positive.\n", a);
    } else if (a < 0) {
        printf("%.2f is negative.\n", a);
    } else {
        printf("%.2f is zero.\n", a);
    }

    return 0;
}

}