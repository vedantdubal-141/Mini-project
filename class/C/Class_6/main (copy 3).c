#include <stdio.h>

void even_odd(int num) {
    printf("%d \n", num);
    if(num%2==0) {
        printf("even");
    }
    else { printf("odd");
    }
}

int main() {
     even_odd(8);
     even_odd(8);
     even_odd(11);
     even_odd(27);
         even_odd(32);
     return 0;
 }
