#include <stdio.h>

int main() {
    int a;
    int b;

    printf("first number: ");
    scanf("%d", &a);
    
    printf("second number: ");
    scanf("%d", &b);
    
    if (a > b) {
        printf("max number is: %d\n", a);
    } else {
        printf(" max number is: %d\n", b);
    }
    
    return 0;
}