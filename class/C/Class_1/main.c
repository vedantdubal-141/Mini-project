#include <stdio.h>
#define _CRT_SECURE_NO_WARNING

int main() {
    int a;

    printf("int : ");
    scanf("%d", &a);
    if (a % 2 == 0) {
        printf("%d even.\n", a);
    } else {
        printf("%d odd.\n", a);
    }

    return 0;
}
