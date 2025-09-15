
#include <stdio.h>

int main()
{
    float a, b, c;
    scanf("%f %f %f", &a, &b, &c);

    int d = (int)a;
    int e = (int)b;
    int f = (int)c;

    if (d==e && d!=f || e==f && d!=f || d==f && e!=f || d==f && e==f) {
        printf("Isosceles Triangle\n");
    }
    else if (d==f && e==f) {
        printf("Equilateral triangle\n");
    }
    else if (d!=f && e!=f && d!=f) {
        printf("scalene Triangle\n");
    }
    return 0;
}