#include <stdio.h>

int main() {
    int m1, m2, m3, m4, m5;
    int total;
    int percentage;

    scanf("%d %d %d %d %d", &m1, &m2, &m3, &m4, &m5);

    total = m1 + m2 + m3 + m4 + m5;
    percentage = (total / 5);

    printf("percentage =%d\n", percentage);

    if (percentage >= 90) {
        printf("Grade A+\n");
    } else if (percentage >= 80) {
        printf("Grade A\n");
    } else if (percentage >= 70) {
        printf("Grade B\n");
    } else if (percentage >= 60) {
        printf("Grade C\n");
    } else if (percentage >= 50) {
        printf("Grade D\n");
    } else if (percentage >= 40) {
        printf("Grade E\n");
    } else {
        printf("Fail\n");
    }

    return 0;
}
