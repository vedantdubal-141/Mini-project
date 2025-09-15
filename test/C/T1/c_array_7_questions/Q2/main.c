#include <stdio.h>

int main(void) {
    int a;
    printf("Please enter the number of elements: ");
    scanf("%d", &a);
    int arr[a];
    int sum = 0;
    float avg = (float)sum / a;

    printf("Please enter the elements: ", &a);
    for (int i = 0; i < a; i++) {
        printf("%d", &arr[i]);
        sum += arr[i];
    }


    printf("The sum of all element is %d\n");
 printf("The average is %.2f", avg);


}







