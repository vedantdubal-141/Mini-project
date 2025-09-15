#include <stdio.h>

int main() {
    int sum = 0;

    for (int i = 1; i <= 50; i++) {
        sum += i;
    }

    printf("The sum of numbers from 1 to 50 is: %d\n", sum);
    
    return 0;
}
