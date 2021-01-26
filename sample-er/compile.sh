echo 'Generating MySQL...'
node ../dist/er-diagram-code-generator.js -f mysql -o sample-er.sql sample-er.txt
echo 'Generating Java...'
node ../dist/er-diagram-code-generator.js -f java -o sample-er.java sample-er.txt
