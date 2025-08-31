#include <stdio.h>
char type(int num) {
    int unsigned long long i;
    unsigned long long factorial = 1;
    if (num < 0) {
        printf("Factorial is not defined for negative numbers.\n");
    } else {
        for (i = 1; i <= num; i++) {
            factorial *= i;
        }
        printf("Factorial of %d = %llu\n", num, factorial);
    }


}
int main(void) {
    type(3);
    return 0;
}