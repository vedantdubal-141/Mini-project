#include <stdio.h>

int main() {

   int n=10;
   int m=13;
   int i=1;

   while (i<=n)
   { int j=1;
      while (j<=m)
      {

         if (i == 1 && j >= 9) {
            printf("%d", j - 8); // 1..5
         }
         else if (i == 5 && j <= 5) {
            printf("%d", j); // 1..5
         }
         else if (i == 9 && j >= 9) {
            printf("%d", j - 8); // 1..5
         }
         else if (i + j == 10) {
            printf("%d", i); // diagonal (2,8)(3,7)(4,6)
         }
         else if (i == j && i >= 6 && i <= 8) {
            printf("%d", 10 - i); // diagonal (6,6)(7,7)(8,8)
         }
         else {
            printf(" ");
         }
         j++;
      }

      printf("\n");
      i++;
   }

   return 0;
}

