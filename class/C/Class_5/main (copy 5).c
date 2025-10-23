#include <stdio.h>

int main(void) {

    int a=30;
    int b=20;
    char c;
    scanf("%c", &c);

    switch(c) {
            case'+': printf("%d %d", a+b);
            case'-': printf("%d %d", a-b);
            case'*': printf("%d %d", a*b);
            case'/': printf("%d %d", a/b);
            default: printf("Enter a valid operator");

    }
    return 0;
}