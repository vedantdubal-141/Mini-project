#include <stdio.h>

int main() {
    int a;

    printf("Enter an integer: ");
    scanf("%d", &a)
    
    if (a >= 100 && a <= 999) {
        printf("The number is a 3-digit number.\n");
    } else {
        printf("The number is not a 3-digit number.\n");
    }

    return 0;
}
