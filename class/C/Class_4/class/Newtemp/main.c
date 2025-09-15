#include <stdio.h>

int main(void) {

    float temp;
    scanf("%f", &temp);

    if (temp >= 50) {
        printf("Your temp is very hot");
    }
    else if(temp >= 25 && temp <= 50) {
        printf("Your temp is hot");
    }
        else if( temp <= 25){
        printf("Your temp is optimal");

    }

        else {
            printf("Your temp is cold");
        }
    return 0;
}