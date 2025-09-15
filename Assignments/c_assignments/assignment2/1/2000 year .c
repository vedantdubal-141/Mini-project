#include <stdio.h>

int main() {
    int year;

    printf("Enter a year: ");
    scanf("%d", &year);

    if (year < 2000) {
        printf("The year is before 2000.\n");
    } else if (year > 2000) {
        printf("The year is after 2000.\n");
    } else {
        printf("The year is 2000.\n");
    }

    return 0;
}
