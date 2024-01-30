cd src && grep -l -r  --include=*.{sh,js,txt,html,css}  --exclude-dir=node_modules --exclude-dir=next  "$1" .
