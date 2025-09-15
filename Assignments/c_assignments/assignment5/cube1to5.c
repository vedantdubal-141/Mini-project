#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        int cube = i * i * i;
        printf("The cube of %d is %d\n", i, cube);
    }
    
    return 0;
}
