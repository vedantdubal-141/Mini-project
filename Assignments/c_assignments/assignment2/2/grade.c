#include <stdio.h>

int main() {
    float a;
    int b;

    printf("Enter marks (0-100): ");
    scanf("%f", &a);

    b = (int)a;

    if (b >= 90) {
        printf("Grade A.\n");
    } else if (b >= 80) {
        printf("Grade B.\n");
    } else if (b >= 70) {
        printf("Grade C.\n");
    } else if (b >= 60) {
        printf("Grade D.\n");
    } else {
        printf("Grade F.\n");
    }

    return 0;
}
}