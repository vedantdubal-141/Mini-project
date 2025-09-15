cmake_minimum_required(VERSION 4.0)
project(1to10sum C)

set(CMAKE_C_STANDARD 11)

add_executable(1to10sum main.c
        ../print_multiplication_table/main.cpp
        ../1tointegersum/main.c)
