#include <stdio.h>

int main(void) {
    int man;
    scanf("%d", &man);

    for (int i = 2; i < man; i++) {
        if (man % i == 0) {
            isPrime=false;
        }
    }
    return 0;
}