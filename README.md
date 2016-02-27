# Commands

Convert the excel file to a csv
	in2csv -e iso-8859-1 data/gender-balance-data.xlsx > data/gender-balance-data.csv

<!-- Remove quote marks
	sed 's/"//g' data/gender-balance-data.csv > data/temp.csv && mv data/temp.csv data/gender-balance-data.csv -->

Convert the csv to json at [http://www.csvjson.com/csv2json](http://www.csvjson.com/csv2json)
