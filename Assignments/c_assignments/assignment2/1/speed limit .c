#include <stdio.h>

int main() {
    int a;

    printf("Enter speed: ");
    scanf("%d", &a);

    if (a <= 60) {
        printf("The speed is within the limit.\n");
    } else {
        printf("The speed is over the limit.\n");
    }

    return 0;
}
