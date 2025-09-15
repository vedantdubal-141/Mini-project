#include <stdio.h>

int main() {
    int a;
    int b;
    int c;

    printf("Enter the first number: ");
    scanf("%d", &a);
    
    printf("Enter the second number: ");
    scanf("%d", &b);
    
    c = a + b;
    
    if (c % 7 == 0) {
        printf("The sum of %d and %d is %d, which is divisible by 7.\n", a, b, c);
    } else {
        printf("The sum of %d and %d is %d, which is not divisible by 7.\n", a, b, c);
    }
    
    return 0;
}
