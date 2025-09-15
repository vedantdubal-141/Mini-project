#include <stdio.h>

int main() {
    int a;
    int b;
    int c;
    int d;

    printf("Enter the first number: ");
    scanf("%d", &a);
    
    printf("Enter the second number: ");
    scanf("%d", &b);
    
    c = a * b + 27;
    d = c - 15;
    
    if (d % 7 == 0) {
        printf("The final result is %d, which is divisible by 7.\n", d);
    } else {
        printf("The final result is %d, which is not divisible by 7.\n", d);
    }
    
    return 0;
}

