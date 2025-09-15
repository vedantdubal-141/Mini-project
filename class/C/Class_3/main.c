#include <stdio.h>

int main(void) {

    char c;
    scanf("%c", &c);
    int a=c;

    if(a>=65 && a<=90) {
        printf("UpperCase\n");
    }

    else if(a>=97 && a<=122) {
        printf("LowerCase\n");

    }
    else {
        printf("not alphabet\n");
    }
    return 0;
}