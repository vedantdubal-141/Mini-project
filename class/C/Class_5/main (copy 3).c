#include <stdio.h>

int main(void) {
    int num;
    int track=0;
    scanf("%d",&num);

    for(int i=2;i<=num-1;i++) {
        if(num%i==0) {
            track=1;
            break;
        }
    }

    if(track==0) {
        printf("PRIME\n");
    }
        else {
            printf("NOT PRIME\n");
        }
    return 0;
}