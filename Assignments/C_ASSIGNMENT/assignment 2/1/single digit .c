#include <stdio.h>

int main() {
    char a;

    printf("Enter a character: ");
    scanf("%c", &a);

    if (a >= '0' && a <= '9') {
        printf("The character is a digit.\n");
    } else {
        printf("The character is not a digit.\n");
    }

    return 0;
}
