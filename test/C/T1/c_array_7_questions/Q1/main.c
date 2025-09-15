#include <stdio.h>

int main(void) {
    int a;
    printf("Please enter the number of elements: ");
     scanf("%d", &a);
    int arr[a];

    printf("Please enter the elements: ", &a);
    for (int i = 0; i < a; i++) {
        ("%d", &arr[i]);
    }
    int max=arr[0];
    int min=arr[0];

    for(int i = 1; i < a; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
        if(arr[i] < min) {
            min = arr[i];
        }
    }

printf("The maximum element is: %d\n", max);
    printf("The minimum element is: %d\n", min);
    return 0;

}