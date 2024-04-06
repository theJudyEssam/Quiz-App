#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
 
 
void prime(ll n){

      if( n <= 1) {
        cout<<"NO"<<endl;
        return;
    } else if( n == 2) {
        cout<<"YES"<<endl;
        return;
    } else if( n % 2 == 0 ){
        cout<<"NO"<<endl;
        return;
    }
    
    for (int i = 3; i < sqrt(n); i++){
        if (n % i == 0 ){
            cout<<"NO"<<endl;
            return;
        }
    }
    cout<<"YES"<<endl;
    return;
}
 
int main(){
    ll a; cin>>a;
    for(ll i = 0; i < a; i++){
        ll x; cin>>x;
        prime(x);
    }
}