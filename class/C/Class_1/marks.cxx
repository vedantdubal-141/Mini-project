#include <stdio.h>

int main() {
    int science;
    int hindi;
    int english;
    int total;

    printf("Enter marks for Science: ");
    scanf("%d", &science);
    
    printf("Hindi: ");
    scanf("%d", &hindi);
    
    printf("English: ");
    scanf("%d", &english);
    
    total = science + hindi + english;
    
    printf("Total marks: %d\n", total);
    
    if (total > 205) {
        printf("Pass\n");
    } else {
        printf("Fail\n");
    }
    
    return 0;
}
