#include <stdio.h>

int main(void){

    int d = (int)a;
    int e = (int)b;
    int f = (int)c;

    if (d+e>f && e+f>d && d+e>f) {
        printf("this is valid triangle");

         if (d==e==f) {
             printf("equal");

         }
        else if (d==f) {}

    }

    else
    {
        printf("this is invalid");
    }
    return 0;
}