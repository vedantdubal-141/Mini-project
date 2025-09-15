#include <iostream>

int main() {

    int start=10;
    int end=50;

    int i=start;
    while(i<=end) {
        if(i%2==1){
            printf("%d \n", i);
        }
        i++;
    }

    return 0;
}
