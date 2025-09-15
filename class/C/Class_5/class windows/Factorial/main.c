#include <stdio.h>

int main(void) {

    int a;
    int b;
    int r=1;
    scanf("%d",&b);

    for(a=1; a<=5; a=a+1) {
        r=r*a;
    }
        printf("%d", r);
    return 0;
}
