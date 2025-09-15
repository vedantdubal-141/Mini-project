#include <stdio.h>

int main() {
    int choice;

    printf("Enter a number (1-3): ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("Red\\n");
            break;
        case 2:
            printf("Green\\n");
            break;
        case 3:
            printf("Blue\\n");
            break;
        default:
            printf("Invalid choice\\n");
            break;
    }

    return 0;
}