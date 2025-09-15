#include <stdio.h>

int main(void) {
    int a;
    int b;
    int c;
    printf("enter first number: ");
    scanf("%d", &a);
    printf("enter second number: ");
    scanf("%d", &b);
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &c);

    switch(c) {
        case'+' : printf("%d", a + b);
            break;
        case'-' : printf("%d", a - b);
            break;
            case'*' : printf("%d", a * b);
            break;
        case'/' : printf("%d", a / b);
             break;
        default: printf("enter valid operater");
    }
    return 0;
}