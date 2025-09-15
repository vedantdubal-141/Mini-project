#include <iostream>

// TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
int main() {
    // TIP Press <shortcut actionId="RenameElement"/> when your caret is at the <b>lang</b> variable name to see how CLion can help you rename it.
    auto lang = "C++";
    std::cout << "Hello and welcome to " << lang << "!\n";

    int a;
    int b;
    int c;
    printf("enter first number");
    scanf("%d", &a);
    printf("enter second number");
    scanf("%d", &b);
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &c);



    switch(c) {
        case'+' : printf("%d", a + b);
            break;
        case '-' : printf("%d", a - b);
            break;
        case '*' : printf("%d", a * b);
            break;
        case '/' : printf("%d", a / b);
            break;

        default: printf("enter valid operater");
            break;
            // TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            //std::cout << "i = " << i << std::endl;
    }
            return 0;
            // TIP See CLion help at <a href="https://www.jetbrains.com/help/clion/">jetbrains.com/help/clion/</a>. Also, you can try interactive lessons for CLion by selecting 'Help | Learn IDE Features' from the main menu.
    }