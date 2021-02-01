echo 'Generating MySQL...'
node ../dist/erdiagram-cli.js -f mysql -o sample-er.sql sample-er.erd
echo 'Generating Java...'
node ../dist/erdiagram-cli.js -f java -o sample-er.java sample-er.erd
