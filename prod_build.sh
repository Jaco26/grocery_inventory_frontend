# build vue app
npm run build;

# remove previous backend build
rm -rf ../backend/app/static;
mkdir ../backend/app/static;

# copy /dist to ../backend/app/static
cp -a ./dist/. ../backend/app/static/;

mv ../backend/app/static/static/* ../backend/app/static;

rm -rf ../backend/app/static/static;

# We're done :)
echo "We're done!"
