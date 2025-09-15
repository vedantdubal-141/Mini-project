//
// Created by superuser on 9/4/25.
//

#include "goto.h"

int main(void) {
 int a;
 for (a = 0; a < 10; a++) {
      if (a == 4) {
 goto two;
}

}
    printf("%d", &a);


    return 0;
}