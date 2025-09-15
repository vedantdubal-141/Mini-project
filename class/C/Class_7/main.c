#include <stdio.h>

int sum( int num1, int num2) {
    return num1 + num2;

}

int multiply(int num1, int num2) {
    return num1 * num2;
}

int main() {

    int num1=sum(2,3);
    int num2=multiply(4,5);

    printf("The sum is: %d\n",num1);
    printf("The multiply is: %d\n",num2);
  return 0;
}
