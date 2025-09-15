cmake_minimum_required(VERSION 4.0)
project(c1_ C)

set(CMAKE_C_STANDARD 11)

include_directories(.)

add_executable(c1_
        goto.c
        goto.h)
