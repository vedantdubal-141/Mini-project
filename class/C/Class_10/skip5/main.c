#include <stdio.h>

int main(void) {

    int a=50;
    for(int i=1;i<=a;i++) {
        if(i%5==0) {
            continue;
        }
        printf("%d\n",i);
    }

    return 0;
}