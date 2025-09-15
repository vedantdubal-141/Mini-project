#include <stdio.h>

int main(void) {
    int  a;
    printf("Enter a integer :-");
    scanf("%d", &a);
    if (a%2==0) {
        if (a%4==0) {
            printf("Divisible by 4");
        }
        else {
            printf("Not divisible by 4 but divisible by 2");
        }
    }
    else {
        printf("Not divisible by 2");
    }
    return 0;
}