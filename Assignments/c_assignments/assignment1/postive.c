#include <studio.h>

int main() {
    int a;

    printf("integer: ");
    scanf("%d", &a);
    
    if (a > 0) {
        printf("The number is positive.\n");
    } else if (a < 0) {
        printf("The number is negative.\n");
    } else {
        printf("The number is zero.\n");
    }
    
    return 0;
}
