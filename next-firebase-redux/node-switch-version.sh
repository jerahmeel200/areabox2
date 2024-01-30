 sudo rm -rf /usr/local/lib/node_modules
 sudo rm -rf /usr/local/bin/node
 sudo rm -rf /usr/local/bin/npm
 sudo n $1 || sudo n lts  
# sudo n lts 
 #sudo npm install -g npm@lts
# npm -v
 node -v 
rm -r -f functions/node_modules
rm -r -f src/app/node_modules/
