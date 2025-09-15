#include <stdio.h>

int main() {
    long long monthly_salary;
    long long yearly_salary;

    printf("Enter your monthly salary: ");
    scanf("%lld", &monthly_salary);

    yearly_salary = monthly_salary * 12;

    printf("Your yearly salary is: %lld\n", yearly_salary);

    if (yearly_salary > 7500000) {
        printf("Your yearly salary is above 7,500,000.\n");
    } else {
        printf("Your yearly salary is not above 7,500,000.\n");
    }

    return 0;
}
