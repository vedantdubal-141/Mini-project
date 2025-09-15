#include <stdio.h>

int main() {
    int age;

    printf("Enter your age: ");
    scanf("%d", &age);

    if (age < 13) {
        printf("You are a Child.\n");
    } else if (age >= 13 && age <= 19) {
        printf("You are a Teen.\n");
    } else if (age >= 20 && age <= 59) {
        printf("You are an Adult.\n");
    } else {
        printf("You are a Senior.\n");
    }

    return 0;
}
v