#include <stdio.h>

int main(void) {
    int a=1;
    int b=2;
    scanf("%d",&a);

    while (a<=10) {
        int c=0;
        if (a>=2) {
            for (int b=2; b<=a/2; b++) {
                if (a%b==0) {
                    c=1;
                    break;
                }
            }
        }
        if (c==0) {
            printf("%d\n", a);
        }
        a++;
    }


    return 0;
}
