#include <stdlib.h>



int main(){
    int* X = (int*) malloc(sizeof(int));
    *X = 5;
    printf("%d"*X);
}