#include <stdio.h>

int main() {
    int num, sum = 0, count = 0;
    float avg;

    do {
        scanf("%d", &num);
        if (num != 0) {
            sum = sum + num;
            count++;
        }
    } while (num != 0);

    if (count > 0) {
        avg = (float)sum / count;
        printf("Sum = %d, Average = %.0f\n", sum, avg);
    } else {
        printf("No numbers entered\n");
    }

    return 0;
}
